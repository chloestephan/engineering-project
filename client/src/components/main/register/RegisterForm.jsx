import { useRef, useState, useEffect } from "react";
import ErrorMessageForm from "../../utils/MessageForm/ErrorMessageForm";
import SuccessMessageForm from "../../utils/MessageForm/SuccessMessageForm";
import DefaultInputContainer from "../../utils/DefaultInput/DefaultInputContainer";
import axios from "../../../api/axios";

const USER_REGEX = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,24})/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = "/register";

const RegisterForm = () => {
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [company, setCompany] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword && password !== "";
    setValidMatchPassword(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Valid user input
    if (
      !(
        USER_REGEX.test(username) &&
        EMAIL_REGEX.test(email) &&
        PWD_REGEX.test(password) &&
        password === matchPassword
      )
    ) {
      setErrMsg("Please check your entries.");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, email, company, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        setSuccess(true);
        setUsername("");
        setEmail("");
        setCompany("");
        setPassword("");
        setMatchPassword("");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409 || err.response?.status === 401) {
        setErrMsg(err.response.data);
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        // TODO ADD REDIRECT TO LOGIN
        <SuccessMessageForm title="Your account has been created" link="/" linkTitle="Return to login" />
      ) : (
        <section>
          <ErrorMessageForm errMsg={errMsg} errRef={errRef} />

          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <DefaultInputContainer
              inputName="username"
              inputLabel="Username"
              inputRef={usernameRef}
              inputValue={username}
              inputFocus={usernameFocus}
              setInputValue={setUsername}
              setInputFocus={setUsernameFocus}
              validInput={validUsername}
              noteValidInput="Must start with a capital letter. Letters, numbers, and hyphens only."
            />

            <DefaultInputContainer
              inputName="email"
              inputLabel="Email"
              inputValue={email}
              inputFocus={emailFocus}
              setInputValue={setEmail}
              setInputFocus={setEmailFocus}
              validInput={validEmail}
              noteValidInput="Must be a valid email address."
            />

            <DefaultInputContainer
              inputName="company"
              inputLabel="Company"
              inputValue={company}
              setInputValue={setCompany}
            />

            <DefaultInputContainer
              inputName="password"
              inputLabel="Password"
              inputValue={password}
              inputFocus={passwordFocus}
              setInputValue={setPassword}
              setInputFocus={setPasswordFocus}
              validInput={validPassword}
              inputType={showPassword ? "text" : "password"}
              noteValidInput="10 to 24 characters. At least one uppercase letter, one lowercase letter, one number, and one special character."
            />

            <DefaultInputContainer
              inputName="confirm-password"
              inputLabel="Confirm password"
              inputValue={matchPassword}
              inputFocus={matchPasswordFocus}
              setInputValue={setMatchPassword}
              setInputFocus={setMatchPasswordFocus}
              validInput={validMatchPassword}
              inputType={showPassword ? "text" : "password"}
              noteValidInput="Must be the same as password."
            />

            <div className="show-password-container">
              <label htmlFor="show-password">
                <input type="checkbox" id="show-password" onChange={() => setShowPassword(!showPassword)} />
                Show password
              </label>
            </div>

            <button disabled={!validUsername || !validPassword || !validMatchPassword || !validEmail} type="submit">
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="/">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default RegisterForm;
