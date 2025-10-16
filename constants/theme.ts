// constants/theme.ts
const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const ThemeColors = {
  light: {
    text: "text-slate-900",
    background: "bg-white",
    tint: tintColorLight, // used to emphasize some elements
    icon: "text-slate-900", // used for non-tab icon
  },
  dark: {
    text: "text-slate-200",
    background: "bg-slate-950",
    tint: tintColorDark,
    icon: "text-slate-200",
  },
};

const tabBackgroundLight = "bg-white";
const tabBackgroundDark = "bg-slate-950";

export const TabColors = {
  light: {
    tabBar: {
      background: tabBackgroundLight,
      border: "border-slate-200",
    },
    tabIcon: {
      default: {
        color: "text-slate-400",
        background: tabBackgroundLight,
        border: undefined,
      },
      focused: {
        color: "text-slate-900",
        background: "bg-slate-100",
        border: "border-slate-400",
      },
    },
  },
  dark: {
    tabBar: {
      background: tabBackgroundDark,
      border: "border-slate-600",
    },
    tabIcon: {
      default: {
        color: "text-slate-500",
        background: tabBackgroundDark,
        border: undefined,
      },
      focused: {
        color: "text-white",
        background: "bg-slate-700",
        border: "border-slate-200",
      },
    },
  },
};
