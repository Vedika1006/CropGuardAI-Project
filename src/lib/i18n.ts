import { Language } from '@/store/settingsStore';

type Translations = {
  [key: string]: {
    en: string;
    mr: string;
    hi: string;
  };
};

const translations: Translations = {
  welcome: {
    en: 'Welcome, Farmer',
    mr: 'स्वागत आहे, शेतकरी',
    hi: 'स्वागत है, किसान',
  },
  appTitle: {
    en: 'CropGuard AI',
    mr: 'क्रॉपगार्ड एआय',
    hi: 'क्रॉपगार्ड एआई',
  },
  capturePhoto: {
    en: 'Capture Photo',
    mr: 'फोटो काढा',
    hi: 'फोटो लें',
  },
  uploadFromGallery: {
    en: 'Upload from Gallery',
    mr: 'गॅलरीमधून अपलोड करा',
    hi: 'गैलरी से अपलोड करें',
  },
  home: {
    en: 'Home',
    mr: 'मुख्यपृष्ठ',
    hi: 'होम',
  },
  history: {
    en: 'History',
    mr: 'इतिहास',
    hi: 'इतिहास',
  },
  help: {
    en: 'Help',
    mr: 'मदत',
    hi: 'मदद',
  },
  settings: {
    en: 'Settings',
    mr: 'सेटिंग्ज',
    hi: 'सेटिंग्स',
  },
  login: {
    en: 'Login',
    mr: 'लॉगिन',
    hi: 'लॉगिन',
  },
  signup: {
    en: 'Sign Up',
    mr: 'साइन अप',
    hi: 'साइन अप',
  },
  email: {
    en: 'Email',
    mr: 'ईमेल',
    hi: 'ईमेल',
  },
  password: {
    en: 'Password',
    mr: 'पासवर्ड',
    hi: 'पासवर्ड',
  },
  name: {
    en: 'Name',
    mr: 'नाव',
    hi: 'नाम',
  },
  crop: {
    en: 'Crop',
    mr: 'पीक',
    hi: 'फसल',
  },
  disease: {
    en: 'Disease',
    mr: 'रोग',
    hi: 'रोग',
  },
  confidence: {
    en: 'Confidence',
    mr: 'आत्मविश्वास',
    hi: 'विश्वास',
  },
  voiceOutput: {
    en: 'Voice Output',
    mr: 'आवाज आउटपुट',
    hi: 'आवाज आउटपुट',
  },
  smsAlert: {
    en: 'SMS Alert',
    mr: 'एसएमएस अलर्ट',
    hi: 'एसएमएस अलर्ट',
  },
  sendAlert: {
    en: 'Send Alert',
    mr: 'अलर्ट पाठवा',
    hi: 'अलर्ट भेजें',
  },
  treatments: {
    en: 'Treatment Recommendations',
    mr: 'उपचार शिफारसी',
    hi: 'उपचार सिफारिशें',
  },
  organic: {
    en: 'Organic',
    mr: 'सेंद्रिय',
    hi: 'जैविक',
  },
  chemical: {
    en: 'Chemical',
    mr: 'रासायनिक',
    hi: 'रासायनिक',
  },
  preventive: {
    en: 'Preventive',
    mr: 'प्रतिबंधात्मक',
    hi: 'निवारक',
  },
  language: {
    en: 'Language',
    mr: 'भाषा',
    hi: 'भाषा',
  },
  voiceAssistance: {
    en: 'Voice Assistance',
    mr: 'आवाज सहाय्य',
    hi: 'आवाज सहायता',
  },
  about: {
    en: 'About',
    mr: 'बद्दल',
    hi: 'के बारे में',
  },
  reportIssue: {
    en: 'Report Issue',
    mr: 'समस्या अहवाल द्या',
    hi: 'समस्या रिपोर्ट करें',
  },
  requestExpertHelp: {
    en: 'Request Expert Help',
    mr: 'तज्ञ मदत विनंती',
    hi: 'विशेषज्ञ मदद का अनुरोध करें',
  },
};

export const t = (key: string, lang: Language): string => {
  return translations[key]?.[lang] || translations[key]?.en || key;
};
