import { useLocation, Navigate, Outlet } from "react-router-dom";
import { accountService } from "../../services/account.service";

const RequireAuthCustomer = () => {

  const location = useLocation();

  if (!accountService.isCustomerLogged()){
    return <Navigate to="/customer-login" state={{ from: location }} replace />
  } else {
    return <Outlet />
  }
};

export default RequireAuthCustomer;
