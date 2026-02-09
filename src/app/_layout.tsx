import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0B0D0E" },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="OnBoarding" />
        <Stack.Screen name="Home" />
      </Stack>
    </SafeAreaProvider>
  );
}
