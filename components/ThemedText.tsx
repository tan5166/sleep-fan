// components/ThemedText.tsx
import { Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultMedium" | "subtitle" | "description";
  colorType?: "text" | "textSecondary" | "icon" | "tint";
};

const typeStyles = {
  title: "text-2xl font-semibold",
  subtitle: "text-base",
  default: "text-base",
  defaultMedium: "text-base font-medium",
  description: "text-xs",
} as const;

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  colorType = "text",
  className,
  ...rest
}: ThemedTextProps) {
  const { className: classColor, color } = useThemeColor(
    { light: lightColor, dark: darkColor },
    colorType
  );

  return (
    <Text
      className={[typeStyles[type], classColor, className]
        .filter(Boolean)
        .join(" ")}
      style={[color ? { color } : null, style]}
      {...rest}
    />
  );
}
