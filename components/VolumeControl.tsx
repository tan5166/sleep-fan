import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useColorScheme } from "nativewind";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

export function VolumeControl({ volume, onVolumeChange }: VolumeControlProps) {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme ?? "light";

  return (
    <View className="gap-1">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <ThemedText colorType="icon">
            <Ionicons name="volume-medium" size={20} />
          </ThemedText>
          <ThemedText>Volume</ThemedText>
        </View>
        <ThemedText type="subtitle" colorType="textSecondary">
          {Math.round(volume)}%
        </ThemedText>
      </View>
      <Slider
        style={styles.slider}
        value={volume}
        onValueChange={onVolumeChange}
        minimumValue={0}
        maximumValue={100}
        step={1}
        minimumTrackTintColor={theme === "light" ? "#0f172b" : "#e2e8f0"} //slate-900: #0f172b, slate-200: #e2e8f0
        maximumTrackTintColor={theme === "light" ? "#e2e8f0" : "#62748e"} //slate-200: #e2e8f0, slate-500: #62748e
        thumbTintColor={theme === "light" ? "#0f172b" : "#e2e8f0"} //slate-900: #0f172b, slate-200: #e2e8f0
      />
    </View>
  );
}

const styles = StyleSheet.create({
  slider: {
    width: "100%",
    height: 40,
  },
});
