import { apiSlice } from "../../api/apiSlice";
import { TMemory, TMemoryInsert } from "./types";
import { supabase } from "../../../supabase/main";

export const memoriesApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      addMemory: builder.mutation<TMemory, TMemoryInsert>({
        invalidatesTags: (memory) => [
          { type: "Memories", id: memory?.state_id },
        ],
        queryFn: async (memory) => {
          if (!memory) {
            throw new Error("addMemory error: no memory provided");
          }

          const { data, error } = await supabase
            .from("memories")
            .insert([{ ...memory }])
            .select();

          if (error) {
            throw new Error(`addMemory error: ${error.message}`);
          }
          return { data: data[0] };
        },
      }),
      fetchMemories: builder.query<TMemory[] | null, TMemory["state_id"]>({
        providesTags: (result) => {
          return result
            ? [
                ...result.map((memory: TMemory) => ({
                  type: "Memories" as const,
                  id: memory.state_id,
                })),
              ]
            : [{ type: "Memories", id: "LIST" }];
        },
        queryFn: async (state_id) => {
          // If no state_id is provided, return an empty array of memories to avoid
          // fetching memories for a state that doesn't exist
          if (!state_id) {
            return { data: null };
          }

          const { data, error } = await supabase
            .from("memories")
            .select("*")
            .eq("state_id", state_id);

          if (error) {
            throw { message: `fetchMemories error: ${error.message}` };
          }
          return { data };
        },
      }),
      updateMemory: builder.mutation({
        invalidatesTags: (memory) => [{ type: "Memories", id: memory.id }],
        query: (memory) => {
          // return {
          //   url: `/memories/${memory.id}`,
          //   method: "PUT",
          //   body: {
          //     title: memory.title,
          //     city: memory.city,
          //     startDate: memory.startDate,
          //     endDate: memory.endDate,
          //     description: memory.description,
          //     userId: USER.id,
          //     stateId: memory.stateId,
          //   },
          // };
        },
      }),
      removeMemory: builder.mutation({
        invalidatesTags: (memory) => [{ type: "Memories", id: memory.id }],
        query: (memory) => {
          // return {
          //   url: `/memories/${memory.id}`,
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
  useAddMemoryMutation,
  useFetchMemoriesQuery,
  useUpdateMemoryMutation,
  useRemoveMemoryMutation,
} = memoriesApi;
