import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...rest
}: ThemedViewProps) {
  const { className, color } = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View
      className={className}
      style={[color ? { backgroundColor: color } : null, style]}
      {...rest}
    />
  );
}
