import React from 'react';
import { Link } from '@reach/router';

const Sidebar = ({ logout, user: { username, name, avatar_url } }) => {
  return (
    <section className="sidebar">
      <span>
        Welcome, <Link to={`/users/${username}`}>{name.split(' ')[0]}</Link>
      </span>
      <img src={`${avatar_url}`} alt="your avatar" />
      <h1 className="lg-screen-hide">{username}</h1>
      <h2 className="lg-screen-hide">{name}</h2>
      <button onClick={logout}>Log out</button>
    </section>
  );
};

export default Sidebar;
