import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './anime';
import characterReducer from './character';

export default configureStore({
  reducer: {
    anime: animeReducer,
    character: characterReducer,
  },
});
