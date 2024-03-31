import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchAnime = createAsyncThunk('anime/fetchAnime', async () => {
  const response = await api.get('/anime');
  return response.data.anime;
});

export const animeSlice = createSlice({
  name: 'anime',
  initialState: {
    animeList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnime.fulfilled, (state, action) => {
      state.animeList = action.payload;
    });
  },
});

export default animeSlice.reducer;
