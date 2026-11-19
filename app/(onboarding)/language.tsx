import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { AirplaneIcon } from '@/components/splash/AirplaneIcon';
import { useSettingsStore } from '@/store/settingsStore';
import { SUPPORTED_LANGUAGES } from '@/i18n';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';
import type { Language } from '@/types';

export default function LanguageScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { language, setLanguage } = useSettingsStore();

  const handleSelect = async (code: Language) => {
    await setLanguage(code);
  };

  const handleContinue = () => {
    router.push('/(onboarding)/consent');
  };

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AirplaneIcon size={40} color={Colors.accent.blue} accentColor={Colors.accent.gold} />
        <Text style={styles.title}>{t('onboarding.language_title')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.language_subtitle')}</Text>
      </View>

      {/* Language list */}
      <FlatList
        data={SUPPORTED_LANGUAGES}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isSelected = language === item.code;
          return (
            <TouchableOpacity
              style={[styles.langItem, isSelected && styles.langItemSelected]}
              onPress={() => handleSelect(item.code as Language)}
              activeOpacity={0.7}
            >
              <Text style={styles.flag}>{item.flag}</Text>
              <View style={styles.langText}>
                <Text style={[styles.langNative, isSelected && styles.langNativeSelected]}>
                  {item.nativeName}
                </Text>
                <Text style={styles.langEnglish}>{item.name}</Text>
              </View>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={22} color={Colors.accent.blue} />
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* Continue */}
      <View style={styles.footer}>
        <Button
          title={t('common.continue')}
          onPress={handleContinue}
          size="lg"
          fullWidth
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: Spacing[6],
    paddingHorizontal: Spacing[6],
    gap: Spacing[3],
  },
  title: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.size.base,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: Spacing[6],
    gap: Spacing[3],
  },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing[4],
    borderRadius: BorderRadius.xl,
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    gap: Spacing[3],
  },
  langItemSelected: {
    borderColor: Colors.accent.blue,
    backgroundColor: Colors.accent.blueMuted,
  },
  flag: { fontSize: 28 },
  langText: { flex: 1 },
  langNative: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.semibold,
    color: Colors.text.primary,
  },
  langNativeSelected: { color: Colors.accent.blue },
  langEnglish: {
    fontSize: Typography.size.sm,
    color: Colors.text.tertiary,
    marginTop: 2,
  },
  footer: {
    padding: Spacing[6],
    paddingBottom: 40,
  },
});
