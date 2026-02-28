import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ActiveWorkoutProvider } from "../contexts/ActiveWorkoutContext";
import { CreateRoutineProvider } from "../contexts/CreateRoutineContext";
import { I18nProvider } from "../contexts/I18nContext";
import { ThemeProvider } from "../contexts/ThemeContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }} onLayout={() => SplashScreen.hideAsync()}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <I18nProvider>
          <ThemeProvider>
            <ActiveWorkoutProvider>
              <CreateRoutineProvider>
              <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: "#0B0D0E" }}>
                  <Stack
                    screenOptions={{
                      headerShown: false,
                      contentStyle: { backgroundColor: "#0B0D0E" },
                    }}
                  >
                    <Stack.Screen name="index" />
                    <Stack.Screen name="OnBoarding" />
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="exercise-picker/index" />
                    <Stack.Screen name="create-routine/index" />
                    <Stack.Screen name="settings/index" />
                    <Stack.Screen name="settings/edit-profile" />
                    <Stack.Screen name="settings/change-password" />
                    <Stack.Screen name="settings/help-center" />
                    <Stack.Screen name="settings/about" />
                    <Stack.Screen name="settings/terms" />
                    <Stack.Screen name="settings/privacy" />
                    <Stack.Screen name="user/follows/[id]" />
                    <Stack.Screen name="schedule/[date]" />
                    <Stack.Screen name="get-started/fitness-goal" />
                    <Stack.Screen name="get-started/experience-level" />
                    <Stack.Screen name="get-started/body-metrics" />
                    <Stack.Screen name="get-started/workout-frequency" />
                    <Stack.Screen name="get-started/focus-areas" />
                  </Stack>
                </SafeAreaView>
              </SafeAreaProvider>
            </CreateRoutineProvider>
          </ActiveWorkoutProvider>
        </ThemeProvider>
        </I18nProvider>
      </GestureHandlerRootView>
    </View>
  );
}
