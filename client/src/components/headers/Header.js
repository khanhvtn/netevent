import React, {useState} from 'react'
import Logo from './icon/logo.PNG'
import {Link} from 'react-router-dom'

function Header() {

    return (
        <header>
            <div className="menu">
                <Link to="/"><img src={Logo} alt="" width="150"/></Link>
            </div>

            <ul>
                <li><Link to ="/">Username</Link></li>
                <li><Link to ="/">Logout</Link></li>
            </ul>
        </header>
    )
}

export default Header