import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/layout/Header';
import { useWorkoutStore } from '@/store/workoutStore';
import { TRAINING_TEMPLATES } from '@/data/trainingTemplates';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const { setActiveProgram, activeProgram } = useWorkoutStore();

  const program = TRAINING_TEMPLATES.find((p) => p.id === id);

  if (!program) {
    return (
      <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
        <Header title={t('workout.not_found')} showBack />
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{t('workout.program_not_found')}</Text>
        </View>
      </LinearGradient>
    );
  }

  const isActive = activeProgram?.id === program.id;

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={program.name} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Overview */}
        <Card style={styles.overviewCard} variant={isActive ? 'accent' : 'default'}>
          {isActive && <Badge label={t('workout.active_program')} variant="accent" small />}
          <Text style={styles.programName}>{program.name}</Text>
          <Text style={styles.programDesc}>{program.description}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color={Colors.accent.blue} />
              <Text style={styles.metaText}>{program.daysPerWeek}x / week</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color={Colors.accent.blue} />
              <Text style={styles.metaText}>{program.durationWeeks} weeks</Text>
            </View>
            <Badge
              label={program.difficulty}
              variant={program.difficulty === 'beginner' ? 'success' : program.difficulty === 'intermediate' ? 'accent' : 'danger'}
              small
            />
          </View>
        </Card>

        {/* Days */}
        <Text style={styles.sectionTitle}>{t('workout.workout_days')}</Text>
        {program.days?.map((day, idx) => (
          <Card key={day.id ?? idx} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayName}>{day.name}</Text>
              <Badge label={`${day.exercises?.length ?? 0} exercises`} variant="default" small />
            </View>
            {day.exercises?.slice(0, 4).map((ex: any, eIdx: number) => (
              <TouchableOpacity
                key={eIdx}
                style={styles.exerciseRow}
                onPress={() => router.push(`/exercise/${ex.exerciseId}`)}
              >
                <View style={styles.exerciseDot} />
                <Text style={styles.exerciseName}>{ex.exerciseId?.replace(/_/g, ' ') ?? 'Exercise'}</Text>
                <Text style={styles.exerciseSets}>{ex.sets?.length ?? 3}×{ex.sets?.[0]?.targetReps ?? 10}</Text>
              </TouchableOpacity>
            ))}
            {(day.exercises?.length ?? 0) > 4 && (
              <Text style={styles.moreExercises}>+{(day.exercises?.length ?? 0) - 4} more</Text>
            )}
          </Card>
        ))}

        <Button
          title={isActive ? t('workout.start_session') : t('workout.use_template')}
          onPress={() => {
            setActiveProgram(program as any);
            if (isActive) router.push('/workout/active');
          }}
          fullWidth
          size="lg"
          style={styles.cta}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[4] },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: Colors.text.secondary, fontSize: Typography.size.base },
  overviewCard: { gap: Spacing[2] },
  programName: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  programDesc: { fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 20 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3], flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: Typography.size.sm, color: Colors.text.secondary },
  sectionTitle: { fontSize: Typography.size.xs, fontWeight: Typography.weight.bold, color: Colors.text.tertiary, letterSpacing: Typography.letterSpacing.caps, textTransform: 'uppercase' },
  dayCard: { gap: Spacing[2] },
  dayHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dayName: { fontSize: Typography.size.md, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2], paddingVertical: 2 },
  exerciseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.accent.blue },
  exerciseName: { flex: 1, fontSize: Typography.size.sm, color: Colors.text.secondary, textTransform: 'capitalize' },
  exerciseSets: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  moreExercises: { fontSize: Typography.size.xs, color: Colors.text.tertiary, fontStyle: 'italic' },
  cta: { marginTop: Spacing[2] },
});
