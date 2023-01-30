import { Link } from "react-router-dom";


const AdminHome = () => {

    return (
        <section>
        <h1>Admin Home</h1>
        <br />
        <Link to="/register-customer"><p>Create a user</p></Link>
        <br />
        <Link to="/send-link"><p>Send the link to an user</p></Link>
        <br />
        <Link to="/manage-form"><p>Manage the form</p></Link>
        <br />
        <Link to="/manage-role"><p>Manage roles</p></Link>
        <br />
        <Link to="/create-admin"><p>Create new admin</p></Link>

        </section>
    );
};

export default AdminHome;
