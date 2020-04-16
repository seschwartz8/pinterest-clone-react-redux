import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPins } from '../../actions';
import PinCard from './PinCard';
import styled from 'styled-components';

const PhotoTiles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 0 10px;
  grid-auto-rows: 10px;
`;

class PinBoard extends Component {
  componentDidMount() {
    // Fetch photos on component mount
    this.props.fetchPins();
  }

  renderPhotos = () => {
    // Render all photos cards as HTML
    if (!this.props.pins) {
      return 'Loading...';
    }
    return this.props.pins.map((pin) => {
      if (pin.pinnedBy === this.props.userId) {
        return <PinCard key={pin.id} pin={pin} />;
      }
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
    userId: state.auth.userId,
    pins: Object.values(state.pins),
  };
};

export default connect(mapStateToProps, {
  fetchPins,
})(PinBoard);
