import React, {useState} from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import './Dash.css';
import Products from './Products';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { 
  UserOutlined, 
  VideoCameraOutlined,
  UploadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Dash() {
  const [collapsed, setCollapsed]  = useState(false);
  console.log('collasped: ', collapsed)
  console.log('setCollasped: ', setCollapsed)

  const toggle = () => {
    setCollapsed(!collapsed)
    console.log('setCollapsed(!collasped): ', setCollapsed(!collapsed))
  }

  return (
    <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">Home</Menu.Item>
        <AmplifySignOut />
        
      </Menu>
    </Header>
    <Layout>
        <Sider width={200} trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" 
          mode="inline" 
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="2" icon={<UserOutlined />}>
              Dash
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Products">
              <Menu.Item key="5">All Products</Menu.Item>
              <Menu.Item key="6">Available Products</Menu.Item>
              <Menu.Item key="6">Sold Products</Menu.Item>
            </SubMenu>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Categories">
              <Menu.Item key="5">All Categories</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
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
        </Layout>
      </Layout>    
  </Layout>
  );
}

export default withAuthenticator(Dash);