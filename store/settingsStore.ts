import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Language } from '@/types';
import { changeLanguage } from '@/i18n';

const SETTINGS_KEY = '@gymaport_settings';

interface SettingsState {
  language: Language;
  unitSystem: 'metric' | 'imperial';
  darkMode: boolean;
  workoutReminderEnabled: boolean;
  workoutReminderTime: string;
  workoutReminderDays: string[];
  measurementReminderEnabled: boolean;
  photoReminderEnabled: boolean;
  pushEnabled: boolean;

  setLanguage: (lang: Language) => Promise<void>;
  setUnitSystem: (unit: 'metric' | 'imperial') => void;
  toggleDarkMode: () => void;
  setWorkoutReminder: (enabled: boolean, time?: string, days?: string[]) => void;
  setPushEnabled: (enabled: boolean) => void;
  loadFromStorage: () => Promise<void>;
  save: () => Promise<void>;
}

const defaults: Omit<SettingsState, 'setLanguage' | 'setUnitSystem' | 'toggleDarkMode' | 'setWorkoutReminder' | 'setPushEnabled' | 'loadFromStorage' | 'save'> = {
  language: 'en',
  unitSystem: 'metric',
  darkMode: true,
  workoutReminderEnabled: false,
  workoutReminderTime: '08:00',
  workoutReminderDays: ['monday', 'wednesday', 'friday'],
  measurementReminderEnabled: false,
  photoReminderEnabled: false,
  pushEnabled: false,
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  ...defaults,

  setLanguage: async (lang) => {
    set({ language: lang });
    await changeLanguage(lang);
    get().save();
  },

  setUnitSystem: (unit) => { set({ unitSystem: unit }); get().save(); },
  toggleDarkMode: () => { set((s) => ({ darkMode: !s.darkMode })); get().save(); },

  setWorkoutReminder: (enabled, time, days) => {
    set({
      workoutReminderEnabled: enabled,
      workoutReminderTime: time ?? get().workoutReminderTime,
      workoutReminderDays: days ?? get().workoutReminderDays,
    });
    get().save();
  },

  setPushEnabled: (enabled) => { set({ pushEnabled: enabled }); get().save(); },

  loadFromStorage: async () => {
    try {
      const str = await AsyncStorage.getItem(SETTINGS_KEY);
      if (str) set({ ...defaults, ...JSON.parse(str) });
    } catch {
      // Silently fail
    }
  },

  save: async () => {
    const { setLanguage, setUnitSystem, toggleDarkMode, setWorkoutReminder, setPushEnabled, loadFromStorage, save, ...data } = get();
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
  },
}));
