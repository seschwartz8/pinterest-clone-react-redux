import React, { Component } from 'react';
import { connect } from 'react-redux';

class PhotoDelete extends Component {
  render() {
    return (
      <div>
        <div>PhotoDelete</div>
      </div>
    );
  }
}

export default connect(null, {})(PhotoDelete);
