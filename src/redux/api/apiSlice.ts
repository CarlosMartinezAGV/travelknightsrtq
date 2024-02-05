import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../slices/auth/authSlice";
import { SUPABASE_KEY, SUPABASE_URL } from "../../supabase/main";
import { RootState } from "../store";

// export const BASE_URL = "https://gauogophnffxrrcbrzpi.supabase.co";

const baseQuery = fetchBaseQuery({
  baseUrl: SUPABASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const access_token = (getState() as RootState).auth.session?.access_token;

    if (access_token) {
      headers.set("Authorization", `Bearer ${access_token}`);
    }
    headers.set("apikey", SUPABASE_KEY);

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      "/api/auth/refresh",
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials(refreshResult.data));

      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // if refresh token is invalid, log out
      // TODO: display error message to user then log out after 5 seconds
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Memory", "States"],
  endpoints: () => ({}),
});
