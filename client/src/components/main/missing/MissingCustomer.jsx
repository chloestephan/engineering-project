import { accountService } from "../../../services/account.service";

const MissingCustomer = () => {

    const goBackToHome = () => {

        accountService.logoutCustomer();
        window.location.replace('/customer-login');

    }

    return (
    <section>
        <h1>Page non trouvée</h1>
        <br />
        <p>Vous êtes bien connecté, mais il semble que cette page ne contient pas votre formulaire. Veuillez utiliser le lien reçu sur votre adresse mail. </p>
        <br />

        <button onClick={goBackToHome}>
            Déconnexion
        </button>
    </section>
    );
}

export default MissingCustomer;