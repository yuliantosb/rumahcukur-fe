import React from "react";
import {
  Card,
  CardHeader,
  CardBody
} from "shards-react";
import { Pie }  from 'react-chartjs-2'

class UsersByDevice extends React.Component {
  
  render() {
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Top 4 Barber</h6>
        </CardHeader>
        <CardBody className="d-flex p-5">
          <Pie width={200} data={{
              
              labels: this.props.labels,
              datasets: [
                {
                  
                  data: this.props.data,
                  borderColor: "#fff",
                  backgroundColor: [
                    "rgba(0,123,255,0.9)",
                    "rgba(0,123,255,0.8)",
                    "rgba(0,123,255,0.6)",
                    "rgba(0,123,255,0.4)",
                  ]
                },]
            
          }} legend={{ display: false }} /> 
        </CardBody>
      </Card>
    );
  }
}

export default UsersByDevice;
