import React, { Component } from 'react';
import { ComposableMap, ZoomableGroup, Geographies, Geography, Markers, Marker } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Card, CardBody, CardHeader } from 'shards-react';
import World50m from '../../static/world-50m.json';
import worldPopulation from '../../static/world-population.json';

const wrapperStyles = {
	width: '100%',
	maxWidth: 980,
	margin: '0 auto'
};

const cityScale = scaleLinear().domain([ 0, 37843000 ]).range([ 1, 25 ]);

class MapChart extends Component {
	constructor() {
		super();
		this.state = {
			cities: []
		};
		this.fetchCities = this.fetchCities.bind(this);
	}
	componentDidMount() {
		this.fetchCities();
	}
	fetchCities() {
		// request.get('../../static/world-population.json').then((res) => {
			this.setState({
				cities: worldPopulation
			});
		// });
	}

	render() {
		return (
			<Card small className="h-100">
				<CardHeader className="border-bottom">
					<h6 className="m-0">Location User Apps</h6>
				</CardHeader>
				<CardBody className="d-flex py-0">
					<div style={wrapperStyles}>
						<ComposableMap
							projectionConfig={{ scale: 205 }}
							width={980}
							height={551}
							style={{
								width: '100%',
								height: 'auto'
							}}
						>
							<ZoomableGroup center={[ 0, 20 ]} disablePanning>
								<Geographies geography={World50m}>
									{(geographies, projection) =>
										geographies.map(
											(geography, i) =>
												geography.id !== 'ATA' && (
													<Geography
														key={i}
														geography={geography}
														projection={projection}
														style={{
															default: {
																fill: '#ECEFF1',
																stroke: '#607D8B',
																strokeWidth: 0.75,
																outline: 'none'
															},
															hover: {
																fill: '#ECEFF1',
																stroke: '#607D8B',
																strokeWidth: 0.75,
																outline: 'none'
															},
															pressed: {
																fill: '#ECEFF1',
																stroke: '#607D8B',
																strokeWidth: 0.75,
																outline: 'none'
															}
														}}
													/>
												)
										)}
								</Geographies>
								<Markers>
									{this.state.cities.map((city, i) => (
										<Marker key={i} marker={city}>
											<circle
												cx={0}
												cy={0}
												r={cityScale(city.population)}
												fill="rgba(255,87,34,0.8)"
												stroke="#607D8B"
												strokeWidth="2"
											/>
										</Marker>
									))}
								</Markers>
							</ZoomableGroup>
						</ComposableMap>
					</div>
				</CardBody>
			</Card>
		);
	}
}

export default MapChart;
