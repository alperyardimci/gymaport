import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/layout/Header';
import { useUserStore } from '@/store/userStore';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, BorderRadius } from '@/constants/theme';

type PhotoAngle = 'front' | 'back' | 'side_left' | 'side_right';

const PHOTO_SLOTS: { key: PhotoAngle; icon: string }[] = [
  { key: 'front', icon: 'person-outline' },
  { key: 'back', icon: 'person-outline' },
  { key: 'side_left', icon: 'person-outline' },
  { key: 'side_right', icon: 'person-outline' },
];

export default function BodyPhotosScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { addProgressPhoto } = useUserStore();

  const [photos, setPhotos] = useState<Record<string, string>>({});

  const pickPhoto = async (angle: PhotoAngle) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('common.permission_denied'), t('onboarding.photo_permission_desc'));
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setPhotos((prev) => ({ ...prev, [angle]: result.assets[0].uri }));
    }
  };

  const takePhoto = async (angle: PhotoAngle) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('common.permission_denied'), t('onboarding.photo_permission_desc'));
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setPhotos((prev) => ({ ...prev, [angle]: result.assets[0].uri }));
    }
  };

  const showOptions = (angle: PhotoAngle) => {
    Alert.alert(t('onboarding.add_photo'), '', [
      { text: t('onboarding.take_photo'), onPress: () => takePhoto(angle) },
      { text: t('onboarding.choose_library'), onPress: () => pickPhoto(angle) },
      { text: t('common.cancel'), style: 'cancel' },
    ]);
  };

  const handleContinue = () => {
    Object.entries(photos).forEach(([angle, uri]) => {
      addProgressPhoto({
        id: `photo_${Date.now()}_${angle}`,
        userId: '',
        url: uri,
        angle: angle as PhotoAngle,
        takenAt: new Date().toISOString(),
        isBaseline: true,
      });
    });
    router.replace('/(tabs)');
  };

  return (
    <LinearGradient colors={[Colors.bg.primary, Colors.bg.secondary]} style={styles.container}>
      <Header title={t('onboarding.photos_title')} showBack />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>{t('onboarding.photos_subtitle')}</Text>

        <Card style={styles.privacyCard} variant="accent">
          <View style={styles.privacyRow}>
            <Ionicons name="lock-closed" size={18} color={Colors.accent.blue} />
            <Text style={styles.privacyText}>{t('onboarding.photos_privacy')}</Text>
          </View>
        </Card>

        <View style={styles.photoGrid}>
          {PHOTO_SLOTS.map((slot) => {
            const uri = photos[slot.key];
            return (
              <TouchableOpacity
                key={slot.key}
                style={styles.photoSlot}
                onPress={() => showOptions(slot.key)}
                activeOpacity={0.8}
              >
                {uri ? (
                  <Image source={{ uri }} style={styles.photoImg} />
                ) : (
                  <View style={styles.photoEmpty}>
                    <Ionicons name="add-circle-outline" size={32} color={Colors.text.tertiary} />
                    <Text style={styles.photoEmptyLabel}>{t(`onboarding.angle_${slot.key}`)}</Text>
                  </View>
                )}
                {uri && (
                  <View style={styles.photoLabel}>
                    <Text style={styles.photoLabelText}>{t(`onboarding.angle_${slot.key}`)}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <Button
          title={t('common.continue')}
          onPress={handleContinue}
          fullWidth
          size="lg"
          style={styles.continueBtn}
        />
        <TouchableOpacity onPress={handleContinue} style={styles.skipBtn}>
          <Text style={styles.skipText}>{t('onboarding.skip_photos')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing[5], paddingBottom: Spacing[10], gap: Spacing[5], paddingTop: Spacing[4] },
  subtitle: { fontSize: Typography.size.base, color: Colors.text.secondary },
  privacyCard: { gap: 0 },
  privacyRow: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing[2] },
  privacyText: { flex: 1, fontSize: Typography.size.xs, color: Colors.text.secondary, lineHeight: 18 },
  photoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing[3] },
  photoSlot: {
    width: '47%',
    aspectRatio: 3 / 4,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  photoEmpty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing[2] },
  photoEmptyLabel: { fontSize: Typography.size.xs, color: Colors.text.tertiary },
  photoImg: { width: '100%', height: '100%' },
  photoLabel: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.6)', paddingVertical: 4, paddingHorizontal: 8 },
  photoLabelText: { fontSize: Typography.size.xs, color: '#fff', textAlign: 'center' },
  continueBtn: {},
  skipBtn: { alignSelf: 'center', paddingVertical: Spacing[2] },
  skipText: { fontSize: Typography.size.sm, color: Colors.text.tertiary, textDecorationLine: 'underline' },
});
