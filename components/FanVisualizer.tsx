import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface FanVisualizerProps {
  isPlaying: boolean;
  speed: number; // 0: low, 1: medium, 2: high
}

export function FanVisualizer({ isPlaying, speed }: FanVisualizerProps) {
  const rotation = useSharedValue(0);
  const indicatorOpacity = useSharedValue(0);

  const speeds = [1400, 1000, 700]; // Rotation duration in milliseconds
  const rotationDuration = speeds[speed];

  useEffect(() => {
    if (isPlaying) {
      rotation.value = 0;
      rotation.value = withRepeat(
        withTiming(360, {
          duration: rotationDuration,
          easing: Easing.linear,
        }),
        -1,
        false
      );
      indicatorOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000 }),
          withTiming(0.1, { duration: 1000 })
        ),
        -1,
        true
      );
    } else {
      if (rotation.value !== 0) {
        rotation.value = withTiming(
          359,
          {
            duration: ((359 - rotation.value) / 359) * rotationDuration,
            easing: Easing.linear,
          },
          (isFinished) => {
            if (isFinished) {
              rotation.value = 0;
            }
          }
        );
      }
      indicatorOpacity.value = withTiming(0, { duration: 300 });
    }

    return () => {
      cancelAnimation(rotation);
      cancelAnimation(indicatorOpacity);
    };
  }, [isPlaying, rotationDuration]);

  const rotatingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const bladeOpacityStyle = useAnimatedStyle(() => ({
    opacity: isPlaying ? 0.6 : 1,
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: indicatorOpacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Outer circle */}
      <View className="absolute inset-0 rounded-full border-2 border-slate-200 dark:border-slate-500" />

      {/* Fan blades container */}
      <Animated.View style={[styles.bladesContainer, rotatingStyle]}>
        {/* Center hub */}
        <View style={styles.centerHub}>
          <View className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white" />
        </View>

        {/* Blades */}
        {[0, 1, 2, 3].map((index) => (
          <View
            key={index}
            style={[
              styles.bladeWrapper,
              { transform: [{ rotate: `${index * 90}deg` }] },
            ]}
          >
            <Animated.View
              style={[styles.blade, bladeOpacityStyle]}
              className="bg-slate-300  dark:bg-slate-500"
            />
          </View>
        ))}
      </Animated.View>

      {/* Center dot */}
      <View style={styles.centerDot}>
        <View className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700" />
      </View>

      {/* Rotation indicator when playing */}
      {isPlaying && (
        <Animated.View
          style={[styles.indicator, indicatorStyle]}
          className="rounded-full bg-slate-900 dark:bg-white"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
    position: "relative",
  },
  bladesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centerHub: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  bladeWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
  },
  blade: {
    width: 64,
    height: 96,
    borderTopLeftRadius: 96,
    borderTopRightRadius: 96,
    position: "absolute",
    bottom: "50%",
  },
  centerDot: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    position: "absolute",
    top: 16,
    left: "50%",
    width: 8,
    height: 8,
    marginLeft: -4,
  },
});
