import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhoto, editPhoto } from '../../actions';
import _ from 'lodash';
import PhotoForm from './PhotoForm';

class PhotoEdit extends Component {
  componentDidMount() {
    // Use the props that router automatically passes to rendered components (it contains the params from the routes, such as :id)
    const specificId = this.props.match.params.id;
    this.props.fetchPhoto(specificId);
    console.log(specificId);
  }

  onSubmit = (formValues) => {
    this.props.editPhoto(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.photo) {
      return <div>Loading...</div>;
    }

    // "initialValues" is a redux form property that passes initial values of the object into the form by matching field names to object key names
    // Use lodash pick to pass a new object with only the properties I want, so that "id" and "userId" don't get registered as having changed
    return (
      <div className='content ui container'>
        <h3>Edit Photo</h3>
        <PhotoForm
          initialValues={_.pick(this.props.photo, 'title', 'url', 'tags')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // Router automatically passes these props to its rendered components
  const specificId = ownProps.match.params.id;
  return {
    photo: state.photos[specificId],
  };
};

export default connect(mapStateToProps, { fetchPhoto, editPhoto })(PhotoEdit);
