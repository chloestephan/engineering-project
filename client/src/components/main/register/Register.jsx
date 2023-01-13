import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../../api/axios";

const USER_REGEX = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,24})/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = "/register";

const Register = () => {
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
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

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
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Valid user input
    if (!(USER_REGEX.test(username) && EMAIL_REGEX.test(email) && PWD_REGEX.test(password) && password === matchPassword)) {
      setErrMsg("Please check your entries.");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({ username, email, company, password }), {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
        setUsername("");
        setEmail("");
        setCompany("");
        setPassword("");
        setMatchPassword("");
      } else {
        setErrMsg("Registration Failed");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        // TODO handle according to error message
        setErrMsg("Username already exists");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            {/*put router link here*/}
            <a href="/">Return to login</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <div class="loginFormTitle">
            <h1>Connexion</h1>
          </div>
          <form onSubmit={handleSubmit}>

            <div className="username-container">
              <label htmlFor="username">
                Username
                <span className={validUsername ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validUsername || !username ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="username"
                ref={usernameRef}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-invalid={!validUsername}
                aria-describedby="username-note"
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
              />
              <p id="username-note" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must start with a letter.
                <br />
                Letters, numbers, and hyphens only.
              </p>
            </div>

            <div className="email-container">
              <label htmlFor="email">
                Email
                <span className={validEmail ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={!validEmail}
                aria-describedby="email-note"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p id="email-note" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be a valid email address.
              </p>
            </div>

            <div className="company-container">
              <label htmlFor="company">
                Entreprise
              </label>
              <input
                type="text"
                id="company"
                autoComplete="off"
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>

            <div className="password-container">
              <label htmlFor="password">
                Mot de passe
                <span className={validPassword ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPassword || !password ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type={ showPassword ? "text" : "password" }
                id="password"
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={!validPassword}
                aria-describedby="password-note"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              <p id="password-note" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                10 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a special character.
                <br />
                Allowed special characters: <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
              </p>
            </div>

            <div className="confirm-password-container">
              <label htmlFor="confirm-password">
                Confirmer le mot de passe
                <span className={validMatch && matchPassword ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPassword ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type={ showPassword ? "text" : "password" }
                id="confirm-password"
                autoComplete="off"
                onChange={(e) => setMatchPassword(e.target.value)}
                required
                aria-invalid={!validMatch}
                aria-describedby="confirm-password-note"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              />
              <p id="confirm-password-note" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
            </div>

            <div className="show-password-container">
              <label htmlFor="show-password">
                <input type="checkbox" id="show-password" onChange={() => setShowPassword(!showPassword)} />
                Show password
              </label>
            </div>

            <button disabled={!validUsername || !validPassword || !validMatch} type="submit">
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

export default Register;
