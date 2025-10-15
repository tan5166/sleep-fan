import { useTabColor } from "@/hooks/useColor";
import { TabTriggerSlotProps } from "expo-router/ui";
import { forwardRef } from "react";
import { Pressable, View } from "react-native";
import { TabIcon, TabIconName } from "./TabIcon";

export type TabButtonProps = TabTriggerSlotProps & {
  icon: TabIconName;
};

function TabButtonBase(
  { icon, children, isFocused, ...props }: TabButtonProps,
  ref: React.Ref<View>
) {
  const tabIcon = useTabColor("tabIcon");
  const current = isFocused ? tabIcon.focused : tabIcon.default;

  return (
    <Pressable {...props} ref={ref} className="flex-1">
      <View className="items-center justify-center flex-1">
        <View
          className={[
            "p-2 rounded-lg",
            current.background,
            current.border && isFocused ? `border-2 ${current.border}` : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <TabIcon
            name={icon}
            size={26}
            className={current.color}
            isFocused={isFocused}
          />
        </View>
      </View>
    </Pressable>
  );
}

export const TabButton = forwardRef<View, TabButtonProps>(TabButtonBase);
