import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Header } from '@/components/layout/Header';
import { useAuthStore } from '@/store/authStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { signIn, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = t('auth.required_field');
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = t('auth.invalid_email');
    if (!password) newErrors.password = t('auth.required_field');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    const { error } = await signIn(email.trim(), password);
    if (error) {
      Alert.alert(t('auth.login_failed'), error);
    } else {
      router.replace('/(tabs)');
    }
  };

  const handleBiometric = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biometric authentication is not available');
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Log in to GYMAPORT',
      fallbackLabel: 'Use password',
    });
    if (result.success) {
      router.replace('/(tabs)');
    }
  };

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('auth.sign_in')} showBack />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.headingRow}>
            <Text style={styles.heading}>{t('auth.welcome_back')}</Text>
            <Text style={styles.subheading}>Log in to continue your flight.</Text>
          </View>

          <View style={styles.form}>
            <Input
              label={t('auth.email')}
              placeholder={t('auth.email_placeholder')}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              leftIcon="mail-outline"
              error={errors.email}
            />

            <Input
              label={t('auth.password')}
              placeholder={t('auth.password_placeholder')}
              value={password}
              onChangeText={setPassword}
              isPassword
              leftIcon="lock-closed-outline"
              error={errors.password}
            />

            <TouchableOpacity
              onPress={() => router.push('/(auth)/forgot-password')}
              style={styles.forgotRow}
            >
              <Text style={styles.forgotText}>{t('auth.forgot_password')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actions}>
            <Button
              title={t('auth.sign_in')}
              onPress={handleLogin}
              loading={isLoading}
              fullWidth
              size="lg"
            />

            <Button
              title={t('auth.biometric_login')}
              onPress={handleBiometric}
              variant="outline"
              fullWidth
              size="md"
            />
          </View>

          <View style={styles.registerRow}>
            <Text style={styles.registerText}>{t('auth.no_account')} </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/register')}>
              <Text style={styles.registerLink}>{t('auth.sign_up')}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  content: { paddingHorizontal: Spacing[6], paddingBottom: Spacing[10], gap: Spacing[6] },
  headingRow: { paddingTop: Spacing[4], gap: Spacing[2] },
  heading: { fontSize: Typography.size['3xl'], fontWeight: Typography.weight.bold, color: Colors.text.primary },
  subheading: { fontSize: Typography.size.base, color: Colors.text.secondary },
  form: { gap: Spacing[4] },
  forgotRow: { alignSelf: 'flex-end' },
  forgotText: { fontSize: Typography.size.sm, color: Colors.accent.blue },
  actions: { gap: Spacing[3] },
  registerRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  registerText: { fontSize: Typography.size.sm, color: Colors.text.secondary },
  registerLink: { fontSize: Typography.size.sm, color: Colors.accent.blue, fontWeight: Typography.weight.semibold },
});
