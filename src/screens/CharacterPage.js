import React, { useEffect } from 'react';
import {View, Text, StyleSheet, Image, FlatList, SectionList, ScrollView, Dimensions} from 'react-native';
import AnimeCard from '../components/AnimeCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnime } from '../store/anime';

function CharacterPage({ route, navigation }) {
  const { character } = route.params;
  const animeList = useSelector((state) => state.anime.animeList);
  const dispatch = useDispatch();

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
          ListHeaderComponent={() => (
            <Text style={styles.relatedAnimes}>Appears in: </Text>
          )}
        />
      ),
    },
  ];

  return (
    <SectionList
      contentContainerStyle={styles.container}
      sections={sections}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={() => (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{character.name}</Text>
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
    backgroundColor: '#FFC0CB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 16,
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
  },
  text: {
    fontSize: 18,
    fontFamily: 'Pacifico',
    color: '#333',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Pacifico',
    marginBottom: 10,
  },
  relatedAnimes: {
    marginTop: 16,
    fontSize: 24,
    fontFamily: 'Pacifico',
    marginBottom: 10,
  },
});



export default CharacterPage;
