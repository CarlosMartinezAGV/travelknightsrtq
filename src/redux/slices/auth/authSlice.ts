import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { AuthTokenResponseData } from "./types";

const initialState: AuthTokenResponseData = {
  user: null,
  session: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
    },
    logout: (state) => {
      state.user = null;
      state.session = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentAccessToken = (state: RootState) =>
  state.auth.session?.access_token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentAuth = (state: RootState) => state.auth;
