import { useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppSelector } from "@/store/hooks";
import { selectCharacterById } from "@/store/character";


export default function CharacterDetailsScreen() {
  const { id } = useLocalSearchParams();
  const characterId = Array.isArray(id) ? id[0] : id;
  const character = useAppSelector((state) => selectCharacterById(state, characterId));

  if (!character) {
    return <ThemedText>Not Found</ThemedText>;
  }

  return (
    <ThemedView>
      <Image source={{ uri: character.cover_image }} style={{ width: 100, height: 150 }} />
      {character.name && <ThemedText>{character.name}</ThemedText>}
      {character.original_name && <ThemedText>{character.original_name}</ThemedText>}
      {character.description && <ThemedText>{character.description}</ThemedText>}
      {character.upload_date && <ThemedText>{new Date(character.upload_date).toLocaleDateString()}</ThemedText>}
    </ThemedView>
  );
}
