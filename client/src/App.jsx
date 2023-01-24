import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginForm from "./components/main/login/LoginForm";
import RegisterForm from "./components/main/register/RegisterForm";
import ForgotPasswordForm from "./components/main/forgotPassword/ForgotPasswordForm";

function App() {
  return (
    <div className="App">
      <Header />
      <RegisterForm />
      <LoginForm />
      <ForgotPasswordForm />
      <Footer />
    </div>
  );
}

export default App;
