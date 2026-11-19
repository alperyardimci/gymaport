import type { WorkoutProgram } from '@/types';

export const TRAINING_TEMPLATES: Partial<WorkoutProgram>[] = [
  {
    id: 'ppl-6day',
    name: 'Push / Pull / Legs — 6 Day',
    description: 'Classic PPL split for intermediate to advanced lifters training 6 days per week.',
    split: 'push_pull_legs',
    daysPerWeek: 6,
    durationWeeks: 12,
    difficulty: 'intermediate',
    goal: 'muscle_hypertrophy',
    days: [
      {
        id: 'ppl-push-1',
        programId: '',
        dayNumber: 1,
        name: 'Push A',
        focus: 'Chest, Shoulders, Triceps',
        exercises: [
          { id: 'we1', exerciseId: 'flat-barbell-bench-press', exerciseName: 'Flat Barbell Bench Press', muscleGroup: 'chest', order: 1, sets: [{ id: 's1', setNumber: 1, targetReps: '5-6', isWarmup: false, isDropset: false, completed: false }, { id: 's2', setNumber: 2, targetReps: '5-6', isWarmup: false, isDropset: false, completed: false }, { id: 's3', setNumber: 3, targetReps: '5-6', isWarmup: false, isDropset: false, completed: false }, { id: 's4', setNumber: 4, targetReps: '5-6', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we2', exerciseId: 'incline-dumbbell-press', exerciseName: 'Incline Dumbbell Press', muscleGroup: 'chest', order: 2, sets: [{ id: 's5', setNumber: 1, targetReps: '8-10', isWarmup: false, isDropset: false, completed: false }, { id: 's6', setNumber: 2, targetReps: '8-10', isWarmup: false, isDropset: false, completed: false }, { id: 's7', setNumber: 3, targetReps: '8-10', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we3', exerciseId: 'cable-fly-mid', exerciseName: 'Cable Fly', muscleGroup: 'chest', order: 3, sets: [{ id: 's8', setNumber: 1, targetReps: '12-15', isWarmup: false, isDropset: false, completed: false }, { id: 's9', setNumber: 2, targetReps: '12-15', isWarmup: false, isDropset: false, completed: false }, { id: 's10', setNumber: 3, targetReps: '12-15', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we4', exerciseId: 'overhead-barbell-press', exerciseName: 'Overhead Press', muscleGroup: 'shoulders', order: 4, sets: [{ id: 's11', setNumber: 1, targetReps: '6-8', isWarmup: false, isDropset: false, completed: false }, { id: 's12', setNumber: 2, targetReps: '6-8', isWarmup: false, isDropset: false, completed: false }, { id: 's13', setNumber: 3, targetReps: '6-8', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we5', exerciseId: 'lateral-raise', exerciseName: 'Lateral Raise', muscleGroup: 'shoulders', order: 5, sets: [{ id: 's14', setNumber: 1, targetReps: '15-20', isWarmup: false, isDropset: false, completed: false }, { id: 's15', setNumber: 2, targetReps: '15-20', isWarmup: false, isDropset: false, completed: false }, { id: 's16', setNumber: 3, targetReps: '15-20', isWarmup: false, isDropset: false, completed: false }, { id: 's17', setNumber: 4, targetReps: '15-20', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we6', exerciseId: 'cable-pushdown', exerciseName: 'Triceps Pushdown', muscleGroup: 'triceps', order: 6, sets: [{ id: 's18', setNumber: 1, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }, { id: 's19', setNumber: 2, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }, { id: 's20', setNumber: 3, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we7', exerciseId: 'overhead-triceps-extension', exerciseName: 'Overhead Triceps Extension', muscleGroup: 'triceps', order: 7, sets: [{ id: 's21', setNumber: 1, targetReps: '10-15', isWarmup: false, isDropset: false, completed: false }, { id: 's22', setNumber: 2, targetReps: '10-15', isWarmup: false, isDropset: false, completed: false }, { id: 's23', setNumber: 3, targetReps: '10-15', isWarmup: false, isDropset: false, completed: false }] },
        ],
        estimatedDurationMinutes: 75,
        isRestDay: false,
      },
      {
        id: 'ppl-pull-1',
        programId: '',
        dayNumber: 2,
        name: 'Pull A',
        focus: 'Back, Biceps, Rear Delts',
        exercises: [
          { id: 'we8', exerciseId: 'pull-up', exerciseName: 'Pull-Up', muscleGroup: 'back', order: 1, sets: [{ id: 's24', setNumber: 1, targetReps: '6-8', isWarmup: false, isDropset: false, completed: false }, { id: 's25', setNumber: 2, targetReps: '6-8', isWarmup: false, isDropset: false, completed: false }, { id: 's26', setNumber: 3, targetReps: '6-8', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we9', exerciseId: 'barbell-row', exerciseName: 'Barbell Row', muscleGroup: 'back', order: 2, sets: [{ id: 's27', setNumber: 1, targetReps: '6-10', isWarmup: false, isDropset: false, completed: false }, { id: 's28', setNumber: 2, targetReps: '6-10', isWarmup: false, isDropset: false, completed: false }, { id: 's29', setNumber: 3, targetReps: '6-10', isWarmup: false, isDropset: false, completed: false }, { id: 's30', setNumber: 4, targetReps: '6-10', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we10', exerciseId: 'seated-cable-row', exerciseName: 'Seated Cable Row', muscleGroup: 'back', order: 3, sets: [{ id: 's31', setNumber: 1, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }, { id: 's32', setNumber: 2, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }, { id: 's33', setNumber: 3, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we11', exerciseId: 'face-pull', exerciseName: 'Face Pull', muscleGroup: 'shoulders', order: 4, sets: [{ id: 's34', setNumber: 1, targetReps: '15-20', isWarmup: false, isDropset: false, completed: false }, { id: 's35', setNumber: 2, targetReps: '15-20', isWarmup: false, isDropset: false, completed: false }, { id: 's36', setNumber: 3, targetReps: '15-20', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we12', exerciseId: 'barbell-curl', exerciseName: 'Barbell Curl', muscleGroup: 'biceps', order: 5, sets: [{ id: 's37', setNumber: 1, targetReps: '8-10', isWarmup: false, isDropset: false, completed: false }, { id: 's38', setNumber: 2, targetReps: '8-10', isWarmup: false, isDropset: false, completed: false }, { id: 's39', setNumber: 3, targetReps: '8-10', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we13', exerciseId: 'hammer-curl', exerciseName: 'Hammer Curl', muscleGroup: 'biceps', order: 6, sets: [{ id: 's40', setNumber: 1, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }, { id: 's41', setNumber: 2, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }, { id: 's42', setNumber: 3, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }] },
        ],
        estimatedDurationMinutes: 70,
        isRestDay: false,
      },
      {
        id: 'ppl-legs-1',
        programId: '',
        dayNumber: 3,
        name: 'Legs A',
        focus: 'Quads, Hamstrings, Glutes, Calves',
        exercises: [
          { id: 'we14', exerciseId: 'barbell-squat', exerciseName: 'Barbell Squat', muscleGroup: 'quads', order: 1, sets: [{ id: 's43', setNumber: 1, targetReps: '5-6', isWarmup: false, isDropset: false, completed: false }, { id: 's44', setNumber: 2, targetReps: '5-6', isWarmup: false, isDropset: false, completed: false }, { id: 's45', setNumber: 3, targetReps: '5-6', isWarmup: false, isDropset: false, completed: false }, { id: 's46', setNumber: 4, targetReps: '5-6', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we15', exerciseId: 'romanian-deadlift', exerciseName: 'Romanian Deadlift', muscleGroup: 'hamstrings', order: 2, sets: [{ id: 's47', setNumber: 1, targetReps: '8-10', isWarmup: false, isDropset: false, completed: false }, { id: 's48', setNumber: 2, targetReps: '8-10', isWarmup: false, isDropset: false, completed: false }, { id: 's49', setNumber: 3, targetReps: '8-10', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we16', exerciseId: 'leg-press', exerciseName: 'Leg Press', muscleGroup: 'quads', order: 3, sets: [{ id: 's50', setNumber: 1, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }, { id: 's51', setNumber: 2, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }, { id: 's52', setNumber: 3, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we17', exerciseId: 'leg-curl', exerciseName: 'Leg Curl', muscleGroup: 'hamstrings', order: 4, sets: [{ id: 's53', setNumber: 1, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }, { id: 's54', setNumber: 2, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }, { id: 's55', setNumber: 3, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we18', exerciseId: 'hip-thrust', exerciseName: 'Hip Thrust', muscleGroup: 'glutes', order: 5, sets: [{ id: 's56', setNumber: 1, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }, { id: 's57', setNumber: 2, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }, { id: 's58', setNumber: 3, targetReps: '10-12', isWarmup: false, isDropset: false, completed: false }] },
          { id: 'we19', exerciseId: 'standing-calf-raise', exerciseName: 'Standing Calf Raise', muscleGroup: 'calves', order: 6, sets: [{ id: 's59', setNumber: 1, targetReps: '15-20', isWarmup: false, isDropset: false, completed: false }, { id: 's60', setNumber: 2, targetReps: '15-20', isWarmup: false, isDropset: false, completed: false }, { id: 's61', setNumber: 3, targetReps: '15-20', isWarmup: false, isDropset: false, completed: false }, { id: 's62', setNumber: 4, targetReps: '15-20', isWarmup: false, isDropset: false, completed: false }] },
        ],
        estimatedDurationMinutes: 80,
        isRestDay: false,
      },
      {
        id: 'ppl-rest-1',
        programId: '',
        dayNumber: 4,
        name: 'Rest',
        focus: 'Recovery',
        exercises: [],
        estimatedDurationMinutes: 0,
        isRestDay: true,
      },
    ],
    isAIGenerated: false,
    isActive: false,
  },
];

export const generateWorkoutProgram = (
  userId: string,
  split: string,
  daysPerWeek: number,
  goal: string,
): Partial<WorkoutProgram> => {
  const template = TRAINING_TEMPLATES.find((t) => t.split === split && t.daysPerWeek === daysPerWeek) ?? TRAINING_TEMPLATES[0];
  return {
    ...template,
    id: `program_${Date.now()}`,
    userId,
    goal,
    isActive: true,
    isAIGenerated: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
