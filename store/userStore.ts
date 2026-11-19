import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProfile, FitnessProfile, BodyMeasurement, ProgressPhoto } from '@/types';

const PROFILE_KEY = '@gymaport_profile';
const FITNESS_KEY = '@gymaport_fitness';

interface UserState {
  profile: UserProfile | null;
  fitnessProfile: FitnessProfile | null;
  measurements: BodyMeasurement[];
  progressPhotos: ProgressPhoto[];
  isLoading: boolean;

  setProfile: (profile: Partial<UserProfile>) => void;
  setFitnessProfile: (fp: Partial<FitnessProfile>) => void;
  addMeasurement: (m: BodyMeasurement) => void;
  addProgressPhoto: (p: ProgressPhoto) => void;
  deleteProgressPhoto: (id: string) => void;
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
  clearUserData: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  fitnessProfile: null,
  measurements: [],
  progressPhotos: [],
  isLoading: false,

  setProfile: (profile) => {
    set((state) => ({
      profile: state.profile ? { ...state.profile, ...profile } : (profile as UserProfile),
    }));
    get().saveToStorage();
  },

  setFitnessProfile: (fp) => {
    set((state) => ({
      fitnessProfile: state.fitnessProfile
        ? { ...state.fitnessProfile, ...fp }
        : (fp as FitnessProfile),
    }));
    get().saveToStorage();
  },

  addMeasurement: (m) => {
    set((state) => ({ measurements: [m, ...state.measurements] }));
    get().saveToStorage();
  },

  addProgressPhoto: (p) => {
    set((state) => ({ progressPhotos: [p, ...state.progressPhotos] }));
    get().saveToStorage();
  },

  deleteProgressPhoto: (id) => {
    set((state) => ({ progressPhotos: state.progressPhotos.filter((p) => p.id !== id) }));
    get().saveToStorage();
  },

  loadFromStorage: async () => {
    set({ isLoading: true });
    try {
      const [profileStr, fitnessStr] = await Promise.all([
        AsyncStorage.getItem(PROFILE_KEY),
        AsyncStorage.getItem(FITNESS_KEY),
      ]);
      if (profileStr) set({ profile: JSON.parse(profileStr) });
      if (fitnessStr) set({ fitnessProfile: JSON.parse(fitnessStr) });
    } catch {
      // Silently fail
    } finally {
      set({ isLoading: false });
    }
  },

  saveToStorage: async () => {
    const { profile, fitnessProfile } = get();
    try {
      await Promise.all([
        profile ? AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile)) : Promise.resolve(),
        fitnessProfile ? AsyncStorage.setItem(FITNESS_KEY, JSON.stringify(fitnessProfile)) : Promise.resolve(),
      ]);
    } catch {
      // Silently fail
    }
  },

  clearUserData: () => {
    set({ profile: null, fitnessProfile: null, measurements: [], progressPhotos: [] });
    AsyncStorage.multiRemove([PROFILE_KEY, FITNESS_KEY]);
  },
}));
