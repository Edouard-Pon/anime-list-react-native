import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, SectionList, FlatList, RefreshControl, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacter } from '../store/character';
import CharacterCard from '../components/CharacterCard';
import { Searchbar } from 'react-native-paper';

function CharactersPage({ navigation }) {
  let characterList = useSelector((state) => state.character.characterList);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCharacterList, setFilteredCharacterList] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchCharacter());
  }, [dispatch]);

  useEffect(() => {
    if (characterList) {
      filterCharacterList(searchQuery);
    }
  }, [characterList, searchQuery]);

  const filterCharacterList = (search) => {
    if (!search) {
      setFilteredCharacterList(null);
    } else {
      const filteredList = characterList.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCharacterList(filteredList);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchCharacter()).then(() => setRefreshing(false));
  }, [dispatch]);

  if (!characterList) characterList = [];

  const sections = [
    {
      title: 'Characters',
      data: [filteredCharacterList || characterList],
      renderItem: ({ item }) =>
        <FlatList
          data={item}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <CharacterCard character={item} navigation={navigation}
          />}
        />
    }
  ];

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.container}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => item}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>{title}</Text>
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});

export default CharactersPage;
