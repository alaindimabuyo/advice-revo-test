import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  people: [],
};

export const STORE_NAME = "auth";

const series = createSlice({
  name: STORE_NAME,
  initialState,
  reducers: {
    setPeople: (state, action) => {
      state.people = action.payload;
    },
  },
});

export const { reducer, name, actions } = series;
