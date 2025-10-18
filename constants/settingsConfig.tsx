// config/settings.config.tsx
import { version } from "../package.json";

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
    title: "About",
    items: [
      {
        id: "version",
        icon: "information-circle-outline",
        label: "Version",
        description: version,
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
