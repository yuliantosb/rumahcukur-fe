import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";

const BlankLayout = ({ children, noNavbar, noFooter, noSidebar }) => (
  <Container fluid>
    <Row>
      {!noSidebar && 
        <MainSidebar />
      }
      <Col
        className="main-content p-0"        
        sm="12"
        tag="main"
      >
        {!noNavbar && <MainNavbar />}
        {children}
        {!noFooter && <MainFooter />}
      </Col>
    </Row>
  </Container>
);

BlankLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,

  noSidebar: PropTypes.bool,

};

BlankLayout.defaultProps = {
  noNavbar: true,
  noFooter: true,
  noSidebar: true,
};

export default BlankLayout;
