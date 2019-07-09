import React from "react";
import { Nav } from "shards-react";

import SidebarNavItem from "./SidebarNavItem";
import { Store } from "../../../flux";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      navItems: Store.getSidebarItems(),
      toggle: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  handleClick = (e) => {
    const name = e.target.id;
    if (this.state.toggle[name]) {
      this.setState({
        ...this.state,
        toggle: {
          [e.target.id]: false
        }
      })
    } else {
      this.setState({
        ...this.state,
        toggle: {
          [e.target.id]: true
        }
      })
    }
  }

  render() {
    const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem key={idx} item={item} toggle={this.state.toggle} handleClick={this.handleClick} />
          ))}
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
