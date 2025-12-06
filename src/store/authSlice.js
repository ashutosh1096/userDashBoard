import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register(state, action) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(users));
      state.user = action.payload;
      localStorage.setItem('loggedInUser', JSON.stringify(action.payload));
      const token = btoa(`${action.payload.email}:${Date.now()}`);
      localStorage.setItem('demo_auth', token);
    },
    login(state, action) {
      const { email, password } = action.payload;
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        state.user = user;
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        const token = btoa(`${email}:${Date.now()}`);
        localStorage.setItem('demo_auth', token);
      } 
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('demo_auth');
      state.loading = false;
    },
    loadUserFromStorage(state) {
      try {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) state.user = user;
      } catch {
        // ignore
      }
    },
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  },
});

export const { register, login, logout, loadUserFromStorage, startLoading, stopLoading } = authSlice.actions;
export default authSlice.reducer;
