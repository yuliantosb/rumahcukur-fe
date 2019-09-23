import React from 'react';
import { Container, Row, Col, Card, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import { Redirect, Link } from 'react-router-dom';
import { appName } from '../../global';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../../components/layout/ScrollToTop';
import { withToastManager } from 'react-toast-notifications';
import { fetchOrder, deleteOrder } from '../../store/actions/orderAction';
import Loading from 'react-loading-bar';
import {connect} from 'react-redux';
import Table from '../../components/common/Table';
import ReactTooltip from 'react-tooltip';
import Error500 from '../Error500';
import Error403 from '../Error403';

class Order extends React.Component {

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
            type: 'user_name',
            sort: 'asc'
        },
        date_from: new Date(),
        date_to: new Date()
    }

    handleChangeKeyword = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmitKeyword = (e) => {
		e.preventDefault();
		this.props.fetchOrder(this.state);
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

    handleChangeDateFrom = (e) => {

        this.setState({
            ...this.state,
            date_from: new Date(e)
        })
    }

    handleChangeDateTo = (e) => {
        this.setState({
            ...this.state,
            date_to: new Date(e)
        })
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


		this.props.deleteOrder(this.state.deleteId);
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
            this.props.fetchOrder(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchOrder(nextState);
		}
		
		if (this.state.ordering !== nextState.ordering) {
			this.props.fetchOrder(nextState);
        }
        
        if (this.state.date_from !== nextState.date_from) {
			this.props.fetchOrder(nextState);
        }
        
        if (this.state.date_to !== nextState.date_to) {
			this.props.fetchOrder(nextState);
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
				this.props.fetchOrder(this.state);
			}
		}

    }

    componentDidMount = () => {
        this.props.fetchOrder(this.state)
    }	

	render() {
		const {payload, fetching, error} = this.props;
		if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		if (error && error.status === 500) return <Error500 message={error.data.message} />
		if (error && error.status === 403) return <Error403 message={error.data.message} />
		
		const {ordering} = this.state;
        const theads = [
            {name:'user_name', 'value': 'Name', sortable: true},
            {name:'partner_name', 'value': 'Barber', sortable: true},
            {name:'coupon_name', 'value': 'Coupon', sortable: true},
            {name:'distance', 'value': 'Distance', sortable: true},
            {name:'haircut_price', 'value': 'Haircut Price', sortable: true},
            {name:'price_per_km', 'value': 'Distance Price', sortable: true},
            {name:'coupon', 'value': 'Discount', sortable: true},
            {name:'total_price', 'value': 'Total', sortable: true},
            {name:'status', 'value': 'Status', sortable: true},
		];
		
		const orders = payload.data && payload.data.data.map(order => {
            return (
            <tr key={order.id}>
                <td>{ order.user && order.user.name }</td>
				<td>{ order.partner && order.partner.name }</td>
				<td>{ order.coupon && order.coupon.name }</td>
				<td>{ order.distance_formatted }</td>
				<td className="text-right">{ order.haircut_price_formatted }</td>
				<td className="text-right">{ order.price_per_km_formatted }</td>
				<td className="text-right">{ order.coupon_formatted }</td>
				<td className="text-right">{ order.total_price_formatted }</td>
				<td>{ order.status }</td>
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
					<title>Statement | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Statement" className="text-sm-left" />
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
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Date From</label>
                                                        <DatePicker placeholder="mm/dd/yyyy" selected={this.state.date_from} onChange={this.handleChangeDateFrom} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Date To</label>
                                                        <DatePicker placeholder="mm/dd/yyyy" selected={this.state.date_to} onChange={this.handleChangeDateTo} />
                                                    </div>
                                                </div>
                                            </div>
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
													<td className="text-center" colSpan="9">Loading...</td>
												</tr>
											)
											:
											payload.data && payload.data.data.length > 0 ? orders : (
												<tr>
													<td className="text-center" colSpan="9">Data not found</td>
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
        payload: state.order.payload,
        error: state.order.error,
		fetching: state.order.fetching,
		message: state.order.message,
		isDeleted: state.order.isDeleted
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchOrder: (filter) => dispatch(fetchOrder(filter)),
		deleteOrder: (id) => dispatch(deleteOrder(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Order));
