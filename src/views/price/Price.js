import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import { appName } from '../../global';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import { fetchPrice, savePrice } from '../../store/actions/priceAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from '../Error500';
import NumberFormat from 'react-number-format';
import Error403 from '../Error403';

class Price extends React.Component {

    state = {
        price_per_km: '',
        price_male: '',
        price_female: '',
    }
    
    handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

    
	handleSubmit = (e) => {
		e.preventDefault();
        this.props.savePrice(this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {
            if (this.props.saved) {

                const { toastManager } = this.props;
                toastManager.add(this.props.message, {
                    appearance: 'success',
                    autoDismiss: true
                });
    
                this.props.fetchPrice();
            }
        }

        if (prevProps.error !== this.props.error) {
            if (!this.props.fetched) {
                if (this.props.error) {
                    const { toastManager } = this.props;
                    toastManager.add(this.props.error.data.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            }
        }
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps !== this.props) {
            if (nextProps.data) {

                this.setState({
                    ...this.state,
                    price_per_km: nextProps.data.price_per_km ? nextProps.data.price_per_km : '',
                    price_male: nextProps.data.price_male ? nextProps.data.price_male : '',
                    price_female: nextProps.data.price_female ? nextProps.data.price_female : '',
                })
            }
        }
    }

    componentDidMount = () => {
        this.props.fetchPrice();
    }
    
	render() {      
        const { fetching, error } = this.props;
        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
        if (error && error.status === 500) return <Error500 message={error.data.message} />
        if (error && error.status === 403) return <Error403 message={error.data.message} />
		return (
         
			<Container fluid className="main-content-container px-4">
                <Loading
						show={fetching}
						color="purple"
						showSpinner={false}
						/>
				<Helmet>
					<title>Price | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                    <div className="col-md-8">
					    <PageTitle sm="4" title="Price" className="text-sm-left" />
                    </div>
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							    <CardBody className="p-0 pb-3">
                                    <div className="col-md-12 mt-3">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="control-label">Price per KM <span className="text-danger">*</span></label>
                                                        <NumberFormat decimalSeparator="." thousandSeparator="," id="price_per_km" value={ this.state.price_per_km } className={`form-control text-right ${ error && error.data.errors.price_per_km && 'is-invalid' }`} onChange={this.handleChange} placeholder="Price per KM" />
                                                        { 
                                                            error && error.data.errors.price_per_km && <div class="invalid-feedback">{ error.data.errors.price_per_km[0] }</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Price Male<span className="text-danger">*</span></label>
                                                        <NumberFormat decimalSeparator="." thousandSeparator="," id="price_male" value={ this.state.price_male } className={`form-control text-right ${ error && error.data.errors.price_male && 'is-invalid' }`} onChange={this.handleChange} placeholder="Price Male" />
                                                        { 
                                                            error && error.data.errors.start_period && <div class="invalid-feedback">{ error.data.errors.price_male[0] }</div>
                                                        }
                                                    </div>

                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Price Female<span className="text-danger">*</span></label>
                                                        <NumberFormat decimalSeparator="." thousandSeparator="," id="price_female" value={ this.state.price_female } className={`form-control text-right ${ error && error.data.errors.price_female && 'is-invalid' }`} onChange={this.handleChange} placeholder="Price Female" />
                                                        { 
                                                            error && error.data.errors.start_period && <div class="invalid-feedback">{ error.data.errors.price_female[0] }</div>
                                                        }
                                                    </div>

                                                </div>

                                                <div className="col-md-12 text-right">
                                                    <hr/>
                                                    <button className="btn btn-secondary" type="submit" onClick={this.handleClickToast}>Save Changes</button>
                                                    <button className="btn btn-default" type="reset">Reset</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
            
		);
	}
}


const mapStateToProps = (state) => {
    return {
        ...state,
        saved: state.price.saved,
        fetching: state.price.fetching,
        fetched: state.price.fetched,
        message: state.price.message,
        error: state.price.error,
        data: state.price.payload.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        savePrice: data => dispatch(savePrice(data)),
        fetchPrice: () => dispatch(fetchPrice())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Price));
