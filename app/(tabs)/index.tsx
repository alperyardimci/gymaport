import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import { useWorkoutStore } from '@/store/workoutStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { profile, fitnessProfile } = useUserStore();
  const { activeProgram, sessionHistory } = useWorkoutStore();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return t('home.good_morning');
    if (h < 18) return t('home.good_afternoon');
    return t('home.good_evening');
  };

  const displayName = profile?.firstName ?? user?.email?.split('@')[0] ?? 'Pilot';
  const weekSessions = sessionHistory.filter((s) => {
    const d = new Date(s.startTime);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  });
  const weekProgress = Math.min((weekSessions.length / (fitnessProfile?.trainingDaysPerWeek ?? 4)) * 100, 100);

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting()},</Text>
            <Text style={styles.name}>{displayName} ✈️</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/settings')} style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={22} color={Colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Week progress */}
        <Card style={styles.weekCard}>
          <View style={styles.weekHeader}>
            <Text style={styles.weekTitle}>{t('home.weekly_progress')}</Text>
            <Badge label={`${weekSessions.length}/${fitnessProfile?.trainingDaysPerWeek ?? 4}`} variant="accent" small />
          </View>
          <ProgressBar progress={weekProgress} style={styles.progressBar} />
          <Text style={styles.weekDesc}>
            {weekSessions.length === 0
              ? t('home.no_workouts_yet')
              : t('home.workouts_done', { count: weekSessions.length })}
          </Text>

        </Card>

        {/* Today's workout */}
        {activeProgram ? (
          <Card style={styles.todayCard} variant="accent">
            <View style={styles.todayHeader}>
              <Ionicons name="flash" size={18} color={Colors.accent.blue} />
              <Text style={styles.todayLabel}>{t('home.todays_workout')}</Text>
            </View>
            <Text style={styles.todayTitle}>{activeProgram.name}</Text>
            <Text style={styles.todayDesc}>
              {t('home.program_days', { days: activeProgram.daysPerWeek })}
            </Text>
            <Button
              title={t('home.start_workout')}
              onPress={() => router.push('/workout/active')}
              size="md"
              style={styles.startBtn}
            />
          </Card>
        ) : (
          <Card style={styles.todayCard}>
            <Text style={styles.todayLabel}>{t('home.no_program')}</Text>
            <Text style={styles.todayDesc}>{t('home.create_program_desc')}</Text>
            <Button
              title={t('home.browse_workouts')}
              onPress={() => router.push('/(tabs)/workout')}
              variant="outline"
              size="md"
              style={styles.startBtn}
            />
          </Card>
        )}

        {/* Quick stats */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Ionicons name="trophy-outline" size={22} color={Colors.accent.gold} />
            <Text style={styles.statValue}>{sessionHistory.length}</Text>
            <Text style={styles.statLabel}>{t('home.total_workouts')}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Ionicons name="time-outline" size={22} color={Colors.accent.blue} />
            <Text style={styles.statValue}>
              {Math.round(sessionHistory.reduce((sum, s) => sum + (s.durationSeconds ?? 0), 0) / 3600)}h
            </Text>
            <Text style={styles.statLabel}>{t('home.total_time')}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Ionicons name="flame-outline" size={22} color={Colors.accent.gold} />
            <Text style={styles.statValue}>{weekSessions.length}</Text>
            <Text style={styles.statLabel}>{t('home.this_week')}</Text>
          </Card>
        </View>

        {/* Quick actions */}
        <Text style={styles.sectionTitle}>{t('home.quick_actions')}</Text>
        <View style={styles.actionGrid}>
          {[
            { icon: 'barbell-outline', label: t('home.action_exercises'), route: '/(tabs)/workout' },
            { icon: 'scan-outline', label: t('home.action_body_scan'), route: '/(tabs)/ai-body' },
            { icon: 'book-outline', label: t('home.action_learn'), route: '/(tabs)/learn' },
            { icon: 'camera-outline', label: t('home.action_progress_photo'), route: '/(tabs)/ai-body' },
          ].map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.actionCard}
              onPress={() => router.push(action.route as any)}
              activeOpacity={0.7}
            >
              <Ionicons name={action.icon as any} size={26} color={Colors.accent.blue} />
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[5], paddingTop: 56 },
  header: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  greeting: { fontSize: Typography.size.sm, color: Colors.text.tertiary },
  name: { fontSize: Typography.size['2xl'], fontWeight: Typography.weight.bold, color: Colors.text.primary },
  settingsBtn: { padding: Spacing[2] },
  weekCard: { gap: Spacing[2] },
  weekHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  weekTitle: { fontSize: Typography.size.sm, fontWeight: Typography.weight.semibold, color: Colors.text.primary },
  progressBar: { marginVertical: Spacing[1] },
  weekDesc: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  todayCard: { gap: Spacing[2] },
  todayHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing[1] },
  todayLabel: { fontSize: Typography.size.xs, fontWeight: Typography.weight.semibold, color: Colors.accent.blue, letterSpacing: Typography.letterSpacing.caps, textTransform: 'uppercase' },
  todayTitle: { fontSize: Typography.size.lg, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  todayDesc: { fontSize: Typography.size.sm, color: Colors.text.secondary },
  startBtn: { marginTop: Spacing[1], alignSelf: 'flex-start' },
  statsRow: { flexDirection: 'row', gap: Spacing[3] },
  statCard: { flex: 1, alignItems: 'center', gap: Spacing[1] },
  statValue: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  statLabel: { fontSize: Typography.size.xs, color: Colors.text.tertiary, textAlign: 'center' },
  sectionTitle: { fontSize: Typography.size.sm, fontWeight: Typography.weight.bold, color: Colors.text.secondary, letterSpacing: Typography.letterSpacing.caps, textTransform: 'uppercase' },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[3] },
  actionCard: { width: '47%', padding: Spacing[4], borderRadius: BorderRadius.xl, backgroundColor: Colors.bg.card, borderWidth: 1, borderColor: Colors.border.subtle, alignItems: 'center', gap: Spacing[2] },
  actionLabel: { fontSize: Typography.size.xs, color: Colors.text.secondary, textAlign: 'center', fontWeight: Typography.weight.medium },
});
