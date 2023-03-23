import { useNavigate } from "react-router-dom";
import { accountService } from "../../../services/account.service";

const Missing = () => {

    const navigate = useNavigate();

    const goBackToHome = () => {
        if (accountService.isAdminLogged()) {
            navigate("/admin-home", { replace: true })
        } else if (accountService.isCustomerLogged()) {
            navigate("/customer-home", { replace: true })
        } else {
            navigate("/admin-login", { replace: true })
        }
    }

    return (
    <section>
        <h1>Page non trouvée</h1>
        <br />
        <p>Oups ! Il semblerait que la page demandée n'existe pas... Cliquez ci-dessous pour retourner à la page d'accueil.</p>
        <br />

        <button onClick={goBackToHome}>
            Retour à l'accueil
        </button>
    </section>
    );
}

export default Missing;