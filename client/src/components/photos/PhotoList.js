import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhotos, hoverPhoto, leavePhoto } from '../../actions';
import { Link } from 'react-router-dom';

class PhotoList extends Component {
  componentDidMount() {
    // Fetch photos on component mount
    this.props.fetchPhotos();
  }

  renderAdminControls = (photo) => {
    // Allow creator of photo to edit or delete photo
    if (photo.userId === this.props.currentUserId) {
      return (
        <div>
          <Link to={`/photos/edit/${photo.id}`} className='ui button primary'>
            Edit
          </Link>
          <Link
            to={`/photos/delete/${photo.id}`}
            className='ui button negative'
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  toggleHover = (photoId) => {
    console.log('hover toggled');

    this.props.isHoverPhoto
      ? this.props.leavePhoto()
      : this.props.hoverPhoto(photoId);
  };

  renderPhotos = () => {
    // Render all photos as HTML
    return this.props.photos.map((photo) => {
      return (
        <div>
          <img
            key={photo.id}
            alt={photo.title}
            src={photo.url}
            onMouseEnter={() => this.toggleHover(photo.id)}
            onMouseLeave={() => this.toggleHover(photo.id)}
          />
          {this.props.isHoverPhoto === photo.id
            ? this.renderAdminControls(photo)
            : null}
        </div>
      );
    });
  };

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

  render() {
    let text;
    if (this.props.isHoverPhoto) {
      text = this.props.isHoverPhoto;
    } else {
      text = 'null';
    }

    return (
      <div className='content ui container'>
        <p>{text}</p>

        {this.renderCreateButton()}
        {this.renderPhotos()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photos: Object.values(state.photos),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    isHoverPhoto: state.isHoverPhoto,
  };
};

export default connect(mapStateToProps, {
  fetchPhotos,
  hoverPhoto,
  leavePhoto,
})(PhotoList);
