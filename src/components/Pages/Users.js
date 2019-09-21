import React, { Component } from 'react';
import { compose } from 'recompose';

import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import RegistrationForm from '../RegistrationForm';
import ListTemplate from '../ListTemplate';
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

  componentDidMount() {
    this.onLoadUsers();
  }

  onLoadUsers = () => {
    this.listener = this.props.firebase
      .getUsers()
      .then(querySnapshot => {
          this.users = []
          querySnapshot.forEach(doc => {
              const id = doc.id;
              const data = doc.data();
              this.users.push({id, ...data})
          });
          this.setState({users: this.users})
      })
      .catch(error => {
          this.setState({ error });
      });
  }

  onSubmit = event => {
    const { email, name, code, course, phone, role } = this.state;

    this.props.firebase
      .registerUser(email, '123456')
      .then(user => {
        return this.props.firebase
          .addUser(user.user.uid, {email, name, code, course, phone, role})
      })
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

    let listItems;
    if(this.state.users != undefined){
      listItems = this.state.users.map(user => 
        <ListItem button>
          <ListItemText primary={user.name} secondary={user.code} />
        </ListItem>
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
        <ListTemplate listItems={listItems}/>
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