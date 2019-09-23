import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardBody, CardHeader } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import {Redirect} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import { appName, url } from "../global";
import Axios from "axios";

class BlogOverview extends React.Component {

  state = {
    'total_order': 'Rp. 0',
    'new_user': 0,
    'new_partner': 0,
    'top_location': {},
    'top_barber': [],
    'transaction_today': []
  }

  fetchData = () => {
    const data = Axios.get(`${url}/dashboard`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(data => {
      const result = data.data.data;
    
      this.setState({
        ...this.state,
        total_order: result.total_order,
        new_user: result.new_user,
        new_partner: result.new_partner,
        top_location: result.top_location,
        top_barber: result.top_barber,
        transaction_today: result.transaction_today
      })
    })
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    if (!sessionStorage.getItem('token')) return (<Redirect to="/login" />)

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
          <Col lg="4" sm="6" className="mb-4">
            <Card>
              <CardBody>
                <h6>Total Transaction</h6>
                <h3>{this.state.total_order}</h3>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" sm="6" className="mb-4">
            <Card>
              <CardBody>
                <h6>New User</h6>
                <h3>{this.state.new_user}</h3>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4" sm="6" className="mb-4">
            <Card>
              <CardBody>
                <h6>New Partner</h6>
                <h3>{this.state.new_partner}</h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          {/* Users Overview */}
          <Col lg="12" md="12" sm="12" className="mb-4">
            <UsersOverview labels={this.state.transaction_today.value} data={this.state.transaction_today.data} />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice labels={this.state.top_barber.value} data={this.state.top_barber.data} />
          </Col>

          <Col xs="8" className="mb-4">
            <Card className="h-100" small>
              <CardHeader className="border-bottom">
                <h6 className="m-0">Top Location Today</h6>
              </CardHeader>
              <CardBody className="d-flex py-0">
                <table className="table">
                  <tbody>
                    {
                      Object.keys(this.state.top_location).map((data, index) => {
                        return (
                          <tr key={index}>
                            <td>{data}</td>
                            <td>{this.state.top_location[data]}</td>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </table>
              </CardBody>
            </Card>
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
