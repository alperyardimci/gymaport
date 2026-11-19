export type MuscleGroup =
  | 'chest'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'back'
  | 'core'
  | 'quads'
  | 'hamstrings'
  | 'glutes'
  | 'adductors'
  | 'calves';

export type EquipmentType =
  | 'barbell'
  | 'dumbbell'
  | 'machine'
  | 'cable'
  | 'bodyweight'
  | 'resistance_band'
  | 'kettlebell'
  | 'ez_bar'
  | 'smith_machine'
  | 'pull_up_bar'
  | 'dip_bar'
  | 'bench'
  | 'incline_bench'
  | 'decline_bench';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type MovementPattern =
  | 'push'
  | 'pull'
  | 'squat'
  | 'hinge'
  | 'carry'
  | 'rotation'
  | 'isolation';

export type MuscleRegion =
  | 'upper_chest'
  | 'middle_chest'
  | 'lower_chest'
  | 'front_delt'
  | 'lateral_delt'
  | 'rear_delt'
  | 'biceps_long'
  | 'biceps_short'
  | 'triceps_long'
  | 'triceps_lateral'
  | 'triceps_medial'
  | 'brachialis'
  | 'forearm_flexors'
  | 'forearm_extensors'
  | 'traps_upper'
  | 'traps_middle'
  | 'traps_lower'
  | 'rhomboids'
  | 'lats'
  | 'teres_major'
  | 'erector_spinae'
  | 'lower_back'
  | 'upper_back'
  | 'rectus_abdominis'
  | 'obliques'
  | 'transverse_abdominis'
  | 'hip_flexors'
  | 'quads_rectus'
  | 'quads_vastus'
  | 'hamstrings_biceps'
  | 'hamstrings_semitendinosus'
  | 'glutes_max'
  | 'glutes_med'
  | 'adductors'
  | 'calves_gastrocnemius'
  | 'calves_soleus';

export interface ExerciseTranslation {
  name: string;
  description: string;
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
}

export interface Exercise {
  id: string;
  name: string;
  translations?: Partial<Record<string, ExerciseTranslation>>;
  muscleGroup: MuscleGroup;
  primaryMuscle: string;
  primaryRegion?: MuscleRegion;
  secondaryMuscles: string[];
  stabilizers?: string[];
  equipment: EquipmentType[];
  difficulty: DifficultyLevel;
  movementPattern: MovementPattern;
  isCompound: boolean;
  defaultSets: number;
  defaultReps: string; // "8-12", "12-15", "5", "30s"
  defaultRestSeconds: number;
  defaultTempo?: string; // "3-1-1-0"
  instructions: string[];
  tips: string[];
  commonMistakes: string[];
  safetyNotes?: string[];
  breathingCues?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  alternativeExercises?: string[]; // exercise ids
  progressionExercises?: string[]; // exercise ids for harder variation
  regressionExercises?: string[]; // exercise ids for easier variation
  tags: string[];
  category: string;
}
