import React, { Component } from 'react';
import * as api from '../api';
import UserCard from './UserCard';

class Users extends Component {
  state = { users: [] };
  componentDidMount() {
    this.getUsers();
  }
  render() {
    const { users } = this.state;
    return (
      <div>
        <h2>Users</h2>
        {users.map(userObj => (
          <UserCard key={userObj.username} user={userObj} />
        ))}
      </div>
    );
  }
  getUsers = () => {
    api.fetchUsers().then(users => this.setState({ users }));
  };
}

export default Users;
