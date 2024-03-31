import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AnimeCard from '../components/AnimeCard';
import { fetchAnime } from '../store/anime';

function MainPage({ navigation }) {
  const animeList = useSelector((state) => state.anime.animeList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnime());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={animeList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <AnimeCard anime={item} navigation={navigation} />}
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
});

export default MainPage;
