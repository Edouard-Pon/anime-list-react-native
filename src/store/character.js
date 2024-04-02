import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchCharacter = createAsyncThunk('character/fetchCharacter', async () => {
  const response = await api.get('/character');
  return response.data.character;
});

export const characterSlice = createSlice({
  name: 'character',
  initialState: {
    characterList: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacter.fulfilled, (state, action) => {
      state.characterList = action.payload;
    });
  },
});

export default characterSlice.reducer;
