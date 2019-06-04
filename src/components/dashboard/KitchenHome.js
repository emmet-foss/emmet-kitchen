import React, { Component } from 'react';
import {
  PageHeader,
  Statistic,
  Row,
  Col,
  Select,
} from 'antd';

import emmetAPI from '../../emmetAPI';

import 'antd/dist/antd.css';
import './Home.css';

const Option = Select.Option;

class KitchenHome extends Component {
  state = {
    stores: [],
    availableDates: [],
  };

  componentDidMount() {
    this.getStores()
      .then(res => this.setState({ stores: res.stores }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.getStores()
      .then(res => this.setState({ stores: res.stores }))
      .catch(err => console.log(err));
    }
  }

  getStores = async () => {
    const response = await emmetAPI.getUrl('/api/v1/stores')
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  getAvailableDates = async (storeId) => {
    const response = await emmetAPI.getUrl(`/api/v1/stores/available_dates?storeId=${storeId}`)
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleKitchenSelect = async (storeId) => {
    this.setState({
      selectedStore: storeId,
    });

    this.getAvailableDates(storeId)
      .then(res => {
        this.setState({
          loading: false,
          availableDates: res.availableDates,
        })
      })
      .catch(err => console.log(err));
  };

  render() {
    const {
      stores,
      selectedStore,
      availableDates,
    } = this.state;
    const displayAvailableDates = selectedStore !== '';
    return (
      <PageHeader
        title={`Welcome to Emmet Kitchen!`}
      >
        <div className="wrap">
          <div className="extraContent">
            <Row>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Statistic value="From what kitchen are you?" />
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select a kitchen"
                  dropdownMatchSelectWidth={false}
                  onChange={this.handleKitchenSelect}
                  value={selectedStore}
                >
                  {stores.map(store => {
                    return <Option key={store._id} value={store.name}>{store.name}</Option>
                  })}
                </Select>
              </Col>
            </Row>
            {displayAvailableDates &&
              <Row>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <Statistic value="Here are the available dates" />
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Choose a date"
                    dropdownMatchSelectWidth={false}
                  >
                    {availableDates.map(availableDate => {
                      return <Option key={availableDate} value={availableDate}>{availableDate}</Option>
                    })}
                  </Select>
                </Col>
              </Row>
            }
          </div>
        </div>
      </PageHeader>

    );
  }
}

export default KitchenHome;
