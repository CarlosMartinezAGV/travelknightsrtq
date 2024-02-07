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
    refreshSession: (state, action) => {
      state.session = action.payload.session;
    },
    logout: (state) => {
      state.user = null;
      state.session = null;
    },
  },
});

export const { setCredentials, refreshSession, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentSession = (state: RootState) => state.auth.session;
export const selectCurrentUser = (state: RootState) => state.auth.user;
