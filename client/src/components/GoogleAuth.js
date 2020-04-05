import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: `1003914086545-dkgl55o815ilth897itbhdtimgaenigr.apps.googleusercontent.com`,
        scope: 'email'
      })
      .then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        // Update store based on whether user is signed in
        this.onAuthChange(this.auth.isSignedIn.get());
        // Listen for signed in status to change and update store
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    })
  }

  onAuthChange = isSignedIn => {
    // Called any time the user's authentication status changes to update state
    if (isSignedIn) {
      const userId = this.auth.currentUser.get().getId();
      // Sign in action (as opposed to auth's build in sign in)
      this.props.signIn(userId);
    } else {
      // Sign out action (as opposed to auth's build in sign out)
      this.props.signOut();
    }
  }

  signInClick = () => {
    // Google auth's built in sign in fx
    this.auth.signIn()
  }

  signInClick = () => {
    // Google auth's built in sign out fx
    this.auth.signOut()
  }

  renderAuthButton = () => {
    if (this.props.isSignedIn === null) {
      // No information yet on sign in status
      return null;
    } else if (this.props.isSignedIn) {
      // User is signed in
      return (
        <button className="ui blue google button" onClick={this.signOutClick}>Sign Out</button>
      )
    } else {
      // User is signed out
      <button className="ui green google button" onClick={this.signInClick}>Sign In with Google</button>
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn = state.auth.isSignedIn
  }
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
