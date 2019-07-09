import React from "react";
import PropTypes from "prop-types";
import { NavLink as RouteNavLink } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";

const SidebarNavItem = ({ item, handleClick, toggle }) => (
  <div>
    {
      item.children ? (
        <NavItem>
        <NavLink onClick={handleClick} className="dropdown-toggle" id={item.title}>
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
      <div tabIndex="-1" role="menu" className={`collapse dropdown-menu dropdown-menu-small ${ toggle[item.title] ? 'show' : '' }`}>
        {
          item.children.map((child, key) => {
            return (<NavLink key={key} tag={RouteNavLink} tabIndex="0" className="dropdown-item" to={child.to}>{child.title}</NavLink>)
          })
        }
      </div>    
      </NavItem>

      ) : (
        <NavItem>
        <NavLink tag={ RouteNavLink } to={item.to}>
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
      </NavItem>
      )
    }
    </div>
);

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
