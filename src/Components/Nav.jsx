import React, { Component } from 'react';
import { Link } from '@reach/router';

class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/topics">Topics</Link>
        <Link to="/users">Users</Link>
      </nav>
    );
  }
}

export default Nav;
