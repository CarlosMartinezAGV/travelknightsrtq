import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentAccessToken } from "./authSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { supabase } from "../../../supabase/main";

const RequireAuth = () => {
  const access_token = useSelector(selectCurrentAccessToken);

  useEffect(() => {
    console.log("RequireAuth: useEffect");

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);

      if (event === "INITIAL_SESSION") {
        // handle initial session
        console.log("INITIAL_SESSION");
      } else if (event === "SIGNED_IN") {
        // handle sign in event
        console.log("SIGNED_IN");
      } else if (event === "SIGNED_OUT") {
        // handle sign out event
        console.log("SIGNED_OUT");
      } else if (event === "PASSWORD_RECOVERY") {
        // handle password recovery event
        console.log("PASSWORD_RECOVERY");
      } else if (event === "TOKEN_REFRESHED") {
        // handle token refreshed event
        console.log("TOKEN_REFRESHED");
      } else if (event === "USER_UPDATED") {
        // handle user updated event
        console.log("USER_UPDATED");
      }
    });

    // call unsubscribe to remove the callback
    return data.subscription.unsubscribe();
  }, []);

  // use supabase auth state to check if user logged in
  // if not, redirect to login page
  const location = useLocation();

  return access_token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
