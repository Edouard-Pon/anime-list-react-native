import React, { useEffect } from 'react';
import {View, Text, StyleSheet, Image, FlatList, Dimensions, SectionList} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacter } from '../store/character';
import CharacterCard from '../components/CharacterCard';

function AnimePage({ route, navigation }) {
  const { anime } = route.params;
  const characterList = useSelector((state) => state.character.characterList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (characterList.length === 0 && anime.character.length > 0) {
      dispatch(fetchCharacter());
    }
  }, [characterList, anime.character, dispatch]);

  const sections = [
    {
      title: 'Characters',
      data: [characterList.filter((character) => anime.character.includes(character._id))],
      renderItem: ({ item }) => (
        item.length > 0 ? (
          <FlatList
            data={item}
            numColumns={2}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <CharacterCard character={item} navigation={navigation} />}
            ListHeaderComponent={() => (
              <Text style={styles.relatedCharacters}>Characters: </Text>
            )}
          />
        ) : null
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
            <Text style={styles.title}>{anime.title}</Text>
          </View>
          <View style={styles.imageAndTextContainer}>
            <Image style={styles.image} source={{ uri: anime.coverImagePath }} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Type: {anime.type}</Text>
              <Text style={styles.text}>Episodes: {anime.episodes}</Text>
              <Text style={styles.text}>Duration: {anime.duration}</Text>
              <Text style={styles.text}>Release Date: {new Date(anime.releaseDate).toLocaleDateString('en-GB')}</Text>
              <Text style={styles.text}>Upload Date: {new Date(anime.uploadDate).toLocaleDateString('en-GB')}</Text>
            </View>
          </View>
          <View style={styles.secondTextContainer}>
            <Text style={styles.text}>Status: {anime.status}</Text>
            <Text style={styles.text}>Rating: {anime.rating}</Text>
            <Text style={styles.text}>Description: {anime.description}</Text>
            <Text style={styles.text}>Source: {anime.source}</Text>
            <Text style={styles.text}>External Link: {anime.externalLink}</Text>
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
    width: Dimensions.get('window').width - 32,
    flexDirection: 'row',
    marginBottom: 16,
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
    gap: 16,
  },
  secondTextContainer: {
    width: Dimensions.get('window').width - 32,
    marginBottom: 16,
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Pacifico',
    color: '#333',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Pacifico',
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Pacifico',
  },
  relatedCharacters: {
    marginTop: 16,
    fontSize: 24,
    fontFamily: 'Pacifico',
    marginBottom: 10,
  },
});

export default AnimePage;
