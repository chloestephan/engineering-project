import { useNavigate } from "react-router-dom";

const Missing = () => {

    const navigate = useNavigate();

    const goBackToHome = () => {
        navigate("/admin-home", { replace: true })
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