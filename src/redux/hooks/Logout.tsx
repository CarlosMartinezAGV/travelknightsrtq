import { supabase } from "../../supabase/main";

async function Logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Supabase Error logging out:", error.message);
      return;
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
  return;
}

export default Logout;
