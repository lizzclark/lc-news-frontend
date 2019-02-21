import React from 'react';
import { Link } from '@reach/router';
import './Sidebar.css';

const Sidebar = ({ logout, user: { username, name, avatar_url } }) => {
  return (
    <section className="sidebar">
      <p className="lg-screen-hide">
        Welcome, <Link to={`/users/${username}`}>{name}</Link>
      </p>
      <button onClick={logout} className="logout">
        Log out
      </button>
      <div className="avatar">
        <img src={`${avatar_url}`} alt="your avatar" />
      </div>
      <p className="lg-screen-hide">{username}</p>
    </section>
  );
};

export default Sidebar;
