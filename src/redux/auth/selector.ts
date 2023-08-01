import { createSelector } from "@reduxjs/toolkit";


export const selectSelf = (store) => store.series;

export const selectRegisterUser = createSelector(
  selectSelf,
  (state) => state.registerUser
);

export const selectLoginUser = createSelector(
  selectSelf,
  (state) => state.loginUser
);
