import { Link } from "react-router-dom";

const Home = () => {

    return (
        <section>
            <h1>Links</h1>
            <br />
            <Link to="/login"><p>Go to Login page</p></Link>
            <br />
            <Link to="/register"><p>Go to Registration page</p></Link>
            <br />
            <Link to="/private"><p>Go to Private page</p></Link>     
        </section>
    )
}

export default Home