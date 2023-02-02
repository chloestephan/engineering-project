import companyLogo from "./logo.png";

const Header = () => {
  return (
    <div className="header">
      <a href="">
        <img src={companyLogo} className="companyLogo" alt="Powered By AWS" />
      </a>
      <div className="header-right">
        <a href="#connexion">Mon compte</a>
      </div>
    </div>
  );
};

export default Header;
