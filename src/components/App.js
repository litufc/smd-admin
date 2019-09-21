import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import Navigation from './Navigation';
import SignInPage from './Pages/SignIn';
import PasswordForgetPage from './Pages/PasswordForget';
import OfferPage from './Pages/Offer';
import UsersPage from './Pages/Users';
import KeysPage from './Pages/Keys';
import ResourcesPage from './Pages/Resources';
import RoomsPage from './Pages/Rooms';
import PlacesPage from './Pages/Places';
import OptionsPage from './Pages/Options';

import * as ROUTES from '../constants/routes';
import { withAuth } from '../session/session-index';

const App = () => (
  <Router>
    <Navigation />
    <Redirect exact from="/" to={ROUTES.OFFER}/>
    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
    <Route path={ROUTES.OFFER} component={OfferPage} />
    <Route path={ROUTES.USERS} component={UsersPage} />
    <Route path={ROUTES.KEYS} component={KeysPage} />
    <Route path={ROUTES.RESOURCES} component={ResourcesPage} />
    <Route path={ROUTES.ROOMS} component={RoomsPage} />
    <Route path={ROUTES.PLACES} component={PlacesPage} />
    <Route path={ROUTES.OPTIONS} component={OptionsPage} />
  </Router>
)

export default withAuth(App);