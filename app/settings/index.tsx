import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/layout/Header';
import { useSettingsStore } from '@/store/settingsStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { pushEnabled, setPushEnabled, unitSystem, setUnitSystem } = useSettingsStore();

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('settings.title')} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Preferences */}
        <Text style={styles.sectionLabel}>{t('settings.preferences')}</Text>
        <Card style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings/language')}>
            <Ionicons name="language-outline" size={20} color={Colors.accent.blue} />
            <Text style={styles.menuLabel}>{t('settings.language')}</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.text.tertiary} />
          </TouchableOpacity>

          <View style={styles.menuItemBorder} />

          <View style={styles.menuItem}>
            <Ionicons name="scale-outline" size={20} color={Colors.accent.blue} />
            <Text style={styles.menuLabel}>{t('settings.units')}</Text>
            <View style={styles.unitsToggle}>
              <TouchableOpacity
                style={[styles.unitBtn, unitSystem === 'metric' && styles.unitBtnActive]}
                onPress={() => setUnitSystem('metric')}
              >
                <Text style={[styles.unitText, unitSystem === 'metric' && styles.unitTextActive]}>KG/CM</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.unitBtn, unitSystem === 'imperial' && styles.unitBtnActive]}
                onPress={() => setUnitSystem('imperial')}
              >
                <Text style={[styles.unitText, unitSystem === 'imperial' && styles.unitTextActive]}>LB/IN</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.menuItemBorder} />

          <View style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={20} color={Colors.accent.blue} />
            <Text style={styles.menuLabel}>{t('settings.notifications')}</Text>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: Colors.border.default, true: Colors.accent.blue }}
              thumbColor="#fff"
            />
          </View>
        </Card>

        {/* Legal */}
        <Text style={styles.sectionLabel}>{t('settings.legal')}</Text>
        <Card style={styles.menuCard}>
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings/privacy')}>
            <Ionicons name="shield-outline" size={20} color={Colors.accent.blue} />
            <Text style={styles.menuLabel}>{t('settings.privacy_policy')}</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.text.tertiary} />
          </TouchableOpacity>
          <View style={styles.menuItemBorder} />
          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings/consent-history')}>
            <Ionicons name="document-text-outline" size={20} color={Colors.accent.blue} />
            <Text style={styles.menuLabel}>{t('settings.consent_history')}</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.text.tertiary} />
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[2] },
  sectionLabel: { fontSize: Typography.size.xs, fontWeight: Typography.weight.bold, color: Colors.text.tertiary, letterSpacing: Typography.letterSpacing.caps, textTransform: 'uppercase', marginTop: Spacing[4], marginBottom: Spacing[1] },
  menuCard: { gap: 0, padding: 0, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing[3], paddingHorizontal: Spacing[4], paddingVertical: Spacing[4] },
  menuItemBorder: { height: 1, backgroundColor: Colors.border.subtle, marginLeft: Spacing[12] },
  menuLabel: { flex: 1, fontSize: Typography.size.sm, color: Colors.text.primary, fontWeight: Typography.weight.medium },
  unitsToggle: { flexDirection: 'row', backgroundColor: Colors.bg.input, borderRadius: BorderRadius.sm, padding: 2 },
  unitBtn: { paddingHorizontal: Spacing[2], paddingVertical: 3, borderRadius: BorderRadius.xs },
  unitBtnActive: { backgroundColor: Colors.accent.blue },
  unitText: { fontSize: Typography.size.xs, color: Colors.text.tertiary, fontWeight: Typography.weight.semibold },
  unitTextActive: { color: '#fff' },
});
