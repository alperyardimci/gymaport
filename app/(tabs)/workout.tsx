import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useWorkoutStore } from '@/store/workoutStore';
import { EXERCISES } from '@/data/exercises';
import { TRAINING_TEMPLATES } from '@/data/trainingTemplates';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

const MUSCLE_FILTERS = ['all', 'chest', 'back', 'shoulders', 'biceps', 'triceps', 'core', 'quads', 'hamstrings', 'glutes', 'calves'] as const;

export default function WorkoutScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { activeProgram, setActiveProgram, sessionHistory } = useWorkoutStore();

  const [tab, setTab] = useState<'programs' | 'exercises'>('programs');
  const [muscleFilter, setMuscleFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredExercises = EXERCISES.filter((ex) => {
    const matchesMuscle = muscleFilter === 'all' || ex.muscleGroup === muscleFilter;
    const matchesSearch = search.length < 2 || ex.name.toLowerCase().includes(search.toLowerCase());
    return matchesMuscle && matchesSearch;
  });

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('nav.workout')}</Text>
        {activeProgram && (
          <TouchableOpacity style={styles.activeBtn} onPress={() => router.push('/workout/active')}>
            <Ionicons name="flash" size={16} color={Colors.accent.blue} />
            <Text style={styles.activeBtnText}>{t('workout.resume')}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {(['programs', 'exercises'] as const).map((t_) => (
          <TouchableOpacity
            key={t_}
            style={[styles.tabBtn, tab === t_ && styles.tabBtnActive]}
            onPress={() => setTab(t_)}
          >
            <Text style={[styles.tabText, tab === t_ && styles.tabTextActive]}>
              {t(`workout.tab_${t_}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tab === 'programs' ? (
          <>
            {activeProgram && (
              <Card style={styles.activeProgramCard} variant="accent">
                <View style={styles.activeProgramHeader}>
                  <Badge label={t('workout.active_program')} variant="accent" small />
                </View>
                <Text style={styles.programName}>{activeProgram.name}</Text>
                <Text style={styles.programMeta}>
                  {activeProgram.daysPerWeek}x / week · {activeProgram.durationWeeks} weeks
                </Text>
                <TouchableOpacity onPress={() => router.push('/workout/active')} style={styles.startWorkoutBtn}>
                  <Ionicons name="play" size={16} color="#fff" />
                  <Text style={styles.startWorkoutText}>{t('workout.start_session')}</Text>
                </TouchableOpacity>
              </Card>
            )}

            <Text style={styles.sectionTitle}>{t('workout.templates')}</Text>
            {TRAINING_TEMPLATES.map((tmpl) => (
              <Card key={tmpl.id} style={styles.templateCard}>
                <View style={styles.templateHeader}>
                  <Text style={styles.templateName}>{tmpl.name}</Text>
                  <Badge
                    label={tmpl.difficulty}
                    variant={tmpl.difficulty === 'beginner' ? 'success' : tmpl.difficulty === 'intermediate' ? 'accent' : 'danger'}
                    small
                  />
                </View>
                <Text style={styles.templateDesc}>{tmpl.description}</Text>
                <View style={styles.templateMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="calendar-outline" size={14} color={Colors.text.tertiary} />
                    <Text style={styles.metaText}>{tmpl.daysPerWeek}x/week</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={14} color={Colors.text.tertiary} />
                    <Text style={styles.metaText}>{tmpl.durationWeeks}w</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="barbell-outline" size={14} color={Colors.text.tertiary} />
                    <Text style={styles.metaText}>{tmpl.split}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.useTemplateBtn, activeProgram?.id === tmpl.id && styles.useTemplateBtnActive]}
                  onPress={() => setActiveProgram(tmpl as any)}
                >
                  <Text style={styles.useTemplateBtnText}>
                    {activeProgram?.id === tmpl.id ? t('workout.active') : t('workout.use_template')}
                  </Text>
                </TouchableOpacity>
              </Card>
            ))}
          </>
        ) : (
          <>
            {/* Search */}
            <View style={styles.searchRow}>
              <Ionicons name="search-outline" size={18} color={Colors.text.tertiary} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder={t('exercise.search_placeholder')}
                placeholderTextColor={Colors.text.tertiary}
                value={search}
                onChangeText={setSearch}
              />
            </View>

            {/* Muscle filter */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
              {MUSCLE_FILTERS.map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[styles.filterChip, muscleFilter === m && styles.filterChipActive]}
                  onPress={() => setMuscleFilter(m)}
                >
                  <Text style={[styles.filterText, muscleFilter === m && styles.filterTextActive]}>
                    {m === 'all' ? t('common.all') : t(`exercise.muscle_${m}`)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {filteredExercises.map((ex) => (
              <TouchableOpacity
                key={ex.id}
                style={styles.exerciseCard}
                onPress={() => router.push(`/exercise/${ex.id}`)}
                activeOpacity={0.7}
              >
                <View style={[styles.exerciseMuscleBar, { backgroundColor: Colors.muscle[ex.muscleGroup as keyof typeof Colors.muscle] ?? Colors.accent.blue }]} />
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{ex.name}</Text>
                  <Text style={styles.exerciseMeta}>
                    {ex.muscleGroup} · {ex.equipment[0]}
                  </Text>
                </View>
                <Badge label={ex.difficulty} variant={ex.difficulty === 'beginner' ? 'success' : ex.difficulty === 'intermediate' ? 'accent' : 'danger'} small />
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Spacing[5], paddingTop: 56, paddingBottom: Spacing[3] },
  title: { fontSize: Typography.size['2xl'], fontWeight: Typography.weight.bold, color: Colors.text.primary },
  activeBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: Spacing[3], paddingVertical: Spacing[1], borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.accent.blue, backgroundColor: Colors.accent.blueMuted },
  activeBtnText: { fontSize: Typography.size.xs, color: Colors.accent.blue, fontWeight: Typography.weight.semibold },
  tabRow: { flexDirection: 'row', marginHorizontal: Spacing[5], marginBottom: Spacing[3], backgroundColor: Colors.bg.input, borderRadius: BorderRadius.md, padding: 3 },
  tabBtn: { flex: 1, paddingVertical: Spacing[2], alignItems: 'center', borderRadius: BorderRadius.sm },
  tabBtnActive: { backgroundColor: Colors.accent.blue },
  tabText: { fontSize: Typography.size.sm, color: Colors.text.tertiary, fontWeight: Typography.weight.medium },
  tabTextActive: { color: '#fff' },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[3] },
  activeProgramCard: { gap: Spacing[2] },
  activeProgramHeader: {},
  programName: { fontSize: Typography.size.lg, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  programMeta: { fontSize: Typography.size.sm, color: Colors.text.secondary },
  startWorkoutBtn: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2], alignSelf: 'flex-start', backgroundColor: Colors.accent.blue, paddingHorizontal: Spacing[4], paddingVertical: Spacing[2], borderRadius: BorderRadius.full, marginTop: Spacing[1] },
  startWorkoutText: { fontSize: Typography.size.sm, color: '#fff', fontWeight: Typography.weight.semibold },
  sectionTitle: { fontSize: Typography.size.xs, fontWeight: Typography.weight.bold, color: Colors.text.tertiary, letterSpacing: Typography.letterSpacing.caps, textTransform: 'uppercase' },
  templateCard: { gap: Spacing[2] },
  templateHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  templateName: { fontSize: Typography.size.md, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  templateDesc: { fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 20 },
  templateMeta: { flexDirection: 'row', gap: Spacing[4] },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  useTemplateBtn: { alignSelf: 'flex-start', paddingHorizontal: Spacing[4], paddingVertical: Spacing[2], borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.accent.blue, backgroundColor: 'transparent', marginTop: Spacing[1] },
  useTemplateBtnActive: { backgroundColor: Colors.accent.blue },
  useTemplateBtnText: { fontSize: Typography.size.sm, color: Colors.accent.blue, fontWeight: Typography.weight.semibold },
  searchRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.bg.input, borderRadius: BorderRadius.lg, paddingHorizontal: Spacing[3], borderWidth: 1, borderColor: Colors.border.subtle },
  searchIcon: { marginRight: Spacing[2] },
  searchInput: { flex: 1, paddingVertical: Spacing[3], fontSize: Typography.size.sm, color: Colors.text.primary },
  filterRow: { gap: Spacing[2], paddingVertical: 2 },
  filterChip: { paddingHorizontal: Spacing[3], paddingVertical: Spacing[1], borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border.default, backgroundColor: Colors.bg.card },
  filterChipActive: { backgroundColor: Colors.accent.blue, borderColor: Colors.accent.blue },
  filterText: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  filterTextActive: { color: '#fff' },
  exerciseCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.bg.card, borderRadius: BorderRadius.lg, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border.subtle },
  exerciseMuscleBar: { width: 4, alignSelf: 'stretch' },
  exerciseInfo: { flex: 1, padding: Spacing[3], gap: 2 },
  exerciseName: { fontSize: Typography.size.sm, fontWeight: Typography.weight.semibold, color: Colors.text.primary },
  exerciseMeta: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
});
