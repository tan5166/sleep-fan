import { FanVisualizer } from "@/components/FanVisualizer";
import { PlayControl } from "@/components/PlayControl";
import { SpeedControl } from "@/components/SpeedControl";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { VolumeControl } from "@/components/VolumeControl";
import { getAudioById } from "@/constants/audioFiles";
import { useWhiteNoise } from "@/hooks/useWhiteNoise";
import { useAudioStore } from "@/store/audioStore";
import { useEffect, useMemo } from "react";
import { ScrollView, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function HomeScreen() {
  const {
    currentAudioId,
    volume,
    speed,
    setVolume: setStoreVolume,
    setSpeed: setStoreSpeed,
    setIsPlaying,
  } = useAudioStore();

  // Get current audio source based on store state
  const currentAudio = useMemo(
    () => getAudioById(currentAudioId),
    [currentAudioId]
  );
  const audioSource = useMemo(
    () => (currentAudio ? currentAudio.source : null),
    [currentAudio]
  );

  const {
    isPlaying: audioIsPlaying,
    togglePlay,
    setVolume: setAudioVolume,
    setSpeed: setAudioSpeed,
    replaceAudio,
  } = useWhiteNoise(audioSource);

  // Sync audio playing state to store
  useEffect(() => {
    setIsPlaying(audioIsPlaying);
  }, [audioIsPlaying, setIsPlaying]);

  // Initialize audio settings on mount
  useEffect(() => {
    setAudioVolume(volume);
    setAudioSpeed(speed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update audio when store values change
  useEffect(() => {
    setAudioVolume(volume);
  }, [volume, setAudioVolume]);

  useEffect(() => {
    setAudioSpeed(speed);
  }, [speed, setAudioSpeed]);

  // Replace audio when audio ID changes
  useEffect(() => {
    if (audioSource) {
      replaceAudio(audioSource);
    }
    // Only depend on currentAudioId to avoid unnecessary replacements
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAudioId]);

  // Handle volume change from UI
  const handleVolumeChange = (newVolume: number) => {
    setStoreVolume(newVolume);
  };

  // Handle speed change from UI
  const handleSpeedChange = (newSpeed: number) => {
    setStoreSpeed(newSpeed);
  };

  // Timer countdown - only starts when music is playing
  // useEffect(() => {
  //   // Only run timer if there's a timer set, time remaining, and music is playing
  //   if (timeRemaining === null || timeRemaining <= 0 || !isPlaying) return;
  //   const interval = setInterval(() => {
  //     setTimeRemaining((prev) => {
  //       if (prev === null || prev <= 1) {
  //         stopPlay();
  //         setTimer(null);
  //         return null;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [timeRemaining, isPlaying, stopPlay]);

  // const handleTimerSelect = (minutes: number | null) => {
  //   setTimer(minutes);
  //   if (minutes) {
  //     setTimeRemaining(minutes * 60);
  //   } else {
  //     // Clear timer
  //     setTimeRemaining(null);
  //   }
  // };

  // const formatTime = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${mins}:${secs.toString().padStart(2, "0")}`;
  // };

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
            <FanVisualizer isPlaying={audioIsPlaying} speed={speed} />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(200)}
            className="items-center gap-2 mb-2"
          >
            <PlayControl isPlaying={audioIsPlaying} togglePlay={togglePlay} />
            {/* Timer Display */}
            {/* {timeRemaining !== null && (
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
            )} */}
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300)} className="mb-4">
            <SpeedControl speed={speed} onSpeedChange={handleSpeedChange} />
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(400)} className="gap-4">
            <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
            {/* <TimerControl timer={timer} onTimerChange={handleTimerSelect} /> */}
          </Animated.View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
