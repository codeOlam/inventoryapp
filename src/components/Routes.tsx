import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Dash from './Dash';

const Router = () => {
    return(
        <HashRouter>
            <Switch>
                 <Route exact path="/" component={Dash} />
            </Switch>
        </HashRouter>
    )
}

export default Router