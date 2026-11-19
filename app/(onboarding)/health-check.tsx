import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/layout/Header';
import { useUserStore } from '@/store/userStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

const HEALTH_CONDITIONS = [
  'heart_disease',
  'hypertension',
  'diabetes',
  'asthma',
  'joint_issues',
  'back_pain',
  'recent_surgery',
  'pregnancy',
  'osteoporosis',
  'other',
] as const;

const PAR_Q_QUESTIONS = [
  'parq_heart',
  'parq_chest_pain',
  'parq_dizziness',
  'parq_bone_joint',
  'parq_medication',
  'parq_other_reason',
] as const;

export default function HealthCheckScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { fitnessProfile, setFitnessProfile } = useUserStore();

  const [conditions, setConditions] = useState<string[]>(
    fitnessProfile?.healthRestrictions ?? []
  );
  const [parqAnswers, setParqAnswers] = useState<Record<string, boolean>>({});
  const [consultedDoctor, setConsultedDoctor] = useState(
    fitnessProfile?.hasConsultedDoctor ?? false
  );

  const toggleCondition = (c: string) => {
    setConditions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const toggleParq = (q: string) => {
    setParqAnswers((prev) => ({ ...prev, [q]: !prev[q] }));
  };

  const anyParqYes = Object.values(parqAnswers).some(Boolean);

  const handleContinue = () => {
    if (anyParqYes && !consultedDoctor) {
      Alert.alert(
        t('onboarding.medical_clearance_title'),
        t('onboarding.medical_clearance_desc'),
        [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('common.continue'),
            onPress: () => saveAndNavigate(true),
          },
        ]
      );
      return;
    }
    saveAndNavigate(anyParqYes);
  };

  const saveAndNavigate = (needsClearance: boolean) => {
    setFitnessProfile({
      ...fitnessProfile!,
      healthRestrictions: conditions,
      hasConsultedDoctor: consultedDoctor,
      needsMedicalClearance: needsClearance,
    });
    router.push('/(onboarding)/schedule');
  };

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('onboarding.health_title')} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{t('onboarding.health_subtitle')}</Text>

        {/* PAR-Q */}
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>{t('onboarding.parq_title')}</Text>
          <Text style={styles.sectionDesc}>{t('onboarding.parq_desc')}</Text>
          {PAR_Q_QUESTIONS.map((q) => (
            <TouchableOpacity
              key={q}
              style={styles.parqRow}
              onPress={() => toggleParq(q)}
              activeOpacity={0.7}
            >
              <Text style={styles.parqText}>{t(`onboarding.${q}`)}</Text>
              <View style={styles.yesNoRow}>
                <TouchableOpacity
                  style={[styles.yesNoBtn, parqAnswers[q] === true && styles.yesActive]}
                  onPress={() => setParqAnswers((p) => ({ ...p, [q]: true }))}
                >
                  <Text style={[styles.yesNoText, parqAnswers[q] === true && styles.yesActiveText]}>
                    {t('common.yes')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.yesNoBtn, parqAnswers[q] === false && styles.noActive]}
                  onPress={() => setParqAnswers((p) => ({ ...p, [q]: false }))}
                >
                  <Text style={[styles.yesNoText, parqAnswers[q] === false && styles.noActiveText]}>
                    {t('common.no')}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </Card>

        {/* Health Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('onboarding.conditions_title')}</Text>
          <View style={styles.conditionGrid}>
            {HEALTH_CONDITIONS.map((c) => {
              const selected = conditions.includes(c);
              return (
                <TouchableOpacity
                  key={c}
                  style={[styles.conditionChip, selected && styles.conditionChipActive]}
                  onPress={() => toggleCondition(c)}
                >
                  <Text style={[styles.conditionText, selected && styles.conditionTextActive]}>
                    {t(`onboarding.condition_${c}`)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Doctor consulted */}
        {anyParqYes && (
          <TouchableOpacity
            style={[styles.doctorRow, consultedDoctor && styles.doctorRowActive]}
            onPress={() => setConsultedDoctor(!consultedDoctor)}
          >
            <Ionicons
              name={consultedDoctor ? 'checkbox' : 'square-outline'}
              size={22}
              color={consultedDoctor ? Colors.accent.blue : Colors.text.tertiary}
            />
            <Text style={styles.doctorText}>{t('onboarding.consulted_doctor')}</Text>
          </TouchableOpacity>
        )}

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
  sectionTitle: { fontSize: Typography.size.sm, fontWeight: Typography.weight.bold, color: Colors.text.primary, letterSpacing: Typography.letterSpacing.wide },
  sectionDesc: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  parqRow: { paddingVertical: Spacing[3], borderBottomWidth: 1, borderBottomColor: Colors.border.subtle, gap: Spacing[2] },
  parqText: { fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 20 },
  yesNoRow: { flexDirection: 'row', gap: Spacing[2] },
  yesNoBtn: { paddingVertical: Spacing[1], paddingHorizontal: Spacing[4], borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Colors.border.default, backgroundColor: Colors.bg.input },
  yesActive: { backgroundColor: Colors.status.success + '33', borderColor: Colors.status.success },
  noActive: { backgroundColor: Colors.bg.input, borderColor: Colors.border.default },
  yesNoText: { fontSize: Typography.size.sm, color: Colors.text.tertiary, fontWeight: Typography.weight.medium },
  yesActiveText: { color: Colors.status.success },
  noActiveText: { color: Colors.text.secondary },
  conditionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] },
  conditionChip: { paddingVertical: Spacing[2], paddingHorizontal: Spacing[3], borderRadius: BorderRadius.full, borderWidth: 1, borderColor: Colors.border.default, backgroundColor: Colors.bg.card },
  conditionChipActive: { borderColor: Colors.accent.gold, backgroundColor: Colors.accent.gold + '22' },
  conditionText: { fontSize: Typography.size.xs, color: Colors.text.secondary },
  conditionTextActive: { color: Colors.accent.gold, fontWeight: Typography.weight.semibold },
  doctorRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3], padding: Spacing[4], borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Colors.border.default, backgroundColor: Colors.bg.card },
  doctorRowActive: { borderColor: Colors.accent.blue, backgroundColor: Colors.accent.blueMuted },
  doctorText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text.secondary },
  continueBtn: { marginTop: Spacing[2] },
});
