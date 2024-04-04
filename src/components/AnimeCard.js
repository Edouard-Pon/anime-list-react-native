import React from 'react';
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

function AnimeCard({ anime, navigation }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AnimePage', { anime })}>
      <Image style={styles.image} source={{uri: anime.coverImagePath}} />
      <Text style={styles.title}>
        {anime && anime.title.length > 18 ? `${anime.title.slice(0, 15)}...` : anime.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    border: 0,
    outline: 'none',
    maxWidth: 180,

  },
  title: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Pacifico',
  },
  image: {
    width: 160,
    height: 240,
    borderRadius: 10,
  },
});

export default AnimeCard;
