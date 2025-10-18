import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();

  // Initialize theme from AsyncStorage on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("@nativewind/theme");
        if (savedTheme === "dark" || savedTheme === "light") {
          setColorScheme(savedTheme);
        }
      } catch (error) {
        console.error("Failed to load theme from storage:", error);
      }
    };

    loadTheme();
  }, [setColorScheme]);

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
