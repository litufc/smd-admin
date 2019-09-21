import React, { Component } from 'react';
import { compose } from 'recompose';

import MenuItem from '@material-ui/core/MenuItem';

import RegistrationForm from '../RegistrationForm';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

const INITIAL_STATE = {
  email: '',
  name: '',
  code: '',
  course: '',
  phone: '',
  role: 0,
  error: null,
  roles: [
    'Aluno',
    'Professor'
  ]
};

class UsersPageBase extends Component {

  constructor(props){
    super(props)

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {}

  onSubmit = event => {
    const { name, place, status } = this.state;
  
    this.props.firebase
      .addResource({name, place, status})
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
    const { email, name, code, course, phone, role, error } = this.state;
    const isInvalid = email === '' || name === '' || code === '' || course === '' || phone === '' || role === null;
    let menuItems;
    if(this.state.roles != undefined){
      menuItems = this.state.roles.map((role, index) => 
        <MenuItem value={index}>{role}</MenuItem>
      )
    }
    return(
      <div>
        <h1>Usuários</h1>
        <RegistrationForm onSubmit={this.onSubmit}
                          onChange={this.onChange}
                          menuItems={menuItems}
                          email={email}
                          name={name}
                          code={code}
                          course={course}
                          phone={phone}
                          role={role}
                          error={error}
                          isInvalid={isInvalid}/>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

const UsersPage = compose(
  withAuthorization(condition),
  withFirebase,
)(UsersPageBase);

export default UsersPage;