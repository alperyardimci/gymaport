import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import { useWorkoutStore } from '@/store/workoutStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, signOut } = useAuthStore();
  const { profile, fitnessProfile } = useUserStore();
  const { sessionHistory, personalRecords } = useWorkoutStore();

  const displayName = profile ? `${profile.firstName} ${profile.lastName}` : user?.email ?? 'Pilot';
  const initials = profile
    ? `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase()
    : (user?.email?.[0] ?? 'P').toUpperCase();

  const handleSignOut = () => {
    Alert.alert(t('profile.sign_out'), t('profile.sign_out_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      { text: t('profile.sign_out'), style: 'destructive', onPress: signOut },
    ]);
  };

  const totalVolume = sessionHistory.reduce((sum, s) => sum + (s.totalVolumeKg ?? 0), 0);
  const totalWorkouts = sessionHistory.length;
  const prs = personalRecords.length;

  const menuItems = [
    { icon: 'settings-outline', label: t('profile.settings'), route: '/settings' },
    { icon: 'language-outline', label: t('profile.language'), route: '/settings/language' },
    { icon: 'shield-outline', label: t('profile.privacy'), route: '/settings/privacy' },
    { icon: 'document-text-outline', label: t('profile.consent_history'), route: '/settings/consent-history' },
    { icon: 'notifications-outline', label: t('profile.notifications'), route: '/settings' },
    { icon: 'help-circle-outline', label: t('profile.help'), route: '/settings' },
  ];

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{displayName}</Text>
          {profile?.email && <Text style={styles.email}>{profile.email}</Text>}
          {fitnessProfile && (
            <Badge
              label={fitnessProfile.experience}
              variant="accent"
              small
            />
          )}
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{totalWorkouts}</Text>
            <Text style={styles.statLabel}>{t('profile.stat_workouts')}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{prs}</Text>
            <Text style={styles.statLabel}>{t('profile.stat_prs')}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{Math.round(totalVolume / 1000)}k</Text>
            <Text style={styles.statLabel}>{t('profile.stat_volume')}</Text>
          </Card>
        </View>

        {/* Body stats */}
        {fitnessProfile && (
          <Card style={styles.bodyCard}>
            <Text style={styles.sectionTitle}>{t('profile.body_stats')}</Text>
            <View style={styles.bodyRow}>
              <View style={styles.bodyStat}>
                <Text style={styles.bodyValue}>{fitnessProfile.height} cm</Text>
                <Text style={styles.bodyLabel}>{t('onboarding.height')}</Text>
              </View>
              <View style={styles.bodyDivider} />
              <View style={styles.bodyStat}>
                <Text style={styles.bodyValue}>{fitnessProfile.weight} kg</Text>
                <Text style={styles.bodyLabel}>{t('onboarding.weight')}</Text>
              </View>
              <View style={styles.bodyDivider} />
              <View style={styles.bodyStat}>
                <Text style={styles.bodyValue}>{fitnessProfile.trainingDaysPerWeek}x</Text>
                <Text style={styles.bodyLabel}>{t('profile.per_week')}</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Goals */}
        {fitnessProfile?.goals && fitnessProfile.goals.length > 0 && (
          <Card style={styles.goalsCard}>
            <Text style={styles.sectionTitle}>{t('profile.goals')}</Text>
            <View style={styles.goalsRow}>
              {fitnessProfile.goals.map((g) => (
                <Badge
                  key={g}
                  label={t(`onboarding.goal_${g}`)}
                  variant={g === fitnessProfile.primaryGoal ? 'accent' : 'default'}
                  small
                />
              ))}
            </View>
          </Card>
        )}

        {/* Menu */}
        <Card style={styles.menuCard}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuItem, i < menuItems.length - 1 && styles.menuItemBorder]}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon as any} size={20} color={Colors.text.secondary} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.text.tertiary} />
            </TouchableOpacity>
          ))}
        </Card>

        {/* Sign out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={18} color={Colors.status.error} />
          <Text style={styles.signOutText}>{t('profile.sign_out')}</Text>
        </TouchableOpacity>

        <Text style={styles.version}>GYMAPORT v1.0.0</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[4], paddingTop: 56 },
  avatarSection: { alignItems: 'center', gap: Spacing[2] },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.accent.blue, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: Typography.size['2xl'], fontWeight: Typography.weight.bold, color: '#fff' },
  name: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  email: { fontSize: Typography.size.sm, color: Colors.text.tertiary },
  statsRow: { flexDirection: 'row', gap: Spacing[3] },
  statCard: { flex: 1, alignItems: 'center', gap: 4 },
  statValue: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  statLabel: { fontSize: Typography.size.xs, color: Colors.text.tertiary, textAlign: 'center' },
  bodyCard: { gap: Spacing[3] },
  sectionTitle: { fontSize: Typography.size.sm, fontWeight: Typography.weight.semibold, color: Colors.text.secondary, letterSpacing: Typography.letterSpacing.wide },
  bodyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  bodyStat: { alignItems: 'center', gap: 4 },
  bodyValue: { fontSize: Typography.size.lg, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  bodyLabel: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  bodyDivider: { width: 1, height: 32, backgroundColor: Colors.border.subtle },
  goalsCard: { gap: Spacing[2] },
  goalsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] },
  menuCard: { gap: 0, padding: 0, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3], paddingHorizontal: Spacing[4], paddingVertical: Spacing[4] },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border.subtle },
  menuLabel: { flex: 1, fontSize: Typography.size.sm, color: Colors.text.primary, fontWeight: Typography.weight.medium },
  signOutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing[2], paddingVertical: Spacing[4], borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Colors.status.error + '44', backgroundColor: Colors.status.error + '11' },
  signOutText: { fontSize: Typography.size.sm, color: Colors.status.error, fontWeight: Typography.weight.semibold },
  version: { textAlign: 'center', fontSize: Typography.size.xs, color: Colors.text.tertiary },
});
