// '@reduxjs/toolkit/query/react' creates the custom hooks
// '@reduxjs/toolkit/query' does not create the custom hooks
import { User } from "@supabase/supabase-js";
import { supabase } from "../../../supabase/main";
import { apiSlice } from "../../api/apiSlice";
import { TState } from "./types";

export const statesApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      addState: builder.mutation({
        // Provide the data hook builder with an invalidatesTags option
        // to specify which tags should be invalidated when the mutation
        // is fulfilled successfully
        invalidatesTags: () => [{ type: "States", id: "LIST" }],
        query: (state) => {
          return {
            url: "/states",
            method: "POST",
            body: {
              //   userId: user.id,
              userId: 1,
              name: state.name,
              abbreviation: state.abbreviation,
            },
          };
        },
      }),
      fetchStates: builder.query<TState[], User | null>({
        // Provide the data hook builder with a providedTags option
        // to specify which tags should be provided to the data hook
        // when the query is fulfilled
        providesTags: (result) => {
          return result
            ? [
                ...result.map((state: TState) => ({
                  type: "States" as const,
                  id: state.id,
                })),
                { type: "States", id: "LIST" },
              ]
            : [{ type: "States", id: "LIST" }];
        },
        queryFn: async (user) => {
          const { data, error } = await supabase
            .from("states")
            .select("*")
            .eq("user_id", user?.id);

          if (error) {
            console.error("fetchStates: ", error);
            throw { error };
          }

          return { data };
        },
      }),
      fetchState: builder.query({
        query: (id) => {
          return {
            url: "/states",
            params: {
              userId: 1,
              id: id,
            },
            method: "GET",
          };
        },
        transformResponse: (response) => {
          // Modify the response to return an object instead of an array
          if (Array.isArray(response)) {
            return response[0];
          }
          return response;
        },
      }),
      removeState: builder.mutation({
        invalidatesTags: () => [{ type: "States", id: "LIST" }],
        query: (stateId) => {
          return {
            url: `/states/${stateId}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useFetchStatesQuery,
  useFetchStateQuery,
  useAddStateMutation,
  useRemoveStateMutation,
} = statesApi;
