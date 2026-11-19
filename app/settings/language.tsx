import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/layout/Header';
import { useSettingsStore } from '@/store/settingsStore';
import { SUPPORTED_LANGUAGES } from '@/i18n';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';
import type { Language } from '@/types';

export default function LanguageSettingsScreen() {
  const { t } = useTranslation();
  const { language, setLanguage } = useSettingsStore();

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('settings.language')} showBack />
      <FlatList
        data={SUPPORTED_LANGUAGES}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isSelected = language === item.code;
          return (
            <TouchableOpacity
              style={[styles.langItem, isSelected && styles.langItemSelected]}
              onPress={() => setLanguage(item.code as Language)}
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingHorizontal: Spacing[5], gap: Spacing[3], paddingBottom: Spacing[10] },
  langItem: { flexDirection: 'row', alignItems: 'center', padding: Spacing[4], borderRadius: BorderRadius.xl, backgroundColor: Colors.bg.card, borderWidth: 1, borderColor: Colors.border.subtle, gap: Spacing[3] },
  langItemSelected: { borderColor: Colors.accent.blue, backgroundColor: Colors.accent.blueMuted },
  flag: { fontSize: 28 },
  langText: { flex: 1 },
  langNative: { fontSize: Typography.size.md, fontWeight: Typography.weight.semibold, color: Colors.text.primary },
  langNativeSelected: { color: Colors.accent.blue },
  langEnglish: { fontSize: Typography.size.sm, color: Colors.text.tertiary, marginTop: 2 },
});
