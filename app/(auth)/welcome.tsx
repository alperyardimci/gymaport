import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { AirplaneIcon } from '@/components/splash/AirplaneIcon';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <LinearGradient
      colors={[Colors.bg.primary, '#0A1020', Colors.bg.secondary]}
      style={styles.container}
    >
      {/* Background decorative circles */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />

      {/* Top logo area */}
      <View style={styles.logoSection}>
        <AirplaneIcon size={72} color={Colors.accent.blue} accentColor={Colors.accent.gold} />
        <Text style={styles.appName}>GYMAPORT</Text>
        <View style={styles.sloganRow}>
          <View style={styles.sloganLine} />
          <Text style={styles.slogan}>{t('app.slogan')}</Text>
          <View style={styles.sloganLine} />
        </View>
      </View>

      {/* Hero taglines */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTag}>Take off to your strongest self.</Text>
        <Text style={styles.heroSubtag}>Every rep takes you higher.</Text>
        <Text style={styles.heroSubtag}>Your transformation starts at the gate.</Text>
      </View>

      {/* CTA Buttons */}
      <View style={styles.ctaSection}>
        <Button
          title={t('auth.sign_up')}
          onPress={() => router.push('/(auth)/register')}
          size="lg"
          fullWidth
        />

        <Button
          title={t('auth.sign_in')}
          onPress={() => router.push('/(auth)/login')}
          variant="outline"
          size="lg"
          fullWidth
        />

        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>{t('common.or')}</Text>
          <View style={styles.orLine} />
        </View>

        <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
          <Text style={styles.socialIcon}>G</Text>
          <Text style={styles.socialText}>{t('auth.continue_google')}</Text>
        </TouchableOpacity>
      </View>

      {/* Legal links */}
      <View style={styles.legalRow}>
        <Text style={styles.legalText}>{t('auth.terms_agree')} </Text>
        <TouchableOpacity>
          <Text style={styles.legalLink}>{t('auth.terms')}</Text>
        </TouchableOpacity>
        <Text style={styles.legalText}> {t('common.and')} </Text>
        <TouchableOpacity>
          <Text style={styles.legalLink}>{t('auth.privacy')}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing[6],
    justifyContent: 'space-between',
    paddingVertical: Spacing[12],
  },
  bgCircle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.accent.blue,
    opacity: 0.04,
    top: -80,
    right: -80,
  },
  bgCircle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.accent.gold,
    opacity: 0.04,
    bottom: 100,
    left: -60,
  },
  logoSection: {
    alignItems: 'center',
    gap: Spacing[3],
    marginTop: Spacing[6],
  },
  appName: {
    fontSize: Typography.size['4xl'],
    fontWeight: Typography.weight.black,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.widest,
  },
  sloganRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  sloganLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.accent.blue,
    opacity: 0.4,
  },
  slogan: {
    fontSize: Typography.size.xs,
    color: Colors.accent.blue,
    fontWeight: Typography.weight.semibold,
    letterSpacing: Typography.letterSpacing.caps,
  },
  heroSection: {
    alignItems: 'center',
    gap: Spacing[2],
  },
  heroTag: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold,
    color: Colors.text.primary,
    textAlign: 'center',
    letterSpacing: Typography.letterSpacing.tight,
  },
  heroSubtag: {
    fontSize: Typography.size.base,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
  ctaSection: {
    gap: Spacing[3],
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    marginVertical: Spacing[1],
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border.subtle,
  },
  orText: {
    color: Colors.text.tertiary,
    fontSize: Typography.size.sm,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border.default,
    backgroundColor: Colors.bg.card,
    gap: Spacing[3],
  },
  socialIcon: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold,
    color: '#4285F4',
  },
  socialText: {
    fontSize: Typography.size.base,
    color: Colors.text.primary,
    fontWeight: Typography.weight.medium,
  },
  legalRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  legalText: {
    fontSize: Typography.size.xs,
    color: Colors.text.tertiary,
  },
  legalLink: {
    fontSize: Typography.size.xs,
    color: Colors.accent.blue,
    textDecorationLine: 'underline',
  },
});
