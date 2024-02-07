import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Memories", "States"],
  endpoints: () => ({}),
});
