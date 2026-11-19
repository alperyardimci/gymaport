import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="language" />
      <Stack.Screen name="consent" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="fitness-goals" />
      <Stack.Screen name="health-check" />
      <Stack.Screen name="schedule" />
      <Stack.Screen name="training-split" />
      <Stack.Screen name="body-photos" />
    </Stack>
  );
}
