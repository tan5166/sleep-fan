import { SoundCard } from "@/components/SoundCard";
import { ThemedText } from "@/components/ThemedText";
import { AUDIO_FILES } from "@/constants/audioFiles";
import { useAudioStore } from "@/store/audioStore";
import { ScrollView, View } from "react-native";

export default function SoundScreen() {
  const { currentAudioId, isPlaying, switchAudio } = useAudioStore();

  const handleAudioSelect = (audioId: string) => {
    switchAudio(audioId);
  };

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
    >
      <View className="gap-5">
        <View className="gap-2">
          <ThemedText type="title">Select Sound</ThemedText>
          <ThemedText type="subtitle" colorType="textSecondary">
            Find the sound that soothes your mind
          </ThemedText>
        </View>

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
      </View>
    </ScrollView>
  );
}
