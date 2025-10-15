// constants/theme.ts
const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const ThemeColors = {
  light: {
    text: "text-gray-900",
    background: "bg-white",
    tint: tintColorLight, // used to emphasize some elements
    icon: "text-slate-500", // used for non-tab icon
  },
  dark: {
    text: "text-neutral-100",
    background: "bg-neutral-900",
    tint: tintColorDark,
    icon: "text-white",
  },
};

const tabBackgroundLight = "bg-white";
const tabBackgroundDark = "bg-neutral-800";

export const TabColors = {
  light: {
    tabBar: {
      background: tabBackgroundLight,
      border: "border-gray-200",
    },
    tabIcon: {
      default: {
        color: "text-slate-500",
        background: tabBackgroundLight,
        border: undefined,
      },
      focused: {
        color: "text-blue-500",
        background: "bg-blue-50",
        border: "border-blue-200",
      },
    },
  },
  dark: {
    tabBar: {
      background: tabBackgroundDark,
      border: "border-neutral-700",
    },
    tabIcon: {
      default: {
        color: "text-slate-400",
        background: tabBackgroundDark,
        border: undefined,
      },
      focused: {
        color: "text-blue-500",
        background: "bg-blue-900",
        border: "border-blue-700",
      },
    },
  },
};
