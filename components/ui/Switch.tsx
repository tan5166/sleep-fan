// components/ui/Switch.tsx
import { Switch as RNSwitch, SwitchProps } from "react-native";
import { useColorScheme } from "nativewind";

export interface ThemedSwitchProps extends Omit<SwitchProps, "trackColor" | "thumbColor"> {
  /** Whether the switch is on */
  checked: boolean;
  /** Callback when the switch state changes */
  onCheckedChange: (value: boolean) => void;
}

/**
 * A themed switch component that adapts to light/dark mode
 */
export function Switch({ checked, onCheckedChange, ...props }: ThemedSwitchProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <RNSwitch
      value={checked}
      onValueChange={onCheckedChange}
      trackColor={{
        false: isDark ? "#334155" : "#e2e8f0", // slate-700 : slate-200
        true: isDark ? "#64748b" : "#94a3b8", // slate-500 : slate-400
      }}
      thumbColor={checked ? (isDark ? "#f1f5f9" : "#1e293b") : isDark ? "#94a3b8" : "#cbd5e1"}
      ios_backgroundColor={isDark ? "#334155" : "#e2e8f0"}
      {...props}
    />
  );
}
