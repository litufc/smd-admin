import React from 'react';

import { AuthUserContext, withAuthorization } from '../../session/session-index';

const OfferPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <h1>Offer</h1>
        <h1>Account: {authUser.email}</h1>
        <p>This Page is accessible by every signed in user.</p>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(OfferPage);