import { AuthTokenResponsePassword } from "@supabase/supabase-js";

export type AuthTokenResponseData = Omit<
  AuthTokenResponsePassword["data"],
  "weakPassword"
>;
