// '@reduxjs/toolkit/query/react' creates the custom hooks
// '@reduxjs/toolkit/query' does not create the custom hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { USER, BASE_URL } from '../user'
import { State } from '../types'
/*
    3 required properties:

    reducerPath: a string that will be used as the prefix for generated action types
    baseQuery: a function that takes an object containing the query and returns a Promise that resolves to the data
    endpoints: an object containing endpoint definitions

*/
const statesApi = createApi({
  reducerPath: 'states',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      addState: builder.mutation({
        // Provide the data hook builder with an invalidatesTags option
        // to specify which tags should be invalidated when the mutation
        // is fulfilled successfully
        query: (state) => {
          return {
            url: '/states',
            method: 'POST',
            body: {
              //   userId: user.id,
              userId: USER.id,
              state: state,
            },
          }
        },
      }),
      fetchStates: builder.query<State[], void>({
        // Provide the data hook builder with a providedTags option
        // to specify which tags should be provided to the data hook
        // when the query is fulfilled
        // providesTags: (result, error, user) => {
        //   const tags = result.map((state) => {
        //     return {
        //       type: 'States',
        //       id: state.id,
        //     }
        //   })

        //   tags.push({ type: 'UserId', id: user.id })
        //   return tags
        // },
        query: () => {
          return {
            url: '/states',
            params: {
              userId: USER.id,
            },
            method: 'GET',
          }
        },
      }),
      removeState: builder.mutation({
        /*
            Album is passed but for invalidatesTags we only need the userId
            so we can use the userId from the album object
            to invalidate the Album tag
            But, when we don't have the album object, we can use the
            result object to get the userId
          */
        query: (state) => {
          return {
            url: `/states/${state.id}`,
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
  useFetchStatesQuery,
  //   useAddStateMutation,
  useRemoveStateMutation,
} = statesApi
export { statesApi }
