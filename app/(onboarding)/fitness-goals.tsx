import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/layout/Header';
import { useUserStore } from '@/store/userStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';
import type { FitnessGoal } from '@/types';

const GOAL_OPTIONS: { key: FitnessGoal; icon: string; color: string }[] = [
  { key: 'lose_weight', icon: 'flame-outline', color: Colors.accent.gold },
  { key: 'build_muscle', icon: 'barbell-outline', color: Colors.accent.blue },
  { key: 'improve_endurance', icon: 'bicycle-outline', color: '#22c55e' },
  { key: 'increase_strength', icon: 'trophy-outline', color: '#a855f7' },
  { key: 'improve_flexibility', icon: 'body-outline', color: '#ec4899' },
  { key: 'general_fitness', icon: 'heart-outline', color: '#14b8a6' },
  { key: 'sports_performance', icon: 'speedometer-outline', color: '#f97316' },
  { key: 'rehabilitation', icon: 'medkit-outline', color: '#64748b' },
];

export default function FitnessGoalsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { fitnessProfile, setFitnessProfile } = useUserStore();

  const [selectedGoals, setSelectedGoals] = useState<FitnessGoal[]>(
    fitnessProfile?.goals ?? []
  );
  const [primaryGoal, setPrimaryGoal] = useState<FitnessGoal>(
    fitnessProfile?.primaryGoal ?? 'general_fitness'
  );

  const toggleGoal = (goal: FitnessGoal) => {
    setSelectedGoals((prev) => {
      if (prev.includes(goal)) {
        const next = prev.filter((g) => g !== goal);
        if (primaryGoal === goal && next.length > 0) setPrimaryGoal(next[0]);
        return next;
      }
      const next = [...prev, goal];
      if (prev.length === 0) setPrimaryGoal(goal);
      return next;
    });
  };

  const handleContinue = () => {
    const goals = selectedGoals.length > 0 ? selectedGoals : ['general_fitness' as FitnessGoal];
    setFitnessProfile({
      ...fitnessProfile!,
      goals,
      primaryGoal: selectedGoals.includes(primaryGoal) ? primaryGoal : goals[0],
    });
    router.push('/(onboarding)/health-check');
  };

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('onboarding.goals_title')} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{t('onboarding.goals_subtitle')}</Text>

        <View style={styles.grid}>
          {GOAL_OPTIONS.map((opt) => {
            const selected = selectedGoals.includes(opt.key);
            const isPrimary = primaryGoal === opt.key && selected;
            return (
              <TouchableOpacity
                key={opt.key}
                style={[styles.goalCard, selected && styles.goalCardSelected, isPrimary && { borderColor: opt.color }]}
                onPress={() => toggleGoal(opt.key)}
                activeOpacity={0.7}
              >
                {isPrimary && (
                  <View style={[styles.primaryBadge, { backgroundColor: opt.color }]}>
                    <Text style={styles.primaryBadgeText}>{t('onboarding.primary_goal')}</Text>
                  </View>
                )}
                <View style={[styles.iconCircle, { backgroundColor: opt.color + '22' }]}>
                  <Ionicons name={opt.icon as any} size={28} color={opt.color} />
                </View>
                <Text style={[styles.goalLabel, selected && styles.goalLabelSelected]}>
                  {t(`onboarding.goal_${opt.key}`)}
                </Text>
                {selected && (
                  <View style={styles.checkRow}>
                    <Ionicons name="checkmark-circle" size={16} color={opt.color} />
                    {!isPrimary && (
                      <TouchableOpacity onPress={() => setPrimaryGoal(opt.key)}>
                        <Text style={[styles.setPrimaryText, { color: opt.color }]}>
                          {t('onboarding.set_primary')}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Button
          title={t('common.continue')}
          onPress={handleContinue}
          fullWidth
          size="lg"
          style={styles.continueBtn}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[5], paddingTop: Spacing[4] },
  subtitle: { fontSize: Typography.size.base, color: Colors.text.secondary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[3] },
  goalCard: {
    width: '47%',
    padding: Spacing[4],
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    gap: Spacing[2],
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  goalCardSelected: { borderColor: Colors.accent.blue, backgroundColor: Colors.accent.blueMuted },
  primaryBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: Spacing[2],
    paddingVertical: 2,
    borderBottomLeftRadius: BorderRadius.sm,
  },
  primaryBadgeText: { fontSize: 9, color: '#fff', fontWeight: '700', letterSpacing: 0.5 },
  iconCircle: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  goalLabel: { fontSize: Typography.size.sm, color: Colors.text.secondary, fontWeight: Typography.weight.medium },
  goalLabelSelected: { color: Colors.text.primary },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 4, flexWrap: 'wrap' },
  setPrimaryText: { fontSize: Typography.size.xs, fontWeight: Typography.weight.semibold },
  continueBtn: { marginTop: Spacing[2] },
});
