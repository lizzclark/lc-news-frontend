import React from 'react';
import { Link } from '@reach/router';

const UserCard = ({ user: { username, name, avatar_url } }) => {
  return (
    <div className="usercard">
      <img src={avatar_url} alt={`avatar for ${username}`} />
      <Link to={`/users/${username}`}>
        <h2>{username}</h2>
      </Link>
      <h2>{name}</h2>
    </div>
  );
};

export default UserCard;
