import { useLocation, Navigate, Outlet } from "react-router-dom";
import { accountService } from "../../services/account.service";
// import useAuth from "../../hooks/useAuth";

const RequireAuthAdmin = () => {

  const location = useLocation();

  if (!accountService.isAdminLogged()){
    return <Navigate to="/admin-login" state={{ from: location }} replace />
  } else {
    return <Outlet />
  }

  // const { auth } = useAuth();
  // const location = useLocation();

  // return (
  //   auth?.email ? 
  //     <Outlet /> 
  //     : 
  //     <Navigate to="/admin-login" state={{ from: location }} replace />
  // );
};

export default RequireAuthAdmin;
