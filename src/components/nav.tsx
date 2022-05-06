import React from 'react';

import Overlay from './Overlay';

const Nav: React.FC = () => {
  const [overlaying, setOverlaying] = React.useState(false);

  //clicking home will hide the faq overlay.
  const HomeClicked: () => void = () => {
    setOverlaying(true);

    document.querySelector('table').style.visibility = 'visible';
    document.getElementById('faq-container').style.display = 'none';

    setTimeout(() => {
      setOverlaying(false);
    }, 800);
  };

  // clicking faq will bring forward the faq overlay.
  const FAQClicked: () => void = () => {
    setOverlaying(true);

    document.getElementById('faq-container').style.display = 'grid';
    document.querySelector('table').style.visibility = 'collapse';

    setTimeout(() => {
      setOverlaying(false);
    }, 800);
  };

  return (
    <>
      {overlaying === true ? (
        <Overlay />
      ) : (
        <>
          {' '}
          <nav>
            <ul>
              <li onClick={HomeClicked}>Data</li>
              <li onClick={FAQClicked}>FAQ</li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default Nav;
