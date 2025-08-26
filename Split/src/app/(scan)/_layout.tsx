import { Stack } from 'expo-router';

export default function ScanFlowLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleStyle: { fontWeight: '600', fontSize: 20 },
      }}
    >
      <Stack.Screen name="camera" options={{ headerShown: false }} />
      <Stack.Screen name="preview" options={{ headerShown: false }} />
      <Stack.Screen name="review" options={{ headerShown: false }} />
      <Stack.Screen name="assign" options={{ headerShown: false }} />
    </Stack>
  );
}