import os
import torch
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
import io
from torchvision import transforms

# Import mobilevit.py (placed in same folder as app.py)
from mobilevit import mobilevit_xxs

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# -------------------------
# PATHS
# -------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_DIR = os.path.join(BASE_DIR, "Crop_identifier_model")
DISEASE_DIR = os.path.join(BASE_DIR, "Crop_disease_models")

CROP_ID_CLASS_NAMES = sorted([
    'Apple','Corn','Guava','Grape','Lemon','Mango','Peach','Pepper',
    'Pomegranate','Potato','Rice','Strawberry','Sugarcane','Tomato','Wheat'
])

CROP_ID_MODEL_PATH = os.path.join(MODEL_DIR, "mobilevit_crop_identifier_epoch10.pth")

CROP_TO_DISEASE_MODEL_PATH = {
    crop: os.path.join(DISEASE_DIR, f"mobilevit_{crop}_epoch10.pth")
    for crop in CROP_ID_CLASS_NAMES
}

DISEASE_CLASS_NAMES = {
    'Apple': ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy'],
    'Corn': ['Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___healthy', 'Corn_(maize)___Northern_Leaf_Blight'],
    'Guava': ['Guava_diseased', 'Guava_healthy'],
    'Grape': ['Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___healthy', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)'],
    'Lemon': ['Lemon_diseased', 'Lemon_healthy'],
    'Mango': ['Mango_diseased', 'Mango_healthy'],
    'Peach': ['Peach___Bacterial_spot', 'Peach___healthy'],
    'Pepper': ['Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy'],
    'Pomegranate': ['Pomegranate_diseased', 'Pomegranate_healthy'],
    'Potato': ['Potato___Early_blight', 'Potato___healthy', 'Potato___Late_blight'],
    'Rice': ['Rice___Brown_Spot', 'Rice___Healthy', 'Rice___Leaf_Blast', 'Rice___Neck_Blast'],
    'Strawberry': ['Strawberry___healthy', 'Strawberry___Leaf_scorch'],
    'Sugarcane': ['Sugarcane_Bacterial Blight', 'Sugarcane_Healthy', 'Sugarcane_Red Rot'],
    'Tomato': ['Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___healthy', 'Tomato___Late_blight',
               'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
               'Tomato___Target_Spot', 'Tomato___Tomato_mosaic_virus', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus'],
    'Wheat': ['Wheat___Brown_Rust', 'Wheat___Healthy', 'Wheat___Yellow_Rust']
}

NUM_DISEASES_FOR_CROP = {crop: len(labels) for crop, labels in DISEASE_CLASS_NAMES.items()}

test_transforms = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor()
])

# -------------------------
# Load models
# -------------------------
def load_crop_identifier_model():
    num_crops = len(CROP_ID_CLASS_NAMES)
    model = mobilevit_xxs(num_classes=num_crops).to(device)
    model.load_state_dict(torch.load(CROP_ID_MODEL_PATH, map_location=device))
    model.eval()
    return model

def load_disease_model(model_path, num_disease_classes):
    model = mobilevit_xxs(num_classes=num_disease_classes).to(device)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()
    return model

crop_identifier_model = load_crop_identifier_model()

disease_models = {
    crop: load_disease_model(CROP_TO_DISEASE_MODEL_PATH[crop], NUM_DISEASES_FOR_CROP[crop])
    for crop in CROP_ID_CLASS_NAMES
}

# -------------------------
# Prediction functions
# -------------------------
def predict_crop(image_tensor):
    with torch.no_grad():
        crop_logits = crop_identifier_model(image_tensor.unsqueeze(0))
        crop_idx = crop_logits.argmax(1).item()
        return CROP_ID_CLASS_NAMES[crop_idx]

def predict_disease(crop_name, image_tensor):
    disease_model = disease_models[crop_name]
    disease_labels = DISEASE_CLASS_NAMES[crop_name]
    with torch.no_grad():
        logits = disease_model(image_tensor.unsqueeze(0))
        idx = logits.argmax(1).item()
        return disease_labels[idx]

# -------------------------
# FastAPI app
# -------------------------
app = FastAPI()

@app.post("/predict/")
async def predict_endpoint(file: UploadFile = File(...)):
    img_bytes = await file.read()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img_tensor = test_transforms(img).to(device)

    crop = predict_crop(img_tensor)
    disease = predict_disease(crop, img_tensor)

    return {"crop": crop, "disease": disease}

@app.post("/predict_batch/")
async def predict_batch(files: list[UploadFile] = File(...)):
    results = []
    for file in files:
        img_bytes = await file.read()
        img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        img_tensor = test_transforms(img).to(device)

        crop = predict_crop(img_tensor)
        disease = predict_disease(crop, img_tensor)

        results.append({"file": file.filename, "crop": crop, "disease": disease})

    return results
