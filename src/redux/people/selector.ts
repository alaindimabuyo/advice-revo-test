import { createSelector } from "@reduxjs/toolkit";


export const selectSelf = (store) => store.people;

export const selectPeople = createSelector(
  selectSelf,
  (state) => state.people
);


