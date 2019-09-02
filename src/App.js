import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from './components/hoc/Layout';
import Keys from './pages/keys/keys';
import Offer from './pages/offer/offer';
import Resources from './pages/resources/resources';
import Rooms from './pages/rooms/rooms';
import Students from './pages/students/students';
import './App.css';

export default class App extends Component {
  constructor(props){
      super(props);
      this.state = {}
  }

  render(){
    return (
      <div>
        <Layout>
          <Route path="/oferta" component={Offer}></Route>
          <Route path="/alunos" component={Students}></Route>
          <Route path="/recursos" component={Resources}></Route>
          <Route path="/chaves" component={Keys}></Route>
          <Route path="/salas" component={Rooms}></Route>
        </Layout>
      </div>
    );
  }
}
