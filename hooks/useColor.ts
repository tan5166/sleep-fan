// hooks/useColor.ts
import { TabColors, ThemeColors } from "@/constants/theme";
import { useColorScheme } from "nativewind";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof ThemeColors.light & keyof typeof ThemeColors.dark
): { className?: string; color?: string } {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme ?? "light";
  const colorFromProps = props[theme];
  const color = colorFromProps ?? ThemeColors[theme][colorName];

  if (color.startsWith("#")) {
    return { color };
  } else {
    return { className: color };
  }
}

export function useTabColor<
  T extends keyof typeof TabColors.light & keyof typeof TabColors.dark
>(colorName: T): (typeof TabColors.light)[T] {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme ?? "light";

  return TabColors[theme][colorName];
}
