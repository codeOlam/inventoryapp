import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import './Dash.css';

function Dash() {
  return (
    <div className="Dash">
      <h1>Home Page Coming Through</h1>
    </div>
  );
}

export default withAuthenticator(Dash);