import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const fetchAnime = createAsyncThunk('anime/fetchAnime', async () => {
  const response = await api.get('/anime');
  return response.data.anime;
});

export const createAnime = createAsyncThunk('anime/createAnime', async (anime) => {
  try {
    const token = await AsyncStorage.getItem('token');

    console.log(anime)

    let formData = new FormData();
    formData.append('title', anime.title);
    formData.append('type', anime.type);
    formData.append('episodes', anime.episodes);
    formData.append('status', anime.status);
    formData.append('description', anime.description);
    formData.append('releaseDate', anime.releaseDate);
    formData.append('source', anime.source);
    formData.append('externalLink', anime.externalLink);
    formData.append('duration', anime.duration);
    formData.append('rating', anime.rating);
    // formData.append('character', anime.character);
    formData.append('cover', {
      uri: anime.cover.uri,
      type: anime.cover.type,
      name: anime.cover.mimeType,
    });

    const response = await api({
      method: 'post',
      url: '/anime/create',
      data: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(response.data.anime)

    return response.data.anime;
  } catch (e) {
    return e.response.status === 403 ? e.response.data.message : '403 Forbidden';
  }
});

export const animeSlice = createSlice({
  name: 'anime',
  initialState: {
    animeList: [],
    animeInfo: null,
    formData: {
      title: '',
      type: '',
      episodes: '',
      status: '',
      description: '',
      releaseDate: '',
      source: '',
      externalLink: '',
      cover: null,
      genres: '',
      themes: '',
      duration: '',
      rating: '',
      character: [],
    },
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = {
        title: '',
        type: '',
        episodes: '',
        status: 'Ongoing',
        description: '',
        releaseDate: new Date(),
        source: '',
        externalLink: '',
        cover: null,
        genres: '',
        themes: '',
        duration: '',
        rating: '',
        character: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnime.fulfilled, (state, action) => {
      state.animeList = action.payload;
    });
    builder.addCase(createAnime.fulfilled, (state, action) => {
      // state.animeList = [...state.animeList, action.payload];
      state.formData = {
        title: '',
        type: '',
        episodes: '',
        status: '',
        description: '',
        releaseDate: '',
        source: '',
        externalLink: '',
        cover: null,
        genres: '',
        themes: '',
        duration: '',
        rating: '',
        character: '',
      };
    });
  },
});

export const { setFormData, resetFormData } = animeSlice.actions;

export default animeSlice.reducer;
