import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <section>
      <h1>Accueil administrateur</h1>
      <br />
      
      <Link to="/register-customer">
        <p>Créer un nouveau client</p>
      </Link>
      <br />

      <Link to="/send-link">
        <p>Envoyer un nouveau lien à un client</p>
      </Link>
      <br />

      <Link to="/manage-form">
        <p>Modification du formulaire d'audit</p>
      </Link>
      <br />

      <Link to="/manage-role">
        <p>Modification des rôles administrateur</p>
      </Link>
      <br />

      <Link to="/register-admin">
        <p>Create new admin</p>
      </Link>
    </section>
  );
};

export default AdminHome;
