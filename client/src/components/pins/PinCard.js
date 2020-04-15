import React, { useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { hoverPhoto, leavePhoto, unPinPhoto } from '../../actions';

const UnPinButtonContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PinCard = ({ pin, ...props }) => {
  // Establish access to img in DOM (set initial value so it's not null to start)
  const refContainer = useRef('100');

  const renderUnPinButton = () => {
    // Allow pinning a photo
    return (
      <button
        onClick={() => props.unPinPhoto(pin.id)}
        className='ui button red'
      >
        Remove Pin
      </button>
    );
  };

  const onHover = () => {
    // Change isHoverPhoto state to photoId
    props.hoverPhoto(pin.id);
  };

  const onLeave = () => {
    // Change isHoverPhoto state to null
    props.leavePhoto();
  };

  return (
    <div
      onMouseEnter={() => onHover(pin.id)}
      onMouseLeave={() => onLeave()}
      style={{
        position: 'relative',
        textAlign: 'center',
        gridRowEnd: `span ${Math.ceil(
          refContainer.current.clientHeight / 10 + 1
        )}`,
      }}
    >
      <img
        ref={refContainer}
        src={pin.url}
        alt={pin.title}
        style={{
          maxWidth: '250px',
          borderRadius: '15px',
        }}
      />
      <UnPinButtonContainer>
        {props.isHoverPhoto === pin.id ? renderUnPinButton() : null}
      </UnPinButtonContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isHoverPhoto: state.isHoverPhoto,
  };
};

export default connect(mapStateToProps, {
  hoverPhoto,
  leavePhoto,
  unPinPhoto,
})(PinCard);
