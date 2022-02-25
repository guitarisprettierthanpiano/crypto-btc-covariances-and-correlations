import React from 'react'

const Nav: React.FC  = () => {

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
                <li onClick={HomeClicked}>Data</li>
                <li onClick={FAQClicked}>FAQ</li>
            </ul>
        </nav>
    )
}

export default Nav;
