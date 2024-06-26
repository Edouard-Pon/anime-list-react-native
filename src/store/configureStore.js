import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './anime';
import characterReducer from './character';
import menuReducer from './menu';
import userReducer from './user';
import animeListReducer from './animeList';

export default configureStore({
  reducer: {
    anime: animeReducer,
    character: characterReducer,
    menu: menuReducer,
    user: userReducer,
    animeList: animeListReducer,
  },
});
