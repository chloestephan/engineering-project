import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <main className="App">
            <div>
                <h1>AWS App</h1>
                    <Outlet />
            </div>
        </main>
    )
}

export default Layout;