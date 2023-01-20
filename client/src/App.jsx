import RegisterForm from "./components/main/register/RegisterForm";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LoginForm from "./components/main/login/LoginForm";
import ForgotPasswordForm from "./components/main/forgotPassword/ForgotPasswordForm";

function App() {
  return (
    <div className="App">
      <Header />
      <ForgotPasswordForm />
      <Footer />
    </div>
  );
}

export default App;
