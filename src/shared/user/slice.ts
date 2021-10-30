import { UserState } from "./types";
import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
  createAction,
} from "@reduxjs/toolkit";
import { registration, login, getCurrUser } from "../../http/user-api";
import { UserPayload, UserLoginPayload } from "./types";

export const initialState: UserState = {
  profile: {
    id: "",
    username: "",
    email: "",
    role: "",
  },
  error: null,
};

export const userRegistration = createAsyncThunk(
  "user/userRegistration",
  async (payload: UserPayload) => registration(payload)
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (payload: UserLoginPayload) => login(payload)
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (id: string) => getCurrUser(id)
);

export const userLogout = createAction("user/logout");

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogout, (state) => {
      state.profile = initialState.profile;
    });

    builder.addMatcher(
      isAnyOf(
        userRegistration.fulfilled,
        userLogin.fulfilled,
        getCurrentUser.fulfilled
      ),
      (state, { payload }) => {
        state.profile = payload;
      }
    );

    builder.addMatcher(
      isAnyOf(
        userRegistration.pending,
        userLogin.pending,
        getCurrentUser.pending
      ),
      (state) => {
        state.error = null;
      }
    );

    builder.addMatcher(
      isAnyOf(
        userRegistration.rejected,
        userLogin.rejected,
        getCurrentUser.rejected
      ),
      (state, { error }) => {
        state.error = error;
      }
    );
  },
});
