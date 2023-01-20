import Register from "./components/main/register/Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/main/layout/Layout";
import RequireAuth from "./components/requireauth/RequireAuth";
import Home from "./components/main/home/Home";
import Login from "./components/main/login/Login";
import Private from "./components/main/private/Private";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path="/private" element={<Private />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
