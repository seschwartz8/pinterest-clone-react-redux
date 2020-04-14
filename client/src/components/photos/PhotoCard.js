import React, { useRef } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { hoverPhoto, leavePhoto } from '../../actions';
import { Link } from 'react-router-dom';

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const PinButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
`;

const AdminControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

const PhotoCard = ({ photo, ...props }) => {
  // Establish access to img in DOM (set initial value so it's not null to start)
  const refContainer = useRef('100');

  const renderAdminControls = (photo) => {
    // Allow creator of photo to edit or delete photo
    if (photo.userId === props.currentUserId) {
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

  const renderPinButton = (photo) => {
    // Allow pinning a photo
    return <button className='ui button grey'>Pin {photo.title}</button>;
  };

  const onHover = (photoId) => {
    props.hoverPhoto(photoId);
  };

  const onLeave = () => {
    props.leavePhoto();
  };

  return (
    <PhotoContainer
      onMouseEnter={() => onHover(photo.id)}
      onMouseLeave={() => onLeave()}
      style={{
        gridRowEnd: `span ${Math.ceil(
          refContainer.current.clientHeight / 10 + 1
        )}`,
      }}
    >
      <img
        ref={refContainer}
        src={photo.url}
        alt={photo.title}
        style={{ maxWidth: '250px' }}
      />
      <PinButtonContainer>
        {props.isHoverPhoto === photo.id ? renderPinButton(photo) : null}
      </PinButtonContainer>
      <AdminControlsContainer>
        {props.isHoverPhoto === photo.id && photo.userId === props.currentUserId
          ? renderAdminControls(photo)
          : null}
      </AdminControlsContainer>
    </PhotoContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.userId,
    isHoverPhoto: state.isHoverPhoto,
  };
};

export default connect(mapStateToProps, {
  hoverPhoto,
  leavePhoto,
})(PhotoCard);
