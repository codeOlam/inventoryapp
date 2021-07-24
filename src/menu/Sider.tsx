import React, {useState} from "react";
import { Layout, Menu } from 'antd';
import { 
    ShoppingOutlined, 
    PieChartOutlined,
    FolderOutlined
  } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;


function SiderNav (){
  const [collapsed, setCollapsed]  = useState(false);
  console.log('collasped: ', collapsed)
  console.log('setCollasped: ', setCollapsed)

  const onCollapse= () => {
    setCollapsed(!collapsed)
    console.log('setCollapsed(!collasped): ', setCollapsed(!collapsed))
  }

      return(
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to={`/`}> Dashboard </Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<ShoppingOutlined />} title="Products">
              <Menu.Item key="3">
                <Link to={`/allproducts`}>All Products </Link>
              </Menu.Item>
              <Menu.Item key="4">Sold Products</Menu.Item>
              <Menu.Item key="5">Available Products</Menu.Item>
            </SubMenu>
            <Menu.Item key="6" icon={<FolderOutlined />}>
              All Categories
            </Menu.Item>

          </Menu>
        </Sider>
      )
  }

export default SiderNav;