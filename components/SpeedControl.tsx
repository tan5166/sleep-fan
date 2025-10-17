import { useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ThemedText } from "./ThemedText";

interface SpeedControlProps {
  speed: number; // 0: low, 1: medium, 2: high
  onSpeedChange: (speed: number) => void;
}

const SPEEDS = [
  { value: 0, label: "Low" },
  { value: 1, label: "Medium" },
  { value: 2, label: "High" },
];

const CONTAINER_PADDING = 4; // p-1 in Tailwind -> 4px
const GAP = 8; // gap-2 in Tailwind -> 8px

export function SpeedControl({ speed, onSpeedChange }: SpeedControlProps) {
  const colorScheme = useColorScheme() ?? "light";

  // 1. 使用 onLayout 动态获取宽度，而不是 useWindowDimensions
  // tabWidth 初始为 0，在布局计算后更新
  const [tabWidth, setTabWidth] = useState(0);
  const translateX = useSharedValue(0);

  const onContainerLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    const contentWidth = width - CONTAINER_PADDING * 2;

    const calculatedTabWidth =
      (contentWidth - GAP * (SPEEDS.length - 1)) / SPEEDS.length;
    setTabWidth(calculatedTabWidth);
  };

  // 2. 使用 useEffect 来响应 speed prop 的变化（包括初始值）
  useEffect(() => {
    // 确保在 tabWidth 计算出来之后再执行动画
    if (tabWidth > 0) {
      // 3. 修正 translateX 的动画逻辑
      // 目标位置 = 按钮索引 * (单个Tab宽度 + 间隙宽度)
      const targetTranslateX = speed * (tabWidth + GAP);
      translateX.value = withTiming(targetTranslateX, { duration: 250 });
    }
  }, [speed, tabWidth, translateX]); // 依赖项包含 speed 和 tabWidth

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // handleSpeedChange 只需要调用回调函数，useEffect 会处理动画
  const handleSpeedChange = (value: number) => {
    onSpeedChange(value);
  };

  return (
    // 将 onLayout 绑定到容器 View 上
    <View
      className="relative flex-row items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-full"
      onLayout={onContainerLayout}
    >
      {/* 4. 将 Animated.View 移到按钮前面，作为背景 */}
      {/* 并且只有在 tabWidth 计算出来后才渲染，避免闪烁 */}
      {tabWidth > 0 && (
        <Animated.View
          style={[
            styles.indicator,
            animatedStyle,
            {
              width: tabWidth,
              backgroundColor: colorScheme === "light" ? "#0f172b" : "#fff", //white: #fff, slate-900: #0f172b
            },
          ]}
        />
      )}

      {/* Buttons */}
      {SPEEDS.map((s) => (
        <TouchableOpacity
          key={s.value}
          onPress={() => handleSpeedChange(s.value)} // 直接传递 value 即可
          // 将 zIndex 设置为 1，确保文本在动画背景之上（可选，但更保险）
          className="relative z-10 flex-1 py-2.5 px-4 rounded-full items-center"
          activeOpacity={0.7}
        >
          <ThemedText
            type="subtitle"
            lightColor={speed === s.value ? "text-slate-200" : "text-slate-900"}
            darkColor={speed === s.value ? "text-slate-900" : "text-slate-200"}
            className="text-center"
          >
            {s.label}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: "absolute",
    top: CONTAINER_PADDING,
    bottom: CONTAINER_PADDING,
    left: CONTAINER_PADDING,
    borderRadius: 9999,
  },
});
