import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Header } from '@/components/layout/Header';
import { useAuthStore } from '@/store/authStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing } from '@/constants/theme';

export default function RegisterScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { signUp, isLoading } = useAuthStore();

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const update = (key: keyof typeof form) => (val: string) => setForm((f) => ({ ...f, [key]: val }));

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.firstName.trim()) e.firstName = t('auth.required_field');
    if (!form.lastName.trim()) e.lastName = t('auth.required_field');
    if (!form.email.trim()) e.email = t('auth.required_field');
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = t('auth.invalid_email');
    if (!form.password) e.password = t('auth.required_field');
    else if (form.password.length < 8) e.password = t('auth.password_too_short');
    if (form.password !== form.confirmPassword) e.confirmPassword = t('auth.passwords_dont_match');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    const { error } = await signUp(form.email.trim(), form.password, form.firstName.trim(), form.lastName.trim());
    if (error) {
      Alert.alert(t('auth.register_failed'), error);
    } else {
      router.replace('/(onboarding)/language');
    }
  };

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('auth.sign_up')} showBack />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.headingRow}>
            <Text style={styles.heading}>{t('auth.welcome')}</Text>
            <Text style={styles.subheading}>Create your account and start your flight.</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.half}>
                <Input label={t('auth.first_name')} placeholder="John" value={form.firstName} onChangeText={update('firstName')} autoCapitalize="words" leftIcon="person-outline" error={errors.firstName} />
              </View>
              <View style={styles.half}>
                <Input label={t('auth.last_name')} placeholder="Doe" value={form.lastName} onChangeText={update('lastName')} autoCapitalize="words" leftIcon="person-outline" error={errors.lastName} />
              </View>
            </View>

            <Input label={t('auth.email')} placeholder={t('auth.email_placeholder')} value={form.email} onChangeText={update('email')} keyboardType="email-address" autoCapitalize="none" leftIcon="mail-outline" error={errors.email} />

            <Input label={t('auth.phone')} placeholder="+1 (555) 000-0000" value={form.phone} onChangeText={update('phone')} keyboardType="phone-pad" leftIcon="call-outline" />

            <Input label={t('auth.password')} placeholder={t('auth.password_placeholder')} value={form.password} onChangeText={update('password')} isPassword leftIcon="lock-closed-outline" error={errors.password} hint="Minimum 8 characters" />

            <Input label={t('auth.confirm_password')} placeholder={t('auth.confirm_password_placeholder')} value={form.confirmPassword} onChangeText={update('confirmPassword')} isPassword leftIcon="lock-closed-outline" error={errors.confirmPassword} />
          </View>

          <Button title={t('auth.sign_up')} onPress={handleRegister} loading={isLoading} fullWidth size="lg" />

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>{t('auth.have_account')} </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text style={styles.loginLink}>{t('auth.sign_in')}</Text>
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
  content: { paddingHorizontal: Spacing[6], paddingBottom: Spacing[10], gap: Spacing[5] },
  headingRow: { paddingTop: Spacing[4], gap: Spacing[2] },
  heading: { fontSize: Typography.size['2xl'], fontWeight: Typography.weight.bold, color: Colors.text.primary },
  subheading: { fontSize: Typography.size.base, color: Colors.text.secondary },
  form: { gap: Spacing[4] },
  row: { flexDirection: 'row', gap: Spacing[3] },
  half: { flex: 1 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  loginText: { fontSize: Typography.size.sm, color: Colors.text.secondary },
  loginLink: { fontSize: Typography.size.sm, color: Colors.accent.blue, fontWeight: Typography.weight.semibold },
});
