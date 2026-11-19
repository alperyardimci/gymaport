import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { I18nManager } from 'react-native';
import '@/i18n';
import { useAuthStore } from '@/store/authStore';
import { useSettingsStore } from '@/store/settingsStore';
import { useWorkoutStore } from '@/store/workoutStore';
import { useUserStore } from '@/store/userStore';
import { useConsentStore } from '@/store/consentStore';

export default function RootLayout() {
  const { initialize } = useAuthStore();
  const { loadFromStorage: loadSettings } = useSettingsStore();
  const { loadFromStorage: loadWorkouts } = useWorkoutStore();
  const { loadFromStorage: loadUser } = useUserStore();
  const { loadFromStorage: loadConsents } = useConsentStore();

  useEffect(() => {
    const setup = async () => {
      await Promise.all([
        loadSettings(),
        loadWorkouts(),
        loadUser(),
        loadConsents(),
        initialize(),
      ]);
    };
    setup();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="splash" />
        <Stack.Screen name="(auth)" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="(onboarding)" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="workout" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="exercise" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="learn" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="settings" options={{ animation: 'slide_from_right' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
