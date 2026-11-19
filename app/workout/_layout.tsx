import { Stack } from 'expo-router';

export default function WorkoutLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="[id]" />
      <Stack.Screen name="active" options={{ animation: 'slide_from_bottom', presentation: 'fullScreenModal' }} />
    </Stack>
  );
}
