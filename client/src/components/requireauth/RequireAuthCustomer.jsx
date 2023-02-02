import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuthCustomer = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.email ? <Outlet /> : <Navigate to="/customer-login" state={{ from: location }} replace />;
};

export default RequireAuthCustomer;
