import efreiLogo from "./LOGO_EFREI-WEB_blanc.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a href="#connexion">Connexion</a>
      </div>
      <div className="footer-center">
        <img className="efreiLogo" alt="Logo EFREI Paris" src={efreiLogo} />
        <p>© 2022 - Projet EFREI - 30-32 Avenue de la République, 94800, Villejuif - Tous droits réservés </p>
      </div>
      <div className="footer-right"></div>
    </footer>
  );
};

export default Footer;
