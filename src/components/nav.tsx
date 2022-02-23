import React from 'react'
import { NavLink } from 'react-router-dom';

const Nav: React.FC  = () => {

    return (
        <nav>
            <ul>
                <li/>
                <NavLink 
                exact activeClassname='active' to='/'>
                    <li>HOME</li>
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
