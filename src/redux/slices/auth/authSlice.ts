import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { authApiSlice } from "./authApiSlice";

const initialState = {
  user: null,
  access_token: null,
  refresh_token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      return {
        ...state,
        ...action.payload.data,
      };
    },
    logout: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.login.matchFulfilled,
      (state, action) => {
        return {
          ...state,
          ...action.payload.data,
        };
      }
    );
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentAccessToken = (state: RootState) =>
  state.auth.access_token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
