import React, { useState } from 'react';
import GoogleAuth from './GoogleAuth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setSearchInput } from '../actions';
import '../css/Header.css';
import history from '../history';

const Header = (props) => {
  const [input, setInput] = useState('');

  const onSubmit = () => {
    // input has the search parameters
    props.setSearchInput(input);
    history.push('/');
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

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
            <button
              style={{ background: 'none', border: 'none' }}
              type='submit'
              onClick={onSubmit}
            >
              <i className='search link icon' />
            </button>
          </div>
          <input
            value={input}
            className='prompt'
            type='text'
            placeholder='Search by tags'
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={onKeyPress}
          />
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

export default connect(mapStateToProps, { setSearchInput })(Header);
