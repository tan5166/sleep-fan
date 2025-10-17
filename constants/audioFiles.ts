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
    fileName: "rain.wav",
    icon: "🌧️",
    source: require("@/assets/audio/rain.wav"),
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
    id: "bubble",
    name: "Bubble",
    fileName: "bubble.wav",
    icon: "🫧",
    source: require("@/assets/audio/bubble.wav"),
  },
  {
    id: "fan-1",
    name: "Default Fan",
    fileName: "fan-01.wav",
    icon: "💨",
    source: require("@/assets/audio/fan-01.wav"),
  },
  {
    id: "fan-2",
    name: "Deep Fan",
    fileName: "fan-02.wav",
    icon: "🌀",
    source: require("@/assets/audio/fan-02.wav"),
  },
];

export const getAudioById = (id: string): AudioFile | undefined => {
  return AUDIO_FILES.find((audio) => audio.id === id);
};
