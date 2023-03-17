import companyLogo from "./logo.png";
import { Link } from "react-router-dom";
import { accountService } from "../../services/account.service";

const Header = () => {

  const logout = () => {
    accountService.logoutAdmin();
  }

  return (
    <div className="header">
      <a href="">
        <img src={companyLogo} className="companyLogo" alt="Powered By AWS" />
      </a>
      <div className="header-right">
        <Link to="/admin-login"  onClick={logout} >
          Me déconnecter
        </Link>
      </div>
    </div>
  );
};

export default Header;
