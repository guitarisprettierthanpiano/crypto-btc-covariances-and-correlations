import * as React from 'react'
import { NavLink } from 'react-router-dom';

const Nav = () => {
    function ReloadAgain(){
        location.reload();
    }

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
                onClick={() => setTimeout(ReloadAgain, 100)}>
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
