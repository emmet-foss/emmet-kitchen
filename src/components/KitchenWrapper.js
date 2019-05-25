import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Route, Link } from 'react-router-dom';
import { withRouter } from "react-router";
import { Layout, Button, Icon } from 'antd';

import { Stores, Menus, MenuItems, Checkout } from './list';
import { CreateForm, CreateMenu, CreateMenuItem, Login, Guest } from './form';
import { Home } from './dashboard';
import SideMenu from './sidemenu/SideMenu';

import 'antd/dist/antd.css';
import './KitchenWrapper.css';

const {
  Header, Content,
} = Layout;

class KitchenWrapper extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SideMenu />
        <Layout>
          <Header style={{ background: '#fff', padding: 10, display: 'flex', justifyContent: 'flex-end' }}>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route exact path="/" component={Home} />
              <Route exact path="/stores" component={Stores} />
              <Route exact path="/stores/:storeId/orders" component={Orders} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(KitchenWrapper);
