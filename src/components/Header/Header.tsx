import React, {useContext} from "react";
import { Link } from "react-router-dom";

import NavLink from "../NavLink";
import "./Header.css";
import { UserContext } from "../../context/userContext";

function Header() {
    const user = useContext(UserContext);

    return(
        <header>
            <Link to="/" id="home">
                The Song Study Site
            </Link>
            <nav>
                {/* Todo: Change user.username to link to the profile page when done*/}
                {!user ? <NavLink to="/login">Login</NavLink> : <NavLink to="/profile">Profile</NavLink>}
            </nav>
        </header>
    )
}

export default Header;