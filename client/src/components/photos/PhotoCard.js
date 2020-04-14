import React, { useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { hoverPhoto, leavePhoto } from '../../actions';
import { Link } from 'react-router-dom';

const PinButtonContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AdminControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 15%;
  left: 0;
  width: 100%;
  padding: 0 10%;
`;

const PhotoCard = ({ photo, ...props }) => {
  // Establish access to img in DOM (set initial value so it's not null to start)
  const refContainer = useRef('100');

  const renderAdminControls = (photo) => {
    // Allow creator of photo to edit or delete photo
    if (photo.userId === props.currentUserId) {
      return (
        <React.Fragment>
          <Link to={`/photos/edit/${photo.id}`} className='ui button'>
            Edit
          </Link>
          <Link to={`/photos/delete/${photo.id}`} className='ui button grey'>
            Delete
          </Link>
        </React.Fragment>
      );
    }
  };

  const renderPinButton = () => {
    // Allow pinning a photo
    return <button className='ui button red'>Save</button>;
  };

  const onHover = (photoId) => {
    // Change isHoverPhoto state to photoId
    props.hoverPhoto(photoId);
  };

  const onLeave = () => {
    // Change isHoverPhoto state to null
    props.leavePhoto();
  };

  return (
    <div
      onMouseEnter={() => onHover(photo.id)}
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
        src={photo.url}
        alt={photo.title}
        style={{
          maxWidth: '250px',
          borderRadius: '15px',
        }}
      />
      <PinButtonContainer>
        {props.isHoverPhoto === photo.id && props.isSignedIn
          ? renderPinButton()
          : null}
      </PinButtonContainer>
      <AdminControlsContainer>
        {props.isHoverPhoto === photo.id && photo.userId === props.currentUserId
          ? renderAdminControls(photo)
          : null}
      </AdminControlsContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.userId,
    isHoverPhoto: state.isHoverPhoto,
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  hoverPhoto,
  leavePhoto,
})(PhotoCard);
