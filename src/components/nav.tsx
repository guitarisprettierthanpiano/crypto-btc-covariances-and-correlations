import * as React from 'react'
import { NavLink } from 'react-router-dom';

const Nav = () => {

    return (
        <nav>
            <ul>
                <li/>
                <NavLink 
                exact activeClassname='active' to='/'
                onClick={() => setTimeout(() =>   location.reload(), 10)}>
                    <li>Home</li>
                </NavLink>
                <NavLink 
                activeclassName='active' 
                to='/faq'
                onClick={() => setTimeout(() =>   location.reload(), 10)}
                >
                    <li>FAQ</li>
                </NavLink>
                <NavLink 
                activeClassName='active' 
                to='/about'>
                    <li>About</li>
                </NavLink>
                <li/>
            </ul>
        </nav>
    )
}

export default Nav;
