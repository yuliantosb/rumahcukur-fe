import React from 'react';
import { Container, Row, Col } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import '../../assets/range-date-picker.css';
import { Link, Redirect } from 'react-router-dom';
import { appName } from '../../global';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { fetchUser, deleteUser } from '../../store/actions/userAction';
import moment from 'moment';
import Loading from 'react-loading-bar';
import ScrollToTop from '../../components/layout/ScrollToTop';
import { withToastManager } from 'react-toast-notifications';
import Error500 from '../Error500';
import Error403 from '../Error403';

class User extends React.Component {

    state = {
        search: null,
        page: 1,
        perpage: 6,
		keyword: null,
		alert: true,
		alertMsgBox: false,
		deleteId: null,
		showMsgBox: false
    }

    handleChangeKeyword = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmitKeyword = (e) => {
		e.preventDefault();
		this.props.fetchUser(this.state);
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

		this.props.deleteUser(this.state.deleteId);
	}

	handleClickNo = () => {
		this.setState({
			...this.state,
			showMsgBox: false,
			deleteId: null
		});
	}

    componentWillUpdate(nextProps, nextState) {
        if (this.state.page !== nextState.page) {
            this.props.fetchUser(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchUser(nextState);
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
				this.props.fetchUser(this.state);
			}
		}
    }

    componentDidMount = () => {
        this.props.fetchUser(this.state)
    }

	render() {

        const { payload, fetching, error } = this.props;
        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		if (error && error.status === 500) return <Error500 message={error.data.message} />
		if (error && error.status === 403) return <Error403 message={error.data.message} />

        const users = payload.data && payload.data.data.map(user => {
            return (
                    <div className="col-md-4" key={user.id}>
                        <div className="profile">
                            <div className="profile-card">
                                <img src={user.picture_url } alt={user.name} className="img img-circle" />
                                <h2 className="title-profile">{ user.name }</h2>
                                <p className="text-secondary">{ user.username }</p>
                                <small className="text-muted">{ user.place_of_birth }, { moment(user.date_of_birth).format('LL') } ({ user.age })</small>
                                <p className="text-primary">{ user.role && user.role.name }</p>
                                <Link className="btn btn-sm btn-link text-primary py-0 px-0 pr-2" to={`user/view/${user.id}`}>
                                    View
                                </Link>
                                <Link className="btn btn-sm btn-link text-success py-0 px-0 pr-2" to={`user/edit/${user.id}`}>
                                    Edit
                                </Link>
                                <button onClick={ () => this.handleClickDelete(user.id) } className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
            )
        })
		return (
			<Container fluid className="main-content-container px-4">
                <Loading
						show={fetching}
						color="blue"
						showSpinner={false}
						/>
				<Helmet>
					<title>User | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
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
                    <div className="col-md-8">
					    <PageTitle sm="4" title="User" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                        <form onSubmit={this.handleSubmitKeyword}>
                            <div className="input-group mt-3">
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
				</Row>
				<Row>
					<Col>
                        <div className="col-md-12">
                            <Link to="/user/create" className="btn btn-secondary mr-2">
                                <i className="mdi mdi-plus" /> Add
                            </Link>
                        </div>

                        <div className="col-md-12 mt-5 mb-5">
                            <div className="row">
                                {
                                    fetching ? (
                                        <div className="col-md-12 py-5">
                                            <div className="text-center">
                                                <h3 className="text-muted">Loading ...</h3>
                                            </div>
                                        </div>
                                    )
                                    :
                                    payload.data && payload.data.data.length > 0 ? users : (
                                        <div className="col-md-12 py-5">
                                            <div className="text-center">
                                                <h3 className="text-muted">Data not found!</h3>
                                            </div>
                                        </div>
                                )
                            }

                            </div>
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
                                            <option value="6">6</option>
                                            <option value="12">12</option>
                                            <option value="60">60</option>
                                            <option value="120">120</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>                   

					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        ...state,
        payload: state.user.payload,
        error: state.user.error,
		fetching: state.user.fetching,
        message: state.user.message,
        isDeleted: state.user.isDeleted
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (filter) => dispatch(fetchUser(filter)),
        deleteUser: (id) => dispatch(deleteUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(User));