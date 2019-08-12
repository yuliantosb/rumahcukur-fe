import React from 'react';
import { Container, Row, Col, Card, CardHeader, ListGroup, ListGroupItem, Form } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import { appName } from '../../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import { getBarber } from '../../store/actions/barberAction';

class ViewBarber extends React.Component {

    componentDidMount = () => {
        this.props.getBarber(this.props.match.params.id);
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
					<title>View Barber | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                    <div className="col-md-8">
                         <PageTitle sm="4" title="View Barber" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                    <Link className="btn btn-secondary" to="/barber">Back</Link>
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
                            <h6 className="text-secondary">{ data && data.address }</h6>
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
                                                        <label htmlFor="feFirstName">ID Card</label>
                                                        {
                                                            data && data.id_card && <p><a href={ data.id_card_url } className="btn btn-sm btn-primary"><i className="mdi mdi-download"></i> Download ID card</a></p>
                                                        }
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Email</label>
                                                        <p className="help-block">{ data && data.email }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Phone number</label>
                                                        <p className="help-block">{ data && data.phone }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Province</label>
                                                        <p className="help-block">{ data && data.province }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">City</label>
                                                        <p className="help-block">{ data && data.city }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Gender</label>
                                                        <p className="help-block">{ data && data.gender } { data && data.gender === 'Female' ? data && data.is_hijab ? 'Hijab' : 'Non Hijab' : '' }</p>
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
        fetching: state.barber.fetching,
        data: state.barber.barber.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getBarber: (id) => dispatch(getBarber(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(ViewBarber));
