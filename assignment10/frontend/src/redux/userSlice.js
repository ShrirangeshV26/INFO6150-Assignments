import { createSlice } from '@reduxjs/toolkit';

const initial = {
  token: localStorage.getItem('token') || '',
  type: localStorage.getItem('type') || '',
  name: localStorage.getItem('name') || ''
};

const slice = createSlice({
  name: 'user',
  initialState: initial,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.type = action.payload.type;
      state.name = action.payload.name;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('type', action.payload.type);
      localStorage.setItem('name', action.payload.name);
    },
    logout(state) {
      state.token = '';
      state.type = '';
      state.name = '';
      localStorage.removeItem('token');
      localStorage.removeItem('type');
      localStorage.removeItem('name');
    }
  }
});

export const { loginSuccess, logout } = slice.actions;
export default slice.reducer;
