import React, { Component } from 'react';
import { connect } from 'react-redux';

class PhotoEdit extends Component {
  render() {
    return (
      <div className='content ui container'>
        <div>PhotoEdit</div>
      </div>
    );
  }
}

export default connect(null, {})(PhotoEdit);
