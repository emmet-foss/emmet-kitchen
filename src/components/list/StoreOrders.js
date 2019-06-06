import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import queryString from 'query-string';
import {
  Avatar,
  Button,
  Col,
  List,
  message,
  Row,
  Statistic,
} from 'antd';

import emmetAPI from '../../emmetAPI';

import 'antd/dist/antd.css';
import './List.css';

class StoreOrders extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    orders: [],
  };

  componentDidMount() {
    this.getStoreOrders()
      .then(res => this.setState({ orders: res.orders }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.getStoreOrders()
        .then(res => this.setState({ orders: res.orders }))
        .catch(err => console.log(err));
    }
  }

  getStoreOrders = async () => {
    const params = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true })
    const storeId = this.props.location.pathname.split('/')[2];
    console.log('orderDate', params.orderDate)
    const response = await emmetAPI.getUrl(`/api/v1/stores/${storeId}/orders?orderDate=${params.orderDate}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const { orders } = this.state;

    return (
      <div className="wrap">
        <div className="extraContent">
          <Row>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Statistic value="Here are the orders for your kitchen:" />
              <List
                itemLayout="horizontal"
                bordered
                size="large"
                dataSource={orders}
                renderItem={order => (
                  <List.Item
                    key={order._id}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={order.name}
                    />
                    {order.quantity}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(StoreOrders);
