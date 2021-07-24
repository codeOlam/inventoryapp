import React from "react";
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { Layout, Menu } from 'antd';


const { Header } = Layout;

const HeaderMenu = () =>{
    return(
        <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">Home</Menu.Item>
          <AmplifySignOut />
        </Menu>
      </Header>
    )
}

export default HeaderMenu