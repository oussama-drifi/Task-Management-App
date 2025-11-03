import { Link, NavLink } from "react-router-dom"

import './navBar.css'

const NavBar = () => {

    return (
        <nav>
            <ul>
                <li><NavLink className={({isActive}) => `nav-link ${isActive ? "active glass" : ""}`} to='/'><i className="bi bi-house"></i>Home</NavLink></li>
                <li><NavLink className={({isActive}) => `nav-link ${isActive ? "active glass" : ""}`} to='/services'><i className="bi bi-easel2"></i>services</NavLink></li>
                <li><NavLink className={({isActive}) => `nav-link ${isActive ? "active glass" : ""}`} to='/about'><i className="bi bi-card-text"></i>about</NavLink></li>
                <li><NavLink className={({isActive}) => `nav-link ${isActive ? "active glass" : ""}`} to='/contact'><i className="bi bi-envelope-at"></i>contact</NavLink></li>
            </ul>
        </nav>
    )

}
export default NavBar