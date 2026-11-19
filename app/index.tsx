import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { useConsentStore } from '@/store/consentStore';
import { Colors } from '@/constants/Colors';

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, isLoading, isOnboardingComplete } = useAuthStore();
  const { hasCompletedRequiredConsents } = useConsentStore();

  useEffect(() => {
    if (isLoading) return;

    // Small delay for splash
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        router.replace('/splash');
      } else if (!hasCompletedRequiredConsents) {
        router.replace('/(onboarding)/consent');
      } else if (!isOnboardingComplete) {
        router.replace('/(onboarding)/language');
      } else {
        router.replace('/(tabs)');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, isOnboardingComplete, hasCompletedRequiredConsents]);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg.primary, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={Colors.accent.blue} size="large" />
    </View>
  );
}
