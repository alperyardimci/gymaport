import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { WorkoutProgram, WorkoutSession, ActiveWorkout, PersonalRecord } from '@/types';

const PROGRAM_KEY = '@gymaport_program';
const HISTORY_KEY = '@gymaport_history';

interface WorkoutState {
  activeProgram: WorkoutProgram | null;
  sessionHistory: WorkoutSession[];
  personalRecords: PersonalRecord[];
  activeWorkout: ActiveWorkout | null;
  isWorkoutActive: boolean;

  setActiveProgram: (program: WorkoutProgram) => void;
  startWorkout: (workout: ActiveWorkout) => void;
  updateActiveWorkout: (updates: Partial<ActiveWorkout>) => void;
  completeWorkout: (session: WorkoutSession) => void;
  cancelWorkout: () => void;
  addPersonalRecord: (pr: PersonalRecord) => void;
  loadFromStorage: () => Promise<void>;
  clearWorkoutData: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set, get) => ({
  activeProgram: null,
  sessionHistory: [],
  personalRecords: [],
  activeWorkout: null,
  isWorkoutActive: false,

  setActiveProgram: (program) => {
    set({ activeProgram: program });
    AsyncStorage.setItem(PROGRAM_KEY, JSON.stringify(program));
  },

  startWorkout: (workout) => set({ activeWorkout: workout, isWorkoutActive: true }),

  updateActiveWorkout: (updates) => {
    set((state) => ({
      activeWorkout: state.activeWorkout ? { ...state.activeWorkout, ...updates } : null,
    }));
  },

  completeWorkout: (session) => {
    set((state) => ({
      sessionHistory: [session, ...state.sessionHistory],
      activeWorkout: null,
      isWorkoutActive: false,
    }));
    const history = [session, ...get().sessionHistory];
    AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 200)));
  },

  cancelWorkout: () => set({ activeWorkout: null, isWorkoutActive: false }),

  addPersonalRecord: (pr) => {
    set((state) => ({
      personalRecords: [pr, ...state.personalRecords.filter((r) => r.exerciseId !== pr.exerciseId || r.type !== pr.type)],
    }));
  },

  loadFromStorage: async () => {
    try {
      const [programStr, historyStr] = await Promise.all([
        AsyncStorage.getItem(PROGRAM_KEY),
        AsyncStorage.getItem(HISTORY_KEY),
      ]);
      if (programStr) set({ activeProgram: JSON.parse(programStr) });
      if (historyStr) set({ sessionHistory: JSON.parse(historyStr) });
    } catch {
      // Silently fail
    }
  },

  clearWorkoutData: () => {
    set({ activeProgram: null, sessionHistory: [], personalRecords: [], activeWorkout: null, isWorkoutActive: false });
    AsyncStorage.multiRemove([PROGRAM_KEY, HISTORY_KEY]);
  },
}));
