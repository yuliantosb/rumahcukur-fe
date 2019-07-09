import React from 'react';
import { Container } from "shards-react";
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';
import { appName } from '../global';

class Error500 extends React.Component {
    render() {
        return (
            <Container fluid className="main-content-container px-4 pb-4">
                    <Helmet>
                        <title>Error 500 Internal server error | {appName}</title>
                    </Helmet>
                    <div className="error">
                    <div className="error__content">
                        <h2>500</h2>
                        <h3>Internal Server Error</h3>
                        <p>Ooops!! Something went wrong, the data cannot be displayed, there's an error</p>
                        <code>{this.props.message}</code>
                        <Link className="pill mt-2" to="/">&larr; Take me home</Link>
                    </div>
                    </div>
            </Container>
        )
    }
}

export default Error500;