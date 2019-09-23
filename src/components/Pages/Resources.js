import React, { Component } from 'react';
import { compose } from 'recompose';

import MenuItem from '@material-ui/core/MenuItem';
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
  place: '',
  status: true,
  editable: false,
  error: null,
  deleteDialog: false
};

class ResourcesPageBase extends Component {

  constructor(props){
    super(props)

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.getPlaces()
    this.listener = this.props.firebase
      .getResources()
      .onSnapshot(querySnapshot => {
          this.resources = []
          querySnapshot.forEach(doc => {
              const id = doc.id;
              const data = doc.data();
              this.resources.push({id, ...data})
          });
          this.setState({resources: this.resources})
          console.log('STATE: ' + this.state.places)
      }, error => {
        this.setState({ error });
      })
  }

  getPlaces = () => {
    this.placesListener = this.props.firebase
      .getPlaces()
      .onSnapshot(querySnapshot => {
          this.places = []
          querySnapshot.forEach(doc => {
              const id = doc.id;
              const data = doc.data();
              this.places.push({id, ...data})
          });
          this.setState({places: this.places})
      }, error => {
        this.setState({ error });
      })
  }

  componentWillUnmount() {
    this.listener()
    this.placesListener()
  }

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

  onClickListItem = index => {
    const selected = this.state.resources[index]
    this.setState({selected: index, editName: selected.name, editPlace: selected.place})
  }

  goEdit = () => {
    this.setState({editable: true})
  }

  onEdit = () => {
    const id = this.state.resources[this.state.selected].id
    const name = this.state.editName
    const place = this.state.editPlace
    this.props.firebase
      .updateResource({id, name, place})
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
    const id = this.state.resources[this.state.selected].id
    this.props.firebase
      .deleteResource(id)
      .then(() => {
        this.setState({ ...INITIAL_STATE, editable: false, selected: null });
        this.closeDeleteDialog()
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const { name, place, error, editName, editPlace } = this.state;
    const isInvalid = name === '' || place === '';
    const isEditInvalid = editName === '' || editPlace === '';

    let menuItems;
    if(this.state.places != undefined){
      menuItems = this.state.places.map(place => 
        <MenuItem value={place.name}>{place.name}</MenuItem>
      )
    }

    let listItems;
    if(this.state.resources != undefined){
      listItems = this.state.resources.map((resource, index) => {

        let status = 'Disponível'
        if(!resource.status) {
          status = 'Indisponível'
        }

        return  <ListItem button onClick={() => this.onClickListItem(index)}>
                  <ListItemText primary={'(' + resource.place + ') ' + resource.name} secondary={status}/>
                </ListItem>
      })
    }

    return(
      <div>
        <h1>Recursos</h1>
        <RegistrationForm onSubmit={this.onSubmit}
                          onChange={this.onChange}
                          menuItems={menuItems}
                          name={name}
                          place={place}
                          error={error}
                          isInvalid={isInvalid}/>
        <ListTemplate listItems={listItems}/>
        {
            this.state.selected != null && !this.state.editable ?
            <InfoTemplate selected={this.state.resources[this.state.selected]}
                          goEdit={this.goEdit}/> : null
        }
        {
            this.state.selected != null && this.state.editable ?
            <EditForm onEdit={this.onEdit}
                      onChange={this.onChange}
                      openDeleteDialog={this.openDeleteDialog}
                      menuItems={menuItems}
                      goBack={this.goBack}
                      editName={editName}
                      editPlace={editPlace}
                      error={error}
                      isInvalid={isEditInvalid}/> : null
        }
        <AlertDialog onClose={this.closeDeleteDialog}
                     onAction={this.onDelete}
                     title={'Tem certeza que você deseja excluir o recurso (' + editPlace + ') ' + editName + ' ?'}
                     yes={'Sim, pode excluir!'}
                     no={'Não tenho certeza...'}
                     open={this.state.deleteDialog}/>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

const ResourcesPage = compose(
  withAuthorization(condition),
  withFirebase,
)(ResourcesPageBase);

export default ResourcesPage;