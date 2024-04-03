import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SectionList, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AnimeCard from '../components/AnimeCard';
import { fetchAnime } from '../store/anime';
import { Searchbar } from 'react-native-paper';

function MainPage({ navigation }) {
  const animeList = useSelector((state) => state.anime.animeList);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAnimeList, setFilteredAnimeList] = useState(null);

  useEffect(() => {
    dispatch(fetchAnime());
  }, [dispatch]);

  useEffect(() => {
    if (animeList) {
      filterAnimeList(searchQuery);
    }
  }, [animeList, searchQuery]);

  const filterAnimeList = (search) => {
    if (!search) {
      setFilteredAnimeList(null);
    } else {
      const filteredList = animeList.filter((anime) =>
        anime.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredAnimeList(filteredList);
    }
  };

  if (!animeList) return <View style={styles.container}><Text>Loading...</Text></View>;

  const sections = [
    {
      title: 'Anime',
      data: [filteredAnimeList || animeList],
      renderItem: ({ item }) => (
        <FlatList
          data={item}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <AnimeCard anime={item} navigation={navigation} />}
        />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Search"
        onChangeText={(search) => setSearchQuery(search)}
        value={searchQuery}
      />
      <SectionList sections={sections} keyExtractor={(item) => item._id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  searchbar: {
    marginRight: 16,
    marginLeft: 16,
    marginTop: 5
  }
});

export default MainPage;
