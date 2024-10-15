import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Anime } from './types';
import { fetchAnimes } from './animeThunks';

export interface AnimeState {
  animes: Anime[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AnimeState = {
  animes: [],
  status: 'idle',
  error: null,
};

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimes.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAnimes.fulfilled, (state, action: PayloadAction<Anime[]>) => {
        state.animes = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchAnimes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

export const selectAnimes = (state: RootState) => state.anime.animes;
export const selectAnimeStatus = (state: RootState) => state.anime.status;
export const selectAnimeError = (state: RootState) => state.anime.error;
export const selectAnimeById = (state: RootState, animeId: string) => state.anime.animes.find((anime) => anime.id === animeId);

export default animeSlice.reducer;
