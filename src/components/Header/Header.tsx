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
                Some Catchy App Name or Logo
            </Link>
            <Link to="/search">
                Search
            </Link>
            <nav>
                {user && <NavLink to="/post">Post</NavLink>}
                {/* Todo: Change user.username to link to the profile page when done*/}
                {!user ? 
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </> : 
                    user.username} 
            </nav>
        </header>
    )
}

export default Header;