import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhotos } from '../../actions';
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

  renderPhotos = () => {
    // Render all photos cards as HTML and filter by search term
    return this.props.photos
      .filter((photo) => photo.tags.includes(this.props.searchInput))
      .map((photo) => {
        return <PhotoCard key={photo.id} photo={photo} />;
      });
  };

  render() {
    return (
      <div className='content ui container'>
        <PhotoTiles>{this.renderPhotos()}</PhotoTiles>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photos: Object.values(state.photos),
    searchInput: state.search.searchInput,
  };
};

export default connect(mapStateToProps, {
  fetchPhotos,
})(PhotoList);
