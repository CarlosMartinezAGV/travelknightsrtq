import { logout, refreshSession, selectCurrentSession } from "./authSlice";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../../../supabase/main";
import { useEffect } from "react";

const RequireAuth = () => {
  const isLoggedIn = useSelector(selectCurrentSession);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // check if the user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      refreshSession(session);
    });

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "TOKEN_REFRESHED") {
        dispatch(refreshSession({ session }));
      } else if (event === "SIGNED_OUT") {
        dispatch(logout());
      }
    });

    // call unsubscribe to remove the callback
    return () => {
      data.subscription.unsubscribe();
    };
  }, [dispatch]);

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
