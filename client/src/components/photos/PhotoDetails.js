import React, { Component } from 'react';
import { connect } from 'react-redux';

class PhotoDetails extends Component {
  render() {
    return (
      <div className='content ui container'>
        <div>PhotoDetails</div>
      </div>
    );
  }
}

export default connect(null, {})(PhotoDetails);
