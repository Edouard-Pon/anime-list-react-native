import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './anime';
import characterReducer from './character';
import menuReducer from './menu';

export default configureStore({
  reducer: {
    anime: animeReducer,
    character: characterReducer,
    menu: menuReducer,
  },
});
