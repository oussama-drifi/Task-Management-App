import { Link, NavLink } from "react-router-dom"

import './navBar.css'

const NavBar = ({links}) => {

    return (
        <nav>
            <ul>
            {
                links.map(link => (
                    <li key={link.content}><NavLink className={({isActive}) => `nav-link ${isActive ? "active glass" : ""}`} to={link.path}>{link.icon && (<i className={link.icon}></i>)} {link.content}</NavLink></li>
                ))
            }
            </ul>
        </nav>
    )

}
export default NavBar