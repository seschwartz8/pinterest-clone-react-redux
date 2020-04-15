import React, { useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { hoverPhoto, leavePhoto, pinPhoto } from '../../actions';
import { Link } from 'react-router-dom';

const UnPinButtonContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PinCard = ({ photo, ...props }) => {
  // Establish access to img in DOM (set initial value so it's not null to start)
  const refContainer = useRef('100');

  const renderUnPinButton = () => {
    // Allow pinning a photo
    return (
      <button onClick={() => props.pinPhoto(photo)} className='ui button red'>
        Remove Pin
      </button>
    );
  };

  const onHover = () => {
    // Change isHoverPhoto state to photoId
    props.hoverPhoto(photo.id);
  };

  const onLeave = () => {
    // Change isHoverPhoto state to null
    props.leavePhoto();
  };

  return (
    <Link
      onMouseEnter={() => onHover(photo.id)}
      onMouseLeave={() => onLeave()}
      to={`/photos/${photo.id}`}
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
        src={photo.url}
        alt={photo.title}
        style={{
          maxWidth: '250px',
          borderRadius: '15px',
        }}
      />
      <UnPinButtonContainer>
        {props.isHoverPhoto === photo.id ? renderUnPinButton() : null}
      </UnPinButtonContainer>
    </Link>
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
  pinPhoto,
})(PinCard);
