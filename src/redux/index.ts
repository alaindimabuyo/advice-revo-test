import {
  actions as authActions,
  reducer as authReducer,
  name as authName,
} from "./auth/slice";

import {
  actions as peopleActions,
  reducer as peopleReducer,
  name as peopleName,
} from "./people/slice";

import * as authSelectors from "./auth/selector";
import * as peopleSelectors from "./people/selector";

import { configureStore, Middleware } from "@reduxjs/toolkit";

import {
  useSelector as _useSelector,
  useDispatch as _useDispatch,
} from "react-redux";

import { setupListeners } from "@reduxjs/toolkit/dist/query";

import baseQueryAPI from "./baseApi";

const storeMiddlewares = [];
storeMiddlewares.push(baseQueryAPI.middleware);

export const createStore = () => {
  const store = configureStore({
    reducer: {
      [baseQueryAPI.reducerPath]: baseQueryAPI.reducer,
      [authName]: authReducer,
      [peopleName]: peopleReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(...storeMiddlewares),
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = createStore();

export const actions = {
  [authName]: authActions,
  [peopleName]: peopleActions,
};

export const selectors = {
  [authName]: authSelectors,
  [peopleName]: peopleSelectors,
};

export const useDispatch = () => _useDispatch();
export const useSelector = _useSelector;
