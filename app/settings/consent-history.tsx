import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Header } from '@/components/layout/Header';
import { useConsentStore } from '@/store/consentStore';
import { LEGAL_DOCUMENTS } from '@/data/legalDocuments';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';
import type { ConsentDocumentType } from '@/types';

export default function ConsentHistoryScreen() {
  const { t } = useTranslation();
  const { records, recordConsent } = useConsentStore();

  const handleRevoke = (type: ConsentDocumentType, isRequired: boolean) => {
    if (isRequired) {
      Alert.alert(t('consent.cannot_revoke_title'), t('consent.cannot_revoke_desc'));
      return;
    }
    Alert.alert(t('consent.revoke_title'), t('consent.revoke_confirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('consent.revoke_btn'),
        style: 'destructive',
        onPress: () => recordConsent(type, 'declined'),
      },
    ]);
  };

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('settings.consent_history')} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.desc}>{t('consent.history_desc')}</Text>

        {LEGAL_DOCUMENTS.map((doc) => {
          const record = records[doc.type as ConsentDocumentType];
          const status = record?.status ?? 'pending';
          const date = record?.recordedAt
            ? new Date(record.recordedAt).toLocaleDateString()
            : null;

          return (
            <Card key={doc.type} style={styles.docCard}>
              <View style={styles.docHeader}>
                <Text style={styles.docTitle}>{doc.titleTr}</Text>
                <Badge
                  label={status}
                  variant={status === 'accepted' ? 'success' : status === 'declined' ? 'danger' : 'default'}
                  small
                />
              </View>
              <View style={styles.docMeta}>
                <Text style={styles.docType}>
                  {doc.isRequired ? t('consent.required_section') : t('consent.optional_section')}
                </Text>
                {date && (
                  <Text style={styles.docDate}>{date}</Text>
                )}
              </View>
              {status === 'accepted' && !doc.isRequired && (
                <TouchableOpacity
                  style={styles.revokeBtn}
                  onPress={() => handleRevoke(doc.type as ConsentDocumentType, doc.isRequired)}
                >
                  <Text style={styles.revokeBtnText}>{t('consent.revoke_btn')}</Text>
                </TouchableOpacity>
              )}
              {status !== 'accepted' && (
                <TouchableOpacity
                  style={styles.acceptBtn}
                  onPress={() => recordConsent(doc.type as ConsentDocumentType, 'accepted')}
                >
                  <Text style={styles.acceptBtnText}>{t('consent.accept')}</Text>
                </TouchableOpacity>
              )}
            </Card>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[3] },
  desc: { fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 20, paddingTop: Spacing[4] },
  docCard: { gap: Spacing[2] },
  docHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: Spacing[2] },
  docTitle: { flex: 1, fontSize: Typography.size.sm, fontWeight: Typography.weight.semibold, color: Colors.text.primary },
  docMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  docType: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  docDate: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  revokeBtn: { alignSelf: 'flex-start', paddingHorizontal: Spacing[3], paddingVertical: Spacing[1], borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Colors.status.error + '66' },
  revokeBtnText: { fontSize: Typography.size.xs, color: Colors.status.error },
  acceptBtn: { alignSelf: 'flex-start', paddingHorizontal: Spacing[3], paddingVertical: Spacing[1], borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Colors.accent.blue },
  acceptBtnText: { fontSize: Typography.size.xs, color: Colors.accent.blue },
});
