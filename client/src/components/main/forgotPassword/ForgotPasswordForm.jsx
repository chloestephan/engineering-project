import { useState, useEffect, useRef } from "react";
import ErrorMessageForm from "../../utils/MessageForm/ErrorMessageForm";
import SuccessMessageForm from "../../utils/MessageForm/SuccessMessageForm";
import DefaultInputContainer from "../../utils/DefaultInput/DefaultInputContainer";
import axios from "../../../api/axios";

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const FORGOT_PASSWORD_URL = "/forgot-password";

const ForgotPasswordForm = ({ userType = "customer" }) => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validEmail) {
      try {
        await axios.post(
          FORGOT_PASSWORD_URL + "-" + userType,
          { email, userType },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setSuccess(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("Aucune réponse du serveur");
        } else if (err.response?.status === 401) {
          setErrMsg(err.response.data);
        } else {
          setErrMsg("Une erreur est survenue");
        }
      }
    } else {
      errRef.current.focus();
      setErrMsg("Merci de remplir correctement tous les champs");
    }
  };

  return (
    <>
      {success ? (
        // TODO ADD REDIRECT TO LOGIN
        <SuccessMessageForm
          title="Votre nouveau mot de passe a été envoyé"
          link="/"
          linkTitle="Retour à la connexion"
        />
      ) : (
        <section>
          <ErrorMessageForm errMsg={errMsg} errRef={errRef} />

          <h1>Forgotten password</h1>
          <form onSubmit={handleSubmit}>
            <DefaultInputContainer
              inputName="email"
              inputLabel="Email"
              inputRef={emailRef}
              inputValue={email}
              inputFocus={emailFocus}
              setInputValue={setEmail}
              setInputFocus={setEmailFocus}
              validInput={validEmail}
              noteValidInput="Doit être au format email."
            />
            <button>Envoyer un nouveau mot de passe</button>
          </form>
        </section>
      )}
    </>
  );
};

export default ForgotPasswordForm;
