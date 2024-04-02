import axios from 'axios';
const { EXPO_PUBLIC_API_URL, EXPO_PUBLIC_API_KEY } = process.env;

const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': EXPO_PUBLIC_API_KEY,
  },
});

export default api;
