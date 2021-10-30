import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../store/root-reducer";

import { userSlice } from "./slice";
import { UserState } from "./types";

const selectState = (state: AppState) => state[userSlice.name];

export const selectProfile = createSelector(
  selectState,
  (state: UserState) => state.profile
);
