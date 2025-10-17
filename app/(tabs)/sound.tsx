import { SoundCard } from "@/components/SoundCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AUDIO_FILES } from "@/constants/audioFiles";
import { useAudioStore } from "@/store/audioStore";
import { ScrollView, View } from "react-native";

export default function SoundScreen() {
  const { currentAudioId, isPlaying, switchAudio } = useAudioStore();

  const handleAudioSelect = (audioId: string) => {
    switchAudio(audioId);
  };

  return (
    <ThemedView className="flex-1">
      <View className="mb-6">
        <ThemedText type="title">Select Sound</ThemedText>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="flex-row flex-wrap justify-between">
          {AUDIO_FILES.map((audio) => (
            <View key={audio.id} style={{ width: "48%" }}>
              <SoundCard
                audioFile={audio}
                isSelected={currentAudioId === audio.id}
                isPlaying={isPlaying && currentAudioId === audio.id}
                onPress={() => handleAudioSelect(audio.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
