import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import { Redirect, Link } from 'react-router-dom';
import { appName } from '../../global';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../../components/layout/ScrollToTop';
import { withToastManager } from 'react-toast-notifications';
import { fetchCoupon, deleteCoupon } from '../../store/actions/couponAction';
import Loading from 'react-loading-bar';
import {connect} from 'react-redux';
import moment from 'moment';
import Table from '../../components/common/Table';
import ReactTooltip from 'react-tooltip';
import Error500 from '../Error500';
import Error403 from '../Error403';

class Coupon extends React.Component {

	state = {
        search: null,
        page: 1,
        perpage: 10,
		keyword: null,
		alert: true,
		alertMsgBox: false,
		deleteId: null,
		showMsgBox: false,
		ordering: {
            type: 'name',
            sort: 'asc'
        }
    }

    handleChangeKeyword = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmitKeyword = (e) => {
		e.preventDefault();
		this.props.fetchCoupon(this.state);
	}

	handleClickPage = (e) => {
        this.setState({
            ...this.state,
            page: e
        });
    }

    hanldeChangePage  = (e) => {
        this.setState({
            ...this.state,
            perpage: e.target.value
        });
    }
    
    handleClickDelete = (id) => {
		
		this.setState({
			...this.state,
			deleteId: id,
			showMsgBox: true
		});
	}
	
	handleClickYes = () => {		

		this.setState({
			...this.state,
			alertMsgBox: true,
			showMsgBox: false
		});


		this.props.deleteCoupon(this.state.deleteId);
	}

	handleClickNo = () => {
		this.setState({
			...this.state,
			showMsgBox: false,
			deleteId: null
		});
	}

	handleSorting = (e) => {
        const type = e.target.id;
        const sort = this.state.ordering.sort;
        this.setState({
			...this.state,
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            }
        });
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.page !== nextState.page) {
            this.props.fetchCoupon(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchCoupon(nextState);
		}
		
		if (this.state.ordering !== nextState.ordering) {
			this.props.fetchCoupon(nextState);
		}
    }
    
    componentDidUpdate = (prevProps, prevState) => {

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
		
		if (prevProps.isDeleted !== this.props.isDeleted) {
			if (this.props.isDeleted) {
				const { toastManager } = this.props;
				toastManager.add(this.props.message, {
					appearance: 'success',
					autoDismiss: true
				});
				this.props.fetchCoupon(this.state);
			}
		}

    }

    componentDidMount = () => {
        this.props.fetchCoupon(this.state)
    }	

	render() {
		const {payload, fetching, error} = this.props;
		if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
        if (error && error.status === 500) return <Error500 message={error.data.message} />
        if (error && error.status === 403) return <Error403 message={error.data.message} />
		const {ordering} = this.state;
        const theads = [
            {name:'name', 'value': 'Name', sortable: true},
            {name:'value', 'value': 'Value', sortable: true},
            {name:'start_period', 'value': 'Start Period', sortable: true},
            {name:'end_perios', 'value': 'End Period', sortable: true},
            {name:'option', 'value': 'Options', sortable: false}
		];
		const coupons = payload.data && payload.data.data.map(coupon => {
            return (
            <tr key={coupon.id}>
                <td>{ coupon.name }</td>
				<td className="text-right">{ coupon.value_formatted }</td>
				<td>{ moment(coupon.start_period).format('ll') }</td>
				<td>{ moment(coupon.end_period).format('ll') }</td>
				<td className="text-center">
					<Link data-tip="Edit" to={`/coupon/edit/${coupon.id}`} className="btn btn-link text-success btn-sm px-0 mr-2"><i className="mdi mdi-pencil"></i></Link>
                    <button data-tip="Delete" onClick={() => this.handleClickDelete(coupon.id) } className="btn btn-link text-danger btn-sm px-0"><i className="mdi mdi-delete"></i></button>
					<ReactTooltip />
				</td>
            </tr>
            );
		});

		return (
			<Container fluid className="main-content-container px-4">
				<Loading
						show={fetching}
						color="purple"
						showSpinner={false}
						/>
				<Helmet>
					<title>Coupon | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Coupon" className="text-sm-left" />
				</Row>
				<Row>
					{
						this.state.showMsgBox &&
						(
							<ScrollToTop>
								<div className="messagebox">
									<p className="mb-5">Are you sure want to delete this data?</p>
									<button className="btn btn-secondary mr-4" onClick={this.handleClickYes}>Yes</button>
									<button className="btn btn-white" onClick={this.handleClickNo}>No Cancel</button>
								</div>
								<div className="backdrop"></div>
							</ScrollToTop>
						)
					}
					<Col>
						<Card small className="mb-4">
							<CardBody className="p-0 pb-3">
								<div className="col-md-12 mt-4">
									<div className="row">
                                        <div className="col-md-8">
                                            <Link to="/coupon/create" className="btn btn-secondary mr-2">
                                                <i className="mdi mdi-plus" /> Add
                                            </Link>
                                        </div>
										<div className="col-md-4 text-right">
											<form onSubmit={this.handleSubmitKeyword}>
												<div className="input-group mb-3">
													<input
														id="keyword"
														type="text"
														className="form-control"
														placeholder=""
														aria-label="Example text with button addon"
														aria-describedby="button-addon1"
														onChange={this.handleChangeKeyword}
													/>
													<div className="input-group-prepend">
														<button
															className="btn btn-secondary"
															type="submit"
															id="button-addon1"
														>
															<i className="mdi mdi-magnify" /> Search{' '}
														</button>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
								<div className="col-md-12 mt-3">
									<Table theads={theads} ordering={ordering} handleSorting={this.handleSorting}>
										{ 
											fetching ? 
											(
												<tr>
													<td className="text-center" colSpan="5">Loading...</td>
												</tr>
											)
											:
											payload.data && payload.data.data.length > 0 ? coupons : (
												<tr>
													<td className="text-center" colSpan="5">Data not found</td>
												</tr>
										) }
									</Table>
								</div>

								<div className="col-md-12 py-3">
									<div className="row">
										<div className="col-md-10">
											{ payload.data && payload.data.total > 1 && (
												<p>Showing { payload.data && payload.data.from.toLocaleString() } to { payload.data && payload.data.to.toLocaleString() } of { payload.data && payload.data.total.toLocaleString() } record(s)</p>

											)}

											{
												payload.data && payload.data.total > 1 && (
													<nav aria-label="Page navigation example">
														<ul className="pagination">

															{ payload.data.current_page > 1 && <li key="prev" className="page-item"><button onClick={this.handleClickPage.bind(null, payload.data.current_page - 1)} className="page-link">Prev</button></li> }

															{
																payload.data.pages.map((page, index) => {
																	return (
																		
																		<li key={index} className={`page-item ${page === '...' ? 'disabled' : '' } ${page === payload.data.current_page ? 'active' : '' }`}><button onClick={this.handleClickPage.bind(null, page)} className="page-link">{page}</button></li>
																		
																	)
																})
															}

															{ payload.data.current_page < payload.data.last_page && <li key="next" className="page-item"><button onClick={this.handleClickPage.bind(null, payload.data.current_page + 1)} className="page-link">Next</button></li> }


														</ul>
													</nav>
												)
											}
										</div>
										<div className="col-md-2 text-right">
											<div className="form-group">
												<label className="control-label">Showing per page </label>
												<select
													defaultValue="10"
													id="perpage"
													className="form-control custom-select"
													onChange={this.hanldeChangePage}
												>
													<option value="10">10</option>
													<option value="20">20</option>
													<option value="50">50</option>
													<option value="100">100</option>
												</select>
											</div>
										</div>
									</div>
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
        payload: state.coupon.payload,
        error: state.coupon.error,
		fetching: state.coupon.fetching,
		message: state.coupon.message,
		isDeleted: state.coupon.isDeleted
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCoupon: (filter) => dispatch(fetchCoupon(filter)),
		deleteCoupon: (id) => dispatch(deleteCoupon(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Coupon));
