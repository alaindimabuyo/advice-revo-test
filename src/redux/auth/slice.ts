import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registerUser: [],
  loginUser: null,
};

export const STORE_NAME = "auth";

const series = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    setRegisterUser: (state, action) => {
      state.registerUser = action.payload;
    },
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
  },
});

export const { reducer, name, actions } = series;
