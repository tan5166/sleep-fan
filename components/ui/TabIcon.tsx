import Ionicons from "@expo/vector-icons/Ionicons";
import { cssInterop } from "nativewind";
import { type TextProps } from "react-native";

cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true },
  },
});

const MAPPING = {
  house: {
    default: "home-outline",
    focused: "home",
  },
  book: {
    default: "book-outline",
    focused: "book",
  },
  person: {
    default: "person-outline",
    focused: "person",
  },
  gear: {
    default: "settings-outline",
    focused: "settings",
  },
  star: {
    default: "star-outline",
    focused: "star",
  },
  statistics: {
    default: "bar-chart-outline",
    focused: "bar-chart",
  },
  flash: {
    default: "flash-outline",
    focused: "flash",
  },
} as const;

export type TabIconName = keyof typeof MAPPING;

export type TabIconProps = TextProps & {
  name: TabIconName;
  size?: number;
  isFocused?: boolean;
};

export function TabIcon({
  name,
  size = 24,
  style,
  isFocused = false,
  ...rest
}: TabIconProps) {
  const iconName = isFocused ? MAPPING[name].focused : MAPPING[name].default;

  return <Ionicons size={size} name={iconName} style={style} {...rest} />;
}
