// components/settings/SettingItem.tsx
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import type { ComponentType } from "react";
import { Pressable, View } from "react-native";

export interface SettingItemProps {
  /** Icon component from @expo/vector-icons */
  icon: ComponentType<{ size?: number; color?: string }>;
  /** Main label text */
  label: string;
  /** Description or subtitle text */
  description: string;
  /** Optional right-side action component (e.g., Switch) */
  rightComponent?: React.ReactNode;
  /** Optional press handler for the entire row */
  onPress?: () => void;
}

export function SettingItem({
  icon: Icon,
  label,
  description,
  rightComponent,
  onPress,
}: SettingItemProps) {
  const content = (
    <ThemedView
      className="flex-row items-center justify-between p-4"
      colorType="sectionBackground"
    >
      {/* Left side: Icon and text */}
      <View className="flex-row items-center gap-3 flex-1">
        <ThemedView
          colorType="iconBackground"
          className="w-10 h-10 rounded-xl items-center justify-center"
        >
          <ThemedText colorType="icon">
            <Icon size={20} />
          </ThemedText>
        </ThemedView>

        {/* Text content */}
        <View className="flex-1">
          <ThemedText type="defaultMedium">{label}</ThemedText>
          <ThemedText
            className="mt-0.5"
            type="description"
            colorType="textSecondary"
          >
            {description}
          </ThemedText>
        </View>
      </View>

      {/* Right side: Action component */}
      {rightComponent && <View className="pl-2">{rightComponent}</View>}
    </ThemedView>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}
