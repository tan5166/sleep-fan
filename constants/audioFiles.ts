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
    id: "campfire",
    name: "Campfire",
    icon: "🔥",
    source: require("@/assets/audio/campfire.wav"),
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
  {
    id: "wind",
    name: "Wind",
    icon: "🍃",
    source: require("@/assets/audio/wind.wav"),
  },
  {
    id: "cafe",
    name: "Cafe",
    icon: "☕️",
    source: require("@/assets/audio/cafe.wav"),
  },
  {
    id: "city-night",
    name: "City Night",
    icon: "🌃",
    source: require("@/assets/audio/city-night.wav"),
  },
  {
    id: "soft-brown",
    name: "Soft Brown",
    icon: "🟫",
    source: require("@/assets/audio/soft-brown.wav"),
  },
];

export const getAudioById = (id: string): AudioFile | undefined => {
  return AUDIO_FILES.find((audio) => audio.id === id);
};
