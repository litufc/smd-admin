import React, { Component } from 'react';
import { compose } from 'recompose';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import EditableDataTable from '../EditableDataTable';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

class KeysPageBase extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.getPlaces()
    this.listener = this.props.firebase
      .getKeys()
      .onSnapshot(querySnapshot => {
          this.keys = []
          querySnapshot.forEach(doc => {
              const id = doc.id;
              const data = doc.data();
              this.keys.push({id, ...data})
          });
          this.setState({keys: this.keys})
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
    this.placesListener()
    this.listener()
  }

  onAdd = (key, foo) => {
    this.props.firebase
      .addKey(key)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onEdit = key => {
    console.log(key)
    this.props.firebase
      .updateKey(key)
      .then(() => {
        //Snackbar
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onDelete = id => {
    this.props.firebase
      .deleteKey(id)
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
      {title: 'Nome da Chave', field: 'name'},
      {title: 'Local da Chave', field: 'place', lookup: places},
      {title: 'Status da Chave', field: 'status', lookup: status},
    ]

    const list =
    <EditableDataTable 
      columns={columns}
      data={this.state.keys}
      title='Chaves'
      add={this.onAdd}
      edit={this.onEdit}
      delete={this.onDelete}
      type='Chave'
    />

    return(
      <div>
        <Typography style={{textAlign: 'center', margin: 32}} variant="h3">
          Chaves
        </Typography>
        <Box p={4}>{list}</Box>
      </div>
    )
  }
}

const condition = authUser => !!authUser;

const KeysPage = compose(
  withAuthorization(condition),
  withFirebase,
)(KeysPageBase);

export default KeysPage;