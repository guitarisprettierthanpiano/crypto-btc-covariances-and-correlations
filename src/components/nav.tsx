import * as React from 'react'
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li/>
                <NavLink exact activeClassname='active' to='https://guitarisprettierthanpiano.github.io/crypto-btc-covariances-and-correlations'>
                    <li>Home</li>
                </NavLink>
                <NavLink activeclassName='active' to='/faq'>
                    <li>FAQ</li>
                </NavLink>
                <NavLink activeClassName='active' to='/about'>
                    <li>About</li>
                </NavLink>
                <li/>
            </ul>
        </nav>
    )
}

export default Nav;
