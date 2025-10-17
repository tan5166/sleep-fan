import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";

interface PlayControlProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

export function PlayControl({ isPlaying, togglePlay }: PlayControlProps) {
  const { colorScheme } = useColorScheme();

  return (
    <View className="gap-1">
      <TouchableOpacity
        onPress={togglePlay}
        className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white items-center justify-center active:scale-95"
        activeOpacity={0.8}
      >
        <ThemedText
          className={`${!isPlaying && "ml-1"}`}
          lightColor="text-white"
          darkColor="text-slate-900"
        >
          <Ionicons name={isPlaying ? "pause" : "play"} size={24} />
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}
