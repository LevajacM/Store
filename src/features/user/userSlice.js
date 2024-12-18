import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const themes = {
  emerald: 'emerald',
  dim: 'dim',
};

const getTheme = () => {
  const theme = localStorage.getItem('theme') || themes.emerald;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};

const getUser = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
};

const initialState = {
  user: getUser(),
  theme: getTheme(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = { ...action.payload.user, token: action.payload.jwt };
      state.user = user;
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    },
    toggleTheme: (state) => {
      const { emerald, dim } = themes;
      state.theme = state.theme === emerald ? dim : emerald;

      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { loginUser, logoutUser, toggleTheme } = userSlice.actions;

export default userSlice.reducer;
