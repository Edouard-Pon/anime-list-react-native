import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '@/services/api';
import { Anime } from "@/store/types";

export const fetchAnimes = createAsyncThunk('anime/fetchAnimes', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/anime');
    const animes: Anime[] = response.data.anime.map((anime: any): Anime => ({
      id: anime._id,
      title: anime.title,
      type: anime.type,
      episodes: anime.episodes,
      status: anime.status,
      description: anime.description ?? null,
      release_date: anime.releaseDate ?? null,
      upload_date: anime.uploadDate,
      source: anime.source ?? null,
      external_link: anime.externalLink ?? null,
      cover_image: anime.coverImageUrl,
      genres: anime.genres ?? [],
      themes: anime.themes ?? [],
      duration: anime.duration ?? null,
      rating: anime.rating ?? null,
      characters: anime.characters ?? [],
    }));
    return animes;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response && error.response.data) {
      const errorMessage = (error.response.data as { message: string }).message;
      return rejectWithValue(errorMessage);
    }
    return rejectWithValue('An unknown error occurred');
  }
});
