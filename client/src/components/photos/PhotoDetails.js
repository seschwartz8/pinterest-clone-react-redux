import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhoto, pinPhoto } from '../../actions';
import Modal from '../Modal';
import history from '../../history';
import { Link } from 'react-router-dom';

class PhotoDetails extends Component {
  componentDidMount() {
    // Use the props that router automatically passes to rendered components (it contains the params from the routes, such as :id)
    const { id } = this.props.match.params;
    this.props.fetchPhoto(id);
  }

  renderTitle = () => {
    if (!this.props.photo) {
      return 'Loading...';
    }
    return `${this.props.photo.title}`;
  };

  renderMessage = () => {
    if (!this.props.photo) {
      return 'Loading...';
    }
    return (
      <div>
        <img
          src={this.props.photo.url}
          alt={this.props.photo.title}
          style={{ maxHeight: '300px', maxWidth: '500px' }}
        />
        <h4>{this.props.photo.tags}</h4>
      </div>
    );
  };

  renderButtons = () => {
    return (
      <React.Fragment>
        {this.props.isSignedIn ? (
          <button
            onClick={() => this.props.pinPhoto(this.props.photo)}
            className='ui button red'
          >
            Pin
          </button>
        ) : (
          'You must sign in to pin'
        )}

        <Link to='/' className='ui button'>
          Cancel
        </Link>
      </React.Fragment>
    );
  };

  render() {
    return (
      <Modal
        title={this.renderTitle()}
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
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { fetchPhoto, pinPhoto })(PhotoDetails);
