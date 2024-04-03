import React, { useEffect } from 'react';
import {View, Text, StyleSheet, Image, FlatList, SectionList, ScrollView} from 'react-native';
import AnimeCard from '../components/AnimeCard';
import {useSelector, useDispatch} from 'react-redux';
import { fetchAnime } from '../store/anime'; // import fetchAnime

function CharacterPage({ route, navigation }) {
  const { character } = route.params;
  const animeList = useSelector((state) => state.anime.animeList);
  const dispatch = useDispatch(); // use useDispatch

  useEffect(() => {
    if (animeList.length === 0 && character.anime.length > 0) {
      dispatch(fetchAnime());
    }
  }, [animeList, character.anime, dispatch]);

  const sections = [
    {
      title: 'Anime',
      data: [animeList.filter((anime) => character.anime.includes(anime._id))],
      renderItem: ({ item }) => (
        <FlatList
          data={item}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <AnimeCard anime={item} navigation={navigation} />}
        />
      ),
    },
  ];

  return (
    <SectionList
      style={styles.container}
      sections={sections}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={() => (
        <>
          <Image style={styles.image} source={{uri: character.imagePath}} />
          <Text style={styles.title}>{character.name}</Text>
          <Text>Original Name: {character.originalName}</Text>
          <Text>Description: {character.description}</Text>
          <Text>Upload Date: {new Date(character.uploadDate).toLocaleDateString('en-GB')}</Text>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default CharacterPage;
