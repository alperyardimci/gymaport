import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { HeroPlane } from '@/components/splash/HeroPlane';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import { useWorkoutStore } from '@/store/workoutStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

const { width } = Dimensions.get('window');

const QUICK_ACTIONS = [
  { icon: 'barbell-outline', label: 'Antrenman\nSistemleri', route: '/(tabs)/workout' },
  { icon: 'play-circle-outline', label: 'Egzersiz\nKütüphanesi', route: '/(tabs)/workout' },
  { icon: 'scan-outline', label: 'Kas Analizi\n& Hedefleme', route: '/(tabs)/ai-body' },
  { icon: 'trending-up-outline', label: 'İlerleme\nTakibi', route: '/(tabs)/ai-body' },
  { icon: 'book-outline', label: 'Fitness\nRehberi', route: '/(tabs)/learn' },
  { icon: 'calendar-outline', label: 'Program\nTakvimi', route: '/(tabs)/workout' },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { profile, fitnessProfile } = useUserStore();
  const { activeProgram, sessionHistory } = useWorkoutStore();

  const displayName = profile
    ? `${profile.firstName} ${profile.lastName}`
    : user?.email?.split('@')[0] ?? 'Pilot';

  const initials = profile
    ? `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase()
    : (user?.email?.[0] ?? 'P').toUpperCase();

  const weekSessions = sessionHistory.filter((s) => {
    const d = new Date(s.startTime);
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  });

  const experienceLabel = fitnessProfile?.experience === 'beginner'
    ? 'Beginner Member'
    : fitnessProfile?.experience === 'intermediate'
    ? 'Intermediate Member'
    : fitnessProfile?.experience === 'advanced'
    ? 'Advanced Member'
    : 'Member';

  const todayWorkoutDay = activeProgram?.days?.[weekSessions.length % (activeProgram?.days?.length ?? 1)];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0A0E1A', '#0D1526', '#0A0E1A']}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ========== HERO BANNER ========== */}
        <View style={styles.heroBanner}>
          <LinearGradient
            colors={['#0A1428', '#102248', '#1E3D7A', '#102040', '#0A0E1A']}
            locations={[0, 0.2, 0.45, 0.7, 1]}
            style={StyleSheet.absoluteFill}
          />
          {/* Ambient glows */}
          <View style={styles.heroGlowLeft} />
          <View style={styles.heroGlowRight} />

          {/* Header bar */}
          <View style={styles.heroHeader}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/settings')}>
              <Ionicons name="menu-outline" size={26} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Plane */}
          <View style={styles.heroPlaneWrapper}>
            <HeroPlane width={width * 0.9} height={width * 0.65} />
          </View>

          {/* Brand text */}
          <View style={styles.heroBrandRow}>
            <Text style={styles.heroBrandName}>GYMAPORT</Text>
            <View style={styles.heroTaglineRow}>
              <View style={styles.heroTaglineLine} />
              <Text style={styles.heroTagline}>YOUR BODY, YOUR FLIGHT</Text>
              <View style={styles.heroTaglineLine} />
            </View>
          </View>
        </View>

        {/* ========== CONTENT ========== */}
        <View style={styles.content}>
          {/* User card */}
          <TouchableOpacity
            style={styles.userCard}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#0F1B30', '#131D33']}
              style={styles.userCardGrad}
            >
              {/* Avatar */}
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>

              {/* Info */}
              <View style={styles.userInfo}>
                <View style={styles.userNameRow}>
                  <Text style={styles.userName}>{displayName}</Text>
                  <Ionicons name="ribbon-outline" size={16} color={Colors.accent.gold} />
                </View>
                <Text style={styles.userRole}>{experienceLabel}</Text>
                <View style={styles.userStats}>
                  <View style={styles.userStat}>
                    <Ionicons name="barbell-outline" size={12} color={Colors.accent.gold} />
                    <Text style={styles.userStatText}>
                      {fitnessProfile?.weight ?? '—'} kg
                    </Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.userStat}>
                    <Ionicons name="resize-outline" size={12} color={Colors.accent.gold} />
                    <Text style={styles.userStatText}>
                      {fitnessProfile?.height ?? '—'} cm
                    </Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.userStat}>
                    <Ionicons name="calendar-outline" size={12} color={Colors.accent.gold} />
                    <Text style={styles.userStatText}>
                      {weekSessions.length} {t('home.this_week')}
                    </Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.text.tertiary} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Today's workout */}
          {activeProgram && todayWorkoutDay ? (
            <View style={styles.todayCard}>
              <LinearGradient
                colors={['#0F1B30', '#131D33']}
                style={styles.todayCardInner}
              >
                {/* Gold top border */}
                <View style={styles.todayGoldBorder} />

                <View style={styles.todayLeft}>
                  <View style={styles.todayIconRow}>
                    <View style={styles.todayIconBox}>
                      <Ionicons name="flag-outline" size={20} color={Colors.accent.gold} />
                    </View>
                    <Text style={styles.todayLabel}>{t('home.todays_workout')}</Text>
                  </View>
                  <Text style={styles.todayTitle}>{todayWorkoutDay.name}</Text>
                  <Text style={styles.todayMeta}>
                    <Ionicons name="time-outline" size={12} color={Colors.text.tertiary} />
                    {' '}{todayWorkoutDay.estimatedDurationMinutes} dk  ·  {todayWorkoutDay.exercises?.length ?? 0} Hareket
                  </Text>
                  <TouchableOpacity
                    style={styles.startBtn}
                    onPress={() => router.push('/workout/active')}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={['#FFB800', '#E8930A']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.startBtnGrad}
                    >
                      <Ionicons name="play" size={16} color="#0A0E1A" />
                      <Text style={styles.startBtnText}>Antrenmanı Başlat</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                {/* Muscle diagram placeholder */}
                <View style={styles.todayMuscleBox}>
                  <Ionicons name="body-outline" size={56} color={Colors.accent.gold} style={{ opacity: 0.6 }} />
                </View>
              </LinearGradient>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.noProgramCard}
              onPress={() => router.push('/(tabs)/workout')}
              activeOpacity={0.8}
            >
              <LinearGradient colors={['#0F1B30', '#131D33']} style={styles.noProgramInner}>
                <View style={styles.todayGoldBorder} />
                <Ionicons name="barbell-outline" size={28} color={Colors.accent.gold} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.todayTitle}>{t('home.no_program')}</Text>
                  <Text style={styles.todayMeta}>{t('home.create_program_desc')}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.text.tertiary} />
              </LinearGradient>
            </TouchableOpacity>
          )}

          {/* Quick action grid */}
          <View style={styles.actionGrid}>
            {QUICK_ACTIONS.map((action) => (
              <TouchableOpacity
                key={action.label}
                style={styles.actionCard}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.75}
              >
                <LinearGradient colors={['#0F1B30', '#0D1626']} style={styles.actionCardInner}>
                  <View style={styles.actionIconRow}>
                    <Ionicons name={action.icon as any} size={28} color="#FFFFFF" />
                    <Ionicons name="chevron-forward" size={14} color={Colors.text.tertiary} />
                  </View>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* 3-month transformation card */}
          <View style={styles.transformCard}>
            <LinearGradient colors={['#0F1B30', '#131D33']} style={styles.transformInner}>
              <View style={styles.todayGoldBorder} />
              <View style={styles.transformLeft}>
                <View style={styles.transformTitleRow}>
                  <Ionicons name="bar-chart-outline" size={18} color={Colors.accent.gold} />
                  <Text style={styles.transformTitle}>3 Aylık Değişim Tahmini</Text>
                </View>
                <Text style={styles.transformValue}>+5.8 kg</Text>
                <Text style={styles.transformLabel}>Kas Kütlesi Artışı</Text>
              </View>
              <View style={styles.transformRight}>
                <Ionicons name="person-outline" size={48} color={Colors.text.tertiary} style={{ opacity: 0.4 }} />
                <Ionicons name="arrow-forward-outline" size={18} color={Colors.accent.gold} />
                <Ionicons name="person-outline" size={56} color={Colors.accent.gold} style={{ opacity: 0.6 }} />
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E1A' },
  scroll: { flexGrow: 1, paddingBottom: Spacing[10] },

  // Hero banner
  heroBanner: {
    width: '100%',
    height: width * 0.9,
    overflow: 'hidden',
  },
  heroGlowLeft: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#1E6ACC',
    opacity: 0.15,
    top: 20,
    left: -40,
    transform: [{ scaleX: 1.5 }],
  },
  heroGlowRight: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#E8930A',
    opacity: 0.1,
    top: 60,
    right: -30,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing[5],
    paddingTop: 52,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  iconBtn: { padding: Spacing[2], position: 'relative' },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: { fontSize: 9, color: '#fff', fontWeight: '800' },
  heroPlaneWrapper: {
    position: 'absolute',
    top: 30,
    alignSelf: 'center',
    left: width * 0.025,
  },
  heroBrandRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 4,
    paddingBottom: Spacing[2],
  },
  heroBrandName: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 5,
    textShadowColor: 'rgba(30,144,255,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  heroTaglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    paddingHorizontal: Spacing[6],
  },
  heroTaglineLine: { flex: 1, height: 1, backgroundColor: Colors.accent.gold, opacity: 0.4 },
  heroTagline: {
    fontSize: 9,
    color: '#FFFFFF',
    letterSpacing: 2.5,
    fontWeight: '600',
    opacity: 0.8,
  },

  // Content
  content: { paddingHorizontal: Spacing[4], gap: Spacing[3], paddingTop: Spacing[4] },

  // User card
  userCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  userCardGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing[4],
    gap: Spacing[3],
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.accent.goldDark,
  },
  avatarText: { fontSize: Typography.size.xl, fontWeight: '900', color: '#0A0E1A' },
  userInfo: { flex: 1, gap: 4 },
  userNameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2] },
  userName: { fontSize: Typography.size.md, fontWeight: '700', color: '#FFFFFF' },
  userRole: { fontSize: Typography.size.xs, color: Colors.accent.gold, fontWeight: '600' },
  userStats: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2], marginTop: 2 },
  userStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  userStatText: { fontSize: Typography.size.xs, color: Colors.text.secondary },
  statDivider: { width: 1, height: 12, backgroundColor: Colors.border.subtle },

  // Today's workout
  todayCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,184,0,0.3)',
  },
  todayCardInner: { padding: Spacing[4] },
  todayGoldBorder: {
    height: 2,
    backgroundColor: Colors.accent.gold,
    marginBottom: Spacing[3],
    borderRadius: 1,
    opacity: 0.8,
  },
  todayLeft: { flex: 1, gap: Spacing[2] },
  todayIconRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2] },
  todayIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.accent.goldMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayLabel: {
    fontSize: Typography.size.xs,
    fontWeight: '700',
    color: Colors.text.secondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  todayTitle: { fontSize: Typography.size.md, fontWeight: '800', color: '#FFFFFF' },
  todayMeta: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  startBtn: {
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: Spacing[2],
    alignSelf: 'flex-start',
  },
  startBtnGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    paddingVertical: 10,
    paddingHorizontal: Spacing[5],
  },
  startBtnText: { fontSize: Typography.size.sm, fontWeight: '800', color: '#0A0E1A' },
  todayMuscleBox: {
    position: 'absolute',
    right: Spacing[4],
    bottom: Spacing[4],
    top: Spacing[4],
    justifyContent: 'center',
  },
  noProgramCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,184,0,0.2)',
  },
  noProgramInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing[4],
    gap: Spacing[3],
  },

  // Quick action grid
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[2] },
  actionCard: {
    width: (width - Spacing[4] * 2 - Spacing[2] * 2) / 3,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  actionCardInner: { padding: Spacing[3], gap: Spacing[2] },
  actionIconRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  actionLabel: { fontSize: 11, color: Colors.text.secondary, fontWeight: '600', lineHeight: 15 },

  // Transformation card
  transformCard: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,184,0,0.3)',
  },
  transformInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing[4],
    gap: Spacing[3],
  },
  transformLeft: { flex: 1, gap: 4 },
  transformTitleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2] },
  transformTitle: { fontSize: Typography.size.xs, color: Colors.text.secondary, fontWeight: '600' },
  transformValue: { fontSize: 28, fontWeight: '900', color: Colors.accent.gold },
  transformLabel: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  transformRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
});
