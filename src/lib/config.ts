// Base URL of the CropGuard-Backend (Node/Express) API.
// Set EXPO_PUBLIC_API_URL in a .env file at the project root, e.g.:
//   EXPO_PUBLIC_API_URL=http://192.168.1.42:5000
// Use your machine's LAN IP, not localhost, when testing on a physical
// device via Expo Go (localhost on the phone means the phone itself).
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';
