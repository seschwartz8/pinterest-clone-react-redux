import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhoto, deletePhoto } from '../../actions';
import Modal from '../Modal';
import history from '../../history';
import { Link } from 'react-router-dom';

class PhotoDelete extends Component {
  componentDidMount() {
    // Use the props that router automatically passes to rendered components (it contains the params from the routes, such as :id)
    const { id } = this.props.match.params;
    this.props.fetchPhoto(id);
  }

  renderMessage = () => {
    if (!this.props.photo) {
      return 'Are you sure you want to delete this photo?';
    }
    return `Are you sure you want to delete photo with title ${this.props.photo.title}`;
  };

  renderButtons = () => {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deletePhoto(id)}
          className='ui button negative'
        >
          Delete
        </button>
        <Link to='/' className='ui button'>
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  render() {
    return (
      <Modal
        title='Delete Photo'
        content={this.renderMessage()}
        actions={this.renderButtons()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // Router automatically passes these props to its rendered components
  const { id } = ownProps.match.params;
  return {
    photo: state.photos[id],
  };
};

export default connect(mapStateToProps, { fetchPhoto, deletePhoto })(
  PhotoDelete
);
