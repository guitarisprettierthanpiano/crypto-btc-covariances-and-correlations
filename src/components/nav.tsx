import * as React from 'react'
import { NavLink } from 'react-router-dom';

const Nav = () => {

    return (
        <nav>
            <ul>
                <li/>
                <NavLink 
                exact activeClassname='active' to='/'>
                    <li>Home</li>
                </NavLink>
                
                <NavLink 
                activeclassName='active' 
                to='/faq'
                onClick={() => setTimeout(() =>   location.reload(), 10)}
                >
                    <li>FAQ</li>
                </NavLink>
            </ul>
        </nav>
    )
}

export default Nav;
