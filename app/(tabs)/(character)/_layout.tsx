import { Stack } from 'expo-router';

export default function CharacterLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="details/[id]" />
    </Stack>
  );
}
