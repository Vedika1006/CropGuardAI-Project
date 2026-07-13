// Real API client for the CropGuard-Backend (Node/Express) service.

import { API_BASE_URL } from '@/lib/config';
import { useAuthStore } from '@/store/authStore';

const authHeaders = (): Record<string, string> => {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

interface Treatments {
  organic: string[];
  chemical: string[];
  preventive: string[];
}

interface DetectionResult {
  crop: string;
  disease: string;
  confidence: number;
  treatments: Treatments;
}

export const predictDisease = async (imageUri: string): Promise<DetectionResult> => {
  const filename = imageUri.split('/').pop() || 'photo.jpg';
  const extMatch = /\.(\w+)$/.exec(filename);
  const ext = extMatch ? extMatch[1].toLowerCase() : 'jpg';
  const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg';

  const formData = new FormData();
  // React Native's FormData accepts this { uri, name, type } shape for file uploads.
  formData.append('image', {
    uri: imageUri,
    name: filename,
    type: mimeType,
  } as unknown as Blob);

  const response = await fetch(`${API_BASE_URL}/api/detect`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      // Do not set Content-Type manually — fetch sets the multipart boundary automatically.
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || 'Disease detection failed');
  }

  return {
    crop: data.cropType,
    disease: data.disease,
    confidence: data.confidence,
    treatments: data.recommendations,
  };
};

export const fetchDetectionHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/api/detect`, {
    headers: { ...authHeaders() },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || 'Failed to load history');
  }
  return data as Array<{
    _id: string;
    cropType: string;
    disease: string;
    confidence: number;
    recommendations: Treatments;
    createdAt: string;
  }>;
};

export const submitIssueReport = async (title: string, description: string) => {
  const response = await fetch(`${API_BASE_URL}/api/support/issue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ title, description }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || 'Failed to submit issue report');
  }
  return data;
};

export const submitHelpRequest = async (title: string, description: string) => {
  const response = await fetch(`${API_BASE_URL}/api/support/help`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ title, description }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || 'Failed to submit help request');
  }
  return data;
};

// There is no SMS provider wired up on the backend yet (no Twilio/etc.).
// This routes the alert through the expert-help-request endpoint so it's at
// least persisted and visible to whoever handles HelpRequest records, rather
// than being a pure no-op mock.
export const sendSMSAlert = async (phoneNumber: string, message: string): Promise<boolean> => {
  await submitHelpRequest(
    `SMS Alert Request: ${phoneNumber}`,
    message
  );
  return true;
};
