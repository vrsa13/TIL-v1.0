import React from 'react';
// a
const Footer = () => {
  return (
    <footer
      className='page-footer'
      style={footerStyle}
    >
      <div className='footer-copyright'>
        <div className='container'>
          © 2020 Private Corporation
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#142850',
  position: 'absolute',
  left: '0',
  bottom: '0',
  right: '0',
  paddingBottom: '20px',
};

export default Footer;
