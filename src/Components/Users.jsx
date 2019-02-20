import React, { Component } from 'react';
import * as api from '../api';
import UserCard from './UserCard';
import './Users.css';

class Users extends Component {
  state = { users: [], isLoading: true };
  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    const { users, isLoading } = this.state;
    const { isLinked } = this.props;
    if (isLoading)
      return (
        <div className="users">
          <h2>Loading users...</h2>
        </div>
      );
    return (
      <div className="users">
        {users.map(userObj => (
          <UserCard key={userObj.username} user={userObj} isLinked={isLinked} />
        ))}
      </div>
    );
  }
  fetchUsers = () => {
    api.getUsers().then(users => this.setState({ users, isLoading: false }));
  };
}

export default Users;
