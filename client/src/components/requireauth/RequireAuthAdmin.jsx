import { useLocation, Navigate, Outlet } from "react-router-dom";
import { accountService } from "../../services/account.service";

const RequireAuthAdmin = () => {

  const location = useLocation();

  if (!accountService.isAdminLogged()){
    return <Navigate to="/admin-login" state={{ from: location }} replace />
  } else {
    return <Outlet />
  }
};

export default RequireAuthAdmin;
