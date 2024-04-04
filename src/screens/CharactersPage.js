import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, SectionList, FlatList, RefreshControl, ScrollView, Dimensions} from 'react-native';
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
  const setSearchQueryMemoized = React.useCallback((search) => {
    setSearchQuery(search);
  }, []);

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
    <SectionList
      contentContainerStyle={styles.container}
      sections={sections}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={
        <Searchbar
            style={styles.searchbar}
            placeholder="Search"
            placeholderTextColor={'white'}
            onChangeText={setSearchQueryMemoized}
            value={searchQuery}
            color='white'
            iconColor='white'
        />
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: 'white',
    height: Dimensions.get('window').height,
  },
  searchbar: {
    width: Dimensions.get('window').width - 64,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 5,
    backgroundColor: 'rgba(255, 155, 155, 0.7)',
    borderRadius: 5,
  }
});

export default CharactersPage;
