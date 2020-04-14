import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { hoverPhoto, leavePhoto } from '../../actions';
import { Link } from 'react-router-dom';

const PhotoContainer = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1%;
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
    <div>
      <PhotoContainer
        style={{ backgroundImage: `url(${photo.url})` }}
        onMouseEnter={() => onHover(photo.id)}
        onMouseLeave={() => onLeave()}
      >
        <PinButtonContainer>
          {props.isHoverPhoto === photo.id ? renderPinButton(photo) : null}
        </PinButtonContainer>
        <AdminControlsContainer>
          {props.isHoverPhoto === photo.id &&
          photo.userId === props.currentUserId
            ? renderAdminControls(photo)
            : null}
        </AdminControlsContainer>
      </PhotoContainer>
    </div>
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
