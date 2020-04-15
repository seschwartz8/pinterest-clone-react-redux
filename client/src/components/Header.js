import React from 'react';
import GoogleAuth from './GoogleAuth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../css/Header.css';

const Header = (props) => {
  return (
    <div className='ui secondary pointing menu'>
      <Link to='/' className='item'>
        <i className='pinterest icon big' />
      </Link>
      <Link to='/' className='item'>
        Home
      </Link>
      <div className='ui category search item'>
        <div className='ui transparent icon input'>
          <div className='left aligned'>
            <i className='search link icon' />
          </div>
          <input className='prompt' type='text' placeholder='Search' />
        </div>
      </div>
      {props.isSignedIn ? (
        <Link to='/photos/new' className='ui item'>
          Post Photo
        </Link>
      ) : null}
      {props.isSignedIn ? (
        <Link to='/pins' className='ui item'>
          Pins
        </Link>
      ) : null}

      <div className='right menu'>
        <GoogleAuth className='ui item' />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps)(Header);
