import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchCharacter = createAsyncThunk('character/fetchCharacter', async () => {
  const response = await api.get('/character');
  return response.data.character;
});

const initialState = {
  name: '',
  originalName: '',
  description: '',
  image: null,
  anime: [],
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setOriginalName: (state, action) => {
      state.originalName = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setAnime: (state, action) => {
      state.anime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharacter.fulfilled, (state, action) => {
      state.characterList = action.payload;
    });
  },
});

export const { setName, setOriginalName, setDescription, setImage, setAnime } = characterSlice.actions;

export default characterSlice.reducer;
