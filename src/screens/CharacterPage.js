import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, SectionList, ScrollView } from 'react-native';
import AnimeCard from '../components/AnimeCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnime } from '../store/anime';

import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

function CharacterPage({ route, navigation }) {
  const { character } = route.params;
  const animeList = useSelector((state) => state.anime.animeList);
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    Pacifico: require('../../assets/fonts/Pacifico-Regular.ttf')
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
        <>
        <Text style={styles.relatedAnimes}>Appears in: </Text>
        <FlatList
          data={item}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <AnimeCard anime={item} navigation={navigation} />}
        />
        </>
      ),
    },
  ];

  return (
    <SectionList
      style={styles.container}
      sections={sections}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={() => (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Name: {character.name}</Text>
          </View>
          <View style={styles.imageAndTextContainer}>
            <Image style={styles.image} source={{ uri: character.imagePath }} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Original Name: {character.originalName}</Text>
              <Text style={styles.text}>Description: {character.description}</Text>
              <Text style={styles.text}>Upload Date: {new Date(character.uploadDate).toLocaleDateString('en-GB')}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFC0CB', // Pink background color
  },
  titleContainer: {
    marginBottom: 16,
  },
  imageAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 160,
    height: 240,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'pink',
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Pacifico', // Apply Pacifico font
    color: '#333', // Text color (you can change this as needed)
    marginBottom: 10, // Adjust the bottom margin as needed
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Pacifico', // Apply Pacifico font
    marginBottom: 10, // Adjust the bottom margin as needed
  },
  relatedAnimes: {
    fontSize: 24,
    fontFamily: 'Pacifico', // Apply Pacifico font
    marginBottom: 10, // Adjust the bottom margin as needed
  },
});



export default CharacterPage;
