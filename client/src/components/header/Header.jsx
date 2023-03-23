import companyLogo from "./logo.png";
import { accountService } from "../../services/account.service";

const Header = () => {


  const handleLogout = async () => {
    if (accountService.isAdminLogged()) {
      accountService.logoutAdmin();
      window.location.replace('/admin-login');
    } else {
      accountService.logoutCustomer();
      window.location.replace('/customer-login');
    }
    
  };

  return (
    <div className="header">
 
      <img src={companyLogo} className="companyLogo" alt="Powered By AWS" />

      { 
      accountService.isAdminLogged() || accountService.isCustomerLogged() ? 

        <div className="header-right">
          <button className="btnConnexion" onClick={handleLogout}>Deconnexion</button>
        </div>
      : 
        null 
      }

      
    </div>
  );
};

export default Header;
