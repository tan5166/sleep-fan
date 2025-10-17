import { AudioFile } from "@/constants/audioFiles";
import { useThemeColor } from "@/hooks/useColor";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

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
  const { className: bgColor } = useThemeColor({}, "background");
  const { className: textColor } = useThemeColor({}, "text");
  const { className: tintColor } = useThemeColor({}, "tint");

  const opacity = useSharedValue(1);

  React.useEffect(() => {
    if (isPlaying && isSelected) {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.5, { duration: 800 }),
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
    <Pressable
      onPress={onPress}
      className="mb-4"
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View
        className={`rounded-2xl p-6 ${bgColor} ${
          isSelected ? `border-4 ${tintColor}` : "border-2 border-gray-300"
        }`}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <View className="items-center">
          <Animated.Text
            style={[animatedStyle, { fontSize: 48, marginBottom: 8 }]}
          >
            {audioFile.icon}
          </Animated.Text>
          <Text className={`text-lg font-semibold ${textColor}`}>
            {audioFile.name}
          </Text>
          {isPlaying && isSelected && (
            <View className="mt-2 flex-row items-center gap-1">
              <Animated.View
                style={[
                  animatedStyle,
                  {
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "#10b981",
                  },
                ]}
              />
              <Text className="text-sm text-green-500">Playing</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}
