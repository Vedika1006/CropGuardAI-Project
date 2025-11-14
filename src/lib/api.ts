// Mock API for disease detection

const mockDiseases = [
  {
    crop: 'Rice',
    disease: 'Leaf Blast',
    confidence: 92,
    treatments: {
      organic: ['Use neem oil spray', 'Apply Trichoderma viride', 'Improve drainage'],
      chemical: ['Apply Tricyclazole fungicide', 'Use Carbendazim', 'Spray Mancozeb'],
      preventive: ['Use resistant varieties', 'Maintain proper spacing', 'Avoid excess nitrogen'],
    },
  },
  {
    crop: 'Wheat',
    disease: 'Rust',
    confidence: 87,
    treatments: {
      organic: ['Use sulfur dust', 'Apply garlic extract', 'Improve air circulation'],
      chemical: ['Apply Propiconazole', 'Use Tebuconazole', 'Spray Azoxystrobin'],
      preventive: ['Plant resistant varieties', 'Remove infected plants', 'Crop rotation'],
    },
  },
  {
    crop: 'Tomato',
    disease: 'Late Blight',
    confidence: 95,
    treatments: {
      organic: ['Use copper spray', 'Apply Bacillus subtilis', 'Neem oil treatment'],
      chemical: ['Apply Chlorothalonil', 'Use Metalaxyl', 'Spray Mancozeb'],
      preventive: ['Avoid overhead watering', 'Improve ventilation', 'Remove infected leaves'],
    },
  },
  {
    crop: 'Cotton',
    disease: 'Bacterial Blight',
    confidence: 89,
    treatments: {
      organic: ['Use copper-based sprays', 'Apply compost tea', 'Neem cake application'],
      chemical: ['Apply Streptocycline', 'Use Copper oxychloride', 'Spray Validamycin'],
      preventive: ['Use disease-free seeds', 'Crop rotation', 'Maintain field hygiene'],
    },
  },
];

export const predictDisease = async (imageUri: string): Promise<{
  crop: string;
  disease: string;
  confidence: number;
  treatments: {
    organic: string[];
    chemical: string[];
    preventive: string[];
  };
}> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Return random mock disease
  const result = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
  
  return result;
};

export const sendSMSAlert = async (phoneNumber: string, message: string): Promise<boolean> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(`SMS sent to ${phoneNumber}: ${message}`);
  return true;
};
