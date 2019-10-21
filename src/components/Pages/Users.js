import React, { Component } from 'react';
import { compose } from 'recompose';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EditableDataTable from '../DataTables/EditableDataTable';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

class UsersPageBase extends Component {

  constructor(props){
    super(props)
    this.state = {}
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

  onAdd = (user, foo) => {
    this.props.firebase
      .registerUser(user.email, '123456')
      .then(u => {
        this.props.firebase.addUser(u.user.uid, user)
      })
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onEdit = user => {
    this.props.firebase
      .updateUser(user)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onDelete = id => {
    this.props.firebase
      .deleteUser(id)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const roles = {
      'Aluno': 'Aluno',
      'Professor': 'Professor',
      'Servidor': 'Servidor',
      'Outros': 'Outros'
    }

    const columns = [
      {title: 'Nome do Usuário', field: 'name'},
      {title: 'Código do Usuário', field: 'code'},
      {title: 'Curso do Usuário', field: 'course'},
      {title: 'Telefone do Usuário', field: 'phone'},
      {title: 'Email do Usuário', field: 'email'},
      {title: 'Função do Usuário', field: 'role', lookup: roles},
    ]

    const list =
    <EditableDataTable 
      columns={columns}
      data={this.state.users}
      title='Usuários'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Usuário'
    />

    return(
      <div>
        <Typography style={{textAlign: 'center', margin: 32}} variant="h3">
          Usuários
        </Typography>
        <Box p={4}>{list}</Box>
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