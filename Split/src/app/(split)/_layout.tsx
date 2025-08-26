import { Stack } from 'expo-router';

export default function SplitFlowLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleStyle: { fontWeight: '600', fontSize: 20 },
      }}
    >
      <Stack.Screen name="split" options={{ headerShown: false }} />
    </Stack>
  );
}