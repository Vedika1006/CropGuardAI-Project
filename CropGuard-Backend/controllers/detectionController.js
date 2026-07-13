const axios = require('axios');
const FormData = require('form-data');
const Detection = require('../models/Detection');

/* ---------------------------------------------
   LOCAL AI — /predict/  (single file)
--------------------------------------------- */
const callLocalAI = async (imageBuffer, originalName) => {
  const LOCAL_URL = process.env.LOCAL_AI_URL; // http://10.10.118.118:10000/predict/

  const form = new FormData();
  form.append("file", imageBuffer, {
    filename: originalName || "image.jpg",
    contentType: "image/jpeg",
  });

  const response = await axios.post(LOCAL_URL, form, {
    headers: form.getHeaders(),
  });

  return response.data;
};


/* ---------------------------------------------
   MAIN DETECTION CONTROLLER
--------------------------------------------- */
const detectDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    console.log("🟢 Using LOCAL AI only:", process.env.LOCAL_AI_URL);

    // DIRECT LOCAL AI CALL ONLY
    const aiResult = await callLocalAI(req.file.buffer, req.file.originalname);

    console.log("✅ AI Prediction Received:", aiResult);

    const cropType =
      aiResult.crop_type || aiResult.cropType || aiResult.crop || "Unknown";
    const disease =
      aiResult.disease || aiResult.disease_name || "Unknown";

    const confidence =
      aiResult.confidence || aiResult.score || aiResult.probability || 0;

    const recommendations =
      aiResult.recommendations || {
        organic: ["No organic treatment specified."],
        chemical: ["No chemical treatment specified."],
        preventive: ["No preventive measures specified."],
      };

    const detectionEntry = await Detection.create({
      user: req.user._id,
      image: req.file.originalname,
      cropType,
      disease,
      confidence: parseFloat(confidence) || 0,
      recommendations,
    });

    return res.status(200).json(detectionEntry);

  } catch (error) {
    console.error("Detection Error:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


/* ---------------------------------------------
   HISTORY CONTROLLER
--------------------------------------------- */
const getDetectionHistory = async (req, res) => {
  try {
    const detections = await Detection.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(detections);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { detectDisease, getDetectionHistory };
