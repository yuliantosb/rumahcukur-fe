import React from 'react';
import { Container, Row, Col, Card, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import '../../assets/range-date-picker.css';
import { appName } from '../../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import { saveCoupon } from '../../store/actions/couponAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from '../Error500';
import NumberFormat from 'react-number-format';

class AddCoupon extends React.Component {

    state = {
        name: '',
        value: '',
        start_period: '',
        end_period: ''
    }
    
    handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

    handleStartPeriodChange = (value) => {
        this.setState({
            ...this.state,
            start_period: new Date(value)
        });
    }

    handleEndPeriodChange = (value) => {
        this.setState({
            ...this.state,
            end_period: new Date(value)
        });
    }

	handleSubmit = (e) => {
		e.preventDefault();
        this.props.saveCoupon(this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/coupon');
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
    
	render() {      
        const { fetching, error } = this.props;
        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
        if (error && error.status === 500) return <Error500 message={error.data.message} />
		return (
         
			<Container fluid className="main-content-container px-4">
                <Loading
						show={fetching}
						color="purple"
						showSpinner={false}
						/>
				<Helmet>
					<title>Add Coupon | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                    <div className="col-md-8">
					    <PageTitle sm="4" title="Add Coupon" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/coupon">Back</Link>
                    </div>
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							    <CardBody className="p-0 pb-3">
                                    <div className="col-md-12 mt-3">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Name <span className="text-danger">*</span></label>
                                                        <input type="text" id="name" className={`form-control ${ error && error.data.errors.name && 'is-invalid' }`} onChange={this.handleChange} placeholder="Coupon unique name" />
                                                        { 
                                                            error && error.data.errors.name && <div class="invalid-feedback">{ error.data.errors.name[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Start Period <span className="text-danger">*</span></label>
                                                        <DatePicker 
                                                            className={`form-control ${ error && error.data.errors.start_period && 'is-invalid' }`} 
                                                            onChange={ this.handleStartPeriodChange } 
                                                            placeholderText="mm/dd/yyyy"
                                                            selected={ this.state.start_period }
                                                            id="start_period"
                                                        />
                                                        { 
                                                            error && error.data.errors.start_period && <div class="invalid-feedback">{ error.data.errors.start_period[0] }</div>
                                                        }
                                                    </div>

                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Value <span className="text-danger">*</span></label>
                                                        <NumberFormat id="value" decimalSeparator="." thousandSeparator="," className={`form-control text-right ${ error && error.data.errors.value && 'is-invalid' }`} onChange={this.handleChange} placeholder="0.0" />
                                                        { 
                                                            error && error.data.errors.value && <div class="invalid-feedback">{ error.data.errors.value[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">End Period <span className="text-danger">*</span></label>
                                                        <DatePicker 
                                                            className={`form-control ${ error && error.data.errors.end_period && 'is-invalid' }`} 
                                                            onChange={ this.handleEndPeriodChange } 
                                                            placeholderText="mm/dd/yyyy"
                                                            selected={ this.state.end_period }
                                                        />
                                                        { 
                                                            error && error.data.errors.end_period && <div class="invalid-feedback">{ error.data.errors.end_period[0] }</div>
                                                        }
                                                    </div>

                                                </div>

                                                <div className="col-md-12 text-right">
                                                    <hr/>
                                                    <button className="btn btn-secondary" type="submit" onClick={this.handleClickToast}>Save</button>
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
        saved: state.coupon.saved,
        fetching: state.coupon.fetching,
        fetched: state.coupon.fetched,
        message: state.coupon.message,
        error: state.coupon.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveCoupon: data => dispatch(saveCoupon(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AddCoupon));
