export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';
export type UnitSystem = 'metric' | 'imperial';
export type TrainingExperience = 'beginner' | 'intermediate' | 'advanced';
export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
export type FitnessGoal =
  | 'muscle_hypertrophy'
  | 'strength'
  | 'fat_loss'
  | 'body_recomposition'
  | 'athletic_performance'
  | 'general_fitness'
  | 'weak_muscle_groups'
  | 'improve_posture'
  | 'improve_endurance'
  | 'lose_weight'
  | 'build_muscle'
  | 'increase_strength'
  | 'improve_flexibility'
  | 'sports_performance'
  | 'rehabilitation';

export type Language = 'en' | 'tr' | 'ru' | 'de' | 'it' | 'es' | 'ar';

export type TrainingDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type Equipment =
  | 'full_gym'
  | 'home_gym'
  | 'dumbbells'
  | 'barbell'
  | 'machines'
  | 'cables'
  | 'resistance_bands'
  | 'bodyweight';

export type TrainingSplit =
  | 'upper_lower'
  | 'split'
  | 'bro_split'
  | 'full_body'
  | 'push_pull_legs'
  | 'ai_recommended'
  | 'arnold_split'
  | 'custom';

export interface HealthRestriction {
  id: string;
  type: 'injury' | 'condition' | 'restriction';
  bodyPart?: string;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  age?: number;
  gender?: Gender;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FitnessProfile {
  id: string;
  userId: string;
  height: number; // cm
  weight: number; // kg
  unitSystem: UnitSystem;
  experience: TrainingExperience;
  yearsTraining?: number;
  activityLevel: ActivityLevel;
  goals: FitnessGoal[];
  primaryGoal: FitnessGoal;
  trainingDaysPerWeek: number;
  preferredDays: TrainingDay[];
  sessionDurationMinutes: number;
  preferredTime?: 'morning' | 'afternoon' | 'evening';
  equipment: Equipment[];
  trainingSplit: TrainingSplit;
  healthRestrictions: string[];
  hasConsultedDoctor: boolean;
  needsMedicalClearance: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BodyMeasurement {
  id: string;
  userId: string;
  date: string;
  weight?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  leftArm?: number;
  rightArm?: number;
  leftForearm?: number;
  rightForearm?: number;
  shoulders?: number;
  leftThigh?: number;
  rightThigh?: number;
  leftCalf?: number;
  rightCalf?: number;
  bodyFatPercentage?: number;
  notes?: string;
  createdAt: string;
}

export interface ProgressPhoto {
  id: string;
  userId: string;
  url: string;
  angle: 'front' | 'back' | 'side_left' | 'side_right';
  takenAt: string;
  isBaseline: boolean;
  notes?: string;
}

export interface User {
  id: string;
  email: string;
  phone?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  profile?: UserProfile;
  fitnessProfile?: FitnessProfile;
  language: Language;
  isOnboardingComplete: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}
