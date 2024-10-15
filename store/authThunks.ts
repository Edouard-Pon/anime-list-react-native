import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { api, setToken } from '@/services/api';
import { User } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/login', credentials);
      const { token, user }: { token: string; user: User } = response.data;
      await AsyncStorage.setItem('authToken', token);
      setToken(token);
      return { token, user };
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && error.response.data) {
        const errorMessage = (error.response.data as { message: string }).message;
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (newUser: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/register', newUser);
      const { token, user }: { token: string; user: User } = response.data;
      return { token, user };
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && error.response.data) {
        const errorMessage = (error.response.data as { message: string }).message;
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);
