import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface TimerControlProps {
  timer: number | null; // minutes
  onTimerChange: (minutes: number | null) => void;
}

export function TimerControl({ timer, onTimerChange }: TimerControlProps) {
  const timerOptions = [
    { value: 15, label: "15 min" },
    { value: 30, label: "30 min" },
    { value: 60, label: "60 min" },
  ];

  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-2">
        <ThemedText colorType="icon">
          <Ionicons name="time-outline" size={20} />
        </ThemedText>
        <ThemedText>Timer</ThemedText>
      </View>
      <View className="flex-row items-center gap-2">
        {timerOptions.map((option) => {
          const isActive = timer === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() =>
                isActive ? onTimerChange(null) : onTimerChange(option.value)
              }
              className={`flex-1 py-2.5 px-3 rounded-lg border-2 items-center ${
                isActive
                  ? "bg-slate-900 dark:bg-white border-slate-900 dark:border-white"
                  : "bg-transparent border-slate-200 dark:border-slate-700"
              }`}
              activeOpacity={0.7}
            >
              <ThemedText
                type="subtitle"
                lightColor={isActive ? "text-slate-200" : undefined}
                darkColor={isActive ? "text-slate-900" : undefined}
                colorType={isActive ? undefined : "textSecondary"}
              >
                {option.label}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
