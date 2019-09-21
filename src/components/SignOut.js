import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../firebase/firebase-index';
import Button from '@material-ui/core/Button';
import * as ROUTES from '../constants/routes';

class SignOutButtonBase extends Component {
  signOut = () => {
    this.props.firebase
      .signOut()
      .then(() => {
        this.props.history.push(ROUTES.SIGN_IN);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render(){
    return(
      <Button color="inherit" onClick={this.signOut}>
        Sair
      </Button>
    )
  }
}

const SignOutButton = compose(
  withRouter,
  withFirebase,
)(SignOutButtonBase);

export default SignOutButton;