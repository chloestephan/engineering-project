import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";


const AdminHome = () => {

    return (
        <section>
        <h1>Admin Home</h1>
        <br />
        <Link to="/registercustomer"><p>Create a user</p></Link>
        <br />
        <Link to="/sendlinktouser"><p>Send the link to an user</p></Link>
        <br />
        <Link to="/manageForm"><p>Manage the form</p></Link>
        </section>
    );
};

export default AdminHome;
