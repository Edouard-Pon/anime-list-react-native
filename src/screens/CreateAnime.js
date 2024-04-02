import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

// Form to create an anime
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Anime</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} />
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} />
      <Text style={styles.label}>Image Path</Text>
      <TextInput style={styles.input} />
      <Button title="Create" onPress={() => {}} />
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
