import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

function CharacterPage({ route }) {
  const { character } = route.params;

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: character.imagePath}} />
      <Text style={styles.title}>{character.name}</Text>
      <Text>Original Name: {character.originalName}</Text>
      <Text>Description: {character.description}</Text>
      <Text>Upload Date: {new Date(character.uploadDate).toLocaleDateString('en-GB')}</Text>
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

export default CharacterPage;
