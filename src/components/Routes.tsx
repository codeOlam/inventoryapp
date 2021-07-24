import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Dash from './Dash';
import SiderNav from './Sider';
import HeaderMenu from './HeaderMenu';

function Router () {

    return(
        <HashRouter>
            <Layout>
                <HeaderMenu />
                <Layout>
                    <SiderNav />
                <Layout className="site-layout">
                    <Switch>
                        <Route exact path="/" component={Dash} />
                    </Switch>
                </Layout>
                </Layout>    
            </Layout>
        </HashRouter>
    )
}

export default Router