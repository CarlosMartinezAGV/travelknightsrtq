export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
export const NODE_ENV = import.meta.env.NODE_ENV;

if (!SUPABASE_KEY) {
  throw new Error("Missing env variable SUPABASE_KEY");
}
