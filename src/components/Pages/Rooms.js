import React, { Component } from 'react';
import { compose } from 'recompose';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EditableDataTable from '../DataTables/EditableDataTable';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

class RoomsPageBase extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.listener = this.props.firebase
      .getRooms()
      .onSnapshot(querySnapshot => {
          this.rooms = []
          querySnapshot.forEach(doc => {
              const id = doc.id;
              const data = doc.data();
              this.rooms.push({id, ...data})
          });
          this.setState({rooms: this.rooms})
      }, error => {
        this.setState({ error });
      })
  }

  onAdd = (room, foo) => {
    this.props.firebase
      .addRoom(room)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onEdit = room => {
    this.props.firebase
      .updateRoom(room)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onDelete = id => {
    this.props.firebase
      .deleteRoom(id)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const status = {
      true: 'Disponível',
      false: 'Indisponível'
    }

    const columns = [
      {title: 'Nome da Sala', field: 'name'},
      {title: 'Status da Sala', field: 'status', lookup: status},
    ]

    const list =
    <EditableDataTable 
      columns={columns}
      data={this.state.rooms}
      title='Salas'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Sala'
    />

    return(
      <div>
        <Typography style={{textAlign: 'center', margin: 32}} variant="h3">
          Salas
        </Typography>
        <Box p={4}>{list}</Box>
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