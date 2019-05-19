import React from 'react';
import axios from "axios";

import { authenticationService } from './service';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import './Main.css';
import WrappedRegistrationForm  from './client-registration';
import ListaClient from './lista-client';



const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;


export class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = { collapsed: false };


  }


  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };


  componentDidMount() {
    // authenticationService.login("admin", "123456").then(token => );
  }


  render() {

    return (<Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2" >
              <Link to="client">
              <Icon type="desktop" />
              <span>Cadastrar Cliente</span>
              </Link>
          </Menu.Item>
          <Menu.Item key="2" >
              <Link to="lista">
              <span>Lista</span>
              </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
        <Route path="/client" component={WrappedRegistrationForm}/> 
        <Route path="/lista" component={ListaClient}/> 
        </Content>
        <Footer style={{ textAlign: 'center' }}>Client Challenge ©2018 Created by Joao Paulo</Footer>
      </Layout>
    </Layout>);
  }
}



export default Main;