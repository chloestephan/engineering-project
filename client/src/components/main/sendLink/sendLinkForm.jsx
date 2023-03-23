import { useState, useEffect, useRef } from "react";
import ErrorMessageForm from "../../utils/MessageForm/ErrorMessageForm";
import SuccessMessageForm from "../../utils/MessageForm/SuccessMessageForm";
import DefaultInputContainer from "../../utils/DefaultInput/DefaultInputContainer";
import AdminHomeNavBar from "../../utils/NavBar/AdminHomeNavBar";
import axios from "../../../api/axios";

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const FORGOT_PASSWORD_URL = "/send-link";

const SendLinkForm = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const successRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    setSuccessMsg("");
  }, [email]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validEmail) {
      errRef.current.focus();
      setErrMsg("Merci de remplir correctement tous les champs");
    } else {
      try {
        const lowerCaseEmail = email.toLowerCase();
        const response = await axios.post(
          FORGOT_PASSWORD_URL,
          { email: lowerCaseEmail },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setSuccessMsg(response.data.message);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("Aucune réponse du serveur");
        } else if (err.response?.status === 401) {
          setErrMsg(err.response.data.message);
        } else {
          setErrMsg("Une erreur est survenue");
        }
      }
    }
  };

  return (
    <>
      <AdminHomeNavBar isSendLinkSelected={true} />
      <body>
      <section>
        {successMsg ? (
          <>
            <SuccessMessageForm successMsg={successMsg} successRef={successRef} />
          </>
        ) : (
          <ErrorMessageForm errMsg={errMsg} errRef={errRef} />
        )}
        <h1>Renvoyer un lien à un client</h1>
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
          <button>Envoyer un nouveau lien</button>
        </form>
      </section>
      </body>
    </>
  );
};

export default SendLinkForm;
