import React, { Component } from 'react';
import { compose } from 'recompose';

import RegistrationForm from '../RegistrationForm';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

const INITIAL_STATE = {
  name: '',
  status: true,
  error: null,
  places: []
};

class RoomsPageBase extends Component {

  constructor(props){
    super(props)

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {}

  onSubmit = event => {
    const { name, status } = this.state;
  
    this.props.firebase
      .addRoom({name, status})
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, error } = this.state;
    const isInvalid = name === '';
    return(
      <div>
        <h1>Salas</h1>
        <RegistrationForm onSubmit={this.onSubmit}
                          onChange={this.onChange}
                          name={name}
                          error={error}
                          isInvalid={isInvalid}/>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

const RoomsPage = compose(
  withAuthorization(condition),
  withFirebase,
)(RoomsPageBase);

export default RoomsPage;