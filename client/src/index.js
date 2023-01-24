import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./components/footer/footer.css";
import "./components/header/header.css";
import "./components/main/register/register.css";
import "./components/main/home/home.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
