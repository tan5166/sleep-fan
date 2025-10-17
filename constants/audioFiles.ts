export interface AudioFile {
  id: string;
  name: string;
  fileName: string;
  icon: string;
  source: any;
}

export const AUDIO_FILES: AudioFile[] = [
  {
    id: "rain",
    name: "Rain",
    fileName: "rain-loop.wav",
    icon: "🌧️",
    source: require("@/assets/audio/rain-loop.wav"),
  },
  {
    id: "sea",
    name: "Sea Waves",
    fileName: "sea.wav",
    icon: "🌊",
    source: require("@/assets/audio/sea.wav"),
  },
  {
    id: "forest",
    name: "Forest",
    fileName: "forest.wav",
    icon: "🌲",
    source: require("@/assets/audio/forest.wav"),
  },
  {
    id: "water-bubble",
    name: "Water Bubble",
    fileName: "water-bubble.wav",
    icon: "💧",
    source: require("@/assets/audio/water-bubble.wav"),
  },
  {
    id: "fan-1",
    name: "Fan 1",
    fileName: "fan-01.wav",
    icon: "💨",
    source: require("@/assets/audio/fan-01.wav"),
  },
  {
    id: "fan-2",
    name: "Fan 2",
    fileName: "fan-02.wav",
    icon: "🌀",
    source: require("@/assets/audio/fan-02.wav"),
  },
  {
    id: "fan-3",
    name: "Fan 3",
    fileName: "fan-03.wav",
    icon: "🌪️",
    source: require("@/assets/audio/fan-03.wav"),
  },
];

export const getAudioById = (id: string): AudioFile | undefined => {
  return AUDIO_FILES.find((audio) => audio.id === id);
};
