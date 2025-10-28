import { Link, NavLink } from "react-router-dom"

import './navBar.css'

const NavBar = () => {

    return (
        <nav>
            <NavLink className={({isActive}) => `nav-link ${isActive ? "active" : ""}`} to='/'>Home</NavLink>
            <NavLink className={({isActive}) => `nav-link ${isActive ? "active" : ""}`} to='/about'>about</NavLink>
            <NavLink className={({isActive}) => `nav-link ${isActive ? "active" : ""}`} to='/services'>services</NavLink>
            <NavLink className={({isActive}) => `nav-link ${isActive ? "active" : ""}`} to='/contact'>contact</NavLink>
        </nav>
    )

}
export default NavBar