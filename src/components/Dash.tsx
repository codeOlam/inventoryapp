import React from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import './Dash.css';
import Products from './Products';


function Dash() {
  return (
    <div className="Dash">
        <Products />
        <hr/>
        <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(Dash);