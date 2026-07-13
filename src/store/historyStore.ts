import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchDetectionHistory } from '@/lib/api';

export interface Detection {
  id: string;
  crop: string;
  disease: string;
  confidence: number;
  imageUrl: string;
  date: Date;
  treatments: {
    organic: string[];
    chemical: string[];
    preventive: string[];
  };
}

interface HistoryState {
  detections: Detection[];
  addDetection: (detection: Omit<Detection, 'id' | 'date'>) => void;
  syncHistory: () => Promise<void>;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      detections: [],
      addDetection: (detection) => {
        const newDetection: Detection = {
          ...detection,
          id: Date.now().toString(),
          date: new Date(),
        };
        set((state) => ({
          detections: [newDetection, ...state.detections],
        }));
      },
      syncHistory: async () => {
        // Pulls the authoritative history from the backend (per logged-in user)
        // so detections persist across reinstalls/devices, not just this store.
        const records = await fetchDetectionHistory();
        set({
          detections: records.map((record) => ({
            id: record._id,
            crop: record.cropType,
            disease: record.disease,
            confidence: record.confidence,
            imageUrl: '',
            date: new Date(record.createdAt),
            treatments: record.recommendations,
          })),
        });
      },
      clearHistory: () => set({ detections: [] }),
    }),
    {
      name: 'history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
