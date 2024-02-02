import { useLocation, Navigate, Outlet } from "react-router-dom";
import { selectCurrentAccessToken } from "./authSlice";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const access_token = useSelector(selectCurrentAccessToken);
  const location = useLocation();

  return access_token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
