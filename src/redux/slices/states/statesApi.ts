import { supabase } from "../../../supabase/main";
import { apiSlice } from "../../api/apiSlice";
import { TState, TStateInsert } from "./types";

export const statesApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      addState: builder.mutation<TState, TStateInsert>({
        queryFn: async (state) => {
          const { data, error } = await supabase
            .from("states")
            .insert([{ ...state }])
            .select();

          if (error) {
            throw new Error(`addState error: ${error.message}`);
          }
          // Return the newly added state with id
          return { data: data[0] };
        },
        invalidatesTags: ["States"],
      }),
      fetchStates: builder.query<TState[], TState["user_id"]>({
        queryFn: async (user_id) => {
          if (!user_id) {
            throw new Error("fetchStates error: no user_id provided");
          }

          const { data, error } = await supabase
            .from("states")
            .select("*")
            .eq("user_id", user_id);

          if (error) {
            throw new Error(`fetchStates error: ${error.message}`);
          }

          // Return an array of states
          return { data };
        },
        providesTags: ["States"],
      }),
      deleteState: builder.mutation<null, TState["id"]>({
        queryFn: async (state_id) => {
          if (!state_id) {
            throw new Error("removeState error: no state_id provided");
          }
          const { error } = await supabase
            .from("states")
            .delete()
            .eq("id", state_id);

          if (error) {
            throw new Error(`removeState error: ${error.message}`);
          }

          // Return null to indicate success
          return { data: null };
        },
        invalidatesTags: ["States"],
      }),
    };
  },
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useFetchStatesQuery,
  useAddStateMutation,
  useDeleteStateMutation,
} = statesApi;
