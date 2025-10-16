import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  colorType?: "background" | "sectionBackground" | "iconBackground";
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  className,
  colorType = "background",
  ...rest
}: ThemedViewProps) {
  const { className: classColor, color } = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType
  );

  return (
    <View
      className={[classColor, className].filter(Boolean).join(" ")}
      style={[color ? { backgroundColor: color } : null, style]}
      {...rest}
    />
  );
}
