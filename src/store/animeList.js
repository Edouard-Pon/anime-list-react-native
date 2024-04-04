import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';


export const fetchAnimeList = createAsyncThunk('animeList/fetchAnimeList', async () => {
  const userId = await AsyncStorage.getItem('userId');
  const token = await AsyncStorage.getItem('token');
  const response = await api.get(`/anime-list/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
});

export const addToFavorites = createAsyncThunk('animeList/addToFavorites', async (animeId) => {
  const userId = await  AsyncStorage.getItem('userId');
  const token = await AsyncStorage.getItem('token');

  const response = await api.post(`/anime-list/${userId}/favorites`, { animeId }, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data.animeList;
});

const animeListSlice = createSlice({
  name: 'animeList',
  initialState: {
    animeList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      state.animeList = action.payload;
    });
    builder.addCase(fetchAnimeList.fulfilled, (state, action) => {
      state.animeList = action.payload;
    });
  },
});

export default animeListSlice.reducer;
