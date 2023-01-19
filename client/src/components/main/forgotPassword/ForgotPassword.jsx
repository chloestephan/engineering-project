import { useState, useEffect, useRef } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../../api/axios";

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const FORGOT_PASSWORD_URL = "/forgot-password";

const ForgotPassword = () => {
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
        await axios.post(FORGOT_PASSWORD_URL, { email });
        setSuccess(true);
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status) {
          setErrMsg(err.response.data);
        } else {
          setErrMsg("Login Failed");
        }
      }
    } else {
      errRef.current.focus();
      setErrMsg("Please enter a valid email address.");
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Your new password has been sent!</h1>
          <br />
          <p>
            <a href="/">Return to login</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Forgotten password</h1>
          <form onSubmit={handleSubmit}>
            <div className="email-container">
              <label htmlFor="email">
                Email:
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
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={!validEmail}
                aria-describedby="email-note"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="email-note"
                className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be a valid email address.
              </p>
            </div>

            <button>Send new password</button>
          </form>
        </section>
      )}
    </>
  );
};

export default ForgotPassword;
