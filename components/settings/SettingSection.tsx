// components/settings/SettingSection.tsx
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import type { ReactNode } from "react";
import { View } from "react-native";

export interface SettingSectionProps {
  /** Section title */
  title: string;
  /** Section content (typically SettingItem components) */
  children: ReactNode;
}

/**
 * A section container for grouping related settings
 */
export function SettingSection({ title, children }: SettingSectionProps) {
  return (
    <View className="gap-3">
      {/* Section title */}
      <ThemedText type="subtitle" colorType="textSecondary">
        {title}
      </ThemedText>

      {/* Section content card */}
      <ThemedView className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
        {children}
      </ThemedView>
    </View>
  );
}
