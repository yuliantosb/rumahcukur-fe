import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import { appName, customerStyles, url } from '../../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import {updatePermission, getPermission } from '../../store/actions/permissionAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from '../Error500';
import AsyncSelect from 'react-select/async';
import Axios from 'axios';
import Error403 from '../Error403';

class EditPermission extends React.Component {

    state = {
        'name': '',
        'description': '',
        'parent_id': '',
        'parent_name': '',
    };
    
    handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
        this.props.updatePermission(this.props.match.params.id, this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/permission');
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

    componentWillUpdate(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                ...this.state,
                name: nextProps.data.name ? nextProps.data.name : '',
                description: nextProps.data.description ? nextProps.data.description : '',
                parent_id: nextProps.data.parent_id ? nextProps.data.parent_id : '',
                parent_name: nextProps.data.parent_name ? nextProps.data.parent_name : ''
            })
        }
    }

    handleChangeSelect = (value, e) => {

        this.setState({
			...this.state,
            [`${e.name}_id`]: value ? value.value : '',
            [`${e.name}_name`]: value ? value.label : '',
		});
    }
    
    componentDidMount() {
        this.props.getPermission(this.props.match.params.id)
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
						color="blue"
						showSpinner={false}
						/>
				<Helmet>
					<title>Edit Permission | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="Add Permission" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/permission">Back</Link>
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
                                                        <input value={this.state.name} type="text" id="name" className={`form-control ${ error && error.data.errors.name && 'is-invalid' }`} onChange={this.handleChange} placeholder="Name" />
                                                        { 
                                                            error && error.data.errors.name && <div className="invalid-feedback">{ error.data.errors.name[0] }</div>
                                                        }
                                                    </div>

                                                    {/* <div className="form-group">
                                                        <label className="control-label">Parent </label>
                                                        <AsyncSelect value={{ label: this.state.parent_name, value: this.state.parent_id }} isClearable={true} className={error && error.data.errors.parent_id && 'is-invalid-select'} styles={customerStyles} loadOptions={parentOptions} name="parent" placeholder="Type to search ..." onChange={this.handleChangeSelect} />
                                                        { 
                                                            error && error.data.errors.name && <div className="invalid-feedback">{ error.data.errors.name[0] }</div>
                                                        }
                                                    </div> */}

                                                </div>


                                                <div className="col-md-6">

                                                    <div className="form-group">
                                                        <label className="control-label">Description</label>
                                                        <textarea value={this.state.description} rows="5" id="description" className={`form-control ${ error && error.data.errors.description && 'is-invalid' }`} onChange={this.handleChange} placeholder="Description" />
                                                        { 
                                                            error && error.data.errors.description && <div className="invalid-feedback">{ error.data.errors.description[0] }</div>
                                                        }
                                                    </div>

                                                </div>
                                                <div className="col-md-12 text-right">
                                                    <hr/>
                                                    {
                                                        this.props.fetching ? (
                                                            <button className="btn btn-secondary btn-disabled" disabled type="button"><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading...</button>
                                                        ) : (

                                                            <button className="btn btn-secondary" type="submit">Save Changes</button>
                                                        )
                                                    }
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

const filterParent = (parents) => {
    const options = parents.map(parent => {
        return { label: parent.name, value: parent._id }
    })
 
    return options;
 };
   
const parentOptions = (inputValue, callback) => {
     Axios.get(`${url}/permission/list-parent`, {
         params: {
             name: inputValue,
         }, 
         headers: {
             Authorization: `Bearer ${sessionStorage.getItem('token')}`
         }
     }).then(response => {
         callback(filterParent(response.data.data));
     });
}

const mapStateToProps = (state) => {
    return {
        ...state,
        saved: state.permission.saved,
        fetching: state.permission.fetching,
        fetched: state.permission.fetched,
        message: state.permission.message,
        error: state.permission.error,
        data: state.permission.permission.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePermission: (id, data) => dispatch(updatePermission(id, data)),
        getPermission: id => dispatch(getPermission(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditPermission));