import { Href, useLocalSearchParams } from "expo-router";
import { Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAppSelector } from "@/store/hooks";
import { selectAnimeById } from "@/store/anime";


export default function AnimeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const animeId = Array.isArray(id) ? id[0] : id;
  const anime = useAppSelector((state) => selectAnimeById(state, animeId));

  if (!anime) {
    return <ThemedText>Not Found</ThemedText>;
  }

  return (
    <ThemedView>
      <Image source={{ uri: anime.cover_image }} style={{ width: 100, height: 150 }} />
      {anime.title && <ThemedText>{anime.title}</ThemedText>}
      {anime.type && <ThemedText>{anime.type}</ThemedText>}
      {anime.episodes && <ThemedText>{anime.episodes}</ThemedText>}
      {anime.status && <ThemedText>{anime.status}</ThemedText>}
      {anime.description && <ThemedText>{anime.description}</ThemedText>}
      {anime.release_date && <ThemedText>{new Date(anime.release_date).toLocaleDateString()}</ThemedText>}
      {anime.upload_date && <ThemedText>{new Date(anime.upload_date).toLocaleDateString()}</ThemedText>}
      {anime.source && <ThemedText>{anime.source}</ThemedText>}
      {anime.external_link && <ThemedText>{anime.external_link}</ThemedText>}
      {anime.duration && <ThemedText>{anime.duration}</ThemedText>}
      {anime.rating && <ThemedText>{anime.rating}</ThemedText>}
    </ThemedView>
  );
}
