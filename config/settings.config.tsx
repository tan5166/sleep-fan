// config/settings.config.tsx

export interface SettingItemConfig {
  /** Unique identifier */
  id: string;
  /** Icon name from Ionicons */
  icon: string;
  /** Main label */
  label: string;
  /** Description text */
  description: string;
  /** Type of setting item */
  type: "switch" | "info";
  /** Default value for switch items */
  defaultValue?: boolean;
}

export interface SettingSectionConfig {
  /** Section title */
  title: string;
  /** Items in this section */
  items: SettingItemConfig[];
}

/**
 * Settings configuration data
 * This separates data from UI logic for better maintainability
 */
export const settingsConfig: SettingSectionConfig[] = [
  {
    title: "Appearance",
    items: [
      {
        id: "theme",
        icon: "moon-outline",
        label: "Dark Mode",
        description: "Switch to dark theme",
        type: "switch",
        defaultValue: false,
      },
    ],
  },
  {
    title: "Audio",
    items: [
      {
        id: "auto-play",
        icon: "volume-medium-outline",
        label: "Auto Play",
        description: "Automatically start playing when the app opens",
        type: "switch",
        defaultValue: false,
      },
      {
        id: "notifications",
        icon: "notifications-outline",
        label: "Timer Notification",
        description: "Send a notification when the timer ends",
        type: "switch",
        defaultValue: true,
      },
    ],
  },
  {
    title: "About",
    items: [
      {
        id: "version",
        icon: "information-circle-outline",
        label: "Version",
        description: "v1.0.0",
        type: "info",
      },
      {
        id: "support",
        icon: "heart-outline",
        label: "Support Us",
        description: "Thank you for your support",
        type: "info",
      },
    ],
  },
];
