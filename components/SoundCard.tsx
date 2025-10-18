import { AudioFile } from "@/constants/audioFiles";
import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface SoundCardProps {
  audioFile: AudioFile;
  isSelected: boolean;
  isPlaying: boolean;
  onPress: () => void;
}

export function SoundCard({
  audioFile,
  isSelected,
  isPlaying,
  onPress,
}: SoundCardProps) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (isPlaying && isSelected) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        false
      );
    } else {
      opacity.value = withTiming(1, { duration: 300 });
    }
  }, [isPlaying, isSelected, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Pressable onPress={onPress} className="mb-4">
      <ThemedView
        className={`rounded-2xl p-6 ${
          isPlaying && isSelected
            ? `border-4 border-green-400`
            : isSelected
            ? `border-4 border-slate-900 dark:border-white`
            : "border-2 border-slate-200 dark:border-slate-700"
        }`}
        colorType="sectionBackground"
      >
        <Animated.View style={[animatedStyle]} className="items-center">
          <Text className="text-4xl mb-2">{audioFile.icon}</Text>
          <ThemedText className="text-xl font-semibold">
            {audioFile.name}
          </ThemedText>
        </Animated.View>
      </ThemedView>
    </Pressable>
  );
}
