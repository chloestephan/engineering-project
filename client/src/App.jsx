import Register from "./Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

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
