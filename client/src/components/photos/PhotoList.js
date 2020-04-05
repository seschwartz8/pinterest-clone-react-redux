import React, { Component } from 'react';
import { connect } from 'react-redux';

class PhotoList extends Component {
  render() {
    return (
      <div className='content ui container'>
        <div>PhotoList</div>
      </div>
    );
  }
}

export default connect(null, {})(PhotoList);
