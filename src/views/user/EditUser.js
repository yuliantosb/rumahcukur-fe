import React from 'react';
import { Container, Row, Col, Card, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import '../../assets/range-date-picker.css';
import { appName, url } from '../../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import AsyncSelect from 'react-select/async';
import { customerStyles } from '../../utils/selectStyle';
import Axios from 'axios';
import { getUser, updateUser } from '../../store/actions/userAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from '../Error500';
import Error403 from '../Error403';

class EditUser extends React.Component {

    state = {
		date_of_birth: undefined,
        photo_file: 'Choose file...',
        photo: '',
        name: '',
        username: '',
        place_of_birth: '',
        password: '',
        password_confirmation: '',
        email: '',
        phone_number: '',
        role_id: '',
        role_name: '',
        partner_id: '',
        partner_name: '',
        address: '',
        gender: 'male'
    };
    
    handleDateOfBirthChange = (value) => {
		this.setState({
			...this.state,
			date_of_birth: new Date(value)
		});
    };

    handleChangeSelect = (value, e) => {
        this.setState({
			...this.state,
            [`${e.name}_id`]: value ? value.value : null,
            [`${e.name}_name`]: value ? value.label : null,
		});
    }
    
    handleChangeUpload = (e) => {
		const value = e.target.value;
		const filename = value.split('\\');
		this.setState({
			...this.state,
			photo_file: filename[filename.length - 1],
		});

		const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.setState({
				...this.state,
				photo: e.target.result
			})
		}
    };
    
    handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
        this.props.updateUser(this.props.match.params.id, this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/user');
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
        if (nextProps.data !== this.props.data) {
            this.setState({
                ...this.state,
                date_of_birth: nextProps.data.date_of_birth ? new Date(nextProps.data.date_of_birth) : '',
                photo_file: nextProps.data.photo_file ? nextProps.data.photo_file : '',
                name: nextProps.data.name ? nextProps.data.name : '',
                username: nextProps.data.username ? nextProps.data.username : '',
                place_of_birth: nextProps.data.place_of_birth ? nextProps.data.place_of_birth : '',
                email: nextProps.data.email ? nextProps.data.email : '',
                phone_number: nextProps.data.phone_number ? nextProps.data.phone_number : '',
                role_id: nextProps.data.role_id ? nextProps.data.role_id : '',
                role_name: nextProps.data.role && nextProps.data.role.name ? nextProps.data.role.name : '',
                partner_id: nextProps.data.partner_id ? nextProps.data.partner_id : '',
                partner_name: nextProps.data.partner && nextProps.data.partner.name ? nextProps.data.partner.name : '',
                address: nextProps.data.address ? nextProps.data.address : '',
                gender: nextProps.data.gender ? nextProps.data.gender : 'male',
            })
        }
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.id)
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
					<title>Edit User | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="Edit User" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                        <Link className="btn btn-secondary" to="/user">Back</Link>
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
                                                        <input value={this.state.name} type="text" id="name" className={`form-control ${ error && error.data.errors.name && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: John Doe" maxLength={15} />
                                                        { 
                                                            error && error.data.errors.name && <div className="invalid-feedback">{ error.data.errors.name[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Username <span className="text-danger">*</span></label>
                                                        <input value={this.state.username} type="text" id="username" className={`form-control ${ error && error.data.errors.username && 'is-invalid' }`} onChange={this.handleChange} placeholder="Username" />
                                                        { 
                                                            error && error.data.errors.username && <div className="invalid-feedback">{ error.data.errors.username[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Gender <span className="text-danger">*</span></label>
                                                        <select id="gender" value={this.state.gender} onChange={this.handleChange} className="form-control custom-select">
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                        </select>
                                                        { 
                                                            error && error.data.errors.username && <div className="invalid-feedback">{ error.data.errors.username[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Place of birth</label>
                                                                <input value={this.state.place_of_birth} type="text" id="place_of_birth" className="form-control" onChange={this.handleChange} placeholder="eg: Jakarta" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Date of birth</label>
                                                                <DatePicker
                                                                    size="md"
                                                                    selected={this.state.date_of_birth}
                                                                    onChange={this.handleDateOfBirthChange}
                                                                    dropdownMode="select"
                                                                    placeholderText="12/31/1999"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Password <span className="text-danger">*</span></label>
                                                                <input type="password" id="password" className={`form-control ${ error && error.data.errors.password && 'is-invalid' }`} onChange={this.handleChange} placeholder="secret password" />
                                                                { 
                                                                    error && error.data.errors.password && <div className="invalid-feedback">{ error.data.errors.password[0] }</div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Retype Password <span className="text-danger">*</span></label>
                                                                <input type="password" id="password_confirmation" className="form-control" onChange={this.handleChange} placeholder="retype your password" />
                                                            </div>
                                                        </div>
                                                        <small className="col-md-12 mb-3 help-block help-block"><em>*) Blank this field if you don't want to change password</em></small>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Photo</label>
                                                        <div className="custom-file mb-3">
                                                            <input
                                                                id="photo"
                                                                type="file"
                                                                className="custom-file-input"
                                                                onChange={this.handleChangeUpload}
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="customFile2"
                                                                id="placeholderCustomFile2"
                                                            >
                                                                {this.state.photo_file}
                                                            </label>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Email <span className="text-danger">*</span></label>
                                                                <input value={this.state.email} type="text" id="email" className={`form-control ${ error && error.data.errors.email && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: johndoe@example.com" />
                                                                { 
                                                                    error && error.data.errors.email && <div className="invalid-feedback">{ error.data.errors.email[0] }</div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Phone number</label>
                                                                <input value={this.state.phone_number} type="text" id="phone_number" className={`form-control ${ error && error.data.errors.phone_number && 'is-invalid' }`}  onChange={this.handleChange} placeholder="eg: 08123456789" />
                                                                { 
                                                                    error && error.data.errors.phone_number && <div className="invalid-feedback">{ error.data.errors.phone_number[0] }</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Partner </label>
                                                        <AsyncSelect value={{ label: this.state.partner_name, value: this.state.partner_id }} isClearable={true} className={error && error.data.errors.partner_id && 'is-invalid-select'} styles={customerStyles} loadOptions={partnerOptions} placeholder="Type to search" onChange={this.handleChangeSelect} name="partner" />
                                                        { 
                                                            error && error.data.errors.partner_id && <small className="text-danger">{ error.data.errors.partner_id[0] }</small>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Role <span className="text-danger">*</span></label>
                                                        <AsyncSelect value={{ label: this.state.role_name, value: this.state.role_id }} isClearable={true} className={error && error.data.errors.role_id && 'is-invalid-select'} styles={customerStyles} loadOptions={promiseOptions} placeholder="Type to search" onChange={this.handleChangeSelect} name="role" />
                                                        { 
                                                            error && error.data.errors.role_id && <small className="text-danger">{ error.data.errors.role_id[0] }</small>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Address</label>
                                                        <textarea value={this.state.address} id="address" rows="5" className="form-control" onChange={this.handleChange} placeholder="Street name, Building Number, Residence, Region, State"></textarea>
                                                    </div>

                                                </div>
                                                <div className="col-md-12 text-right">
                                                    <hr/>
                                                    {
                                                        this.props.fetching ? (
                                                            <button className="btn btn-secondary btn-disabled" type="submit" disabled><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading...</button>
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

const filterRole = (roles) => {
   const options = roles.map(role => {
       return { label: role.name, value: role.id }
   })

   return options;
};
  
const promiseOptions = (inputValue, callback) => {
    Axios.get(`${url}/role/list`, {
        params: {
            name: inputValue,
        }, 
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then(response => {
        callback(filterRole(response.data.data));
    });
}


const filterPlant = (partners) => {
    const options = partners.map(partner => {
        return { label: partner.code, value: partner.id }
    })
 
    return options;
 };
   
 const partnerOptions = (inputValue, callback) => {
     Axios.get(`${url}/partner/list`, {
         params: {
             name: inputValue,
         }, 
         headers: {
             Authorization: `Bearer ${sessionStorage.getItem('token')}`
         }
     }).then(response => {
         callback(filterPlant(response.data.data));
     });
 }

const mapStateToProps = (state) => {
    return {
        ...state,
        saved: state.user.saved,
        fetching: state.user.fetching,
        fetched: state.user.fetched,
        message: state.user.message,
        error: state.user.error,
        data: state.user.user.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: id => dispatch(getUser(id)),
        updateUser: (id, data) => dispatch(updateUser(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditUser));