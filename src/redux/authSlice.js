import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  credentials: {
    email: '',
    password: '',
    isLoggedIn: false
  },
  submitData: {
    email: '',
    password: '',
    isLoggedIn: false
  },
  errors: {
    email: '',
    password: ''
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.credentials = { ...state.credentials, ...action.payload }
    },
    setSubmitData: (state, action) => {
      state.submitData = { ...state.submitData, ...action.payload }
    },
    setErrors: (state, action) => {
      state.errors = { ...state.errors, ...action.payload }
    },
  },
});

export const { setCredentials, setErrors, setSubmitData } = authSlice.actions;

export default authSlice.reducer;
