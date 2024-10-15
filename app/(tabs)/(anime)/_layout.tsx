import { Stack } from 'expo-router';

export default function AnimeLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]/details" />
    </Stack>
  );
}
