import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './anime';

export default configureStore({
  reducer: {
    anime: animeReducer,
  },
});

