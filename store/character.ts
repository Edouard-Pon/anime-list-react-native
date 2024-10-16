import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Character } from './types';
import { fetchCharacters } from './characterThunks';

export interface CharacterState {
  characters: Character[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CharacterState = {
  characters: [],
  status: 'idle',
  error: null,
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<Character[]>) => {
        state.characters = action.payload;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred.';
      });
  },
});

export const selectCharacters = (state: RootState) => state.character.characters;
export const selectCharacterStatus = (state: RootState) => state.character.status;
export const selectCharacterError = (state: RootState) => state.character.error;
export const selectCharacterById = (state: RootState, characterId: string) => state.character.characters.find((character) => character.id === characterId);

export default characterSlice.reducer;
