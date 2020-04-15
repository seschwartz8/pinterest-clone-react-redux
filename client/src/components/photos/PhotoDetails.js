import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPhoto, pinPhoto } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

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
        <img src={this.props.photo.url} alt={this.props.photo.title} />
        <h4>{this.props.photo.tags}</h4>
      </div>
    );
  };

  renderButtons = () => {
    return (
      <button
        onClick={() => this.props.pinPhoto(this.props.photo)}
        className='ui button red'
      >
        Pin
      </button>
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
  };
};

export default connect(mapStateToProps, { fetchPhoto, pinPhoto })(PhotoDetails);
