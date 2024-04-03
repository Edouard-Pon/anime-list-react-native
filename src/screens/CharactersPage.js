import React, { useEffect } from 'react';
import {Text, View, StyleSheet, SectionList, FlatList} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacter } from '../store/character';
import CharacterCard from '../components/CharacterCard';


function CharactersPage({ navigation }) {
  const characterList = useSelector((state) => state.character.characterList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacter());
  }, [dispatch]);

  if(!characterList) return (<View style={styles.container}><Text>Loading...</Text></View>);

  const sections = [
    {title: 'Characters', data: [characterList], renderItem: ({item}) => <FlatList
          data={item}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => <CharacterCard character={item} navigation={navigation}
          />}
      />}
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});

export default CharactersPage;
