import React from 'react';
import { Container } from "shards-react";
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';
import { appName } from '../global';

class Error403 extends React.Component {
    render() {
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                    <Helmet>
                        <title>Error 403 Forbidden | {appName}</title>
                    </Helmet>
                    <div className="error">
                    <div className="error__content">
                        <h2>403</h2>
                        <h3>Forbidden</h3>
                        <p>{this.props.message}</p>
                        <Link className="pill mt-2" to="/">&larr; Take me home</Link>
                    </div>
                    </div>
            </Container>
        )
    }
}

export default Error403;