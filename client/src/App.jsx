import RegisterForm from "./components/main/register/RegisterForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/main/layout/Layout";
import RequireAuth from "./components/requireauth/RequireAuth";
import Home from "./components/main/home/Home";
import LoginForm from "./components/main/login/LoginForm";
import AdminHome from "./components/main/adminhome/AdminHome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LoginForm userType="admin"/>} />
        <Route path="/register" element={<RegisterForm />} />

        <Route element={<RequireAuth />}>
          <Route path="/adminhome" element={<AdminHome />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
