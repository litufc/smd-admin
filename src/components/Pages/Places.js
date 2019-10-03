import React, { Component } from 'react';
import { compose } from 'recompose';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EditableDataTable from '../EditableDataTable';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

class PlacesPageBase extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.listener = this.props.firebase
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
  }

  onAdd = (place, foo) => {
    this.props.firebase
      .addPlace(place)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onEdit = place => {
    this.props.firebase
      .updatePlace(place)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onDelete = id => {
    this.props.firebase
      .deletePlace(id)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {

    const columns = [
      {title: 'Nome do Local', field: 'name'},
    ]

    const list =
    <EditableDataTable 
      columns={columns}
      data={this.state.places}
      title='Locais'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Local'
    />
    
    return(
      <div>
        <Typography style={{textAlign: 'center', margin: 32}} variant="h3">
          Locais
        </Typography>
        <Box p={4}>{list}</Box>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

const PlacesPage = compose(
  withAuthorization(condition),
  withFirebase,
)(PlacesPageBase);

export default PlacesPage;