import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ErrorMessageForm from "../../utils/MessageForm/ErrorMessageForm";
import DefaultInputContainer from "../../utils/DefaultInput/DefaultInputContainer";
import { Link } from "react-router-dom";
import { accountService } from "../../../services/account.service";

import axios from "../../../api/axios";
const LOGIN_URL = "/login";

const LoginForm = ({ userType = "customer" }) => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

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
        JSON.stringify({ email: lowerCaseEmail, password, loginLink: from }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const accesToken = response?.data?.accessToken;
      if (userType === "admin"){
        accountService.saveTokenAdmin(accesToken);
      } else {
        accountService.saveTokenCustomer(accesToken);
      }
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accesToken });
      setPassword("");
      setEmail("");
      if (from === "/"){
        if (userType === "admin"){
          navigate("/register-customer", { replace: true });
        } else {
          navigate("/*", { replace: true });
        }
      } else {
        navigate(from, { replace: true });
      }
      window.location.reload();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Aucune réponse du serveur");
      } else if (err.response.status === 401) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Une erreur est survenue");
      }
      errRef.current.focus();
    }
  };

  return (
    <body>
      <section>
      <ErrorMessageForm errMsg={errMsg} errRef={errRef} />
      <h1>Connectez-vous</h1>
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
      <Link className="mdpOublie" to="/forgot-password-customer" state={{ from: location }} replace>
        <p>Mot de passe oublié ?</p>
      </Link>
    </section>
    </body>
  );
};

export default LoginForm;
