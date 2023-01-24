import RegisterForm from "./components/main/register/RegisterForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/main/layout/Layout";
import RequireAuth from "./components/requireauth/RequireAuth";
import Home from "./components/main/home/Home";
import LoginForm from "./components/main/login/LoginForm";
import Private from "./components/main/private/Private";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route element={<RequireAuth />}>
          <Route path="/private" element={<Private />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
