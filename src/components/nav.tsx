import React from 'react'

const Nav: React.FC  = () => {

//     <nav>
//     <ul>
//         <li/>
//         <NavLink 
//         exact activeClassname='active' to='/'
//         onClick={() => setTimeout(() =>   location.reload(), 10)}>
//             <li>HOME</li>
//         </NavLink>
        
//         <NavLink 
//         activeclassName='active' 
//         to='/faq'
//         >
//             <li>FAQ</li>
//         </NavLink>
//     </ul>
// </nav>

    function HomeClicked(){
        document.getElementById('overlay').style.display='grid'

        setTimeout(() => {
            document.getElementById('overlay').style.display='none'
        }, 800);

        document.querySelector('table').style.visibility = 'visible'
        document.getElementById('faq-container').style.display='none'
    }
    function FAQClicked(){
        document.getElementById('overlay').style.display='grid'

        setTimeout(() => {
            document.getElementById('overlay').style.display='none'
        }, 800);

        document.getElementById('faq-container').style.display='grid'
        document.querySelector('table').style.visibility = 'collapse'
    }

    return (
        <nav>
            <ul>
                <li onClick={HomeClicked}>HOM2E</li>
                <li onClick={FAQClicked}>FAQ</li>
            </ul>
        </nav>
    )
}

export default Nav;
