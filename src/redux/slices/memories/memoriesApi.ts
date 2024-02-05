import { USER } from "../../utils";
import { apiSlice } from "../../api/apiSlice";
import { TMemory } from "./types";

export const memoriesApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      addMemory: builder.mutation({
        // Provide the data hook builder with an invalidatesTags option
        // to specify which tags should be invalidated when the mutation
        // is fulfilled successfully
        invalidatesTags: () => [{ type: "Memory", id: "LIST" }],
        query: (memory) => {
          return {
            url: "/memories",
            method: "POST",
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
          };
        },
      }),
      fetchMemories: builder.query({
        // Provide the data hook builder with a providedTags option
        // to specify which tags should be provided to the data hook
        // when the query is fulfilled
        providesTags: (result, _error, state) => {
          return result
            ? [
                ...result.map((memory: TMemory) => ({
                  type: "Memory" as const,
                  id: memory.id,
                  stateAbbreviationId: state.currentStateAbbreviation,
                })),
                { type: "Memory", id: "LIST" },
              ]
            : [{ type: "Memory", id: "LIST" }];
        },
        query: (state) => {
          return {
            url: "/rest/v1/memories?select=*",
            params: {
              userId: USER.id,
              stateId: state.id,
            },
            method: "GET",
          };
        },
      }),
      updateMemory: builder.mutation({
        invalidatesTags: (memory) => [{ type: "Memory", id: memory.id }],
        query: (memory) => {
          return {
            url: `/memories/${memory.id}`,
            method: "PUT",
            body: {
              title: memory.title,
              city: memory.city,
              startDate: memory.startDate,
              endDate: memory.endDate,
              description: memory.description,
              userId: USER.id,
              stateId: memory.stateId,
            },
          };
        },
      }),
      removeMemory: builder.mutation({
        invalidatesTags: (memory) => [{ type: "Memory", id: memory.id }],
        query: (memory) => {
          return {
            url: `/memories/${memory.id}`,
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
  useAddMemoryMutation,
  useFetchMemoriesQuery,
  useUpdateMemoryMutation,
  useRemoveMemoryMutation,
} = memoriesApi;
