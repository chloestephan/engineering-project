import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuthAdmin = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.email ? <Outlet /> : <Navigate to="/admin-login" state={{ from: location }} replace />;
};

export default RequireAuthAdmin;
