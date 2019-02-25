import React from 'react';
import { Link } from '@reach/router';
import './Sidebar.css';

const Sidebar = ({ logout, user: { username, name, avatar_url } }) => {
  if (!username)
    return (
      <section className="sidebar">
        <p>
          Hi, visitor!{' '}
          <span role="img" aria-label="wave">
            👋
          </span>
        </p>
        <p className="lg-screen-hide">
          You'll have to log in to view articles.
        </p>
      </section>
    );
  return (
    <section className="sidebar">
      <p className="lg-screen-hide">
        Welcome, <Link to={`/users/${username}`}>{name}</Link>
      </p>
      <button onClick={logout} className="logout">
        Log out
      </button>
      <div className="avatar">
        <Link to={`/users/${username}`}>
          <img src={`${avatar_url}`} alt="your avatar" />
        </Link>
        <Link className="lg-screen-hide" to={`/users/${username}`}>
          {username}
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
