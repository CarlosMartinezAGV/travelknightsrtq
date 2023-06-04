// '@reduxjs/toolkit/query/react' creates the custom hooks
// '@reduxjs/toolkit/query' does not create the custom hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, USER } from '../user'
import { CurrentState, Memory } from '../types'
import { useRemoveStateMutation } from '../store'
/*
    3 required properties:

    reducerPath: a string that will be used as the prefix for generated action types
    baseQuery: a function that takes an object containing the query and returns a Promise that resolves to the data
    endpoints: an object containing endpoint definitions

*/

const memoriesApi = createApi({
  reducerPath: 'memories',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Memory'],
  endpoints(builder) {
    return {
      addMemory: builder.mutation({
        // Provide the data hook builder with an invalidatesTags option
        // to specify which tags should be invalidated when the mutation
        // is fulfilled successfully
        invalidatesTags: (result, error, memory) => [
          { type: 'Memory', id: memory.id },
        ],
        query: (memory) => {
          return {
            url: '/memories',
            method: 'POST',
            body: {
              //   userId: user.id,
              title: memory.title,
              city: memory.city,
              description: memory.description,
              userId: USER.id,
              stateAbbreviationId: memory.stateAbbreviationId,
            },
          }
        },
      }),
      fetchMemories: builder.query<Memory[], CurrentState>({
        // Provide the data hook builder with a providedTags option
        // to specify which tags should be provided to the data hook
        // when the query is fulfilled
        providesTags: (result, error, state) => {
          return result
            ? [
                ...result.map((memory) => ({
                  type: 'Memory' as const,
                  id: memory.id,
                  stateAbbreviationId: state.currentStateAbbreviation,
                })),
                { type: 'Memory', id: 'LIST' },
              ]
            : [{ type: 'Memory', id: 'LIST' }]
        },
        query: (state) => {
          return {
            url: '/memories',
            params: {
              userId: USER.id,
              stateAbbreviationId: state.currentStateAbbreviation,
            },
            method: 'GET',
          }
        },
      }),
      removeMemory: builder.mutation({
        /*
            Album is passed but for invalidatesTags we only need the userId
            so we can use the userId from the album object
            to invalidate the Album tag
            But, when we don't have the album object, we can use the
            result object to get the userId
          */
        invalidatesTags: (result, error, memory) => [
          { type: 'Memory', id: memory.id },
        ],
        query: (memory) => {
          return {
            url: `/memories/${memory.id}`,
            method: 'DELETE',
          }
        },
        // onQueryStarted: async (memory, { dispatch, queryFulfilled }) => {

        // isSuccess: async (_, { getState, dispatch }) => {
        //   // const stateId = getState().memories.stateId
        //   // const memories = getState().memories.data

        //   // Check if there are no more memories tied to the state
        //   if (memories.length === 0) {
        //     // Dispatch an action to remove the state
        //     // dispatch(stateApi.util.removeState(stateId))
        //     // Additional logic or dispatch actions after removing the state
        //   }
        // },
      }),
    }
  },
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useFetchMemoriesQuery,
  useAddMemoryMutation,
  useRemoveMemoryMutation,
} = memoriesApi
export { memoriesApi }
