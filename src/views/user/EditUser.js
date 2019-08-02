import React from 'react';
import { Container, Row, Col, Card, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import '../../assets/range-date-picker.css';
import { appName, customerStyles, url } from '../../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import { updateUser, getUser } from '../../store/actions/userAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from '../Error500';
import AsyncSelect from 'react-select/async';
import Axios from 'axios';

class EditUser extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        date_of_birth: '',
        place_of_birth: '',
        gender: 'Male',
        photo: 'Choose file...',
        photo_file: '',
        role_id: '',
        role_name: ''
    }
    
    handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

    handleChangeUpload = (e) => {
        const value = e.target.value;
        const filedata = e.target.dataset.file;
		const filename = value.split('\\');
		this.setState({
			...this.state,
			[e.target.id]: filename[filename.length - 1],
		});

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (read) => {
            this.setState({
                ...this.state,
                [filedata]: read.target.result
            })
        }
        
    };

    handleDobChange = (value) => {
        this.setState({
            ...this.state,
            date_of_birth: new Date(value)
        });
    }

    handleChangeSelect = (value, e) => {
        this.setState({
			...this.state,
            [`${e.name}_id`]: value ? value.value : null,
            [`${e.name}_name`]: value ? value.label : null,
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
        if (nextProps !== this.props) {
            if (nextProps.data) {
                this.setState({
                    ...this.state,
                    name: nextProps.data.name ? nextProps.data.name : '',
                    email: nextProps.data.email ? nextProps.data.email : '',
                    phone_number: nextProps.data.phone_number ? nextProps.data.phone_number : '',
                    date_of_birth: nextProps.data.date_of_birth ? nextProps.data.date_of_birth : '',
                    place_of_birth: nextProps.data.place_of_birth ? nextProps.data.place_of_birth : '',
                    gender: nextProps.data.gender ? nextProps.data.gender : '',
                    photo: nextProps.data.photo ? nextProps.data.photo : 'Choose file...',
                    role_id: nextProps.data.role_id ? nextProps.data.role_id : '',
                    role_name: nextProps.data.role && nextProps.data.role.name ? nextProps.data.role.name : '',
                });
            }
        }
    }

    componentDidMount = () => {
        this.props.getUser(this.props.match.params.id);
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
                                                        <input value={this.state.name} type="text" id="name" className={`form-control ${ error && error.data.errors.name && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: John Doe" />
                                                        { 
                                                            error && error.data.errors.name && <div class="invalid-feedback">{ error.data.errors.name[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Email <span className="text-danger">*</span></label>
                                                        <input value={this.state.email} type="text" id="email" className={`form-control ${ error && error.data.errors.email && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: johndoe@example.com" />
                                                        { 
                                                            error && error.data.errors.email && <div class="invalid-feedback">{ error.data.errors.email[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Phone Number <span className="text-danger">*</span></label>
                                                        <input value={this.state.phone_number} type="text" id="phone_number" className={`form-control ${ error && error.data.errors.phone_number && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: 081234567890" />
                                                        { 
                                                            error && error.data.errors.phone_number && <div class="invalid-feedback">{ error.data.errors.phone_number[0] }</div>
                                                        }
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <label className="control-label">Password </label>
                                                        <input type="password" id="password" className={`form-control ${ error && error.data.errors.password && 'is-invalid' }`} onChange={this.handleChange} placeholder="******" />
                                                        { 
                                                            error && error.data.errors.password && <div class="invalid-feedback">{ error.data.errors.password[0] }</div>
                                                        }
                                                        <div className="help-block">
                                                            <small className="font-italic text-muted">*) Blank password if you don't wanna change password</small>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Retype Password</label>
                                                        <input type="password" id="password_confirmation" className={`form-control ${ error && error.data.errors.password_confirmation && 'is-invalid' }`} onChange={this.handleChange} placeholder="******" />
                                                        { 
                                                            error && error.data.errors.password_confirmation && <div class="invalid-feedback">{ error.data.errors.password_confirmation[0] }</div>
                                                        }
                                                    </div>
                                                    
                                                   
                                                </div>

                                                <div className="col-md-6">
                                                <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Place of birth</label>
                                                                <input value={this.state.place_of_birth} type="text" className="form-control" id="place_of_birth" placeholder="eg: Jakarta" onChange={this.handleChange} />
                                                                { 
                                                                    error && error.data.errors.place_of_birth && <div class="invalid-feedback">{ error.data.errors.place_of_birth[0] }</div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Date of birth</label>
                                                            <DatePicker 
                                                                className={`form-control ${ error && error.data.errors.date_of_birth && 'is-invalid' }`} 
                                                                onChange={ this.handleDobChange } 
                                                                placeholderText="mm/dd/yyyy"
                                                                selected={ this.state.date_of_birth }
                                                                id="date_of_birth"
                                                            />
                                                            { 
                                                                error && error.data.errors.date_of_birth && <div class="invalid-feedback">{ error.data.errors.date_of_birth[0] }</div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Photo</label>
                                                        <div className="custom-file">
                                                            <input
                                                                id="photo"
                                                                data-file="photo_file"
                                                                type="file"
                                                                className={`custom-file-input ${ error && error.data.errors.photo_file && 'is-invalid' }`}
                                                                onChange={this.handleChangeUpload}
                                                                accept="image/*"
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="customFile2"
                                                                id="placeholderCustomFile2"
                                                            >
                                                                {this.state.photo}
                                                            </label>
                                                        </div>
                                                        { 
                                                            error && error.data.errors.photo_file && <small class="help-block font-weight-bold text-danger">{ error.data.errors.photo_file[0] }</small>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Gender</label>
                                                        <select value={this.state.gender} id="gender" className="form-control custom-select" onChange={this.handleChange}>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <label className="control-label">Role <span className="text-danger">*</span></label>
                                                        <AsyncSelect value={{ label: this.state.role_name, value: this.state.role }} isClearable={true} className={error && error.data.errors.role_id && 'is-invalid-select'} styles={customerStyles} loadOptions={roleOptions} name="role" placeholder="Type to search" onChange={this.handleChangeSelect} />
                                                        { 
                                                            error && error.data.errors.role_id && <small class="font-weight-bold text-danger">{ error.data.errors.role_id[0] }</small>
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

const filterRole = (roles) => {
    const options = roles.map(role => {
        return { label: role.name, value: role.id }
    })
 
    return options;
 };
   
 const roleOptions = (inputValue, callback) => {
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
        updateUser: (id, data) => dispatch(updateUser(id, data)),
        getUser: id => dispatch(getUser(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditUser));