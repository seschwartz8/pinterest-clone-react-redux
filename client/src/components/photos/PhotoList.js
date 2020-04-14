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
        <React.Fragment>
          <Link to={`/photos/edit/${photo.id}`} className='ui button primary'>
            Edit
          </Link>
          <Link
            to={`/photos/delete/${photo.id}`}
            className='ui button negative'
          >
            Delete
          </Link>
        </React.Fragment>
      );
    }
  };

  renderPinButton = (photo) => {
    // Allow pinning a photo
    return <button className='ui button grey'>Pin {photo.title}</button>;
  };

  onHover = (photoId) => {
    this.props.hoverPhoto(photoId);
  };

  onLeave = () => {
    this.props.leavePhoto();
  };

  renderPhotos = () => {
    // Render all photos as HTML
    return this.props.photos.map((photo) => {
      return (
        <div>
          <div
            key={photo.id}
            onMouseEnter={() => this.onHover(photo.id)}
            onMouseLeave={() => this.onLeave()}
            style={{
              // TEMPORARY FIXED IMAGE SIZE
              backgroundImage: `url(${photo.url})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              width: '300px',
              height: '300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1%',
            }}
          >
            <div
              // TEMPORARY FIXED BUTTON PLACEMENT
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '80%',
              }}
            >
              {this.props.isHoverPhoto === photo.id
                ? this.renderPinButton(photo)
                : null}
            </div>
            <div
              // TEMPORARY FIXED BUTTON PLACEMENT
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '80%',
              }}
            >
              {this.props.isHoverPhoto === photo.id &&
              photo.userId === this.props.currentUserId
                ? this.renderAdminControls(photo)
                : null}
            </div>
            {console.log(photo)}
          </div>
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
