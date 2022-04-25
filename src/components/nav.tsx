import React from 'react';

const Nav: React.FC = () => {
    
  //clicking home will hide the faq overlay.
  const HomeClicked: () => void = () => {
    document.getElementById('overlay').style.display = 'grid';

    setTimeout(() => {
      document.getElementById('overlay').style.display = 'none';
    }, 800);

    document.querySelector('table').style.visibility = 'visible';
    document.getElementById('faq-container').style.display = 'none';
  };

  //clicking faq will bring forward the faq overlay.
  const FAQClicked: () => void = () => {
    document.getElementById('overlay').style.display = 'grid';

    setTimeout(() => {
      document.getElementById('overlay').style.display = 'none';
    }, 800);

    document.getElementById('faq-container').style.display = 'grid';
    document.querySelector('table').style.visibility = 'collapse';
  };

  return (
    <nav>
      <ul>
        <li onClick={HomeClicked}>Data</li>
        <li onClick={FAQClicked}>FAQ</li>
      </ul>
    </nav>
  );
};

export default Nav;
