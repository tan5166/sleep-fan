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
  type: "switch" | "info" | "link";
  /** Default value for switch items */
  defaultValue?: boolean;
  /** URL for link items (supports http/https/mailto) */
  url?: string;
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
    title: "Feedback",
    items: [
      {
        id: "feedback",
        icon: "information-circle-outline",
        label: "Feedback",
        description: "Tell us what you think or leave a review",
        type: "link",
        url: "https://example.com/feedback",
      },
      {
        id: "suggest-feature",
        icon: "information-circle-outline",
        label: "Suggest a Feature",
        description: "Submit your idea via Google Form",
        type: "link",
        url: "https://forms.gle/FnrhyC7u92yH23sd6",
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
        id: "contact-us",
        icon: "heart-outline",
        label: "Contact Us",
        description: "Click to write us an email",
        type: "link",
        url: "mailto:tansy.apps@gmail.com",
      },
    ],
  },
];
