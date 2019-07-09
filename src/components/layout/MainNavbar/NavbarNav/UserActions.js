import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      logout: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  handleClickLogOut = () => {
    this.setState({
      ...this.state,
      logout: true
    });
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    if (this.state.logout) {
      sessionStorage.removeItem('token');
      return <Redirect to="/login" />
    }
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={ sessionStorage.getItem('photo') }
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">{ sessionStorage.getItem('name') }</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem to={`employee/${sessionStorage.getItem('id')}`} tag={Link} to="user-profile">
            <i className="material-icons">&#xE7FD;</i> My Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.handleClickLogOut} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

export default UserActions;