import { Tables, TablesInsert } from "../../../../supabase/types/supabase";
import { Overwrite } from "../../utils";

export type TMemory = Tables<"memories">;
export type TMemoryInsert = TablesInsert<"memories">;

// React Hook Form
export type TMemoryValidation = Overwrite<
  TMemoryInsert,
  { start_date: Date | null; end_date: Date | null }
>;
