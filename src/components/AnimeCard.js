import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

function AnimeCard({ anime, navigation }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AnimePage', { anime })}>
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
});

export default AnimeCard;
