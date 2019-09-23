import React, { Component } from 'react';
import { compose } from 'recompose';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import RegistrationForm from '../RegistrationForm';
import ListTemplate from '../ListTemplate';
import InfoTemplate from '../InfoTemplate';
import EditForm from '../EditForm';
import AlertDialog from '../AlertDialog';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

const INITIAL_STATE = {
  name: '',
  status: true,
  error: null,
  deleteDialog: false
};

class RoomsPageBase extends Component {

  constructor(props){
    super(props)

    this.state = { ...INITIAL_STATE };
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

  onClickListItem = index => {
    const selected = this.state.rooms[index]
    this.setState({selected: index, editName: selected.name})
  }

  goEdit = () => {
    this.setState({editable: true})
  }

  onEdit = () => {
    const id = this.state.rooms[this.state.selected].id
    const name = this.state.editName
    this.props.firebase
      .updateRoom({id, name})
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

  openDeleteDialog = () => {
    this.setState({deleteDialog: true})
  }
  
  closeDeleteDialog = () => {
    this.setState({deleteDialog: false})
  }

  onDelete = () => {
    const id = this.state.rooms[this.state.selected].id
    this.props.firebase
      .deleteRoom(id)
      .then(() => {
        this.setState({ ...INITIAL_STATE, editable: false, selected: null });
        this.closeDeleteDialog()
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const { name, error, editName } = this.state
    const isInvalid = name === ''
    const isEditInvalid = editName === ''

    let listItems;
    if(this.state.rooms != undefined){
      listItems = this.state.rooms.map((room, index) => {

        let status = 'Disponível'
        if(!room.status) {
          status = 'Indisponível'
        }

        return  <ListItem button onClick={() => this.onClickListItem(index)}>
                  <ListItemText primary={room.name} secondary={status}/>
                </ListItem>
      })
    }

    return(
      <div>
        <h1>Salas</h1>
        <RegistrationForm onSubmit={this.onSubmit}
                          onChange={this.onChange}
                          name={name}
                          error={error}
                          isInvalid={isInvalid}/>
        <ListTemplate listItems={listItems}/>
        {
            this.state.selected != null && !this.state.editable  ?
            <InfoTemplate selected={this.state.rooms[this.state.selected]} goEdit={this.goEdit}/> : null
        }
        {
            this.state.selected != null && this.state.editable ?
            <EditForm onEdit={this.onEdit}
                      onChange={this.onChange}
                      openDeleteDialog={this.openDeleteDialog}
                      goBack={this.goBack}
                      editName={editName}
                      error={error}
                      isInvalid={isEditInvalid}/> : null
        }
        <AlertDialog onClose={this.closeDeleteDialog}
                     onAction={this.onDelete}
                     title={'Tem certeza que você deseja excluir a sala ' + editName + ' ?'}
                     yes={'Sim, pode excluir!'}
                     no={'Não tenho certeza...'}
                     open={this.state.deleteDialog}/>
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