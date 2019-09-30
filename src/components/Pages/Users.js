import React, { Component } from 'react';
import { compose } from 'recompose';

import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import RegistrationForm from '../RegistrationForm';
import ListTemplate from '../ListTemplate';
import InfoTemplate from '../InfoTemplate';
import EditForm from '../EditForm';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

const INITIAL_STATE = {
  email: '',
  name: '',
  code: '',
  course: '',
  phone: '',
  role: '',
  error: null,
  roles: [
    'Aluno',
    'Professor',
    'Outros'
  ],
  deleteDialog: false
};

class UsersPageBase extends Component {

  constructor(props){
    super(props)

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.listener = this.props.firebase
      .getUsers()
      .onSnapshot(querySnapshot => {
        this.users = []
        querySnapshot.forEach(doc => {
            const id = doc.id;
            const data = doc.data();
            this.users.push({id, ...data})
        });
        this.setState({users: this.users})
      }, error => {
        this.setState({ error });
      })
  }

  componentWillUnmount() {
    this.listener();
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

  onClickListItem = index => {
    const selected = this.state.users[index]
    this.setState({selected: index, editEmail: selected.email,
                                    editName: selected.name,
                                    editCode: selected.code,
                                    editCourse: selected.course,
                                    editPhone: selected.phone,
                                    editRole: selected.role})
  }

  goEdit = () => {
    this.setState({editable: true})
  }

  onEdit = () => {
    const id = this.state.users[this.state.selected].id
    const name = this.state.editName
    const email = this.state.editEmail
    const code = this.state.editCode
    const course = this.state.editCourse
    const phone = this.state.editPhone
    const role = this.state.editRole
    this.props.firebase
      .updateUser({id, name, email, code, course, phone, role})
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.goBack();
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  goBack = () => {
    this.setState({editable: false})
  }

  render() {
    const { email, name, code, course, phone, role, error, editEmail, editName, editCode, editCourse, editPhone, editRole } = this.state
    const isInvalid = email === '' || name === '' || code === '' || course === '' || phone === '' || role === ''
    const isEditInvalid = editEmail === '' || editName === '' || editCode === '' || editCourse === '' || editPhone === '' || editRole === ''

    let menuItems;
    if(this.state.roles != undefined){
      menuItems = this.state.roles.map(role => 
        <MenuItem value={role}>{role}</MenuItem>
      )
    }

    let listItems;
    if(this.state.users != undefined){
      listItems = this.state.users.map((user, index) => 
        <ListItem button onClick={() => this.onClickListItem(index)}>
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
        {
            this.state.selected != null && !this.state.editable ?
            <InfoTemplate selected={this.state.users[this.state.selected]} goEdit={this.goEdit}/> : null
        }
        {
            this.state.selected != null && this.state.editable ?
            <EditForm onEdit={this.onEdit}
                      onChange={this.onChange}
                      goBack={this.goBack}
                      menuItems={menuItems}
                      editName={editName}
                      editEmail={editEmail}
                      editCode={editCode}
                      editCourse={editCourse}
                      editPhone={editPhone}
                      editRole={editRole}
                      error={error}
                      isInvalid={isEditInvalid}/> : null
        }
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