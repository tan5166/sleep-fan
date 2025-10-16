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
  className,
  ...rest
}: ThemedViewProps) {
  const { className: classColor, color } = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View
      className={[classColor, className].filter(Boolean).join(" ")}
      style={[color ? { backgroundColor: color } : null, style]}
      {...rest}
    />
  );
}
