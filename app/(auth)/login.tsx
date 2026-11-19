import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform, Dimensions, TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { HeroPlane } from '@/components/splash/HeroPlane';
import { useAuthStore } from '@/store/authStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { signIn, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!email.trim()) e.email = t('auth.required_field');
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = t('auth.invalid_email');
    if (!password) e.password = t('auth.required_field');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    const { error } = await signIn(email.trim(), password);
    if (error) Alert.alert(t('auth.login_failed'), error);
    else router.replace('/(tabs)');
  };

  const handleBiometric = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biyometrik doğrulama mevcut değil');
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'GYMAPORT\'a giriş yap',
      fallbackLabel: 'Şifre kullan',
    });
    if (result.success) router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Sky gradient */}
      <LinearGradient
        colors={['#0A1428', '#102248', '#1E3D7A', '#152040', '#0A0E1A']}
        locations={[0, 0.2, 0.4, 0.65, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Ambient glows */}
      <View style={styles.glowLeft} />
      <View style={styles.glowRight} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Back button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>

          {/* Mini hero section */}
          <View style={styles.heroSection}>
            <View style={styles.orbitRing} />
            <HeroPlane width={width * 0.82} height={width * 0.60} />
          </View>

          {/* Brand */}
          <View style={styles.brandRow}>
            <Text style={styles.brandName}>GYMAPORT</Text>
            <View style={styles.taglineRow}>
              <View style={styles.taglineLine} />
              <Text style={styles.tagline}>YOUR BODY, YOUR FLIGHT</Text>
              <View style={styles.taglineLine} />
            </View>
          </View>

          {/* Form card */}
          <View style={styles.formCard}>
            <LinearGradient
              colors={['rgba(15,27,48,0.95)', 'rgba(13,21,38,0.98)']}
              style={styles.formCardInner}
            >
              {/* Gold top bar */}
              <View style={styles.goldBar} />

              <Text style={styles.formTitle}>{t('auth.sign_in')}</Text>
              <Text style={styles.formSubtitle}>Uçuşuna devam et</Text>

              {/* Email field */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>{t('auth.email')}</Text>
                <View style={[styles.fieldRow, emailFocused && styles.fieldRowFocused, errors.email && styles.fieldRowError]}>
                  <Ionicons name="mail-outline" size={18} color={emailFocused ? Colors.accent.gold : Colors.text.tertiary} />
                  <TextInput
                    style={styles.fieldInput}
                    placeholder={t('auth.email_placeholder')}
                    placeholderTextColor={Colors.text.tertiary}
                    value={email}
                    onChangeText={(v) => { setEmail(v); setErrors((e) => ({ ...e, email: undefined })); }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                  />
                </View>
                {errors.email && <Text style={styles.fieldError}>{errors.email}</Text>}
              </View>

              {/* Password field */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>{t('auth.password')}</Text>
                <View style={[styles.fieldRow, passFocused && styles.fieldRowFocused, errors.password && styles.fieldRowError]}>
                  <Ionicons name="lock-closed-outline" size={18} color={passFocused ? Colors.accent.gold : Colors.text.tertiary} />
                  <TextInput
                    style={styles.fieldInput}
                    placeholder={t('auth.password_placeholder')}
                    placeholderTextColor={Colors.text.tertiary}
                    value={password}
                    onChangeText={(v) => { setPassword(v); setErrors((e) => ({ ...e, password: undefined })); }}
                    secureTextEntry={!showPassword}
                    onFocus={() => setPassFocused(true)}
                    onBlur={() => setPassFocused(false)}
                  />
                  <TouchableOpacity onPress={() => setShowPassword((s) => !s)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={18}
                      color={Colors.text.tertiary}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && <Text style={styles.fieldError}>{errors.password}</Text>}
              </View>

              {/* Forgot password */}
              <TouchableOpacity
                onPress={() => router.push('/(auth)/forgot-password')}
                style={styles.forgotRow}
              >
                <Text style={styles.forgotText}>{t('auth.forgot_password')}</Text>
              </TouchableOpacity>

              {/* Login button — Gold */}
              <TouchableOpacity
                style={[styles.loginBtn, isLoading && styles.loginBtnDisabled]}
                onPress={handleLogin}
                activeOpacity={0.85}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#FFB800', '#E8930A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.loginBtnGrad}
                >
                  {isLoading ? (
                    <Text style={styles.loginBtnText}>Giriş yapılıyor...</Text>
                  ) : (
                    <>
                      <Ionicons name="log-in-outline" size={20} color="#0A0E1A" />
                      <Text style={styles.loginBtnText}>{t('auth.sign_in')}</Text>
                      <Ionicons name="chevron-forward" size={18} color="#0A0E1A" />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Biometric */}
              <TouchableOpacity style={styles.biometricBtn} onPress={handleBiometric}>
                <Ionicons name="finger-print-outline" size={20} color="#fff" />
                <Text style={styles.biometricText}>{t('auth.biometric_login')}</Text>
              </TouchableOpacity>

              {/* Register link */}
              <View style={styles.registerRow}>
                <Text style={styles.registerText}>{t('auth.no_account')} </Text>
                <TouchableOpacity onPress={() => router.replace('/(auth)/register')}>
                  <Text style={styles.registerLink}>{t('auth.sign_up')}</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E1A' },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, paddingBottom: 32 },

  glowLeft: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#1E6ACC',
    opacity: 0.15,
    top: 40,
    left: -50,
    transform: [{ scaleX: 1.5 }],
  },
  glowRight: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E8930A',
    opacity: 0.1,
    top: 80,
    right: -30,
  },

  backBtn: {
    position: 'absolute',
    top: 52,
    left: Spacing[4],
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Hero
  heroSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 44,
    overflow: 'hidden',
  },
  orbitRing: {
    position: 'absolute',
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: width * 0.425,
    borderWidth: 1,
    borderColor: 'rgba(100,160,255,0.18)',
    top: -width * 0.2,
  },

  // Brand
  brandRow: { alignItems: 'center', gap: 4, marginTop: Spacing[2], paddingHorizontal: Spacing[6] },
  brandName: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 5,
    textShadowColor: 'rgba(30,144,255,0.35)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 16,
  },
  taglineRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2] },
  taglineLine: { flex: 1, height: 1, backgroundColor: Colors.accent.gold, opacity: 0.45 },
  tagline: { fontSize: 9, color: '#fff', letterSpacing: 2.5, fontWeight: '600', opacity: 0.8 },

  // Form card
  formCard: {
    marginHorizontal: Spacing[4],
    marginTop: Spacing[5],
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,184,0,0.2)',
  },
  formCardInner: { padding: Spacing[5], gap: Spacing[4] },
  goldBar: { height: 2, backgroundColor: Colors.accent.gold, borderRadius: 1, opacity: 0.8, marginBottom: Spacing[1] },
  formTitle: { fontSize: Typography.size.xl, fontWeight: '800', color: '#fff' },
  formSubtitle: { fontSize: Typography.size.sm, color: Colors.text.secondary, marginTop: -Spacing[2] },

  // Fields
  fieldGroup: { gap: 6 },
  fieldLabel: { fontSize: Typography.size.xs, fontWeight: '600', color: Colors.text.secondary, letterSpacing: 0.5 },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    paddingHorizontal: Spacing[4],
    height: 52,
  },
  fieldRowFocused: { borderColor: Colors.accent.gold, backgroundColor: 'rgba(255,184,0,0.07)' },
  fieldRowError: { borderColor: Colors.status.danger },
  fieldInput: { flex: 1, fontSize: Typography.size.base, color: '#fff' },
  fieldError: { fontSize: Typography.size.xs, color: Colors.status.danger },

  forgotRow: { alignSelf: 'flex-end', marginTop: -Spacing[2] },
  forgotText: { fontSize: Typography.size.sm, color: Colors.accent.gold },

  // Login button
  loginBtn: {
    borderRadius: 50,
    overflow: 'hidden',
    shadowColor: Colors.accent.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  loginBtnDisabled: { opacity: 0.6 },
  loginBtnGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: Spacing[6],
    gap: Spacing[2],
  },
  loginBtnText: { flex: 1, textAlign: 'center', fontSize: Typography.size.md, fontWeight: '800', color: '#0A0E1A', letterSpacing: 0.5 },

  // Biometric
  biometricBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
    paddingVertical: 14,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  biometricText: { fontSize: Typography.size.sm, color: '#fff', fontWeight: '600' },

  // Register
  registerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  registerText: { fontSize: Typography.size.sm, color: Colors.text.secondary },
  registerLink: { fontSize: Typography.size.sm, color: Colors.accent.gold, fontWeight: '700' },
});
