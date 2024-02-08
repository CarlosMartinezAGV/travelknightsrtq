// import { selectCurrentSession } from "./authSlice";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./utils";

const RequireAuth = () => {
  const { user: isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
