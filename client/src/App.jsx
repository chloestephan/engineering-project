import Register from "./components/main/register/Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/main/layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />

        {/* public routes */}
        <Route path="register" element={<Register />} />

        {/* private routes */}

        {/* catch all */}
        {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
