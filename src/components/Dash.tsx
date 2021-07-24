import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Products from './Products';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Breadcrumb } from 'antd';


const { Content } = Layout;

function Dash() {

  return (
        <>
          <Breadcrumb style={{ margin: '20px 16px' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
            }}
          >
            <Products />
          </Content>
        </>

  );
}

export default withAuthenticator(Dash);