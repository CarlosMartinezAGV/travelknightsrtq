import { supabase } from "../../../supabase/main";
import { apiSlice } from "../../api/apiSlice";
import { TState, TStateInsert } from "./types";

export const statesApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      addState: builder.mutation<TState, TStateInsert>({
        invalidatesTags: ["States"],
        queryFn: async (state) => {
          const { data, error } = await supabase
            .from("states")
            .insert([{ ...state }])
            .select();

          if (error) {
            throw new Error(`addState error: ${error.message}`);
          }
          return { data: data[0] };
        },
      }),
      fetchStates: builder.query<TState[], TState["user_id"]>({
        providesTags: ["States"],
        queryFn: async (user_id) => {
          if (!user_id) {
            throw new Error("fetchStates error: no user_id provided");
          }

          const { data, error } = await supabase
            .from("states")
            .select("*")
            .eq("user_id", user_id ?? "");

          if (error) {
            throw new Error(`fetchStates error: ${error.message}`);
          }

          return { data };
        },
      }),
      removeState: builder.mutation({
        invalidatesTags: ["States"],
        query: (stateId) => {
          // return {
          //   url: `/states/${stateId}`,
          //   method: "DELETE",
          // };
        },
      }),
    };
  },
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useFetchStatesQuery,
  useAddStateMutation,
  useRemoveStateMutation,
} = statesApi;
