import React, { useEffect } from 'react';
import { Text, View, StyleSheet, SectionList, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacter } from '../store/character';
import CharacterCard from '../components/CharacterCard';
import { Searchbar } from 'react-native-paper';


function CharactersPage({ navigation }) {
  const characterList = useSelector((state) => state.character.characterList);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredCharacterList, setFilteredCharacterList] = React.useState(null);

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

  if (!characterList) return (<View style={styles.container}><Text>Loading...</Text></View>);

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
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(search) => setSearchQuery(search)}
        value={searchQuery}
      />
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
