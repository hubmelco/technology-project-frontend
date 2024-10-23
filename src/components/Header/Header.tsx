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
                {user && <NavLink to="/post">Post</NavLink>}
                {!user ? 
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </> : 
                    <NavLink to="/profile">Profile</NavLink>} 
            </nav>
        </header>
    )
}

export default Header;