import RegisterForm from "./components/main/register/RegisterForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/main/layout/Layout";
import RequireAuth from "./components/requireauth/RequireAuth";
import Home from "./components/main/home/Home";
import LoginForm from "./components/main/login/LoginForm";
import AdminHome from "./components/main/adminhome/AdminHome";
import Unauthorized from "./components/main/unauthorized/Unauthorized";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginForm userType="admin"/>} />
        <Route path="/registercustomer" element={<RegisterForm />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth />}>
          <Route path="/adminhome" element={<AdminHome />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
