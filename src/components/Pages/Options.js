import React from 'react';

import { withAuthorization } from '../../session/session-index';

const OptionsPage = () => (
  <div>
    <h1>Options</h1>
    <p>This Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(OptionsPage);