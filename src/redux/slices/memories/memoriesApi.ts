import { apiSlice } from "../../api/apiSlice";
import { TMemory, TMemoryInsert } from "./types";
import { supabase } from "../../../supabase/main";

export const memoriesApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      addMemory: builder.mutation<TMemory, TMemoryInsert>({
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
          // Return the newly added memory
          return { data: data[0] };
        },
        invalidatesTags: () => [{ type: "Memories", id: "LIST" }],
      }),
      fetchMemories: builder.query<TMemory[] | null, TMemory["state_id"]>({
        queryFn: async (state_id) => {
          // If no state_id is provided, return an empty array of memories to avoid
          // fetching memories for a state that doesn't exist
          if (!state_id) {
            return { data: null };
          }

          const { data, error } = await supabase
            .from("memories")
            .select("*")
            .eq("state_id", state_id)
            .order("start_date");

          if (error) {
            throw { message: `fetchMemories error: ${error.message}` };
          }
          // Return an array of memories
          return { data };
        },
        providesTags: (result) => {
          return result
            ? [
                ...result.map((memory: TMemory) => ({
                  type: "Memories" as const,
                  id: memory.id,
                  state_id: memory.state_id,
                })),
                { type: "Memories", id: "LIST" },
              ]
            : [{ type: "Memories", id: "LIST" }];
        },
      }),
      updateMemory: builder.mutation<TMemory, TMemory>({
        queryFn: async (memory) => {
          if (!memory) {
            throw new Error("updateMemory error: no memory provided");
          }
          const { data, error } = await supabase
            .from("memories")
            .update({ ...memory })
            .eq("id", memory.id)
            .select();

          if (error) {
            throw new Error(`updateMemory error: ${error.message}`);
          }
          // Return the updated memory
          return { data: data[0] };
        },
        invalidatesTags: (_result, _error, memory) => [
          { type: "Memories", id: memory.id, state_id: memory.state_id },
        ],
      }),
      deleteMemory: builder.mutation<null, TMemory>({
        queryFn: async (memory) => {
          if (!memory) {
            throw new Error("removeMemory error: no memory provided");
          }

          const { error } = await supabase
            .from("memories")
            .delete()
            .eq("id", memory.id);

          if (error) {
            throw new Error(`removeMemory error: ${error.message}`);
          }

          // Return null to indicate that the memory was removed
          return { data: null };
        },
        invalidatesTags: (_result, _error, memory) => [
          { type: "Memories", id: memory.id, state_id: memory.state_id },
        ],
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
  useDeleteMemoryMutation,
} = memoriesApi;
