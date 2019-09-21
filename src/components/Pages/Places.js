import React, { Component } from 'react';
import { compose } from 'recompose';

import RegistrationForm from '../RegistrationForm';
import { withAuthorization } from '../../session/session-index';
import { withFirebase } from '../../firebase/firebase-index';

const INITIAL_STATE = {
  name: '',
  status: true,
  error: null,
  places: []
};

class PlacesPageBase extends Component {

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
    const { name } = this.state;
  
    this.props.firebase
      .addPlace({name})
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
    const { name, error } = this.state;
    const isInvalid = name === '';
    return(
      <div>
        <h1>Locais</h1>
        <RegistrationForm onSubmit={this.onSubmit}
                          onChange={this.onChange}
                          name={name}
                          error={error}
                          isInvalid={isInvalid}/>
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