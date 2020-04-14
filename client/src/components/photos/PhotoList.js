import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhotos } from '../../actions';
import { Link } from 'react-router-dom';
import PhotoCard from './PhotoCard';
import styled from 'styled-components';

const PhotoTiles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0 10px;
  grid-auto-rows: 10px;
`;

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
        <PhotoTiles>{this.renderPhotos()}</PhotoTiles>
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
