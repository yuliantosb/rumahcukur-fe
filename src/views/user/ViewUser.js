import React from 'react';
import { Container, Row, Col, Card, CardHeader, ListGroup, ListGroupItem, Form, FormInput } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import { appName } from '../../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import { getUser } from '../../store/actions/userAction';
import moment from 'moment';

class ViewUser extends React.Component {

    componentDidMount = () => {
        this.props.getUser(this.props.match.params.id);
    }
    
	render() {      
        const { fetching, data } = this.props;
        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
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
                                src={ data && data.photo_url }
                                alt={ data && data.name }
                                width="110"
                                style={{ width:110, height:110, objectFit: 'cover' }}
                                />
                            </div>
                            <h4 className="mb-0">{ data && data.name }</h4>
                            <h6 className="text-secondary">{ data && data.role && data.role.name }</h6>
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
                                                        <label htmlFor="feFirstName">Email</label>
                                                        <p className="help-block">{ data && data.email }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Phone Number</label>
                                                        <p className="help-block">{ data && data.phone_number }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Place Of Birth</label>
                                                        <p className="help-block">{ data && data.place_of_birth }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Date of Birth</label>
                                                        <p className="help-block">{ data && moment(data.date_of_birth).format('ll') }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Gender</label>
                                                        <p className="help-block">{ data && data.gender }</p>
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
