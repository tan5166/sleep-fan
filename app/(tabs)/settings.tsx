// app/(tabs)/settings.tsx
import { ThemedText } from "@/components/ThemedText";
import { SettingItem } from "@/components/settings/SettingItem";
import { SettingSection } from "@/components/settings/SettingSection";
import { Separator } from "@/components/ui/Separator";
import { Switch } from "@/components/ui/Switch";
import { settingsConfig } from "@/config/settings.config";
import { useSettings } from "@/hooks/useSettings";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, View } from "react-native";

/**
 * Settings Screen
 * Displays app settings organized in sections with a clean, modern UI
 */
export default function SettingsScreen() {
  const { settings, updateSetting, toggleTheme } = useSettings();

  /**
   * Get the appropriate handler for each setting
   */
  const getSettingHandler = (id: string) => {
    switch (id) {
      case "theme":
        return toggleTheme;
      case "auto-play":
        return () => updateSetting("autoPlay", !settings.autoPlay);
      case "notifications":
        return () => updateSetting("notifications", !settings.notifications);
      default:
        return undefined;
    }
  };

  /**
   * Get the current value for switch settings
   */
  const getSettingValue = (id: string): boolean => {
    switch (id) {
      case "theme":
        return settings.theme;
      case "auto-play":
        return settings.autoPlay;
      case "notifications":
        return settings.notifications;
      default:
        return false;
    }
  };

  /**
   * Render the appropriate icon for each setting
   */
  const renderIcon = (id: string) => {
    const iconName = settingsConfig
      .flatMap((section) => section.items)
      .find((item) => item.id === id)?.icon;
    return ({ size = 20 }: { size?: number }) => (
      <Ionicons name={iconName as any} size={size} />
    );
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="pt-4" />
      <View className="gap-5 mb-5">
        {/* Header */}
        <View className="gap-2">
          <ThemedText type="title">Settings</ThemedText>
          <ThemedText type="subtitle" colorType="textSecondary">
            Personalize your app experience
          </ThemedText>
        </View>

        {/* Settings Sections */}
        <View className="gap-5">
          {settingsConfig.map((section) => (
            <SettingSection key={section.title} title={section.title}>
              {section.items.map((item, index) => (
                <View key={item.id}>
                  <SettingItem
                    icon={renderIcon(item.id)}
                    label={item.label}
                    description={item.description}
                    rightComponent={
                      item.type === "switch" ? (
                        <Switch
                          checked={getSettingValue(item.id)}
                          onCheckedChange={getSettingHandler(item.id)!}
                        />
                      ) : undefined
                    }
                  />
                  {/* Add separator between items except for the last one */}
                  {index < section.items.length - 1 && <Separator />}
                </View>
              ))}
            </SettingSection>
          ))}
        </View>

        {/* Footer */}
        <View>
          <ThemedText
            type="description"
            colorType="textTertiary"
            className="text-center"
          >
            A carefully crafted white noise app
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}
