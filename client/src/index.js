import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";


import "./components/footer/footer.css";
import "./components/header/header.css";
import "./components/main/register/register.css";


import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
