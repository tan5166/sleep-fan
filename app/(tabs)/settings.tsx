// app/(tabs)/settings.tsx
import { ThemedText } from "@/components/ThemedText";
import { SettingItem } from "@/components/settings/SettingItem";
import { SettingSection } from "@/components/settings/SettingSection";
import { Separator } from "@/components/ui/Separator";
import { Switch } from "@/components/ui/Switch";
import { settingsConfig } from "@/constants/settingsConfig";
import { useSettings } from "@/hooks/useSettings";
import { Ionicons } from "@expo/vector-icons";
import { Linking, ScrollView, View } from "react-native";

/**
 * Settings Screen
 * Displays app settings organized in sections with a clean, modern UI
 */
export default function SettingsScreen() {
  const { settings, toggleTheme } = useSettings();

  /**
   * Get the appropriate handler for each setting
   */
  const getSettingHandler = (id: string) => {
    switch (id) {
      case "theme":
        return toggleTheme;
      default:
        return undefined;
    }
  };

  /**
   * Handle link opening for link-type settings
   */
  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  /**
   * Get the current value for switch settings
   */
  const getSettingValue = (id: string): boolean => {
    switch (id) {
      case "theme":
        return settings.theme;
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
    const IconComponent = ({ size = 20 }: { size?: number }) => (
      <Ionicons name={iconName as any} size={size} />
    );
    IconComponent.displayName = `Icon-${id}`;
    return IconComponent;
  };

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
    >
      <View className="gap-5">
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
                    onPress={
                      item.type === "link" && item.url
                        ? () => handleLinkPress(item.url!)
                        : undefined
                    }
                    rightComponent={
                      item.type === "switch" ? (
                        <Switch
                          checked={getSettingValue(item.id)}
                          onCheckedChange={getSettingHandler(item.id)!}
                          className="ml-2"
                        />
                      ) : item.type === "link" ? (
                        <ThemedText colorType="icon" className="ml-2">
                          <Ionicons name="chevron-forward" size={20} />
                        </ThemedText>
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
