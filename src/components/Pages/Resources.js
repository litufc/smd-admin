import React, { Component } from 'react';
import { compose } from 'recompose';

import MenuItem from '@material-ui/core/MenuItem';

import RegistrationForm from '../RegistrationForm';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

const INITIAL_STATE = {
  name: '',
  place: 0,
  status: true,
  error: null,
  places: []
};

class ResourcesPageBase extends Component {

  constructor(props){
    super(props)

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.listener = this.props.firebase
      .getPlaces()
      .then(querySnapshot => {
          this.places = []
          querySnapshot.forEach(doc => {
              const id = doc.id;
              const data = doc.data();
              this.places.push({id, ...data})
          });
          this.setState({places: this.places})
          console.log('STATE: ' + this.state.places)
      })
      .catch(error => {
          this.setState({ error });
      });
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

  render() {
    const { name, place, error } = this.state;
    const isInvalid = name === '' || place === null;
    let menuItems;
    if(this.state.places != undefined){
      menuItems = this.state.places.map((place, index) => 
        <MenuItem value={index}>{place.name}</MenuItem>
      )
    }
    return(
      <div>
        <h1>Chaves</h1>
        <RegistrationForm onSubmit={this.onSubmit}
                          onChange={this.onChange}
                          menuItems={menuItems}
                          name={name}
                          place={place}
                          error={error}
                          isInvalid={isInvalid}/>
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