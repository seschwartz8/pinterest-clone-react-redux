import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPhoto } from '../../actions';
import PhotoForm from './PhotoForm';

class PhotoCreate extends Component {
  onSubmit = (formValues) => {
    // Form values automatically passed with redux-form to POST photo to api server
    this.props.createPhoto(formValues);
  };

  render() {
    return (
      <div className='content ui container'>
        <h3>Post a Photo</h3>
        <PhotoForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createPhoto })(PhotoCreate);
