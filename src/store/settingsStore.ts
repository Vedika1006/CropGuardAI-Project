import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'en' | 'mr' | 'hi';

interface SettingsState {
  language: Language;
  voiceAssistance: boolean;
  setLanguage: (language: Language) => void;
  toggleVoiceAssistance: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'en',
      voiceAssistance: true,
      setLanguage: (language) => set({ language }),
      toggleVoiceAssistance: () =>
        set((state) => ({ voiceAssistance: !state.voiceAssistance })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
