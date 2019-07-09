import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import UsersByDick from "./../components/blog/UsersByDick";
import TableDick from './../components/blog/TableDick';
import {Redirect} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import { appName } from "../global";
import MapChart from "../components/blog/MapChart";
import VisitorWebsite from "../components/blog/VisitorWebsite";
import TransactionDone from "../components/blog/TransactionDone";

class BlogOverview extends React.Component {
  render() {
    if (!sessionStorage.getItem('token')) return (<Redirect to="/login" />)
    const { smallStats } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
            <Helmet>
                <title>Dashboard | {appName} </title>
            </Helmet>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Daily Report" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

        
        <Row>
          {/* Users Overview */}
          <Col lg="12" md="12" sm="12" className="mb-4">
            <UsersOverview />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col>

          <Col xs="8" className="mb-4">
            <MapChart />
          </Col>

          <Col md="6" sm="12" className="mb-4">
            <VisitorWebsite />
          </Col>

          <Col md="6" sm="12" className="mb-4">
            <TransactionDone />
          </Col>
          

        </Row>
      </Container>
    );
  }
}

BlogOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

BlogOverview.defaultProps = {
  smallStats: [
    {
      label: "Sales",
      value: "4,502,240.98",
      percentage: "4.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "Purchase & Expense",
      value: "1,466,920.00",
      percentage: "12.4%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
    {
      label: "Income Nett",
      value: "3,563,938.98",
      percentage: "12.4%",
      increase: false,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(196, 24, 60, 0.1)",
          borderColor: "rgb(196, 24, 60)",
          data: [1, 2, 3, 3, 3, 4, 1]
        }
      ]
    },
  ]
};

export default BlogOverview;
