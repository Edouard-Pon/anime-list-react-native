import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api } from '@/services/api';
import { Character } from "@/store/types";

export const fetchCharacters = createAsyncThunk('character/fetchCharacters', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/character');
    const characters: Character[] = response.data.character.map((character: any): Character => ({
      id: character._id,
      name: character.name,
      original_name: character.originalName ?? null,
      description: character.description ?? null,
      cover_image: character.coverImageUrl,
      anime: character.anime ?? [],
      upload_date: character.uploadDate,
    }));
    return characters;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response && error.response.data) {
      const errorMessage = (error.response.data as { message: string }).message;
      return rejectWithValue(errorMessage);
    }
    return rejectWithValue('An unknown error occurred');
  }
});
