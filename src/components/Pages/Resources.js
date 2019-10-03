import React, { Component } from 'react';
import { compose } from 'recompose';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EditableDataTable from '../EditableDataTable';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

class ResourcesPageBase extends Component {

  constructor(props){
    super(props)
    this.state = {}
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

  onAdd = (resource, foo) => {
    this.props.firebase
      .addResource(resource)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onEdit = resource => {
    this.props.firebase
      .updateResource(resource)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onDelete = id => {
    this.props.firebase
      .deleteResource(id)
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

    let places = {}
    if(this.state.places != undefined){
      this.state.places.map(place => 
        places[place.name] = place.name
      )
    }

    const columns = [
      {title: 'Nome do Recurso', field: 'name'},
      {title: 'Local do Recurso', field: 'place', lookup: places},
      {title: 'Status do Recurso', field: 'status', lookup: status},
    ]

    const list =
    <EditableDataTable 
      columns={columns}
      data={this.state.keys}
      title='Recursos'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Recurso'
    />

    return(
      <div>
        <Typography style={{textAlign: 'center', margin: 32}} variant="h3">
          Recursos
        </Typography>
        <Box p={4}>{list}</Box>
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