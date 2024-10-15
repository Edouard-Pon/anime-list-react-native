import { SectionList, FlatList, RefreshControl, Dimensions } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AnimeCard from "@/components/AnimeCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { fetchAnimes } from "@/store/animeThunks";
import { selectAnimes, selectAnimeStatus } from "@/store/anime";
import { useEffect } from "react";
import { Loading } from "@/components/Loading";

export default function AnimeScreen() {
  const dispatch = useAppDispatch();
  const animes = useAppSelector(selectAnimes);
  const animeStatus = useAppSelector(selectAnimeStatus);

  const onRefresh = () => {
    dispatch(useAppSelector(fetchAnimes));
  };

  useEffect(() => {
    dispatch(fetchAnimes());
  }, [dispatch]);

  const renderItem = ({ item }: { item: { id: string; title: string, cover_image: string } }) => (
    <AnimeCard key={ item.id } title={ item.title } id={ item.id } cover_image={ item.cover_image } />
  );

  if (animeStatus === "loading") {
    return <Loading />;
  }

  return (
    <ThemedView>
      {animes.length === 0 ? (
        <ThemedText>0 Anime</ThemedText>
      ) : (
        <FlatList
          data={animes.map((anime) => ({ id: anime.id, title: anime.title, cover_image: anime.cover_image }))}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </ThemedView>
  );
}
