import React from "react";
import { Container } from "shards-react";
import {Link} from 'react-router-dom';
import { appName } from "../global";
import { Helmet } from "react-helmet";

const Error404 = () => (
  <Container fluid className="main-content-container px-4 pb-4">
    <Helmet>
      <title>{appName} | Error 404 Not Found</title>
    </Helmet>
    <div className="error">
      <div className="error__content">
        <h2>404</h2>
        <h3>Not Found</h3>
        <p>Your page seems not appear, maybe you're typo</p>
        <Link className="pill" to="/">&larr; Take me home</Link>
      </div>
    </div>
  </Container>
);

export default Error404;
