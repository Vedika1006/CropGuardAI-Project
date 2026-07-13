# TensorFlow Lite (TFLite) Conversion Guide

## Overview
This guide explains how to convert your crop disease detection model to TFLite format for mobile deployment.

## Prerequisites
- Python 3.7+
- TensorFlow 2.x installed
- Your trained model file (`.h5`, `.pb`, SavedModel, or Keras model)

## Installation

```bash
pip install tensorflow
# Or for TensorFlow Lite specifically:
pip install tensorflow-lite
```

## Conversion Methods

### Method 1: Convert from Keras/H5 Model

```python
import tensorflow as tf

# Load your Keras model
model = tf.keras.models.load_model('your_model.h5')

# Convert to TFLite
converter = tf.lite.TFLiteConverter.from_keras_model(model)

# Optional: Optimize for size/speed
converter.optimizations = [tf.lite.Optimize.DEFAULT]

# Optional: Set target specs for mobile
converter.target_spec.supported_types = [tf.float16]  # For smaller model size

# Convert
tflite_model = converter.convert()

# Save the TFLite model
with open('model.tflite', 'wb') as f:
    f.write(tflite_model)

print("✅ Model converted to TFLite successfully!")
print(f"Model size: {len(tflite_model) / 1024 / 1024:.2f} MB")
```

### Method 2: Convert from SavedModel

```python
import tensorflow as tf

# Convert from SavedModel
converter = tf.lite.TFLiteConverter.from_saved_model('path/to/saved_model')

# Apply optimizations
converter.optimizations = [tf.lite.Optimize.DEFAULT]

# Convert
tflite_model = converter.convert()

# Save
with open('model.tflite', 'wb') as f:
    f.write(tflite_model)
```

### Method 3: Convert from Concrete Function (TF 2.x)

```python
import tensorflow as tf

# Load model and get concrete function
model = tf.saved_model.load('path/to/model')
concrete_func = model.signatures[tf.saved_model.DEFAULT_SERVING_SIGNATURE_DEF_KEY]

# Set input shape if needed
concrete_func.inputs[0].set_shape([1, 224, 224, 3])  # Example: batch, height, width, channels

# Convert
converter = tf.lite.TFLiteConverter.from_concrete_functions([concrete_func])
tflite_model = converter.convert()

# Save
with open('model.tflite', 'wb') as f:
    f.write(tflite_model)
```

## Advanced Optimizations

### 1. Quantization (Reduce Model Size)

```python
converter = tf.lite.TFLiteConverter.from_keras_model(model)

# Post-training quantization (INT8)
converter.optimizations = [tf.lite.Optimize.DEFAULT]

# For full INT8 quantization, provide representative dataset
def representative_dataset():
    # Provide sample images from your training data
    for i in range(100):
        yield [np.random.rand(1, 224, 224, 3).astype(np.float32)]

converter.representative_dataset = representative_dataset
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
converter.inference_input_type = tf.uint8
converter.inference_output_type = tf.uint8

tflite_model = converter.convert()
```

### 2. Float16 Quantization (Balance between size and accuracy)

```python
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_types = [tf.float16]

tflite_model = converter.convert()
```

## Testing the TFLite Model

```python
import tensorflow as tf
import numpy as np

# Load TFLite model
interpreter = tf.lite.Interpreter(model_path="model.tflite")
interpreter.allocate_tensors()

# Get input and output tensors
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Prepare input data
input_shape = input_details[0]['shape']
input_data = np.array(np.random.random_sample(input_shape), dtype=np.float32)

# Run inference
interpreter.set_tensor(input_details[0]['index'], input_data)
interpreter.invoke()

# Get output
output_data = interpreter.get_tensor(output_details[0]['index'])
print("Prediction:", output_data)
```

## Using TFLite in React Native

### Install TensorFlow Lite for React Native

```bash
npm install @tensorflow/tfjs-react-native
npm install @tensorflow/tfjs-platform-react-native
npm install react-native-fs
```

### Load and Use TFLite Model

```typescript
import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

// Load the model
const model = await tf.loadLayersModel(
  bundleResourceIO('model.tflite')
);

// Preprocess image
const imageTensor = tf.browser.fromPixels(image);
const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);
const normalized = resized.div(255.0);
const batched = normalized.expandDims(0);

// Run prediction
const prediction = model.predict(batched);
const result = await prediction.data();
```

## Common Issues and Solutions

### Issue: Model too large
**Solution**: Use quantization (INT8 or Float16)

### Issue: Input shape mismatch
**Solution**: Ensure input shape matches training:
```python
concrete_func.inputs[0].set_shape([1, 224, 224, 3])
```

### Issue: Unsupported operations
**Solution**: Check TFLite supported ops and modify model if needed

## Model Optimization Tips

1. **Use MobileNet or EfficientNet** - Already optimized for mobile
2. **Apply Quantization** - Reduces model size by 4x (INT8) or 2x (Float16)
3. **Remove unnecessary layers** - Strip training-only layers
4. **Use TensorFlow Lite Model Maker** - For creating mobile-optimized models

## Example: Complete Conversion Script

```python
import tensorflow as tf
import numpy as np

def convert_to_tflite(model_path, output_path, quantize=True):
    """
    Convert a Keras model to TFLite format
    
    Args:
        model_path: Path to input model (.h5 or SavedModel)
        output_path: Path to save TFLite model
        quantize: Whether to apply quantization
    """
    # Load model
    print(f"Loading model from {model_path}...")
    model = tf.keras.models.load_model(model_path)
    
    # Create converter
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    
    if quantize:
        print("Applying optimizations...")
        converter.optimizations = [tf.lite.Optimize.DEFAULT]
        converter.target_spec.supported_types = [tf.float16]
    
    # Convert
    print("Converting to TFLite...")
    tflite_model = converter.convert()
    
    # Save
    with open(output_path, 'wb') as f:
        f.write(tflite_model)
    
    size_mb = len(tflite_model) / 1024 / 1024
    print(f"✅ Conversion complete!")
    print(f"📦 Model saved to: {output_path}")
    print(f"📏 Model size: {size_mb:.2f} MB")
    
    return tflite_model

# Usage
if __name__ == "__main__":
    convert_to_tflite(
        model_path='crop_disease_model.h5',
        output_path='crop_disease_model.tflite',
        quantize=True
    )
```

## Next Steps

1. Test the TFLite model with sample images
2. Integrate into your React Native app
3. Optimize further if needed (quantization, pruning)
4. Deploy to mobile devices

## Resources

- [TensorFlow Lite Documentation](https://www.tensorflow.org/lite)
- [TFLite Converter Guide](https://www.tensorflow.org/lite/convert)
- [React Native TensorFlow.js](https://github.com/tensorflow/tfjs/tree/master/tfjs-react-native)

