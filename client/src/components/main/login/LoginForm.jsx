import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ErrorMessageForm from "../../utils/MessageForm/ErrorMessageForm";
import DefaultInputContainer from "../../utils/DefaultInput/DefaultInputContainer";

import axios from "../../../api/axios";
const LOGIN_URL = "/login";

const LoginForm = ({ userType = "customer"}) => {
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
      const response = await axios.post(LOGIN_URL + "-" + userType, JSON.stringify({ email, password }), {
        headers: { "Content-Type": "application/json" },
      });
      const accesToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accesToken });
      setPassword("");
      setEmail("");
      navigate(from, { replace: true });
      if (from !== "/adminhome") {
        navigate("/adminhome", { replace: true });
      }
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
    <section>
      <ErrorMessageForm errMsg={errMsg} errRef={errRef} />
      <h1>Sign In</h1>
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
    </section>
  
  );
};

export default LoginForm;
