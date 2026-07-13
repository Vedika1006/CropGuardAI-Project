# 🌿 CropGuard AI

An AI-powered crop disease detection mobile app that uses deep learning to identify plant diseases from leaf images and provide actionable treatment recommendations for Indian farmers.

Built with a microservice architecture: a React Native mobile app, a Node.js API backend, and a dedicated Python ML inference service running custom MobileViT-XXS models trained on 15 crops and ~50 disease classes.

---

## Table of Contents

- [How It Works](#how-it-works)
- [Features](#features)
- [Supported Crops & Diseases](#supported-crops--diseases)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Model Details](#model-details)
- [Known Limitations](#known-limitations)
- [Future Scope](#future-scope)
- [License](#license)

---

## How It Works

```
📱 Capture leaf photo
        ↓
🔍 Stage 1: Crop Identification (MobileViT-XXS — 15-class classifier)
        ↓
🦠 Stage 2: Disease Classification (crop-specific MobileViT-XXS model)
        ↓
📊 Result: Disease name + Confidence score + Treatment recommendations
```

The app uses a two-stage inference pipeline. First, the image is classified to determine the crop type (Apple, Wheat, Tomato, etc.). Then, a crop-specific disease model identifies the exact disease within that crop. Each crop has its own dedicated model, trained specifically on diseases that affect that crop — resulting in significantly higher accuracy than a single monolithic classifier.

---

## Features

### Core Detection

- **Camera & Gallery Upload** — Capture a live photo or pick from gallery using the device camera
- **Real-Time Disease Prediction** — Two-stage MobileViT-XXS inference with softmax confidence scoring
- **Treatment Recommendations** — Actionable organic, chemical, and preventive treatment suggestions for every detected disease
- **Detection History** — All past scans saved server-side per user, synced across sessions

### User Experience

- **Multi-Language Support** — English, Hindi (हिन्दी), and Marathi (मराठी) — built for Indian farmers
- **Text-to-Speech** — Voice readout of disease results and treatments using device speech synthesis
- **SMS Alerts** — Share detection results with other contacts
- **Help & Support** — In-app issue reporting and help request submission
- **Mobile-First Design** — Optimized for smartphones, with large touch targets and high-contrast UI for outdoor visibility

### Authentication

- **User Registration & Login** — Secure signup/login with bcrypt password hashing
- **JWT Authentication** — Token-based session management across all API calls
- **Persistent Sessions** — Auth state persisted locally via AsyncStorage

---

## Supported Crops & Diseases

The system covers **15 crops** with **~50 disease classes**:

| Crop | Diseases Detected |
|---|---|
| Apple | Scab, Black Rot, Cedar Apple Rust, Healthy |
| Corn (Maize) | Cercospora Leaf Spot, Common Rust, Northern Leaf Blight, Healthy |
| Grape | Black Rot, Esca (Black Measles), Leaf Blight, Healthy |
| Guava | Canker, Dot, Mummification, Rust, Healthy |
| Lemon | Black Spot, Canker, Greening, Scab, Healthy |
| Mango | Anthracnose, Bacterial Canker, Cutting Weevil, Die Back, Gall Midge, Powdery Mildew, Sooty Mould, Healthy |
| Peach | Bacterial Spot, Healthy |
| Pepper (Bell) | Bacterial Spot, Healthy |
| Pomegranate | Alternaria, Anthracnose, Bacterial Blight, Cercospora, Heart Rot, Healthy |
| Potato | Early Blight, Late Blight, Healthy |
| Rice | Brown Spot, Hispa, Leaf Blast, Healthy |
| Strawberry | Leaf Scorch, Healthy |
| Sugarcane | Mosaic, Red Rot, Rust, Yellow Leaf, Healthy |
| Tomato | Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Target Spot, Mosaic Virus, Yellow Leaf Curl Virus, Spider Mites, Healthy |
| Wheat | Brown Rust, Loose Smut, Septoria, Yellow Rust, Healthy |

Every disease class includes curated treatment recommendations across three categories: **Organic**, **Chemical**, and **Preventive**.

---

## Tech Stack

### Mobile App (Frontend)

| Technology | Purpose |
|---|---|
| React Native 0.81 | Cross-platform mobile framework |
| Expo 54 | Development toolchain and managed workflow |
| TypeScript | Type-safe codebase |
| React Navigation v6 | Stack + Bottom Tab navigation with auth-gated routing |
| Zustand 5 | Lightweight state management with AsyncStorage persistence |
| expo-image-picker | Camera and gallery image capture |
| expo-speech | Text-to-speech for voice readout of results |

### API Backend

| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB Atlas | Cloud database (users, detections, support requests) |
| Mongoose | MongoDB ODM for schema modeling |
| JSON Web Tokens | Stateless authentication |
| bcryptjs | Password hashing |
| multer | Multipart file upload handling |

### ML Inference Service

| Technology | Purpose |
|---|---|
| Python + FastAPI | High-performance async API for model serving |
| PyTorch | Deep learning framework |
| MobileViT-XXS | Custom implementation — lightweight vision transformer optimized for mobile inference |
| torchvision | Image preprocessing and transforms |
| einops | Tensor rearrangement for transformer operations |

---

## Architecture

```
┌──────────────────────────────────┐
│         React Native App         │
│     (Expo 54 + TypeScript)       │
│                                   │
│  • Camera/Gallery capture         │
│  • Auth UI (Login/Signup)         │
│  • Result display + History       │
│  • Multi-language + TTS           │
└──────────────┬────────────────────┘
               │ HTTP (JWT Auth)
               ▼
┌──────────────────────────────────┐
│      Node.js / Express API       │
│         (Port 5000)              │
│                                   │
│  • User auth (register/login)     │
│  • Detection CRUD + history       │
│  • Help/Issue request storage     │
│  • Image forwarding to ML         │
├──────────────┬────────────────────┤
│              │                    │
│   MongoDB    │    HTTP POST       │
│   Atlas      │    (image)         │
│              ▼                    │
│   ┌──────────────────────┐        │
│   │  Python ML Service   │        │
│   │  FastAPI (Port 10000)│        │
│   │                       │        │
│   │  16 MobileViT models  │        │
│   │  (1 crop ID +         │        │
│   │   15 disease models)  │        │
│   └──────────────────────┘        │
└──────────────────────────────────┘
```

The architecture follows a microservice pattern — the ML inference service is decoupled from the API backend, allowing independent scaling and deployment. The Node backend acts as an API gateway, handling authentication and data persistence while forwarding inference requests to the Python service.

---

## Project Structure

```
CropGuardAI-Project/
│
├── App.tsx                          # Root entry point (Expo)
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx         # Stack + Tab navigation, auth-gated
│   ├── pages/
│   │   ├── Splash.tsx               # Splash screen with auto-routing
│   │   ├── Login.tsx                # Login with JWT auth
│   │   ├── SignUp.tsx               # Registration
│   │   ├── Home.tsx                 # Camera/gallery capture
│   │   ├── Result.tsx               # Disease prediction results
│   │   ├── History.tsx              # Past detections (server-synced)
│   │   ├── Alert.tsx                # SMS alert sharing
│   │   ├── Settings.tsx             # App settings + language
│   │   ├── About.tsx                # About page
│   │   └── Help.tsx                 # Issue reports + help requests
│   ├── store/
│   │   ├── authStore.ts             # Auth state + JWT token (Zustand)
│   │   ├── historyStore.ts          # Detection history + server sync
│   │   └── settingsStore.ts         # App preferences
│   ├── lib/
│   │   ├── api.ts                   # HTTP client (detect, history, support)
│   │   ├── config.ts                # API base URL configuration
│   │   └── i18n.ts                  # Translations (en/hi/mr)
│   ├── components/
│   │   ├── PageHeader.tsx
│   │   ├── ImageCarousel.tsx
│   │   └── ui/                      # Reusable UI components
│   └── theme/
│       ├── colors.ts
│       └── styles.ts
│
├── CropGuard-Backend/               # Node.js API backend
│   ├── index.js                     # Express server entry point
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── models/
│   │   ├── User.js                  # User schema (bcrypt hashing)
│   │   ├── Detection.js             # Detection schema
│   │   ├── IssueReport.js           # Issue report schema
│   │   └── HelpRequest.js           # Help request schema
│   ├── controllers/
│   │   ├── authController.js        # Register/login logic
│   │   ├── detectionController.js   # Image upload + ML forwarding
│   │   └── supportController.js     # Issue/help request handling
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── detectionRoutes.js
│   │   └── supportRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js        # JWT verification
│   └── .env.example
│
├── cropguard_api/                   # Python ML inference service
│   ├── app.py                       # FastAPI server + inference logic
│   ├── mobilevit.py                 # Custom MobileViT-XXS implementation
│   ├── treatments.py                # Treatment lookup (~50 diseases)
│   ├── requirements.txt
│   ├── Crop_identifier_model/
│   │   └── mobilevit_crop_identifier_epoch10.pth
│   └── Crop_disease_models/         # 15 crop-specific disease models
│       ├── mobilevit_apple_epoch10.pth
│       ├── mobilevit_corn_epoch10.pth
│       ├── mobilevit_tomato_epoch10.pth
│       └── ... (15 .pth files total)
│
├── app.json                         # Expo configuration
├── package.json                     # Frontend dependencies
├── tsconfig.json                    # TypeScript configuration
└── .env.example                     # Environment variable template
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (3.9+)
- MongoDB Atlas account (free tier works) — [Create here](https://www.mongodb.com/cloud/atlas/register)
- Expo Go app on your Android/iOS device
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Vedika1006/CropGuardAI-Project.git
cd CropGuardAI-Project
```

### 2. Set Up the Python ML Service

```bash
cd cropguard_api
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
```

### 3. Set Up the Node Backend

```bash
cd CropGuard-Backend
npm install
cp .env.example .env
```

Fill in your `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/cropguard?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
LOCAL_AI_URL=http://localhost:10000/predict/
```

### 4. Set Up the Frontend

```bash
cd ..  # back to project root
npm install
```

Create a `.env` in the project root:

```env
EXPO_PUBLIC_API_URL=http://<YOUR_LAN_IP>:5000
```

Finding your LAN IP:
- **Windows**: `ipconfig` → look for IPv4 Address under Wi-Fi
- **macOS/Linux**: `ifconfig` or `hostname -I`

Use `10.0.2.2` for Android Emulator, `localhost` for Expo Web.

### 5. Run All Three Services

Open three separate terminals:

**Terminal 1 — Python ML Service:**
```bash
cd cropguard_api
python app.py
# Runs on port 10000
```

**Terminal 2 — Node Backend:**
```bash
cd CropGuard-Backend
node index.js
# Should log: "MongoDB Connected" and "Server running on port 5000"
```

**Terminal 3 — Expo App:**
```bash
npx expo start
# Scan the QR code with Expo Go on your phone (same Wi-Fi network)
```

---

## API Endpoints

### Node Backend (Port 5000)

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Create a new user account |
| POST | `/api/auth/login` | No | Login and receive JWT token |
| POST | `/api/detect` | JWT | Upload image for disease detection |
| GET | `/api/detect` | JWT | Fetch detection history for user |
| POST | `/api/support/issue` | JWT | Submit an issue report |
| POST | `/api/support/help` | JWT | Submit a help request |

### Python ML Service (Port 10000)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/predict/` | Single image inference |
| POST | `/predict_batch/` | Batch image inference |

**Prediction Response Format:**

```json
{
  "crop": "Tomato",
  "disease": "Early Blight",
  "confidence": 87.5,
  "recommendations": {
    "organic": [
      "Apply neem oil spray (2-3%) at weekly intervals",
      "Use Trichoderma-based bio-fungicide as soil drench"
    ],
    "chemical": [
      "Spray Mancozeb 75% WP at 2.5g/L at 10-day intervals",
      "Apply Chlorothalonil 75% WP at 2g/L as protective spray"
    ],
    "preventive": [
      "Practice 2-3 year crop rotation with non-solanaceous crops",
      "Remove and destroy infected plant debris after harvest"
    ]
  }
}
```

---

## Model Details

**Architecture:** MobileViT-XXS (Mobile Vision Transformer — Extra Extra Small)

MobileViT combines the strengths of CNNs (local feature extraction) and Vision Transformers (global context understanding) in a lightweight architecture suitable for mobile deployment. The custom implementation in `mobilevit.py` includes the full MobileViT block with local representation, transformer layers, and fusion mechanisms.

**Training Details:**
- All models trained for 10 epochs
- Each model is ~4.2 MB (optimized for mobile/edge deployment)
- Input: 224×224 RGB images with ImageNet normalization
- Crop identifier: 15-class output
- Disease models: Variable output classes per crop (3–10 classes each)

**Two-Stage Pipeline Rationale:**
A single 50-class model would need to distinguish between visually similar diseases across different crops. By first identifying the crop, we narrow the classification to only diseases that affect that specific crop — reducing confusion between look-alike diseases on different plants and improving per-crop accuracy.

---

## Known Limitations

- **Image Thumbnails in History**: Detection records synced from the server don't display thumbnail images (only the filename is stored server-side, not the image bytes). All detection data (crop, disease, confidence, treatments) is fully correct.
- **SMS Alerts**: Currently routed through the help request system rather than an actual SMS provider (Twilio integration not included).
- **Auth**: Functional JWT-based auth with bcrypt hashing; no email verification or password reset flow.

---

## Future Scope

- Real SMS/WhatsApp integration via Twilio for alert sharing
- Image storage (AWS S3 / Cloudinary) for persistent thumbnails in history
- Offline inference using on-device TFLite/ONNX model conversion
- Regional disease heatmap based on user detection data
- Weather-aware disease risk predictions
- Community features — farmers can share and discuss detections
- Email verification and password reset in auth flow
- Deployment packaging with Docker and CI/CD

---

## License

This project is developed for academic and educational purposes.
