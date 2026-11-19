import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Header } from '@/components/layout/Header';
import { useConsentStore } from '@/store/consentStore';
import { LEGAL_DOCUMENTS, REQUIRED_DOCUMENT_TYPES } from '@/data/legalDocuments';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';
import type { ConsentDocumentType } from '@/types';

interface DocumentItemProps {
  doc: (typeof LEGAL_DOCUMENTS)[0];
  status: 'pending' | 'accepted' | 'declined';
  onAccept: () => void;
  onDecline: () => void;
  onViewFull: () => void;
}

function DocumentItem({ doc, status, onAccept, onDecline, onViewFull }: DocumentItemProps) {
  const { t } = useTranslation();
  const isAccepted = status === 'accepted';
  const isDeclined = status === 'declined';

  return (
    <Card style={styles.docCard} variant={isAccepted ? 'accent' : 'default'}>
      <View style={styles.docHeader}>
        <View style={styles.docTitleRow}>
          <Text style={styles.docTitle}>{doc.titleTr}</Text>
          {doc.isRequired ? (
            <Badge label={t('consent.required_section')} variant="danger" small />
          ) : (
            <Badge label={t('consent.optional_section')} variant="default" small />
          )}
        </View>

        {isAccepted && (
          <View style={styles.acceptedRow}>
            <Ionicons name="checkmark-circle" size={16} color={Colors.status.success} />
            <Text style={styles.acceptedText}>{t('consent.accept')}</Text>
          </View>
        )}
      </View>

      <TouchableOpacity onPress={onViewFull} style={styles.viewFullRow}>
        <Text style={styles.viewFullText}>{t('consent.view_document')}</Text>
        <Ionicons name="chevron-forward" size={14} color={Colors.accent.blue} />
      </TouchableOpacity>

      <View style={styles.docActions}>
        <Button
          title={t('consent.accept')}
          onPress={onAccept}
          variant={isAccepted ? 'primary' : 'outline'}
          size="sm"
          style={styles.actionBtn}
        />
        {!doc.isRequired && (
          <Button
            title={t('consent.decline')}
            onPress={onDecline}
            variant={isDeclined ? 'danger' : 'ghost'}
            size="sm"
            style={styles.actionBtn}
          />
        )}
      </View>
    </Card>
  );
}

export default function ConsentScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { recordConsent, records } = useConsentStore();
  const [viewingDoc, setViewingDoc] = useState<(typeof LEGAL_DOCUMENTS)[0] | null>(null);

  const requiredDocs = LEGAL_DOCUMENTS.filter((d) => d.isRequired);
  const optionalDocs = LEGAL_DOCUMENTS.filter((d) => !d.isRequired);

  const allRequiredAccepted = requiredDocs.every(
    (d) => records[d.type as ConsentDocumentType]?.status === 'accepted'
  );

  const handleContinue = () => {
    if (!allRequiredAccepted) {
      Alert.alert('Required Consents', 'Please accept all required consents to continue.');
      return;
    }
    router.replace('/(onboarding)/profile');
  };

  if (viewingDoc) {
    return (
      <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
        <Header
          title={viewingDoc.titleTr}
          showBack
          onBack={() => setViewingDoc(null)}
        />
        <ScrollView contentContainerStyle={styles.docContent}>
          <Text style={styles.docFullText}>{viewingDoc.contentTr}</Text>
          <View style={styles.docFullActions}>
            <Button
              title={t('consent.accept')}
              onPress={() => {
                recordConsent(viewingDoc.type as ConsentDocumentType, 'accepted');
                setViewingDoc(null);
              }}
              fullWidth
              size="lg"
            />
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('consent.title')} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{t('consent.subtitle')}</Text>

        {/* Required */}
        <Text style={styles.sectionTitle}>{t('consent.required_section')}</Text>
        {requiredDocs.map((doc) => (
          <DocumentItem
            key={doc.type}
            doc={doc}
            status={(records[doc.type as ConsentDocumentType]?.status as 'pending' | 'accepted' | 'declined') ?? 'pending'}
            onAccept={() => recordConsent(doc.type as ConsentDocumentType, 'accepted')}
            onDecline={() => {}}
            onViewFull={() => setViewingDoc(doc)}
          />
        ))}

        {/* Optional */}
        <Text style={styles.sectionTitle}>{t('consent.optional_section')}</Text>
        <Text style={styles.optionalDesc}>{t('consent.optional_desc')}</Text>
        {optionalDocs.map((doc) => (
          <DocumentItem
            key={doc.type}
            doc={doc}
            status={(records[doc.type as ConsentDocumentType]?.status as 'pending' | 'accepted' | 'declined') ?? 'pending'}
            onAccept={() => recordConsent(doc.type as ConsentDocumentType, 'accepted')}
            onDecline={() => recordConsent(doc.type as ConsentDocumentType, 'declined')}
            onViewFull={() => setViewingDoc(doc)}
          />
        ))}

        <Button
          title={t('common.continue')}
          onPress={handleContinue}
          disabled={!allRequiredAccepted}
          fullWidth
          size="lg"
          style={styles.continueBtn}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[3], paddingTop: Spacing[4] },
  subtitle: { fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 20 },
  sectionTitle: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.bold,
    color: Colors.text.secondary,
    letterSpacing: Typography.letterSpacing.caps,
    textTransform: 'uppercase',
    marginTop: Spacing[4],
    marginBottom: Spacing[1],
  },
  optionalDesc: { fontSize: Typography.size.xs, color: Colors.text.tertiary, marginBottom: Spacing[2] },
  docCard: { gap: Spacing[3] },
  docHeader: { gap: Spacing[2] },
  docTitleRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: Spacing[2] },
  docTitle: { flex: 1, fontSize: Typography.size.sm, fontWeight: Typography.weight.semibold, color: Colors.text.primary },
  acceptedRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  acceptedText: { fontSize: Typography.size.xs, color: Colors.status.success, fontWeight: Typography.weight.medium },
  viewFullRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewFullText: { fontSize: Typography.size.xs, color: Colors.accent.blue },
  docActions: { flexDirection: 'row', gap: Spacing[3] },
  actionBtn: { flex: 1 },
  continueBtn: { marginTop: Spacing[4] },
  docContent: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10] },
  docFullText: { fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 22, paddingTop: Spacing[4] },
  docFullActions: { marginTop: Spacing[6] },
});
