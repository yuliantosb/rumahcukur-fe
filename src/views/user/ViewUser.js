import React from 'react';
import { Container, Row, Col, Card, CardHeader, ListGroup, ListGroupItem, Form } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import '../../assets/range-date-picker.css';
import { appName } from '../../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import { getUser } from '../../store/actions/userAction';
import moment from 'moment';
import Error500 from '../Error500';
import Error403 from '../Error403';

class ViewUser extends React.Component {

    componentDidMount = () => {
        this.props.getUser(this.props.match.params.id);
    }
    
	render() {      
        const { fetching, data, error } = this.props;
        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
        if (error && error.status === 500) return <Error500 message={error.data.message} />
        if (error && error.status === 403) return <Error403 message={error.data.message} />
        return (
         
			<Container fluid className="main-content-container px-4">
                <Loading
						show={fetching}
						color="blue"
						showSpinner={false}
						/>
				<Helmet>
					<title>View User | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                    <div className="col-md-8">
                         <PageTitle sm="4" title="View User" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                    <Link className="btn btn-secondary" to="/user">Back</Link>
                    </div>
					
				</Row>
				<Row>
					<Col lg="4">
                        <Card small className="mb-4 pt-3">
                            <CardHeader className="border-bottom text-center">
                            <div className="mb-3 mx-auto">
                                <img
                                className="rounded-circle"
                                src={ data && data.picture_url }
                                alt={ data && data.name }
                                width="110"
                                style={{ width:110, height:110, objectFit: 'cover' }}
                                />
                            </div>
                            <h4 className="mb-0">{ data && data.name }</h4>
                            <h6 className="text-secondary">{ data && data.username }</h6>
                            <small className="text-muted">{ data && data.place_of_birth }, { data && moment(data.date_of_birth).format('LL') } ({ data && data.age })</small>
                            <span className="text-muted d-block mb-2">{ data && data.role.name }</span>
                            </CardHeader>
                        </Card>
					</Col>

                    <Col lg="8">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                            <h6 className="m-0">Details Info</h6>
                            </CardHeader>
                            <ListGroup flush>
                                <ListGroupItem className="p-3">
                                    <Row>
                                        <Col>
                                            <Form>
                                                <Row form>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Name</label>
                                                        <p className="help-block">{ data && data.name }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Username</label>
                                                        <p className="help-block">{ data && data.username }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Email</label>
                                                        <p className="help-block">{ data && data.email }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Phone number</label>
                                                        <p className="help-block">{ data && data.phone_number }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">POB</label>
                                                        <p className="help-block">{ data && data.place_of_birth }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">DOB</label>
                                                        <p className="help-block">{ data && moment(data.date_of_birth).format('LL') }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Partner</label>
                                                        <p className="help-block">{ data && data.partner && data.partner.name }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Role</label>
                                                        <p className="help-block">{ data && data.role && data.role.name }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Gender</label>
                                                        <p className="help-block">{ data && data.gender }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Address</label>
                                                        <p className="help-block">{ data && data.address }</p>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
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
        fetching: state.user.fetching,
        data: state.user.user.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (id) => dispatch(getUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(ViewUser));