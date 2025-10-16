import { TabButton } from "@/components/ui/TabButton";
import { useTabColor, useThemeColor } from "@/hooks/useColor";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React from "react";
import { ScrollView, View } from "react-native";
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
        <View className="flex-1 px-5">
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="pt-4" />
            <TabSlot />
          </ScrollView>
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
            <TabButton icon={"fan"} />
          </TabTrigger>
          <TabTrigger name="background" href="/background" asChild>
            <TabButton icon={"layer group"} />
          </TabTrigger>
          <TabTrigger name="settings" href="/settings" asChild>
            <TabButton icon={"gear"} />
          </TabTrigger>
        </TabList>
      </Tabs>
    </SafeAreaView>
  );
}
