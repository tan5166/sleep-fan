import { TabButton } from "@/components/ui/TabButton";
import { useTabColor, useThemeColor } from "@/hooks/useColor";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React from "react";
import { View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function TabLayout() {
  const tabBarColor = useTabColor("tabBar");
  const { bottom } = useSafeAreaInsets();
  const { className: backgroundColor } = useThemeColor({}, "background");

  return (
    <SafeAreaView className={`flex-1 ${backgroundColor}`} edges={["top"]}>
      <Tabs>
        <View className="flex-1 px-4">
          <TabSlot />
        </View>
        <TabList
          style={{
            paddingBottom: bottom,
            height: 80 + bottom,
          }}
          className={["border-t-2", tabBarColor.background, tabBarColor.border]
            .filter(Boolean)
            .join(" ")}
        >
          <TabTrigger name="index" href="/" asChild>
            <TabButton icon={"house"} />
          </TabTrigger>
          <TabTrigger name="settings" href="/settings" asChild>
            <TabButton icon={"gear"} />
          </TabTrigger>
        </TabList>
      </Tabs>
    </SafeAreaView>
  );
}
