import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink, Dropdown, DropdownToggle, Collapse, DropdownMenu, DropdownItem } from "shards-react";

class SidebarNavItem extends React.Component {
  state = {
    visible: false
  }

  handleToggle = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const {item} = this.props;
    return (
      <NavItem>
      {
        item.children ? (

          <NavItem tag={Dropdown} caret toggle={this.handleToggle}>
            <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
              {item.htmlBefore && (
                  <div
                    className="d-inline-block item-icon-wrapper"
                    dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
                  />
                )}
                {item.title && <span>{item.title}</span>}
                {item.htmlAfter && (
                  <div
                    className="d-inline-block item-icon-wrapper"
                    dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
                  />
                )}
            </DropdownToggle>
            <Collapse tag={DropdownMenu} right small open={this.state.visible}>
              {
                item.children.map((drop, index) => {
                  return (
                    <DropdownItem tag={RouteNavLink} to={drop.to} key={index}>
                        {drop.title && <span>{drop.title}</span>}
                    </DropdownItem>
                  )
                })
              }
            
            </Collapse>
          </NavItem>

        ) : (
          <NavLink tag={RouteNavLink} to={item.to}>
              {item.htmlBefore && (
                <div
                  className="d-inline-block item-icon-wrapper"
                  dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
                />
              )}
              {item.title && <span>{item.title}</span>}
              {item.htmlAfter && (
                <div
                  className="d-inline-block item-icon-wrapper"
                  dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
                />
              )}
          </NavLink>
          
        )
      }
      </NavItem>
    )
  }
}

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;