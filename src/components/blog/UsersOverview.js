import React from "react";
import { Card, CardHeader, CardBody } from "shards-react";
import { Line } from 'react-chartjs-2';

class UsersOverview extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  
  render() {
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Transaction Today</h6>
        </CardHeader>
        <CardBody className="py-3">
        <Line legend={{ display: false }} data={{
            labels: this.props.labels,
            datasets: [
              {
                label: "Today Transaction",
                fill: "start",
                data: this.props.data,
                backgroundColor: "rgba(0,123,255,0.1)",
                borderColor: "rgba(0,123,255,1)",
                pointBackgroundColor: "#ffffff",
                pointHoverBackgroundColor: "rgb(0,123,255)",
                borderWidth: 1.5,
                pointRadius: 0,
                pointHoverRadius: 3
              },]}
          } />
        </CardBody>
      </Card>
    );
  }
}

export default UsersOverview;
