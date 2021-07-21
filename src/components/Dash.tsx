import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import './Dash.css';
import Products from './Products';


function Dash() {
  return (
    <div className="Dash">
      <h1>Home Page Coming Through</h1>
        <Products />
    </div>
  );
}

export default withAuthenticator(Dash);