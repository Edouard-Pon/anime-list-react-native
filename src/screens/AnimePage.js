import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

function AnimePage({ route }) {
  const { anime } = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: anime.coverImagePath}} />
      <Text style={styles.title}>{anime.title}</Text>
      <Text>Type: {anime.type}</Text>
      <Text>Episodes: {anime.episodes}</Text>
      <Text>Status: {anime.status}</Text>
      <Text>Description: {anime.description}</Text>
      <Text>Release Date: {new Date(anime.releaseDate).toLocaleDateString('en-GB')}</Text>
      <Text>Upload Date: {new Date(anime.uploadDate).toLocaleDateString('en-GB')}</Text>
      <Text>Source: {anime.source}</Text>
      <Text>External Link: {anime.externalLink}</Text>
      <Text>Duration: {anime.duration}</Text>
      <Text>Rating: {anime.rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default AnimePage;
