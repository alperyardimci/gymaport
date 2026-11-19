import { TrainingSplit } from './user';

export type WorkoutStatus = 'scheduled' | 'active' | 'completed' | 'skipped' | 'rest';

export interface WorkoutSet {
  id: string;
  setNumber: number;
  targetReps?: string;
  actualReps?: number;
  weight?: number; // kg
  rir?: number; // Reps in Reserve (0-5)
  rpe?: number; // Rate of Perceived Exertion (1-10)
  isWarmup: boolean;
  isDropset: boolean;
  completed: boolean;
  notes?: string;
  restSeconds?: number;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  muscleGroup: string;
  order: number;
  sets: WorkoutSet[];
  notes?: string;
  substitutedFrom?: string; // original exercise id
  isSuperset?: boolean;
  supersetGroupId?: string;
}

export interface WorkoutDay {
  id: string;
  programId: string;
  dayNumber: number;
  name: string;
  focus: string; // "Upper Body", "Push", "Legs", etc.
  dayOfWeek?: string;
  exercises: WorkoutExercise[];
  estimatedDurationMinutes: number;
  isRestDay: boolean;
  notes?: string;
}

export interface WorkoutProgram {
  id: string;
  userId: string;
  name: string;
  description?: string;
  split: TrainingSplit;
  daysPerWeek: number;
  durationWeeks: number;
  difficulty: string;
  goal: string;
  days: WorkoutDay[];
  isAIGenerated: boolean;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutSession {
  id: string;
  userId: string;
  programId?: string;
  workoutDayId?: string;
  name: string;
  startTime: string;
  endTime?: string;
  durationSeconds?: number;
  exercises: WorkoutExercise[];
  totalSets: number;
  totalReps: number;
  totalVolumeKg: number;
  estimatedCalories?: number;
  rating?: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  mood?: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  status: WorkoutStatus;
  personalRecords: PersonalRecord[];
  createdAt: string;
}

export interface PersonalRecord {
  id: string;
  userId: string;
  exerciseId: string;
  exerciseName: string;
  type: 'max_weight' | 'max_reps' | 'max_volume' | 'max_1rm';
  value: number;
  unit: 'kg' | 'reps' | 'kg_total';
  sessionId: string;
  date: string;
  previousValue?: number;
  improvement?: number;
  createdAt: string;
}

export interface ActiveWorkout {
  sessionId: string;
  startTime: string;
  currentExerciseIndex: number;
  currentSetIndex: number;
  exercises: WorkoutExercise[];
  isRestTimerActive: boolean;
  restTimeRemaining: number;
  restTimerDuration: number;
  elapsedSeconds: number;
  isPaused: boolean;
}

export interface WeeklySchedule {
  monday: WorkoutDay | null;
  tuesday: WorkoutDay | null;
  wednesday: WorkoutDay | null;
  thursday: WorkoutDay | null;
  friday: WorkoutDay | null;
  saturday: WorkoutDay | null;
  sunday: WorkoutDay | null;
}
