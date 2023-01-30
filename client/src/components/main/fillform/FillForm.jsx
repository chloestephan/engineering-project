import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../api/axios";
import { useLocation } from "react-router-dom";

const CHECK_CUSTOMER_LINK_URL = "/check-customer-link";
const FillForm = () => {
  return (
    <section>
      <h1>Bienvenue !</h1>
    </section>
  );
};

export default FillForm;
