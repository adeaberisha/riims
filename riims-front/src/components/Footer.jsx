import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="d-flex justify-content-center align-items-center flex-column"
      style={{
        height: '150px',
        padding: '20px 0',
        backgroundColor: '#26417f',
        borderTop: '5px solid #5a73bf', 
        boxShadow: '8px -5px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      
      {/* <div
        style={{
          width: '80px',
          height: '4px',
          backgroundColor: '#5a73bf', 
          marginBottom: '15px',
        }}
      ></div> */}

      <p className="mb-0 pb-6" style={{ color: 'white', fontSize: '17px' }}>
      Copyright © 2015 - {currentYear} UBT - All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
