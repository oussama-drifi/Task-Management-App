import { useState } from "react"
import avatar1 from './../../public/images/avatar1.png'

const Header = () => {
    return (
        <header>
            <h2>Logo</h2>
            <div className="account">
                <button>Log out</button>
                <span>
                    <img src={avatar1} alt="image not found" width='70px' />
                </span>
            </div>
        </header>
    )
}

export default Header