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
import type { TrainingSplit } from '@/types';

const SPLITS: { key: TrainingSplit; icon: string; days: string; color: string }[] = [
  { key: 'ai_recommended', icon: 'sparkles-outline', days: 'auto', color: Colors.accent.gold },
  { key: 'full_body', icon: 'body-outline', days: '2–4', color: Colors.accent.blue },
  { key: 'upper_lower', icon: 'git-branch-outline', days: '4', color: '#22c55e' },
  { key: 'push_pull_legs', icon: 'refresh-circle-outline', days: '6', color: '#a855f7' },
  { key: 'bro_split', icon: 'barbell-outline', days: '5', color: '#f97316' },
  { key: 'arnold_split', icon: 'trophy-outline', days: '6', color: Colors.accent.gold },
  { key: 'custom', icon: 'build-outline', days: 'custom', color: '#64748b' },
];

export default function TrainingSplitScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { fitnessProfile, setFitnessProfile } = useUserStore();

  const [selected, setSelected] = useState<TrainingSplit>(
    fitnessProfile?.trainingSplit ?? 'ai_recommended'
  );

  const handleContinue = () => {
    setFitnessProfile({ ...fitnessProfile!, trainingSplit: selected });
    router.push('/(onboarding)/body-photos');
  };

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('onboarding.split_title')} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{t('onboarding.split_subtitle')}</Text>

        {SPLITS.map((split) => {
          const isSelected = selected === split.key;
          return (
            <TouchableOpacity
              key={split.key}
              style={[styles.splitCard, isSelected && { borderColor: split.color }]}
              onPress={() => setSelected(split.key)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconBox, { backgroundColor: split.color + '22' }]}>
                <Ionicons name={split.icon as any} size={26} color={split.color} />
              </View>
              <View style={styles.splitInfo}>
                <Text style={[styles.splitName, isSelected && { color: split.color }]}>
                  {t(`splits.${split.key}_name`)}
                </Text>
                <Text style={styles.splitDesc}>{t(`splits.${split.key}_desc`)}</Text>
                <Text style={styles.splitDays}>
                  {t('onboarding.days_label')}: {t(`splits.${split.key}_days`)}
                </Text>
              </View>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={22} color={split.color} />
              )}
            </TouchableOpacity>
          );
        })}

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
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[3], paddingTop: Spacing[4] },
  subtitle: { fontSize: Typography.size.base, color: Colors.text.secondary, marginBottom: Spacing[2] },
  splitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing[4],
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    gap: Spacing[3],
  },
  iconBox: { width: 48, height: 48, borderRadius: BorderRadius.lg, alignItems: 'center', justifyContent: 'center' },
  splitInfo: { flex: 1, gap: 2 },
  splitName: { fontSize: Typography.size.md, fontWeight: Typography.weight.semibold, color: Colors.text.primary },
  splitDesc: { fontSize: Typography.size.xs, color: Colors.text.tertiary, lineHeight: 16 },
  splitDays: { fontSize: Typography.size.xs, color: Colors.text.tertiary, marginTop: 2 },
  continueBtn: { marginTop: Spacing[3] },
});
