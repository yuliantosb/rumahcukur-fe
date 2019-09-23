import React from 'react';
import { Container, Row, Col, Card, CardBody, FormCheckbox } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import { appName, url } from '../../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import { updateRole, getRole } from '../../store/actions/roleAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from '../Error500';
import Axios from 'axios';
import Error403 from '../Error403';

class EditRole extends React.Component {

    state = {
        'name': '',
        'description': '',
        'permissions': [],
        'checked': [],
        is_admin: 0,
        can_access_admin_panel: 0
    };
    
    handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
    }
    
    handleCheck = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: !this.state[e.target.id]
        })
    }

	handleSubmit = (e) => {
		e.preventDefault();
        this.props.updateRole(this.props.match.params.id, this.state);
    }

    fetchPermissions = async () => await Axios.get(`${url}/permission/list`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then(res => {
        
       const cdata = this.state.checked;
       const checked = res.data.data.map(check => {

        const data = cdata.findIndex(obj => obj.id === parseInt(check.id))
        
        return {
               id: check.id,
               checked: cdata[data] && cdata[data].checked ? true : false
           }
       })

        this.setState({
            ...this.state,
            permissions: res.data.data,
            checked
        })
    })

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/role');
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

    handleCheckBox = (e) => {
        const checked = this.state.checked;
        const data = checked.findIndex(obj => obj.id === parseInt(e.target.id))
        checked[data].checked = checked[data].checked ? false : true;
        this.setState({ 
            ...this.state,
            checked: checked
        })
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps.data !== this.props.data) {
            this.setState({
                ...this.state,
                name: nextProps.data.name ? nextProps.data.name : '',
                description: nextProps.data.description ? nextProps.data.description : '',
                checked: nextProps.data.permissions,
                is_admin: nextProps.data.is_admin ? nextProps.data.is_admin : 0,
                can_access_admin_panel: nextProps.data.can_access_admin_panel ?  nextProps.data.can_access_admin_panel : 0 
            })
        }
    }

    componentDidMount() {
        this.props.getRole(this.props.match.params.id);
        this.fetchPermissions()
    }
    
	render() {      
        console.log(this.state.checked);
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
					<title>Edit Role | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="Add Role" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/role">Back</Link>
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

                                                    <div className="form-group">
                                                        <FormCheckbox id="is_admin" checked={this.state.is_admin ? true : false} onChange={this.handleCheck}>Is Admin?</FormCheckbox>
                                                        <FormCheckbox id="can_access_admin_panel" checked={this.state.can_access_admin_panel ? true : false } onChange={this.handleCheck}>Can access admin panel?</FormCheckbox>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Description</label>
                                                        <textarea rows="5" value={this.state.description} id="description" className={`form-control ${ error && error.data.errors.description && 'is-invalid' }`} onChange={this.handleChange} placeholder="Description" />
                                                        { 
                                                            error && error.data.errors.description && <div className="invalid-feedback">{ error.data.errors.description[0] }</div>
                                                        }
                                                    </div>

                                                </div>


                                                <div className="col-md-6">

                                                    <div className="form-group">
                                                        <label className="control-label">Permissions</label>
                                                        <ul className="list-unstyled">
                                                            {
                                                                this.state.permissions.map((permission, index) => {
                                                                    return <li key={permission.id}><FormCheckbox id={permission.id} checked={this.state.checked[index].checked} onChange={this.handleCheckBox}>{permission.name}</FormCheckbox></li>
                                                                })
                                                            }
                                                        </ul>
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

const mapStateToProps = (state) => {
    return {
        ...state,
        saved: state.role.saved,
        fetching: state.role.fetching,
        fetched: state.role.fetched,
        message: state.role.message,
        error: state.role.error,
        data: state.role.role.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateRole: (id, data) => dispatch(updateRole(id, data)),
        getRole: id => dispatch(getRole(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditRole));
