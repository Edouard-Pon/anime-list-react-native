import React, { useEffect } from 'react';
import { Text, View, StyleSheet, SectionList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacter } from '../store/character';
import CharacterCard from '../components/CharacterCard';

function CharactersPage({ navigation }) {
  const characterList = useSelector((state) => state.character.characterList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacter());
  }, [dispatch]);

  const sections = [
    {title: 'Characters', data: characterList, renderItem: ({item}) => <CharacterCard character={item} navigation={navigation} />}
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item._id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default CharactersPage;
