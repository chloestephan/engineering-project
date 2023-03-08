import { useRef, useState, useEffect } from "react";
import ErrorMessageForm from "../../utils/MessageForm/ErrorMessageForm";
import SuccessMessageForm from "../../utils/MessageForm/SuccessMessageForm";
import DefaultInputContainer from "../../utils/DefaultInput/DefaultInputContainer";
import AdminHomeNavBar from "../../utils/NavBar/AdminHomeNavBar";
import axios from "../../../api/axios";

const USER_REGEX = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{10,24})/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = "/register";

const RegisterForm = ({ userType = "customer" }) => {
  const usernameRef = useRef();
  const errRef = useRef();
  const successRef = useRef();

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
  const [successMsg, setSuccessMsg] = useState("");

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
    setValidMatchPassword(match);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
    if (username !== "" || email !== "" || password !== "" || matchPassword !== "" || company !== "")
      setSuccessMsg("");
  }, [username, email, password, matchPassword, company]);

  const validFormForCustomer = validUsername && validEmail && company !== "" && userType === "customer";
  const validFormForAdmin =
    validUsername && validEmail && validPassword && validMatchPassword && userType === "admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Valid user input
    if (!(validFormForCustomer || validFormForAdmin)) {
      setErrMsg("Merci de remplir correctement tous les champs");
      return;
    }
    try {
      const lowerCaseEmail = email.toLowerCase();
      const response = await axios.post(
        REGISTER_URL + "-" + userType,
        JSON.stringify({ username, email: lowerCaseEmail, company, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        resetForm();
        // Set success message
        setSuccessMsg(response.data.message);
        successRef.current.focus();
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Aucune réponse du serveur");
      } else if (err.response?.status === 409 || err.response?.status === 401) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Une erreur est survenue");
      }
      errRef.current.focus();
    }
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setCompany("");
    setPassword("");
    setMatchPassword("");
  };

  return (
    <>
      {userType === "customer" ? (
        <AdminHomeNavBar isRegisterCustomerSelected={true} />
      ) : (
        <AdminHomeNavBar isRegisterAdminSelected={true} />
      )}
      <section>
        <SuccessMessageForm successMsg={successMsg} successRef={successRef} />
        <ErrorMessageForm errMsg={errMsg} errRef={errRef} />
        <div>
          {userType === "customer" ? (
            <h1>Créer un nouveau compte client</h1>
          ) : (
            <h1>Créer un nouveau compte administrateur</h1>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <DefaultInputContainer
            inputName="username"
            inputLabel="Nom d'utilisateur"
            inputRef={usernameRef}
            inputValue={username}
            inputFocus={usernameFocus}
            setInputValue={setUsername}
            setInputFocus={setUsernameFocus}
            validInput={validUsername}
            noteValidInput="Doit contenir au moins 2 caractères et commencer par une majuscule."
          />

          <DefaultInputContainer
            inputName="email"
            inputLabel="Email"
            inputValue={email}
            inputFocus={emailFocus}
            setInputValue={setEmail}
            setInputFocus={setEmailFocus}
            validInput={validEmail}
            noteValidInput="Doit être au format email."
          />

          {userType === "customer" && (
            <DefaultInputContainer
              inputName="company"
              inputLabel="Entreprise"
              inputValue={company}
              setInputValue={setCompany}
            />
          )}

          {userType !== "customer" && (
            <>
              <DefaultInputContainer
                inputName="password"
                inputLabel="Mot de passe"
                inputValue={password}
                inputFocus={passwordFocus}
                setInputValue={setPassword}
                setInputFocus={setPasswordFocus}
                validInput={validPassword}
                inputType={showPassword ? "text" : "password"}
                noteValidInput="Doit contenir au moins 10 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
              />

              <DefaultInputContainer
                inputName="confirm-password"
                inputLabel="Confirmation du mot de passe"
                inputValue={matchPassword}
                inputFocus={matchPasswordFocus}
                setInputValue={setMatchPassword}
                setInputFocus={setMatchPasswordFocus}
                validInput={validMatchPassword}
                inputType={showPassword ? "text" : "password"}
                noteValidInput="Doit correspondre au mot de passe."
              />

              <div className="show-password-container">
                <label htmlFor="show-password">
                  <input type="checkbox" id="show-password" onChange={() => setShowPassword(!showPassword)} />
                  Afficher le mot de passe
                </label>
              </div>
            </>
          )}
          <button
            disabled={!(validFormForCustomer || validFormForAdmin)}
            className="btnValider"
            type="submit"
          >
            {userType === "customer" ? "Créer un compte" : "Créer un compte administrateur"}
          </button>
        </form>
      </section>
    </>
  );
};

export default RegisterForm;
