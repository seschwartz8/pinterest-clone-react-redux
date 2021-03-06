import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <div>
      <div className='footer'>
        <div>
          Created by{' '}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='http://www.github.com/seschwartz8'
          >
            Sasa Schwartz
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
