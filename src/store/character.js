import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const fetchCharacter = createAsyncThunk('character/fetchCharacter', async () => {
  const response = await api.get('/character');
  return response.data.character;
});

export const searchCharacter = createAsyncThunk('character/searchCharacter', async (query) => {
  const response = await api.post('/character/search', { name: query });
  return response.data.character;
});

export const createCharacter = createAsyncThunk('character/createCharacter', async (character) => {
  try {
    const { name, originalName, description, image } = character;
    const token = await AsyncStorage.getItem('token');

    let formData = new FormData();
    formData.append('name', name);
    formData.append('originalName', originalName);
    formData.append('description', description);
    formData.append('anime', JSON.stringify(character.anime));
    formData.append('image', {
      uri: image.uri,
      type: image.type,
      name: image.mimeType,
    });

    const response = await api({
      method: 'post',
      url: '/character/create',
      data: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.character;
  } catch (e) {
    return e.response.status === 403 ? e.response.data.message : '403 Forbidden';
  }
});

const initialState = {
  name: '',
  originalName: '',
  description: '',
  image: null,
  anime: [],
  searchResults: [],
  characterList: [],
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
    builder.addCase(createCharacter.fulfilled, (state, action) => {
      state.character = action.payload;
    });
    builder.addCase(searchCharacter.fulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
  },
});

export const { setName, setOriginalName, setDescription, setImage, setAnime } = characterSlice.actions;

export default characterSlice.reducer;
