import React from 'react';
import { Card, CardHeader, CardBody, DatePicker } from 'shards-react';
import '../../assets/range-date-picker.css';

class TableDick extends React.Component {
	state = {
		startDate: undefined,
		endDate: undefined
	};

	handleStartDateChange = (value) => {
		this.setState({
			...this.state,
			...{ startDate: new Date(value) }
		});
	};

	handleEndDateChange = (value) => {
		console.log(value);
		this.setState({
			...this.state,
			...{ endDate: new Date(value) }
		});
	};

	render() {
		return (
			<Card small className="h-100">
				<CardHeader className="border-bottom">
					<h6 className="m-0">Out of stock product</h6>
				</CardHeader>
				<CardBody className="d-flex py-0">
                    <ul className="list-group-small list-group list-group-sm list-group-flush">
                        <li className="d-flex px-3 list-group-item">
                            <span className="text-semibold text-fiord-blue">GitHub</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">19,291</span>
                        </li>
                        <li className="d-flex px-3 list-group-item">
                            <span className="text-semibold text-fiord-blue">Gitlab</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">18,121</span>
                        </li>
                        <li className="d-flex px-3 list-group-item">
                            <span className="text-semibold text-fiord-blue">BitBucket</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">17,291</span>
                        </li>
                        <li className="d-flex px-3 list-group-item">
                            <span className="text-semibold text-fiord-blue">Amazon</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">21,910</span>
                        </li>
                        <li className="d-flex px-3 list-group-item">
                            <span className="text-semibold text-fiord-blue">Azure</span>
                            <span className="ml-auto text-right text-semibold text-reagent-gray">18,012</span>
                        </li>
                    </ul>
				</CardBody>
			</Card>
		);
	}
}

export default TableDick;
