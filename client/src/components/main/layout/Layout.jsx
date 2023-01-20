import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";

const Layout = () => {
    return (
        <main className="App">
            <Header />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Layout;