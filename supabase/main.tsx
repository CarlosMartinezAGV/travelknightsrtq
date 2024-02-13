const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

import { createClient } from "@supabase/supabase-js";
import { Database } from "./types/supabase";

if (!SUPABASE_KEY) {
  throw new Error("Missing env variable SUPABASE_KEY");
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
