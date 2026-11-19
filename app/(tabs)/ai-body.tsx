import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useUserStore } from '@/store/userStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

const MUSCLE_GROUPS = [
  { key: 'chest', label: 'Chest', score: 68 },
  { key: 'back', label: 'Back', score: 72 },
  { key: 'shoulders', label: 'Shoulders', score: 55 },
  { key: 'biceps', label: 'Biceps', score: 60 },
  { key: 'triceps', label: 'Triceps', score: 58 },
  { key: 'core', label: 'Core', score: 45 },
  { key: 'quads', label: 'Quads', score: 70 },
  { key: 'hamstrings', label: 'Hamstrings', score: 62 },
  { key: 'glutes', label: 'Glutes', score: 65 },
];

const BODY_FAT_RANGES = [
  { label: 'Essential', min: 2, max: 5, color: '#ef4444' },
  { label: 'Athletic', min: 6, max: 13, color: '#22c55e' },
  { label: 'Fitness', min: 14, max: 17, color: Colors.accent.blue },
  { label: 'Average', min: 18, max: 24, color: Colors.accent.gold },
  { label: 'Obese', min: 25, max: 100, color: '#ef4444' },
];

export default function AIBodyScreen() {
  const { t } = useTranslation();
  const { progressPhotos, addProgressPhoto } = useUserStore();

  const [analysisPhoto, setAnalysisPhoto] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const baselinePhotos = progressPhotos.filter((p) => p.isBaseline);
  const latestPhoto = progressPhotos[progressPhotos.length - 1];

  const mockAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2500);
  };

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });
    if (!result.canceled) {
      setAnalysisPhoto(result.assets[0].uri);
      setAnalyzed(false);
    }
  };

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('ai_body.title')}</Text>
        <Badge label="BETA" variant="accent" small />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Upload section */}
        <Card style={styles.uploadCard}>
          <Text style={styles.uploadTitle}>{t('ai_body.upload_title')}</Text>
          <Text style={styles.uploadDesc}>{t('ai_body.upload_desc')}</Text>

          <TouchableOpacity style={styles.photoArea} onPress={pickPhoto} activeOpacity={0.7}>
            {analysisPhoto ? (
              <Image source={{ uri: analysisPhoto }} style={styles.analysisImg} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera-outline" size={40} color={Colors.text.tertiary} />
                <Text style={styles.photoPlaceholderText}>{t('ai_body.tap_to_upload')}</Text>
              </View>
            )}
          </TouchableOpacity>

          {analysisPhoto && !analyzed && (
            <Button
              title={analyzing ? t('ai_body.analyzing') : t('ai_body.analyze_btn')}
              onPress={mockAnalyze}
              loading={analyzing}
              fullWidth
              size="lg"
              variant="primary"
            />
          )}
        </Card>

        {/* Analysis results */}
        {analyzed && (
          <>
            <Card style={styles.overviewCard} variant="accent">
              <Text style={styles.overviewTitle}>{t('ai_body.overview_title')}</Text>
              <View style={styles.overviewStats}>
                <View style={styles.overviewStat}>
                  <Text style={styles.overviewValue}>~15%</Text>
                  <Text style={styles.overviewLabel}>{t('ai_body.body_fat')}</Text>
                  <Badge label="Fitness" variant="accent" small />
                </View>
                <View style={styles.overviewStat}>
                  <Text style={styles.overviewValue}>~75kg</Text>
                  <Text style={styles.overviewLabel}>{t('ai_body.lean_mass')}</Text>
                </View>
                <View style={styles.overviewStat}>
                  <Text style={styles.overviewValue}>7.2/10</Text>
                  <Text style={styles.overviewLabel}>{t('ai_body.symmetry')}</Text>
                </View>
              </View>
            </Card>

            <Card style={styles.muscleCard}>
              <Text style={styles.sectionTitle}>{t('ai_body.muscle_development')}</Text>
              {MUSCLE_GROUPS.map((mg) => (
                <View key={mg.key} style={styles.muscleRow}>
                  <Text style={styles.muscleLabel}>{mg.label}</Text>
                  <ProgressBar progress={mg.score} style={styles.muscleBar} />
                  <Text style={styles.muscleScore}>{mg.score}</Text>
                </View>
              ))}
            </Card>

            <Card style={styles.recommendCard}>
              <Text style={styles.sectionTitle}>{t('ai_body.recommendations')}</Text>
              {[
                { icon: 'barbell-outline', text: t('ai_body.rec_core'), priority: 'high' },
                { icon: 'nutrition-outline', text: t('ai_body.rec_protein'), priority: 'medium' },
                { icon: 'body-outline', text: t('ai_body.rec_shoulders'), priority: 'medium' },
                { icon: 'bed-outline', text: t('ai_body.rec_recovery'), priority: 'low' },
              ].map((rec, i) => (
                <View key={i} style={styles.recRow}>
                  <Ionicons name={rec.icon as any} size={18} color={Colors.accent.blue} />
                  <Text style={styles.recText}>{rec.text}</Text>
                  <Badge
                    label={rec.priority}
                    variant={rec.priority === 'high' ? 'danger' : rec.priority === 'medium' ? 'warning' : 'default'}
                    small
                  />
                </View>
              ))}
            </Card>
          </>
        )}

        {/* Progress photos */}
        <Text style={styles.sectionTitle}>{t('ai_body.progress_photos')}</Text>
        {progressPhotos.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Ionicons name="camera-outline" size={40} color={Colors.text.tertiary} />
            <Text style={styles.emptyText}>{t('ai_body.no_photos')}</Text>
          </Card>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.photoStrip}>
            {progressPhotos.map((photo) => (
              <Image key={photo.id} source={{ uri: photo.url }} style={styles.stripPhoto} />
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2], paddingHorizontal: Spacing[5], paddingTop: 56, paddingBottom: Spacing[3] },
  title: { fontSize: Typography.size['2xl'], fontWeight: Typography.weight.bold, color: Colors.text.primary },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[4] },
  uploadCard: { gap: Spacing[3] },
  uploadTitle: { fontSize: Typography.size.md, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  uploadDesc: { fontSize: Typography.size.sm, color: Colors.text.secondary },
  photoArea: { borderRadius: BorderRadius.xl, overflow: 'hidden', backgroundColor: Colors.bg.input, borderWidth: 1, borderColor: Colors.border.default, aspectRatio: 3 / 4, maxHeight: 320 },
  photoPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing[2] },
  photoPlaceholderText: { fontSize: Typography.size.sm, color: Colors.text.tertiary },
  analysisImg: { width: '100%', height: '100%' },
  overviewCard: { gap: Spacing[3] },
  overviewTitle: { fontSize: Typography.size.md, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  overviewStats: { flexDirection: 'row', justifyContent: 'space-around' },
  overviewStat: { alignItems: 'center', gap: 4 },
  overviewValue: { fontSize: Typography.size.xl, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  overviewLabel: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  muscleCard: { gap: Spacing[3] },
  sectionTitle: { fontSize: Typography.size.sm, fontWeight: Typography.weight.bold, color: Colors.text.primary },
  muscleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing[2] },
  muscleLabel: { width: 90, fontSize: Typography.size.xs, color: Colors.text.secondary },
  muscleBar: { flex: 1 },
  muscleScore: { width: 28, fontSize: Typography.size.xs, color: Colors.text.tertiary, textAlign: 'right' },
  recommendCard: { gap: Spacing[3] },
  recRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing[2] },
  recText: { flex: 1, fontSize: Typography.size.sm, color: Colors.text.secondary, lineHeight: 20 },
  emptyCard: { alignItems: 'center', gap: Spacing[2], paddingVertical: Spacing[6] },
  emptyText: { fontSize: Typography.size.sm, color: Colors.text.tertiary },
  photoStrip: { gap: Spacing[3], paddingVertical: 4 },
  stripPhoto: { width: 100, height: 133, borderRadius: BorderRadius.lg },
});
