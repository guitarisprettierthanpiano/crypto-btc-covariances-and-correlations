import * as React from 'react'
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <NavLink exact activeClassname='active' to='/'>
                    <li>Statistics</li>
                </NavLink>
                <NavLink activeclassName='active' to='/description'>
                    <li>Description</li>
                </NavLink>
            </ul>
        </nav>
    )
}

export default Nav;
