import React, { useEffect } from 'react';
import { Text, View, StyleSheet, SectionList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AnimeCard from '../components/AnimeCard';
import { fetchAnime } from '../store/anime';
import { fetchCharacter } from '../store/character';
import CharacterCard from '../components/CharacterCard';

function MainPage({ navigation }) {
  const animeList = useSelector((state) => state.anime.animeList);
  const characterList = useSelector((state) => state.character.characterList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnime());
    dispatch(fetchCharacter());
  }, [dispatch]);

  // TODO - for testing, move characters to another page (CharactersPage)
  const sections = [
    {title: 'Anime', data: animeList, renderItem: ({item}) => <AnimeCard anime={item} navigation={navigation} />},
    {title: 'Characters', data: characterList, renderItem: ({item}) => <CharacterCard character={item} navigation={navigation} />}
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item._id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default MainPage;
