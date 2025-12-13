import { useState } from "react"
import avatar1 from './../../public/images/avatar1.png'
import './header.css'
const Header = () => {
    return (
        <header className="header">
            <h1>Logo</h1>
            <div className="account">
                <button>Log out</button>
                <span>
                    <img src={avatar1} alt="image not found" />
                </span>
            </div>
        </header>
    )
}

export default Header