// hooks/useSettings.ts
import { useState, useCallback } from "react";
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

  const toggleTheme = useCallback(() => {
    toggleColorScheme();
    setSettings((prev) => ({ ...prev, theme: !prev.theme }));
  }, [toggleColorScheme]);

  return {
    settings,
    updateSetting,
    toggleTheme,
  };
}
