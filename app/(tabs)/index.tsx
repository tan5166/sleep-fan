import { FanVisualizer } from "@/components/FanVisualizer";
import { SpeedControl } from "@/components/SpeedControl";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TimerControl } from "@/components/TimerControl";
import { VolumeControl } from "@/components/VolumeControl";
import { useWhiteNoise } from "@/hooks/useWhiteNoise";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function HomeScreen() {
  const [fanSpeed, setFanSpeed] = useState(1); // 0: low, 1: medium, 2: high
  const [volume, setVolume] = useState(90);
  const [timer, setTimer] = useState<number | null>(null); // minutes
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null); // seconds

  const {
    isPlaying,
    togglePlay,
    stopPlay,
    setVolume: setAudioVolume,
    setSpeed,
  } = useWhiteNoise();
  const { colorScheme } = useColorScheme();

  // Initialize audio settings on mount
  useEffect(() => {
    setAudioVolume(volume);
    setSpeed(fanSpeed);
  }, []);

  // Update audio volume and fan speed
  useEffect(() => {
    setAudioVolume(volume);
  }, [volume]);

  useEffect(() => {
    setSpeed(fanSpeed);
  }, [fanSpeed]);

  // Timer countdown - only starts when music is playing
  useEffect(() => {
    // Only run timer if there's a timer set, time remaining, and music is playing
    if (timeRemaining === null || timeRemaining <= 0 || !isPlaying) return;
    console.log("Timer effect1:", { timeRemaining });
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          stopPlay();
          setTimer(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, stopPlay]);

  const handleTimerSelect = (minutes: number | null) => {
    setTimer(minutes);
    if (minutes) {
      setTimeRemaining(minutes * 60);
    } else {
      // Clear timer
      setTimeRemaining(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <ThemedView className="flex-1">
      <ScrollView
        contentContainerClassName="min-h-full items-center justify-center p-5 pb-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-md gap-4">
          <Animated.View entering={FadeInUp.delay(0)} className="items-center">
            <ThemedText
              type="subtitle"
              colorType="textSecondary"
              className="text-center"
            >
              Help you relax, focus, or drift to sleep
            </ThemedText>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(100)}>
            <FanVisualizer isPlaying={isPlaying} speed={fanSpeed} />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(200)}
            className="items-center gap-2 mb-2"
          >
            <TouchableOpacity
              onPress={togglePlay}
              className="w-16 h-16 rounded-full bg-slate-900 dark:bg-white items-center justify-center shadow-lg active:scale-95"
              activeOpacity={0.8}
            >
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={24}
                color={colorScheme === "dark" ? "#0f172a" : "#ffffff"}
                style={!isPlaying && { marginLeft: 4 }}
              />
            </TouchableOpacity>
            {/* Timer Display */}
            {timeRemaining !== null && (
              <Animated.View
                entering={FadeInUp}
                className="flex-row items-center justify-center gap-1"
              >
                <Ionicons
                  name="time-outline"
                  size={16}
                  color={colorScheme === "dark" ? "#94a3b8" : "#64748b"}
                />
                <ThemedText type="subtitle" colorType="textSecondary">
                  {formatTime(timeRemaining)}
                </ThemedText>
              </Animated.View>
            )}
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300)} className="mb-4">
            <SpeedControl speed={fanSpeed} onSpeedChange={setFanSpeed} />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400)} className="gap-4">
            <VolumeControl volume={volume} onVolumeChange={setVolume} />
            <TimerControl timer={timer} onTimerChange={handleTimerSelect} />
          </Animated.View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
