import React, {useContext} from "react";
import { Link } from "react-router-dom";

import NavLink from "../NavLink";
import "./Header.css";
import { UserContext } from "../../context/userContext";
import Avatar from "../Avatar";

function Header() {
    const user = useContext(UserContext);

    return(
        <header>
            <Link to="/" id="home">
                The Song Study Site
            </Link>
            <nav>
                {!user ? 
                    <NavLink to="/login">Login</NavLink> 
                  : 
                    <Link to={`/profile/${user.itemID}`}><Avatar alt="Profile Image" src={user.profileImage}/></Link>
                }
            </nav>
        </header>
    )
}

export default Header;