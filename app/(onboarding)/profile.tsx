import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/layout/Header';
import { useUserStore } from '@/store/userStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';
import type { UnitSystem, Gender } from '@/types';

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { setProfile, setFitnessProfile } = useUserStore();

  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState<Gender>('prefer_not_to_say');
  const [units, setUnits] = useState<UnitSystem>('metric');

  const genders: { key: Gender; label: string }[] = [
    { key: 'male', label: t('onboarding.gender_male') },
    { key: 'female', label: t('onboarding.gender_female') },
    { key: 'other', label: t('onboarding.gender_other') },
    { key: 'prefer_not_to_say', label: t('onboarding.gender_prefer_not') },
  ];

  const handleContinue = () => {
    setFitnessProfile({
      height: parseFloat(height) || 175,
      weight: parseFloat(weight) || 75,
      unitSystem: units,
      goals: [],
      primaryGoal: 'general_fitness',
      trainingDaysPerWeek: 4,
      preferredDays: [],
      sessionDurationMinutes: 60,
      equipment: ['full_gym'],
      trainingSplit: 'ai_recommended',
      healthRestrictions: [],
      hasConsultedDoctor: false,
      needsMedicalClearance: false,
      experience: 'beginner',
      activityLevel: 'moderately_active',
      id: `fp_${Date.now()}`,
      userId: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    router.push('/(onboarding)/fitness-goals');
  };

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('onboarding.profile_title')} showBack />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.subtitle}>{t('onboarding.profile_subtitle')}</Text>

          {/* Units selector */}
          <Card style={styles.section}>
            <Text style={styles.sectionLabel}>Measurement Units</Text>
            <View style={styles.toggle}>
              <TouchableOpacity
                style={[styles.toggleBtn, units === 'metric' && styles.toggleBtnActive]}
                onPress={() => setUnits('metric')}
              >
                <Text style={[styles.toggleText, units === 'metric' && styles.toggleTextActive]}>
                  {t('onboarding.units_metric')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleBtn, units === 'imperial' && styles.toggleBtnActive]}
                onPress={() => setUnits('imperial')}
              >
                <Text style={[styles.toggleText, units === 'imperial' && styles.toggleTextActive]}>
                  {t('onboarding.units_imperial')}
                </Text>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Basic info */}
          <View style={styles.row}>
            <Input
              label={`${t('onboarding.age')} (years)`}
              placeholder="25"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              containerStyle={styles.third}
            />
            <Input
              label={`${t('onboarding.height')} (${units === 'metric' ? 'cm' : 'ft'})`}
              placeholder={units === 'metric' ? '175' : '5\'9"'}
              value={height}
              onChangeText={setHeight}
              keyboardType="decimal-pad"
              containerStyle={styles.third}
            />
            <Input
              label={`${t('onboarding.weight')} (${units === 'metric' ? 'kg' : 'lb'})`}
              placeholder={units === 'metric' ? '75' : '165'}
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
              containerStyle={styles.third}
            />
          </View>

          {/* Gender */}
          <View style={styles.genderSection}>
            <Text style={styles.sectionLabel}>{t('onboarding.gender')}</Text>
            <View style={styles.genderGrid}>
              {genders.map((g) => (
                <TouchableOpacity
                  key={g.key}
                  style={[styles.genderBtn, gender === g.key && styles.genderBtnActive]}
                  onPress={() => setGender(g.key)}
                >
                  <Text style={[styles.genderText, gender === g.key && styles.genderTextActive]}>
                    {g.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Button
            title={t('common.continue')}
            onPress={handleContinue}
            fullWidth
            size="lg"
            style={styles.continueBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[5], paddingTop: Spacing[4] },
  subtitle: { fontSize: Typography.size.base, color: Colors.text.secondary },
  section: {},
  sectionLabel: { fontSize: Typography.size.sm, fontWeight: Typography.weight.semibold, color: Colors.text.secondary, marginBottom: Spacing[3], letterSpacing: Typography.letterSpacing.wide },
  toggle: { flexDirection: 'row', backgroundColor: Colors.bg.input, borderRadius: BorderRadius.md, padding: 4 },
  toggleBtn: { flex: 1, paddingVertical: Spacing[2], paddingHorizontal: Spacing[3], borderRadius: BorderRadius.sm, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: Colors.accent.blue },
  toggleText: { fontSize: Typography.size.sm, color: Colors.text.tertiary, fontWeight: Typography.weight.medium },
  toggleTextActive: { color: Colors.text.primary },
  row: { flexDirection: 'row', gap: Spacing[3] },
  third: { flex: 1 },
  genderSection: { gap: Spacing[3] },
  genderGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[3] },
  genderBtn: { paddingVertical: Spacing[3], paddingHorizontal: Spacing[4], borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Colors.border.default, backgroundColor: Colors.bg.card },
  genderBtnActive: { borderColor: Colors.accent.blue, backgroundColor: Colors.accent.blueMuted },
  genderText: { fontSize: Typography.size.sm, color: Colors.text.secondary, fontWeight: Typography.weight.medium },
  genderTextActive: { color: Colors.accent.blue },
  continueBtn: { marginTop: Spacing[2] },
});
