import { Link } from "react-router-dom";
import "./adminHomeNavBar.css";

const AdminHomeNavBar = ({
  isRegisterCustomerSelected = false,
  isSendLinkSelected = false,
  isManageRoleSelected = false,
  isRegisterAdminSelected = false,
}) => {
  return (
    <nav className="admin-nav-bar">
      <ul>
        <li className={`${isRegisterCustomerSelected ? "selected" : ""}`}>
          <Link to="/register-customer">
            <p className="title-link">Nouveau client</p>
          </Link>
        </li>
        <li className={`${isSendLinkSelected ? "selected" : ""}`}>
          <Link to="/send-link">
            <p className="title-link">Renvoyer lien</p>
          </Link>
        </li>
        <li className={`${isManageRoleSelected ? "selected" : ""}`}>
          <Link to="/manage-role">
            <p className="title-link">Modification rôles</p>
          </Link>
        </li>
        <li className={`${isRegisterAdminSelected ? "selected" : ""}`}>
          <Link to="/register-admin">
            <p className="title-link">Nouvel administrateur</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminHomeNavBar;
