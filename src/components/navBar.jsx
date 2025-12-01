import { Link, NavLink, useNavigate } from "react-router-dom"

import './navBar.css'
import { useState } from "react";

const NavBar = ({links}) => {

    const navigate = useNavigate();

    const [marginLeft, setMarginLeft] = useState(0);

    const handleSelection = (path, index) => {
        navigate(path);
        setMarginLeft(index ? index*(115 + 5) : index === links.length - 1 ? (index*115 - 5) : index*115);
    }

    return (
        <div className="nav-bar-wrapper">
            <div className="glass-container"></div>
            <nav>
                <ul className={`m-${marginLeft}`}>
                {
                    links.map((link, index) => (
                        <li key={link.content}><button onClick={() => handleSelection(link.content, index)} className="nav-item">{link.icon && (<i className={link.icon}></i>)} {link.content}</button></li>
                    ))
                }
                </ul>
            </nav>
        </div>
    )

}
export default NavBar