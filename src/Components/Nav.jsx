import React, { Component } from 'react';
import { Link } from '@reach/router';

class Nav extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="nav">
        <span>Welcome, {user.name.split(' ')[0]}!</span>
        <button onClick={this.handleClick}>Log out</button>
        <Link to="/">Home</Link>
        <Link to="/topics">Topics</Link>
        <Link to="/users">Users</Link>
      </nav>
    );
  }
  handleClick = () => {
    this.props.logout();
  };
}

export default Nav;
