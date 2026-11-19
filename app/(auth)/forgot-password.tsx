import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Header } from '@/components/layout/Header';
import { useAuthStore } from '@/store/authStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const { resetPassword, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError(t('auth.invalid_email'));
      return;
    }
    const { error: err } = await resetPassword(email.trim());
    if (err) Alert.alert('Error', err);
    else setSent(true);
  };

  if (sent) {
    return (
      <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
        <Header title={t('auth.reset_password')} showBack />
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={64} color={Colors.status.success} />
          </View>
          <Text style={styles.successTitle}>{t('auth.email_sent')}</Text>
          <Text style={styles.successDesc}>{t('auth.email_sent_desc')}</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('auth.reset_password')} showBack />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="lock-open-outline" size={48} color={Colors.accent.blue} />
        </View>
        <Text style={styles.heading}>{t('auth.forgot_password')}</Text>
        <Text style={styles.subheading}>Enter your email to receive a reset link.</Text>
        <Input
          label={t('auth.email')}
          placeholder={t('auth.email_placeholder')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon="mail-outline"
          error={error}
          containerStyle={styles.input}
        />
        <Button title={t('auth.reset_password')} onPress={handleReset} loading={isLoading} fullWidth size="lg" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: Spacing[6], paddingTop: Spacing[8], gap: Spacing[4] },
  iconContainer: { alignSelf: 'center', width: 80, height: 80, borderRadius: 40, backgroundColor: Colors.accent.blueMuted, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing[2] },
  heading: { fontSize: Typography.size['2xl'], fontWeight: Typography.weight.bold, color: Colors.text.primary },
  subheading: { fontSize: Typography.size.base, color: Colors.text.secondary },
  input: { marginTop: Spacing[2] },
  successContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing[6], gap: Spacing[4] },
  successIcon: { marginBottom: Spacing[2] },
  successTitle: { fontSize: Typography.size['2xl'], fontWeight: Typography.weight.bold, color: Colors.text.primary, textAlign: 'center' },
  successDesc: { fontSize: Typography.size.base, color: Colors.text.secondary, textAlign: 'center' },
});
