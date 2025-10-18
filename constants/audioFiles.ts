export interface AudioFile {
  id: string;
  name: string;
  icon: string;
  source: any;
}

export const AUDIO_FILES: AudioFile[] = [
  {
    id: "fan-1",
    name: "Default Fan",
    icon: "💨",
    source: require("@/assets/audio/fan-01.wav"),
  },
  {
    id: "fan-2",
    name: "Deep Fan",
    icon: "🌀",
    source: require("@/assets/audio/fan-02.wav"),
  },
  {
    id: "rain",
    name: "Rain",
    icon: "🌧️",
    source: require("@/assets/audio/rain.wav"),
  },
  {
    id: "sea-waves",
    name: "Sea Waves",
    icon: "🌊",
    source: require("@/assets/audio/sea.wav"),
  },
  {
    id: "forest",
    name: "Forest",
    icon: "🌲",
    source: require("@/assets/audio/forest.wav"),
  },
  {
    id: "bubble",
    name: "Bubble",
    icon: "🫧",
    source: require("@/assets/audio/bubble.wav"),
  },
];

export const getAudioById = (id: string): AudioFile | undefined => {
  return AUDIO_FILES.find((audio) => audio.id === id);
};
