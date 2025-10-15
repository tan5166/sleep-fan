// components/ThemedText.tsx
import { Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle";
};

const typeStyles = {
  title: "text-3xl font-bold",
  subtitle: "text-xl font-bold",
  default: "text-base",
  defaultSemiBold: "text-base font-semibold",
} as const;

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const { className, color } = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );

  return (
    <Text
      className={[typeStyles[type], className].filter(Boolean).join(" ")}
      style={[color ? { color } : null, style]}
      {...rest}
    />
  );
}
