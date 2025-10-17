import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { useCallback, useEffect, useRef } from "react";

interface UseWhiteNoiseReturn {
  isPlaying: boolean;
  togglePlay: () => void;
  stopPlay: () => void;
  setVolume: (volume: number) => void;
  setSpeed: (speed: number) => void;
}

const audioSource = require("@/assets/audio/rain-01.mp3");

/**
 * Custom hook for managing white noise audio playback
 * @returns Audio control functions and playing state
 */
export function useWhiteNoise(): UseWhiteNoiseReturn {
  const player = useAudioPlayer(audioSource);

  const status = useAudioPlayerStatus(player);
  const currentSpeed = useRef(1);
  const currentVolume = useRef(0.7); // 初始音量 50%

  useEffect(() => {
    // Set audio mode for background playback
    (async () => {
      try {
        await setAudioModeAsync({
          playsInSilentMode: true,
          shouldPlayInBackground: true,
          interruptionModeAndroid: "doNotMix",
          interruptionMode: "doNotMix",
        });
      } catch (error) {
        console.error("Error setting audio mode:", error);
      }
    })();

    player.loop = true;
    // 不在这里设置音量，让组件通过 setVolume 来控制

    // Cleanup on unmount
    return () => {
      player.pause();
      player.remove();
    };
  }, []);

  const togglePlay = useCallback(() => {
    try {
      if (status.playing) {
        player.pause();
      } else {
        player.play();
      }
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  }, [player, status.playing]);

  const stopPlay = useCallback(() => {
    try {
      player.pause();
    } catch (error) {
      console.error("Error stopping playback:", error);
    }
  }, [player]);

  const setVolume = useCallback(
    (volume: number) => {
      try {
        if (volume === 0) {
          player.muted = true;
        } else {
          player.muted = false;
          const normalizedVolume = Math.max(0, Math.min(1, volume / 100));
          currentVolume.current = normalizedVolume;
          player.volume = normalizedVolume;
        }
      } catch (error) {
        console.error("Error setting volume:", error);
      }
    },
    [player]
  );

  const setSpeed = useCallback(
    (speed: number) => {
      currentSpeed.current = speed;
      try {
        const playbackRate = getPlaybackRate(speed);
        player.setPlaybackRate(playbackRate, "high");
      } catch (error) {
        console.error("Error setting speed:", error);
      }
    },
    [player]
  );

  return {
    isPlaying: status.playing,
    togglePlay,
    stopPlay,
    setVolume,
    setSpeed,
  };
}

/**
 * Convert speed level to playback rate
 * @param speed - Speed level (0: low, 1: medium, 2: high)
 * @returns Playback rate
 */
function getPlaybackRate(speed: number): number {
  const rates = [0.8, 1.0, 1.2]; // Low, medium, high speeds
  return rates[speed] ?? 1.0;
}
