import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Header } from '@/components/layout/Header';
import { EXERCISES } from '@/data/exercises';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'en' | 'tr';

  const exercise = EXERCISES.find((e) => e.id === id);

  if (!exercise) {
    return (
      <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
        <Header title={t('exercise.not_found')} showBack />
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{t('exercise.exercise_not_found')}</Text>
        </View>
      </LinearGradient>
    );
  }

  const name = lang === 'tr' && exercise.translations?.tr ? exercise.translations.tr.name : exercise.name;
  const instructions = lang === 'tr' && exercise.translations?.tr ? exercise.translations.tr.instructions : exercise.instructions;
  const tips = lang === 'tr' && exercise.translations?.tr ? exercise.translations.tr.tips : exercise.tips;
  const commonMistakes = lang === 'tr' && exercise.translations?.tr ? exercise.translations.tr.commonMistakes : exercise.commonMistakes;

  const muscleColor = Colors.muscle[exercise.primaryMuscle as keyof typeof Colors.muscle] ?? Colors.accent.blue;

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={name} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: muscleColor + '22' }]}>
          <Ionicons name="barbell-outline" size={64} color={muscleColor} />
          <Text style={styles.heroName}>{name}</Text>
        </View>

        {/* Tags */}
        <View style={styles.tagRow}>
          <Badge label={exercise.primaryMuscle} variant="accent" />
          <Badge label={exercise.equipment[0]} variant="default" />
          <Badge
            label={exercise.difficulty}
            variant={exercise.difficulty === 'beginner' ? 'success' : exercise.difficulty === 'intermediate' ? 'accent' : 'danger'}
          />
          <Badge label={exercise.movementPattern} variant="default" />
        </View>

        {/* Secondary muscles */}
        {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>{t('exercise.secondary_muscles')}</Text>
            <View style={styles.tagRow}>
              {exercise.secondaryMuscles.map((m) => (
                <Badge key={m} label={m} variant="default" small />
              ))}
            </View>
          </Card>
        )}

        {/* Instructions */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>{t('exercise.instructions')}</Text>
          {instructions?.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View style={[styles.stepNum, { backgroundColor: muscleColor }]}>
                <Text style={styles.stepNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </Card>

        {/* Tips */}
        {tips && tips.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>{t('exercise.tips')}</Text>
            {tips.map((tip, i) => (
              <View key={i} style={styles.bulletRow}>
                <Ionicons name="checkmark-circle-outline" size={16} color={Colors.status.success} />
                <Text style={styles.bulletText}>{tip}</Text>
              </View>
            ))}
          </Card>
        )}

        {/* Common mistakes */}
        {commonMistakes && commonMistakes.length > 0 && (
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>{t('exercise.common_mistakes')}</Text>
            {commonMistakes.map((m, i) => (
              <View key={i} style={styles.bulletRow}>
                <Ionicons name="close-circle-outline" size={16} color={Colors.status.error} />
                <Text style={styles.bulletText}>{m}</Text>
              </View>
            ))}
          </Card>
        )}

        {/* Sets & reps guidelines */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>{t('exercise.guidelines')}</Text>
          <View style={styles.guideRow}>
            <View style={styles.guideItem}>
              <Text style={styles.guideValue}>{exercise.defaultSets ?? 3}</Text>
              <Text style={styles.guideLabel}>{t('exercise.sets')}</Text>
            </View>
            <View style={styles.guideDivider} />
            <View style={styles.guideItem}>
              <Text style={styles.guideValue}>{exercise.defaultReps ?? '8-12'}</Text>
              <Text style={styles.guideLabel}>{t('exercise.reps')}</Text>
            </View>
            <View style={styles.guideDivider} />
            <View style={styles.guideItem}>
              <Text style={styles.guideValue}>{exercise.defaultRestSeconds ?? 90}s</Text>
              <Text style={styles.guideLabel}>{t('exercise.rest')}</Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[4] },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: Colors.text.secondary, fontSize: Typography.size.base },
  hero: { borderRadius: BorderRadius.xl, padding: Spacing[8], alignItems: 'center', gap: Spacing[3] },
  heroName: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.text.primary, textAlign: 'center' },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] },
  section: { gap: Spacing[3] },
  sectionTitle: { fontSize: Typography.size.sm, fontWeight: Typography.weight.bold, color: Colors.text.primary, letterSpacing: Typography.letterSpacing.wide },
  stepRow: { flexDirection: 'row', gap: Spacing[3], alignItems: 'flex-start' },
  stepNum: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  stepNumText: { fontSize: Typography.size.xs, color: '#fff', fontWeight: Typography.weight.bold },
  stepText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 22 },
  bulletRow: { flexDirection: 'row', gap: Spacing[2], alignItems: 'flex-start' },
  bulletText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 20 },
  guideRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  guideItem: { alignItems: 'center', gap: 4 },
  guideValue: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  guideLabel: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  guideDivider: { width: 1, height: 40, backgroundColor: Colors.border.subtle },
});
