import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBoard } from '../../actions';
import PinCard from './PinCard';
import styled from 'styled-components';

const PhotoTiles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0 10px;
  grid-auto-rows: 10px;
`;

class PhotoBoard extends Component {
  componentDidMount() {
    // Fetch photos on component mount
    this.props.fetchBoard();
  }

  renderPhotos = () => {
    // Render all photos cards as HTML
    return this.props.board.map((photo) => {
      return <PinCard key={photo.id} photo={photo} />;
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
    board: state.auth.board,
  };
};

export default connect(mapStateToProps, {
  fetchBoard,
})(PhotoBoard);
