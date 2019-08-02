import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import '../../assets/range-date-picker.css';
import { appName } from '../../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import { updateBarber, getBarber } from '../../store/actions/barberAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from '../Error500';

class AddBarber extends React.Component {

    state = {
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        province: '',
        regency: '',
        district: '',
        village: '',
        phone: '',
        email: '',
        status: 'actived',
		photo: 'Choose file...',
        id_card: 'Choose file...'
    };
    
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

	handleSubmit = (e) => {
		e.preventDefault();
        this.props.updateBarber(this.props.match.params.id, this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/barber');
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
                    phone: nextProps.data.phone ? nextProps.data.phone : '',
                    latitude: nextProps.data.latitude ? nextProps.data.latitude : '',
                    longitude: nextProps.data.longitude ? nextProps.data.longitude : '',
                    photo: nextProps.data.photo ? nextProps.data.photo : '',
                    id_card: nextProps.data.id_card ? nextProps.data.id_card : '',
                    status: nextProps.data.status ? nextProps.data.status : '',
                    province: nextProps.data.province ? nextProps.data.province : '',
                    regency: nextProps.data.regency ? nextProps.data.regency : '',
                    district: nextProps.data.district ? nextProps.data.district : '',
                    village: nextProps.data.village ? nextProps.data.village : '',
                    address: nextProps.data.address ? nextProps.data.address : '',
                })
            }
        }
    }

    componentDidMount = () => {
        this.props.getBarber(this.props.match.params.id);
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
					<title>Add Barber | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                    <div className="col-md-8">
					    <PageTitle sm="4" title="Add Barber" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/barber">Back</Link>
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
                                                        <input type="text" id="name" value={ this.state.name } className={`form-control ${ error && error.data.errors.name && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: John Doe" />
                                                        { 
                                                            error && error.data.errors.name && <div class="invalid-feedback">{ error.data.errors.name[0] }</div>
                                                        }
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Email <span className="text-danger">*</span></label>
                                                                <input type="text" id="email" value={ this.state.email } className={`form-control ${ error && error.data.errors.email && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: john@example.com" />
                                                                { 
                                                                    error && error.data.errors.email && <div class="invalid-feedback">{ error.data.errors.email[0] }</div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Phone <span className="text-danger">*</span></label>
                                                                <input type="text" id="phone" value={ this.state.phone } className={`form-control ${ error && error.data.errors.phone && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: 08123456789" />
                                                                { 
                                                                    error && error.data.errors.phone && <div class="invalid-feedback">{ error.data.errors.phone[0] }</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Latitude <span className="text-danger">*</span></label>
                                                                <input type="text" id="latitude" value={ this.state.latitude } className={`form-control ${ error && error.data.errors.latitude && 'is-invalid' }`} onChange={this.handleChange} placeholder="Latitude" />
                                                                { 
                                                                    error && error.data.errors.latitude && <div class="invalid-feedback">{ error.data.errors.latitude[0] }</div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Longitude <span className="text-danger">*</span></label>
                                                                <input type="text" id="longitude" value={ this.state.longitude } className={`form-control ${ error && error.data.errors.longitude && 'is-invalid' }`} onChange={this.handleChange} placeholder="Longitude" />
                                                                { 
                                                                    error && error.data.errors.longitude && <div class="invalid-feedback">{ error.data.errors.longitude[0] }</div>
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
                                                        <label className="control-label">Identity Card</label>
                                                        <div className="custom-file">
                                                            <input
                                                                id="id_card"
                                                                data-file="id_card_file"
                                                                type="file"
                                                                onChange={this.handleChangeUpload}
                                                                accept="image/*"
                                                                className={`custom-file-input ${ error && error.data.errors.id_card_file && 'is-invalid' }`}
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="customFile2"
                                                                id="placeholderCustomFile2"
                                                            >
                                                                {this.state.id_card}
                                                            </label>
                                                        </div>
                                                        { 
                                                            error && error.data.errors.id_card_file && <small class="text-danger font-weight-bold help-block">{ error.data.errors.id_card_file[0] }</small>
                                                        }
                                                    </div>



                                                    <div className="form-group">
                                                        <label className="control-label">Status <span className="text-danger">*</span></label>
                                                        <select id="status" value={ this.state.status } className={`form-control custom-select ${ error && error.data.errors.status && 'is-invalid' }`} onChange={this.handleChange}>
                                                                <option value="actived">Actived</option>
                                                                <option value="not actived">Not Actived</option>
                                                                <option value="suspended">Suspended</option>
                                                                <option value="deleted">Deleted</option>                                                                
                                                        </select>
                                                        { 
                                                            error && error.data.errors.status && <div class="invalid-feedback">{ error.data.errors.status[0] }</div>
                                                        }
                                                    </div>

                                                </div>


                                                <div className="col-md-6">

                                                    <div className="form-group">
                                                        <label className="control-label">Province <span className="text-danger">*</span></label>
                                                        <input type="text" id="province" value={ this.state.province } className={`form-control ${ error && error.data.errors.province && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: DKI Jakarta" />
                                                        { 
                                                            error && error.data.errors.province && <div class="invalid-feedback">{ error.data.errors.province[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Regency <span className="text-danger">*</span></label>
                                                        <input type="text" id="regency" value={ this.state.regency } className={`form-control ${ error && error.data.errors.regency && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: Jakarta Selatan" />
                                                        { 
                                                            error && error.data.errors.regency && <div class="invalid-feedback">{ error.data.errors.regency[0] }</div>
                                                        }
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <label className="control-label">District <span className="text-danger">*</span></label>
                                                        <input type="text" id="district" value={ this.state.district } className={`form-control ${ error && error.data.errors.district && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: Palmerah" />
                                                        { 
                                                            error && error.data.errors.district && <div class="invalid-feedback">{ error.data.errors.district[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Village <span className="text-danger">*</span></label>
                                                        <input type="text" id="village" value={ this.state.village } className={`form-control ${ error && error.data.errors.village && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: Slipi" />
                                                        { 
                                                            error && error.data.errors.village && <div class="invalid-feedback">{ error.data.errors.village[0] }</div>
                                                        }
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <label className="control-label">Address</label>
                                                        <textarea id="address" value={ this.state.address } rows="5" className="form-control" onChange={this.handleChange} placeholder="Street name, Building Number, Residence, Region, State"></textarea>
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


const mapStateToProps = (state) => {
    return {
        ...state,
        saved: state.barber.saved,
        fetching: state.barber.fetching,
        fetched: state.barber.fetched,
        message: state.barber.message,
        error: state.barber.error,
        data: state.barber.barber.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBarber: (id, data) => dispatch(updateBarber(id, data)),
        getBarber: id => dispatch(getBarber(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AddBarber));
