import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Route } from 'react-router-dom';
import { withRouter } from "react-router";
import { Layout } from 'antd';

import { KitchenStores, Orders } from './list';
import { KitchenHome } from './dashboard';
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
              <Route exact path="/" component={KitchenHome} />
              <Route exact path="/stores" component={KitchenStores} />
              <Route exact path="/stores/:storeId/orders" component={Orders} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(KitchenWrapper);
