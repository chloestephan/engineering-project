import RegisterForm from "./components/main/register/RegisterForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/main/layout/Layout";
import RequireAuth from "./components/requireauth/RequireAuth";
import LoginForm from "./components/main/login/LoginForm";
import AdminHome from "./components/main/adminhome/AdminHome";
import Unauthorized from "./components/main/unauthorized/Unauthorized";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/admin-login" element={<LoginForm userType="admin"/>} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth />}>
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/register-customer" element={<RegisterForm />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
