import React from 'react';
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import RangeDatePicker from "../common/RangeDatePicker";
import Chart from "../../utils/chart";

class UsersByDick extends React.Component {
    constructor(props) {
      super(props);
  
      this.canvasRef = React.createRef();
    }
  
    componentDidMount() {
      const chartOptions = {
        ...{
          responsive: true,
          legend: {
            position: "top"
          },
          scales: {
            xAxes: [{
              barPercentage: 1,
              categoryPercentage: 0.6
            }],
            yAxes: [{
              id: "y-axis-stock-in"
            }, {
              id: "y-axis-stock-out"
            }]
          },
        },
        ...this.props.chartOptions
      };
  
      const BlogUsersOverview = new Chart(this.canvasRef.current, {
        type: "bar",
        data: this.props.chartData,
        options: chartOptions
      });
  
      // They can still be triggered on hover.
      const buoMeta = BlogUsersOverview.getDatasetMeta(0);
      buoMeta.data[0]._model.radius = 0;
      buoMeta.data[
        this.props.chartData.datasets[0].data.length - 1
      ]._model.radius = 0;
  
      // Render the chart.
      BlogUsersOverview.render();
    }
  
    render() {
      const { title } = this.props;
      return (
        <Card small className="h-100">
          <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
          </CardHeader>
          <CardBody className="pt-0">
            <canvas
              height="120"
              ref={this.canvasRef}
              style={{ maxWidth: "100% !important" }}
            />
          </CardBody>
        </Card>
      );
    }
  }
  
  UsersByDick.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    /**
     * The chart dataset.
     */
    chartData: PropTypes.object,
    /**
     * The Chart.js options.
     */
    chartOptions: PropTypes.object
  };
  
  UsersByDick.defaultProps = {
    title: "Sales and Purchase",
    chartData: {
        labels: ["Bougenvilled", "Jasminum", "Rosa", "Orchidaceae", "Nymphaea"],
        datasets: [
            {
                label: 'Sales',
                data: [5427, 5243, 5514, 3789, 3200],
                backgroundColor: "rgba(0,123,255,0.1)",
                borderColor: "rgba(0,123,255,1)",
                pointBackgroundColor: "#ffffff",
                pointHoverBackgroundColor: "rgb(0,123,255)",
                yAxisID: "y-axis-stock-in",
                borderWidth: 2,
            },
            {
                label: 'Purchase',
                data: [3971, 6209, 4898, 3137, 2800],
                backgroundColor: "rgba(255,65,105,0.1)",
                borderColor: "rgba(255,65,105,1)",
                pointBackgroundColor: "#ffffff",
                pointHoverBackgroundColor: "rgba(255,65,105,1)",
                borderWidth: 2,
                yAxisID: "y-axis-stock-out"
            }        
        ]
    }
  };
  
  export default UsersByDick;
  