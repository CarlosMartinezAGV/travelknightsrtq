export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
export const NODE_ENV = import.meta.env.NODE_ENV;
import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";

export const SUPABASE_URL = "https://hgkwvlaopmonpjzkbuoj.supabase.co";

if (!SUPABASE_KEY) {
  throw new Error("Missing env variable SUPABASE_KEY");
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
