import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SectionList, FlatList, RefreshControl, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AnimeCard from '../components/AnimeCard';
import { fetchAnime } from '../store/anime';
import { Searchbar } from 'react-native-paper';

function MainPage({ navigation }) {
  const animeList = useSelector((state) => state.anime.animeList);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAnimeList, setFilteredAnimeList] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchAnime()).then(() => setRefreshing(false));
  }, [dispatch]);

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
    <SectionList
      contentContainerStyle={styles.container}
      sections={sections}
      keyExtractor={(item) => item._id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={() => (
        <Searchbar
          style={styles.searchbar}
          placeholder="Search"
          onChangeText={(search) => setSearchQuery(search)}
          value={searchQuery}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
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
