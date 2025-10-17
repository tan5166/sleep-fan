import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AudioState {
  // Persisted state
  currentAudioId: string;
  volume: number;
  speed: number;

  // Non-persisted state
  isPlaying: boolean;

  // Actions
  switchAudio: (audioId: string) => void;
  setVolume: (volume: number) => void;
  setSpeed: (speed: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentAudioId: "rain",
      volume: 50,
      speed: 1.0,
      isPlaying: false,

      // Actions
      switchAudio: (audioId: string) => {
        set({ currentAudioId: audioId });
      },

      setVolume: (volume: number) => {
        set({ volume });
      },

      setSpeed: (speed: number) => {
        set({ speed });
      },

      setIsPlaying: (isPlaying: boolean) => {
        set({ isPlaying });
      },
    }),
    {
      name: "audio-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist these fields
      partialize: (state) => ({
        currentAudioId: state.currentAudioId,
        volume: state.volume,
        speed: state.speed,
      }),
    }
  )
);
