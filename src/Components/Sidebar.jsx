import React from 'react';
import { Link } from '@reach/router';

class Sidebar extends React.Component {
  render() {
    const { username, name, avatar_url } = this.props.user;
    return (
      <section className="sidebar">
        <span>
          Welcome, <Link to={`/users/${username}`}>{name.split(' ')[0]}</Link>
        </span>
        <img src={`${avatar_url}`} alt="your avatar" />
        <h1 className="lg-screen-hide">{username}</h1>
        <h2 className="lg-screen-hide">{name}</h2>
        <button onClick={this.handleClick}>Log out</button>
      </section>
    );
  }

  handleClick = () => {
    this.props.logout();
  };
}

export default Sidebar;
