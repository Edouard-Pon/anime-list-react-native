import React from 'react';
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

function AnimeCard({ anime, navigation }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AnimePage', { anime })}>
      <Image style={styles.image} source={{uri: anime.coverImagePath}} />
      <Text style={styles.title}>{anime.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default AnimeCard;
