import React from 'react';
import {
  View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { HeroPlane } from '@/components/splash/HeroPlane';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

const FEATURES = [
  { icon: 'bar-chart-outline', label: 'AI Destekli\nAntrenman Planı' },
  { icon: 'play-circle-outline', label: 'Videolu\nAnlatım' },
  { icon: 'body-outline', label: 'Kas Analizi\n& Gelişim Takibi' },
  { icon: 'trophy-outline', label: 'Hedefine\nUlaş' },
  { icon: 'star-outline', label: 'Daha Güçlü\nBir Sen' },
] as const;

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      {/* Sky gradient background */}
      <LinearGradient
        colors={['#0A1428', '#102248', '#1E3D7A', '#2B5496', '#152040', '#0A0E1A']}
        locations={[0, 0.15, 0.3, 0.45, 0.65, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Cloud-like ambient glows */}
      <View style={styles.glowLeft} />
      <View style={styles.glowRight} />
      <View style={styles.glowBottom} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Plane hero section */}
        <View style={styles.heroSection}>
          {/* Orbit arc ring */}
          <View style={styles.orbitRing} />
          <View style={styles.orbitRingInner} />

          {/* Plane */}
          <View style={styles.planeWrapper}>
            <HeroPlane width={width * 0.95} height={width * 0.72} />
          </View>

          {/* Gold engine bottom glow line */}
          <View style={styles.engineGlowLine} />
        </View>

        {/* Logo section */}
        <View style={styles.logoSection}>
          <Text style={styles.brandName}>GYMAPORT</Text>
          {/* Tagline with flanking lines */}
          <View style={styles.taglineRow}>
            <View style={styles.taglineLine} />
            <Text style={styles.tagline}>YOUR BODY, YOUR FLIGHT</Text>
            <View style={styles.taglineLine} />
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctaSection}>
          {/* Sign Up — Gold filled */}
          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={() => router.push('/(auth)/register')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#FFB800', '#E8930A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signUpGradient}
            >
              <Ionicons name="person-outline" size={22} color="#0A0E1A" />
              <Text style={styles.signUpText}>{t('auth.sign_up')}</Text>
              <Ionicons name="chevron-forward" size={20} color="#0A0E1A" />
            </LinearGradient>
          </TouchableOpacity>

          {/* Sign In — Outline */}
          <TouchableOpacity
            style={styles.signInBtn}
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.85}
          >
            <Ionicons name="log-in-outline" size={22} color="#fff" />
            <Text style={styles.signInText}>{t('auth.sign_in')}</Text>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Feature strip */}
        <View style={styles.featureStrip}>
          {FEATURES.map((f, i) => (
            <React.Fragment key={f.label}>
              <View style={styles.featureItem}>
                <Ionicons name={f.icon as any} size={22} color="#fff" />
                <Text style={styles.featureLabel}>{f.label}</Text>
              </View>
              {i < FEATURES.length - 1 && <View style={styles.featureSep} />}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E1A' },
  scroll: { flexGrow: 1 },

  // Sky glows
  glowLeft: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#1E6ACC',
    opacity: 0.18,
    top: height * 0.1,
    left: -60,
    transform: [{ scaleX: 1.5 }],
  },
  glowRight: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#E8930A',
    opacity: 0.12,
    top: height * 0.25,
    right: -40,
  },
  glowBottom: {
    position: 'absolute',
    width: width,
    height: 300,
    backgroundColor: '#0A0E1A',
    bottom: 0,
    opacity: 0.6,
  },

  // Hero section
  heroSection: {
    width: width,
    height: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  orbitRing: {
    position: 'absolute',
    width: width * 0.95,
    height: width * 0.95,
    borderRadius: width * 0.475,
    borderWidth: 1,
    borderColor: 'rgba(100, 160, 255, 0.2)',
    top: -width * 0.3,
  },
  orbitRingInner: {
    position: 'absolute',
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: width * 0.425,
    borderWidth: 0.5,
    borderColor: 'rgba(100, 160, 255, 0.1)',
    top: -width * 0.24,
  },
  planeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  engineGlowLine: {
    position: 'absolute',
    bottom: 0,
    width: width * 0.7,
    height: 2,
    backgroundColor: Colors.accent.gold,
    opacity: 0.3,
    shadowColor: Colors.accent.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 12,
  },

  // Logo
  logoSection: {
    alignItems: 'center',
    gap: Spacing[2],
    paddingHorizontal: Spacing[6],
    marginTop: Spacing[2],
  },
  brandName: {
    fontSize: 44,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 6,
    textShadowColor: 'rgba(30,144,255,0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    marginTop: 2,
  },
  taglineLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.accent.gold,
    opacity: 0.5,
  },
  tagline: {
    fontSize: Typography.size.xs,
    color: '#FFFFFF',
    letterSpacing: 3,
    fontWeight: Typography.weight.semibold,
    opacity: 0.85,
  },

  // CTA
  ctaSection: {
    paddingHorizontal: Spacing[6],
    gap: Spacing[3],
    marginTop: Spacing[6],
  },
  signUpBtn: {
    borderRadius: 50,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: Colors.accent.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  signUpGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: Spacing[6],
    gap: Spacing[3],
  },
  signUpText: {
    flex: 1,
    textAlign: 'center',
    fontSize: Typography.size.lg,
    fontWeight: '800',
    color: '#0A0E1A',
    letterSpacing: 1,
  },
  signInBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: Spacing[6],
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    gap: Spacing[3],
  },
  signInText: {
    flex: 1,
    textAlign: 'center',
    fontSize: Typography.size.lg,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },

  // Feature strip
  featureStrip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[6],
    paddingBottom: 48,
    marginTop: Spacing[4],
    gap: 0,
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 4,
  },
  featureLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 13,
    fontWeight: Typography.weight.medium,
  },
  featureSep: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    marginTop: 11,
  },
});
