import { useState, useEffect, useRef, useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import ErrorMessageForm from "../../utils/MessageForm/ErrorMessageForm";
import SuccessMessageForm from "../../utils/MessageForm/SuccessMessageForm";
import DefaultInputContainer from "../../utils/DefaultInput/DefaultInputContainer";
import axios from "../../../api/axios";

const LOGIN_URL = "/login";

const LoginForm = () => {
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
      const response = await axios.post(LOGIN_URL, JSON.stringify({ email, password }), {
        headers: { "Content-Type": "application/json" },
      });
      const accesToken = response?.data?.accessToken;
      const role = response?.data?.role;
      setAuth({ email, password, accesToken, role });
      setPassword("");
      setEmail("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 401) {
        setErrMsg(err.response.data);
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        // TODO ADD REDIRECT TO HOME
        <SuccessMessageForm title="You are logged in!" link="/" linkTitle="Go to home" />
      ) : (
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
              inputLabel="Password"
              inputType="password"
              inputValue={password}
              setInputValue={setPassword}
            />

            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="/">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default LoginForm;
