import React, { Component } from 'react';
import { connect } from 'react-redux';

class PhotoCreate extends Component {
  render() {
    return (
      <div>
        <div>PhotoCreate</div>
      </div>
    );
  }
}

export default connect(null, {})(PhotoCreate);
