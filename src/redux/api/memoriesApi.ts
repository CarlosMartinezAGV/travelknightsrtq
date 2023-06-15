// '@reduxjs/toolkit/query/react' creates the custom hooks
// '@reduxjs/toolkit/query' does not create the custom hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, USER } from '../user'
import { CurrentState, Memory } from '../types'
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
        invalidatesTags: () => [{ type: 'Memory', id: 'LIST' }],
        query: (memory) => {
          return {
            url: '/memories',
            method: 'POST',
            body: {
              // With accounts, we can use the id from the account object
              // userId: user.id,
              title: memory.title,
              city: memory.city,
              startDate: memory.startDate,
              endDate: memory.endDate,
              description: memory.description,
              userId: USER.id,
              stateId: memory.stateId,
            },
          }
        },
      }),
      fetchMemories: builder.query<Memory[], CurrentState>({
        // Provide the data hook builder with a providedTags option
        // to specify which tags should be provided to the data hook
        // when the query is fulfilled
        providesTags: (result, _error, state) => {
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
              stateId: state.id,
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
        invalidatesTags: (memory) => [{ type: 'Memory', id: memory.id }],
        query: (memory) => {
          return {
            url: `/memories/${memory.id}`,
            method: 'DELETE',
          }
        },
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
