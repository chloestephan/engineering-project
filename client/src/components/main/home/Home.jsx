import { Link } from "react-router-dom";

const Home = () => {

    return (
        <section>
            <h1>Links</h1>
            <br />
            <Link to="/login">Go to Login page</Link>
            <br />
            <Link to="/register">Go to Registration page</Link>
            <br />
            <Link to="/private">Go to Private page</Link>     
        </section>
    )
}

export default Home