import { USER } from "../../utils";
import { apiSlice } from "../../api/apiSlice";
import { TMemory, TMemoryInsert } from "./types";
import { supabase } from "../../../supabase/main";

export const memoriesApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      addMemory: builder.mutation<void, TMemoryInsert>({
        // Provide the data hook builder with an invalidatesTags option
        // to specify which tags should be invalidated when the mutation
        // is fulfilled successfully
        invalidatesTags: () => [{ type: "Memory", id: "LIST" }],
        query: async (memory) => {
          const { data, error } = await supabase
            .from("memories")
            .insert([{ ...memory }])
            .select();

          if (error) {
            console.log("fetchMemories error: ", error);
            // throw { error };
          }
          return { data };
        },
      }),
      fetchMemories: builder.query<TMemory[], string>({
        // Provide the data hook builder with a providedTags option
        // to specify which tags should be provided to the data hook
        // when the query is fulfilled
        providesTags: (result) => {
          return result
            ? [
                ...result.map((memory: TMemory) => ({
                  type: "Memory" as const,
                  id: memory.id,
                })),
                { type: "Memory", id: "LIST" },
              ]
            : [{ type: "Memory", id: "LIST" }];
        },
        queryFn: async (state_id) => {
          const { data, error } = await supabase
            .from("memories")
            .select("*")
            .eq("state_id", state_id);

          console.log("fetchMemories: ", data);
          if (error) {
            console.log("fetchMemories error: ", error);
            throw { error };
          }
          return { data };
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
