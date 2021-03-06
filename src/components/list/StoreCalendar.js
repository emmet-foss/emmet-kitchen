import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  Avatar,
  Button,
  Calendar,
  Col,
  List,
  message,
  Row,
  Statistic,
} from 'antd';

import emmetAPI from '../../emmetAPI';

import 'antd/dist/antd.css';
import './List.css';

class StoreCalendar extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    availableDates: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading : true });
    this.getAvailableDates()
      .then(res => this.setState({ availableDates: this.formatDates(res.availableDates) }))
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ loading : true });
      this.getAvailableDates()
        .then(res => this.setState({ availableDates: this.formatDates(res.availableDates) }))
        .catch(err => console.log(err));
    }
  }

  formatDates = (availableDates) => {
    return availableDates.map(availableDate => availableDate.substr(0, 10));
  }

  getAvailableDates = async () => {
    const storeId = this.props.location.pathname.split('/')[2];
    const response = await emmetAPI.getUrl(`/api/v1/stores/${storeId}/available_dates`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({ loading : false });
    return body;
  };

  goToOrderDate = async (orderDate) => {
    const storeId = this.props.location.pathname.split('/')[2];
    this.props.history.push(`/stores/${storeId}/orders?orderDate=${orderDate.format("YYYY-MM-DD")}`)
  };

  render() {
    const { availableDates, loading } = this.state;

    if (loading) {
      return <div>loading</div>
    } else {
      return (
        <div className="wrap">
          <div className="extraContent">
            <Row>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Statistic value="Please select a date to process." />
                <Calendar
                  style={{ border: '1px solid #d9d9d9', borderRadius: 4 }}
                  fullscreen={false}
                  disabledDate={(date) => {
                    return availableDates.indexOf(date.format("YYYY-MM-DD")) === -1;
                  }}
                  onSelect={this.goToOrderDate}
                />
              </Col>
            </Row>
          </div>
        </div>
      );
    }
  }
}

export default withRouter(StoreCalendar);
