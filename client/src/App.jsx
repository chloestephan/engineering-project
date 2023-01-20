import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginForm from "./components/main/login/LoginForm";
import RegisterForm from "./components/main/register/RegisterForm";
import ForgotPasswordForm from "./components/main/forgotPassword/ForgotPasswordForm";

function App() {
  return (
    <div className="App">
      <Header />
      <RegisterForm userType="admin" />
      <LoginForm userType="admin" />
      <ForgotPasswordForm userType="admin" />
      <Footer />
    </div>
  );
}

export default App;
