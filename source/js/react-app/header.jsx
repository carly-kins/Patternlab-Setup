/* eslint-disable*/

import React from 'react';

function Header() {
  // Import result is the URL of your image
  return (
    <div className='container inline-flex'>
      <h3>I'm a component made in react!</h3>
      <img className='icon-react' src='../../images/react.png' alt='Logo' />
    </div>
  );
}
export default Header;

//ReactDOM.render(<Header />, document.getElementById("hello"));