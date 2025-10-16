import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { cssInterop } from "nativewind";
import { type TextProps } from "react-native";

cssInterop(FontAwesome6, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true },
  },
});

const MAPPING = {
  fan: {
    default: "fan",
    focused: "fan",
  },
  "layer group": {
    default: "layer-group",
    focused: "layer-group",
  },
  gear: {
    default: "gear",
    focused: "gear",
  },
} as const;

export type TabIconName = keyof typeof MAPPING;

export type TabIconProps = TextProps & {
  name: TabIconName;
  size?: number;
};

export function TabIcon({ name, size = 24, style, ...rest }: TabIconProps) {
  const iconName = MAPPING[name].default;

  return <FontAwesome6 size={size} name={iconName} style={style} {...rest} />;
}
