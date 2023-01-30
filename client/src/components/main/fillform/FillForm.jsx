import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import { useLocation } from "react-router-dom";

const CHECK_CUSTOMER_LINK_URL = "/check-customer-link";
const FillForm = () => {
  const location = useLocation();
  const { auth } = useAuth();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function checkCustomerLink() {
      try {
        await axios.post(
          CHECK_CUSTOMER_LINK_URL,
          JSON.stringify({ email: auth.email, linkToForm: location.pathname }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (error) {
        setIsError(true);
      }
    }
    checkCustomerLink();
  }, [auth.email, location.pathname]);
  // TODO add redirect to login if error
  return <section>{isError ? <h1>Une erreur est survenue</h1> : <h1>Bienvenue !</h1>}</section>;
};

export default FillForm;
