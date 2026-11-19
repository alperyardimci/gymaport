import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/layout/Header';
import { useUserStore } from '@/store/userStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
const DURATIONS = [30, 45, 60, 75, 90] as const;
const DAYS_OPTIONS = [2, 3, 4, 5, 6] as const;

export default function ScheduleScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { fitnessProfile, setFitnessProfile } = useUserStore();

  const [daysPerWeek, setDaysPerWeek] = useState<number>(
    fitnessProfile?.trainingDaysPerWeek ?? 4
  );
  const [preferredDays, setPreferredDays] = useState<string[]>(
    fitnessProfile?.preferredDays ?? []
  );
  const [duration, setDuration] = useState<number>(
    fitnessProfile?.sessionDurationMinutes ?? 60
  );

  const toggleDay = (day: string) => {
    setPreferredDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleContinue = () => {
    setFitnessProfile({
      ...fitnessProfile!,
      trainingDaysPerWeek: daysPerWeek,
      preferredDays,
      sessionDurationMinutes: duration,
    });
    router.push('/(onboarding)/training-split');
  };

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('onboarding.schedule_title')} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{t('onboarding.schedule_subtitle')}</Text>

        {/* Days per week */}
        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>{t('onboarding.days_per_week')}</Text>
          <View style={styles.pillRow}>
            {DAYS_OPTIONS.map((d) => (
              <TouchableOpacity
                key={d}
                style={[styles.pill, daysPerWeek === d && styles.pillActive]}
                onPress={() => setDaysPerWeek(d)}
              >
                <Text style={[styles.pillText, daysPerWeek === d && styles.pillTextActive]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Preferred days */}
        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>{t('onboarding.preferred_days')}</Text>
          <Text style={styles.sectionDesc}>{t('onboarding.preferred_days_desc')}</Text>
          <View style={styles.dayRow}>
            {DAYS.map((day) => {
              const selected = preferredDays.includes(day);
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayBtn, selected && styles.dayBtnActive]}
                  onPress={() => toggleDay(day)}
                >
                  <Text style={[styles.dayText, selected && styles.dayTextActive]}>
                    {t(`onboarding.day_${day}`)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        {/* Session duration */}
        <Card style={styles.section}>
          <Text style={styles.sectionLabel}>{t('onboarding.session_duration')}</Text>
          <View style={styles.pillRow}>
            {DURATIONS.map((d) => (
              <TouchableOpacity
                key={d}
                style={[styles.pill, duration === d && styles.pillActive]}
                onPress={() => setDuration(d)}
              >
                <Text style={[styles.pillText, duration === d && styles.pillTextActive]}>
                  {d}<Text style={styles.minLabel}>{t('onboarding.min')}</Text>
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

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
  section: { gap: Spacing[3] },
  sectionLabel: { fontSize: Typography.size.sm, fontWeight: Typography.weight.semibold, color: Colors.text.secondary, letterSpacing: Typography.letterSpacing.wide },
  sectionDesc: { fontSize: Typography.size.xs, color: Colors.text.tertiary, marginTop: -Spacing[1] },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] },
  pill: { paddingVertical: Spacing[2], paddingHorizontal: Spacing[5], borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border.default, backgroundColor: Colors.bg.input },
  pillActive: { backgroundColor: Colors.accent.blue, borderColor: Colors.accent.blue },
  pillText: { fontSize: Typography.size.sm, color: Colors.text.tertiary, fontWeight: Typography.weight.semibold },
  pillTextActive: { color: '#fff' },
  minLabel: { fontSize: Typography.size.xs, fontWeight: Typography.weight.regular },
  dayRow: { flexDirection: 'row', gap: Spacing[2] },
  dayBtn: { flex: 1, paddingVertical: Spacing[3], borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.border.default, backgroundColor: Colors.bg.input, alignItems: 'center' },
  dayBtnActive: { backgroundColor: Colors.accent.blue, borderColor: Colors.accent.blue },
  dayText: { fontSize: Typography.size.xs, color: Colors.text.tertiary, fontWeight: Typography.weight.semibold },
  dayTextActive: { color: '#fff' },
  continueBtn: { marginTop: Spacing[2] },
});
