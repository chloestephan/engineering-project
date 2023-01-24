import { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import ErrorMessageForm from "../../utils/MessageForm/ErrorMessageForm";
import SuccessMessageForm from "../../utils/MessageForm/SuccessMessageForm";
import DefaultInputContainer from "../../utils/DefaultInput/DefaultInputContainer";
import axios from "../../../api/axios";

const LOGIN_URL = "/login";

const LoginForm = ({ userType = "customer" }) => {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const lowerCaseEmail = email.toLowerCase();
      const response = await axios.post(
        LOGIN_URL + "-" + userType,
        JSON.stringify({ email: lowerCaseEmail, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accesToken = response?.data?.accessToken;
      const role = response?.data?.role;
      setAuth({ email, password, accesToken, role });
      setPassword("");
      setEmail("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Aucune réponse du serveur");
      } else if (err.response.status === 401) {
        setErrMsg(err.response.data);
      } else {
        setErrMsg("Une erreur est survenue");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        // TODO ADD REDIRECT TO HOME
        <SuccessMessageForm title="Vous êtes connectés" link="/" linkTitle="Aller à l'accueil" />
      ) : (
        <section>
          <ErrorMessageForm errMsg={errMsg} errRef={errRef} />
          <h1>Connexion</h1>
          <form onSubmit={handleSubmit}>
            <DefaultInputContainer
              inputName="email"
              inputLabel="Email"
              inputRef={emailRef}
              inputValue={email}
              setInputValue={setEmail}
            />

            <DefaultInputContainer
              inputName="password"
              inputLabel="Mot de passe"
              inputType="password"
              inputValue={password}
              setInputValue={setPassword}
            />

            <button>Connexion</button>
          </form>
          <p>
            Besoin d'un compte ?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="/">Créer un compte</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default LoginForm;
