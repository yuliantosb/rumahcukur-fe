import React from 'react';
import Logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';

class ForgotPassword extends React.Component {
    render() {
        return (
            <main className="main-content col mt-5">
                <Helmet>
                    <title>Forgot Password | {appName} </title>
                </Helmet>
                <div className="main-content-container container-fluid px-4 my-auto h-100">
                    <div className="row no-gutters h-100">
                    <div className="col-lg-3 col-md-5 auth-form mx-auto my-auto">
                        <div className="card">
                        <div className="card-body">
                            <img className="auth-form__logo_custom d-table mx-auto mb-3" src={ Logo } alt="logo" />
                            <h5 className="auth-form__title text-center mb-4">Reset Password</h5>
                            <form>
                            <div className="form-group mb-4">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted text-center">You will receive an email with a unique token.</small>
                            </div>
                            <button type="submit" className="btn btn-pill btn-accent d-table mx-auto">Reset Password</button>
                            </form>
                        </div>
                        </div>
                        <div className="auth-form__meta d-flex mt-4">
                        <Link className="mx-auto" to="login">Take me back to login.</Link>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default ForgotPassword;