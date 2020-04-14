import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhotos } from '../../actions';
import { Link } from 'react-router-dom';
import PhotoCard from './PhotoCard';

class PhotoList extends Component {
  componentDidMount() {
    // Fetch photos on component mount
    this.props.fetchPhotos();
  }

  renderCreateButton = () => {
    // If user is logged in, allow them to post new photo
    if (this.props.isSignedIn) {
      return (
        <Link to='/photos/new' className='ui primary button'>
          Post Photo
        </Link>
      );
    }
  };

  renderPhotos = () => {
    // Render all photos cards as HTML
    return this.props.photos.map((photo) => {
      return <PhotoCard key={photo.id} photo={photo} />;
    });
  };

  render() {
    return (
      <div className='content ui container'>
        {this.renderCreateButton()}
        {this.renderPhotos()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photos: Object.values(state.photos),
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  fetchPhotos,
})(PhotoList);
