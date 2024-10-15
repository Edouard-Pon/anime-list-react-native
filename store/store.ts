import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth'
import animeReducer from './anime'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    anime: animeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
