import React from 'react';
import { Link } from '@reach/router';
import './UserCard.css';

const UserCard = ({ isLinked, user: { username, name, avatar_url } }) => {
  return (
    <div className="usercard">
      {isLinked ? (
        <Link to={`/users/${username}`}>
          <img src={avatar_url} alt={`avatar for ${username}`} />
          <h2>{username}</h2>
        </Link>
      ) : (
        <>
          <img src={avatar_url} alt={`avatar for ${username}`} />
          <h2>{username}</h2>
        </>
      )}

      <h2>{name}</h2>
    </div>
  );
};

export default UserCard;
