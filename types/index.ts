export * from './user';
export * from './exercise';
export * from './workout';
export * from './consent';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface NotificationPreference {
  id: string;
  userId: string;
  workoutReminder: boolean;
  workoutReminderTime?: string; // "HH:mm"
  workoutReminderDays: string[];
  restDayReminder: boolean;
  measurementReminder: boolean;
  measurementReminderDay?: string;
  progressPhotoReminder: boolean;
  progressPhotoReminderInterval?: number; // days
  waterReminder: boolean;
  waterReminderIntervalMinutes?: number;
  educationalReminder: boolean;
  goalReminder: boolean;
  pushEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AIBodyAnalysis {
  id: string;
  userId: string;
  progressPhotoId: string;
  analyzedAt: string;
  imageQualityScore: number; // 0-100
  confidenceLevel: number; // 0-100
  overallAssessment: string;
  muscleGroups: MuscleGroupAnalysis[];
  symmetryScore?: number;
  proportionScore?: number;
  postureNotes?: string;
  weakPoints: string[];
  strengths: string[];
  trainingPriorities: string[];
  disclaimer: string;
  isEstimate: boolean;
}

export interface MuscleGroupAnalysis {
  muscleGroup: string;
  developmentLevel: 'underdeveloped' | 'developing' | 'balanced' | 'well_developed' | 'exceptional';
  score: number; // 1-10
  notes?: string;
  isPriority: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: 'free' | 'premium' | 'premium_plus';
  displayName: string;
  price: number;
  currency: string;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  isActive: boolean;
}
