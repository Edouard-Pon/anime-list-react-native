import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export const login = createAsyncThunk('user/login', async ({ username, password }) => {
  try {
    const response = await api.post('/user/login', { username, password });
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('username', response.data.user.username);
    await AsyncStorage.setItem('role', response.data.user.role);
    await AsyncStorage.setItem('userId', response.data.user._id);
    return response.data.user;
  } catch (error) {
    return error.response.data.message;
  }
});

export const signup = createAsyncThunk('user/signup', async ({ username, password }) => {
  try {
    const response = await api.post('/user/register', { username, password });
    return response.status === 200;
  } catch (error) {
    return error.response.data.message;
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  await AsyncStorage.clear();
  return null;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export default userSlice.reducer;
