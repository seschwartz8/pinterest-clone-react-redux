import React from 'react';
import GoogleAuth from './GoogleAuth';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  return (
    <div className='ui secondary pointing menu'>
      <Link to='/' className='item'>
        <i className='pinterest icon big' />
      </Link>
      <div className='ui category search item'>
        <div className='ui transparent icon input'>
          <div className='left aligned'>
            <i className='search link icon' />
          </div>
          <input
            className='prompt'
            type='text'
            placeholder='Search animals...'
          />
        </div>
      </div>
      <Link to='/' className='item'>
        Home
      </Link>
      <div className='right menu'>
        <GoogleAuth className='ui item' />
      </div>
    </div>
  );
};

export default Header;
