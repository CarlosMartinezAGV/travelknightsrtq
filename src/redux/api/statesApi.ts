// '@reduxjs/toolkit/query/react' creates the custom hooks
// '@reduxjs/toolkit/query' does not create the custom hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { USER, BASE_URL } from "../user"
import { State } from "../types"
/*
    3 required properties:

    reducerPath: a string that will be used as the prefix for generated action types
    baseQuery: a function that takes an object containing the query and returns a Promise that resolves to the data
    endpoints: an object containing endpoint definitions

*/
const statesApi = createApi({
  reducerPath: "states",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["States"],
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
              userId: USER.id,
              name: state.name,
              abbreviation: state.abbreviation,
            },
          }
        },
      }),
      fetchStates: builder.query<State[], void>({
        // Provide the data hook builder with a providedTags option
        // to specify which tags should be provided to the data hook
        // when the query is fulfilled
        providesTags: (result) => {
          return result
            ? [
                ...result.map((state) => ({
                  type: "States" as const,
                  id: state.id,
                })),
                { type: "States", id: "LIST" },
              ]
            : [{ type: "States", id: "LIST" }]
        },
        query: () => {
          return {
            url: "/states",
            params: {
              userId: USER.id,
            },
            method: "GET",
          }
        },
      }),
      fetchState: builder.query<State, string>({
        query: (id) => {
          return {
            url: "/states",
            params: {
              userId: USER.id,
              id: id,
            },
            method: "GET",
          }
        },
        transformResponse: (response) => {
          // Modify the response to return an object instead of an array
          if (Array.isArray(response)) {
            return response[0]
          }
          return response
        },
      }),
      removeState: builder.mutation({
        invalidatesTags: () => [{ type: "States", id: "LIST" }],
        query: (stateId) => {
          return {
            url: `/states/${stateId}`,
            method: "DELETE",
          }
        },
      }),
    }
  },
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useFetchStatesQuery,
  useFetchStateQuery,
  useAddStateMutation,
  useRemoveStateMutation,
} = statesApi
export { statesApi }
