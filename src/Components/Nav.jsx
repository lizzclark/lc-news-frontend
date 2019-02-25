import React, { Component } from 'react';
import { Link } from '@reach/router';
import './Nav.css';

class Nav extends Component {
  render() {
    const { user } = this.props;
    if (user.username) {
      return (
        <nav className="nav">
          <Link to="/">Top articles</Link>
          <Link to="/topics">Browse by topic</Link>
          <Link to="/users">Users</Link>
        </nav>
      );
    } else
      return (
        <nav className="nav">
          <span>
            Read articles, browse topics, comment and vote on the latest news
          </span>
        </nav>
      );
  }
}

export default Nav;
