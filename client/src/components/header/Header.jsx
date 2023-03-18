import companyLogo from "./logo.png";
import { Link } from "react-router-dom";
import { accountService } from "../../services/account.service";

const Header = () => {

  const handleLogout = async () => {
    accountService.logoutAdmin();
  };

  return (
    <div className="header">
 
      <img src={companyLogo} className="companyLogo" alt="Powered By AWS" />
    
      <div className="header-right">
        <Link to="/admin-login"  onClick={handleLogout} >
          Me déconnecter
        </Link>
      </div>
    </div>
  );
};

export default Header;
