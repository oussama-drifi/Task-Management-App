import { Link, NavLink, useNavigate } from "react-router-dom"

import './navBar.css'
import { useState } from "react";

const NavBar = ({links}) => {

    const navigate = useNavigate();

    const [marginLeft, setMarginLeft] = useState(0);

    const handleSelection = (path, index) => {
        navigate(path);
        setMarginLeft(index ? index*(115 + 5) : index*115);
    }

    return (
        <nav>
            <ul className={`m-${marginLeft}`}>
            {
                // links.map(link => (
                //     <li key={link.content}><NavLink className={({isActive}) => `nav-link ${isActive ? "active glass" : ""}`} to={link.path}>{link.icon && (<i className={link.icon}></i>)} {link.content}</NavLink></li>
                // ))
                links.map((link, index) => (
                    <li key={link.content}><button onClick={() => handleSelection(link.content, index)} className="nav-item">{link.icon && (<i className={link.icon}></i>)} {link.content}</button></li>
                ))
            }
            </ul>
        </nav>
    )

}
// className={`nav-link ${isActive ? "active glass" : ""}`}
export default NavBar