import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      clearHistory: () => set({ detections: [] }),
    }),
    {
      name: 'history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
