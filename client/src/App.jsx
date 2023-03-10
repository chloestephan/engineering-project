import RegisterForm from "./components/main/register/RegisterForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/main/layout/Layout";
import RequireAuthAdmin from "./components/requireauth/RequireAuthAdmin";
import LoginForm from "./components/main/login/LoginForm";
import AdminHome from "./components/main/adminhome/AdminHome";
import Unauthorized from "./components/main/unauthorized/Unauthorized";
import RequireAuthCustomer from "./components/requireauth/RequireAuthCustomer";
import FillForm from "./components/main/fillform/FillForm";
import ForgotPasswordForm from "./components/main/forgotPassword/ForgotPasswordForm";
import SendLinkForm from "./components/main/sendLink/sendLinkForm";
import Missing from "./components/main/missing/Missing";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/admin-login" element={<LoginForm userType="admin" />} />
        <Route path="/customer-login" element={<LoginForm userType="customer" />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/forgot-password-customer" element={<ForgotPasswordForm />} />

        {/* Routes réservées à l'admin */}
        <Route element={<RequireAuthAdmin />}>
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/register-customer" element={<RegisterForm />} />
          <Route path="/register-admin" element={<RegisterForm userType="admin"/>} />
          <Route path="/send-link" element={<SendLinkForm />} />
        </Route>

        {/* Routes réservées au customer */}
        <Route element={<RequireAuthCustomer />}>
          <Route path="/fill-form/:formid" element={<FillForm />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
