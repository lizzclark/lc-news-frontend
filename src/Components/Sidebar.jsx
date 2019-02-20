import React from 'react';
import { Link } from '@reach/router';

const Sidebar = ({ logout, user: { username, name, avatar_url } }) => {
  return (
    <section className="sidebar">
      <p className="lg-screen-hide">
        Welcome, <Link to={`/users/${username}`}>{name.split(' ')[0]}</Link>
      </p>
      <img src={`${avatar_url}`} alt="your avatar" />
      <p className="lg-screen-hide">{username}</p>
      <p className="lg-screen-hide">{name}</p>
      <button onClick={logout} className="logout">
        Log out
      </button>
    </section>
  );
};

export default Sidebar;
