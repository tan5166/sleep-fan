// components/ThemedText.tsx
import { Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/useColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle";
};

const typeStyles = {
  title: "text-2xl font-semibold",
  subtitle: "text-base",
  default: "text-base",
  defaultSemiBold: "text-base font-semibold",
} as const;

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  className,
  ...rest
}: ThemedTextProps) {
  const { className: classColor, color } = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
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
