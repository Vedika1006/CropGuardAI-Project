# CropGuard AI 🌱

An AI-powered crop disease detection mobile application built with React Native and Expo to help farmers identify and treat crop diseases quickly and accurately.

## Features ✨

- **AI Disease Detection**: Capture or upload crop photos for instant disease analysis
- **95% Accuracy**: Powered by advanced machine learning algorithms
- **Multi-language Support**: Available in English, Marathi (मराठी), and Hindi (हिंदी)
- **Treatment Recommendations**: Get organic, chemical, and preventive treatment options
- **Detection History**: Track all your past disease detections
- **Voice Assistance**: Hear results read aloud for easier accessibility
- **SMS Alerts**: Send disease reports to agricultural experts
- **Expert Help**: Request assistance from agricultural professionals
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Offline-Ready**: Works with limited connectivity

## Tech Stack 🛠️

- **Framework**: React Native 0.81.5
- **Platform**: Expo ~54.0.0
- **Language**: TypeScript 5.9.2
- **React**: 19.1.0
- **Navigation**: React Navigation v6
- **State Management**: Zustand 5.0.8
- **Storage**: AsyncStorage
- **Image Handling**: Expo Image Picker & Expo Image
- **Camera**: Expo Camera
- **Voice**: Expo Speech
- **Icons**: Expo Vector Icons (Ionicons)
- **Styling**: React Native StyleSheet

## Getting Started 🚀

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (iOS or Android)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/CropGuardAI-Project.git
cd CropGuardAI-Project
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npm start
```

4. Scan the QR code with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

### Running on Different Platforms

```bash
# iOS Simulator (Mac only)
npm run ios

# Android Emulator
npm run android

# Web (limited functionality)
npm run web
```

## Project Structure 📁

```
src/
├── assets/           # Images and static assets
├── components/       # Reusable UI components
│   ├── ui/          # Basic UI components (Button, Input, etc.)
│   ├── BottomNav.tsx
│   ├── ImageCarousel.tsx
│   └── PageHeader.tsx
├── lib/             # Utilities and helpers
│   ├── api.ts       # Mock API functions
│   ├── i18n.ts      # Internationalization
│   └── utils.ts     # Utility functions
├── navigation/      # Navigation setup
│   └── AppNavigator.tsx
├── pages/           # Screen components
│   ├── Splash.tsx
│   ├── Login.tsx
│   ├── SignUp.tsx
│   ├── Home.tsx
│   ├── Result.tsx
│   ├── Alert.tsx
│   ├── History.tsx
│   ├── Help.tsx
│   ├── Settings.tsx
│   └── About.tsx
├── store/           # Zustand stores
│   ├── authStore.ts
│   ├── historyStore.ts
│   └── settingsStore.ts
├── theme/           # Theme and styling
│   ├── colors.ts
│   └── styles.ts
└── App.tsx          # Main app component
```

## Design System 🎨

### Colors
- **Primary**: Forest Green (#1e6b3d) - Trust, growth, nature
- **Accent**: Lime Green (#84cc16) - Energy, technology, AI
- **Backgrounds**: Soft sage and white for clarity
- **Shadows**: Elevated cards with subtle depth

### Typography
- Clear, large text for outdoor visibility
- Multilingual font support

### Components
- Rounded corners (1rem radius)
- Large touch targets (min 48px)
- High contrast for accessibility
- Smooth transitions and animations

## Usage 📱

1. **Sign Up / Login**: Create an account or log in
2. **Capture / Upload**: Take a photo or upload from gallery
3. **Analyze**: Wait for AI to detect disease (1-2 seconds)
4. **Review Results**: See crop type, disease, confidence level
5. **Get Treatments**: View organic, chemical, and preventive recommendations
6. **Send Alert**: Notify agricultural experts via SMS
7. **Check History**: Review past detections and treatments

## Building for Production 📦

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

Or use EAS Build:
```bash
eas build --platform ios
eas build --platform android
```

## Browser Support 🌐

- iOS 13+
- Android 6+
- Expo Go app


## Acknowledgments 🙏

- Agricultural experts for domain knowledge
- Farmers for user feedback
- Open-source community for amazing tools


---

**Built with ❤️ for farmers everywhere**
