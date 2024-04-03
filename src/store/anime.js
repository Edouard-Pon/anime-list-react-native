import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchAnime = createAsyncThunk('anime/fetchAnime', async () => {
  const response = await api.get('/anime');
  return response.data.anime;
});

export const searchAnime = createAsyncThunk('anime/searchAnime', async (query) => {
  const response = await api.post('/anime/search', { title: query });
  return response.data.anime;
});

export const animeSlice = createSlice({
  name: 'anime',
  initialState: {
    animeList: [],
    searchResults: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnime.fulfilled, (state, action) => {
      state.animeList = action.payload;
    });
    builder.addCase(searchAnime.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
  },
});

export default animeSlice.reducer;
