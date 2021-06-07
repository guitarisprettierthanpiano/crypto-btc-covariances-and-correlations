import * as React from 'react'
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <NavLink exact activeClassname='active' to='/'>
                    <li>Home</li>
                </NavLink>
                <NavLink activeclassName='active' to='/faq'>
                    <li>FAQ</li>
                </NavLink>
                <NavLink activeClassName='active' to='/about'>
                    <li>About</li>
                </NavLink>
            </ul>
        </nav>
    )
}

export default Nav;
