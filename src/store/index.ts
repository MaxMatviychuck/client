import { useDispatch } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./root-reducer";

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: true,
        immutableCheck: true,
        serializableCheck: true,
      }),
    devTools: process.env.NODE_ENV !== "production",
  });

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
