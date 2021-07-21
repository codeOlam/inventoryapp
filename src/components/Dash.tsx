import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import './Dash.css';
import Products from './Products';


function Dash() {
  return (
    <div className="Dash">
        <Products />
    </div>
  );
}

export default withAuthenticator(Dash);