import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'JustSplit' }} />
      <Stack.Screen name="split" options={{ title: 'Split Bill' }} />
      <Stack.Screen name="history" options={{ title: 'History' }} />
      <Stack.Screen name="settings" options={{ title: 'Settings' }} />
    </Stack>
  )
}
