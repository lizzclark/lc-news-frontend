import React from 'react';
import { Link } from '@reach/router';
import './UserCard.css';

const UserCard = ({ isLinked, user: { username, name, avatar_url } }) => {
  return (
    <div className="usercard">
      <img src={avatar_url} alt={`avatar for ${username}`} />
      {isLinked ? (
        <Link to={`/users/${username}`}>
          <h2>{username}</h2>
        </Link>
      ) : (
        <h2>{username}</h2>
      )}
      <h2>{name}</h2>
    </div>
  );
};

export default UserCard;
