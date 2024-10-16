import { FlatList } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import CharacterCard from "@/components/CharacterCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { fetchCharacters } from "@/store/characterThunks";
import { selectCharacters, selectCharacterStatus } from "@/store/character";
import { useEffect } from "react";
import { Loading } from "@/components/Loading";

export default function CharacterScreen() {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectCharacters);
  const characterStatus = useAppSelector(selectCharacterStatus);

  const onRefresh = () => {
    dispatch(fetchCharacters());
  };

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const renderItem = ({ item }: { item: { id: string; name: string, cover_image: string } }) => (
    <CharacterCard key={ item.id } name={ item.name } id={ item.id } cover_image={ item.cover_image } />
  );

  if (characterStatus === "loading") {
    return <Loading />;
  }

  return (
    <ThemedView>
      {characters.length === 0 ? (
        <ThemedText>0 Characters</ThemedText>
      ) : (
        <FlatList
          data={characters.map((character) => ({ id: character.id, name: character.name, cover_image: character.cover_image }))}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </ThemedView>
  );
}
