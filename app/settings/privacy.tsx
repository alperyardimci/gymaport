import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

const SECTIONS = [
  {
    titleKey: 'privacy.data_collection_title',
    bodyKey: 'privacy.data_collection_body',
  },
  {
    titleKey: 'privacy.data_use_title',
    bodyKey: 'privacy.data_use_body',
  },
  {
    titleKey: 'privacy.data_sharing_title',
    bodyKey: 'privacy.data_sharing_body',
  },
  {
    titleKey: 'privacy.data_rights_title',
    bodyKey: 'privacy.data_rights_body',
  },
  {
    titleKey: 'privacy.security_title',
    bodyKey: 'privacy.security_body',
  },
  {
    titleKey: 'privacy.contact_title',
    bodyKey: 'privacy.contact_body',
  },
];

export default function PrivacyScreen() {
  const { t } = useTranslation();

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('settings.privacy_policy')} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lastUpdated}>{t('privacy.last_updated')}: 2024-01-01</Text>

        {SECTIONS.map((section, i) => (
          <Card key={i} style={styles.section}>
            <Text style={styles.sectionTitle}>{t(section.titleKey)}</Text>
            <Text style={styles.sectionBody}>{t(section.bodyKey)}</Text>
          </Card>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[3] },
  lastUpdated: { fontSize: Typography.size.xs, color: Colors.text.tertiary, paddingTop: Spacing[4] },
  section: { gap: Spacing[2] },
  sectionTitle: { fontSize: Typography.size.sm, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  sectionBody: { fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 22 },
});
