import { supabase } from "../../supabase/main";

function Logout() {
  supabase.auth.signOut();
  return;
}

export default Logout;
