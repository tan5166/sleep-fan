// hooks/useSettings.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useCallback, useEffect } from "react";
import { useColorScheme } from "nativewind";

export interface SettingsState {
  theme: boolean; // true = dark, false = light
  autoPlay: boolean;
  notifications: boolean;
}

/**
 * Hook to manage settings state
 * Centralizes settings logic for better maintainability
 */
export function useSettings() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [settings, setSettings] = useState<SettingsState>({
    theme: colorScheme === "dark",
    autoPlay: false,
    notifications: true,
  });

  // Sync theme state with colorScheme changes
  useEffect(() => {
    setSettings((prev) => ({ ...prev, theme: colorScheme === "dark" }));
  }, [colorScheme]);

  const updateSetting = useCallback(
    (key: keyof SettingsState, value: boolean) => {
      setSettings((prev) => ({ ...prev, [key]: value }));

      // Special handling for theme changes
      if (key === "theme") {
        toggleColorScheme();
      }
    },
    [toggleColorScheme]
  );

  const toggleTheme = useCallback(async () => {
    const newColorScheme = colorScheme === "dark" ? "light" : "dark";
    toggleColorScheme();

    // Save to AsyncStorage for persistence
    try {
      await AsyncStorage.setItem("@nativewind/theme", newColorScheme);
    } catch (error) {
      console.error("Failed to save theme to storage:", error);
    }
  }, [colorScheme, toggleColorScheme]);

  return {
    settings,
    updateSetting,
    toggleTheme,
  };
}
