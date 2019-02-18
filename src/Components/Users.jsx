import React, { Component } from 'react';
import * as api from '../api';

class Users extends Component {
  state = { users: [] };
  componentDidMount() {
    this.getUsers();
  }
  render() {
    const { users } = this.state;
    return (
      <div>
        {users.map(user => (
          <div>{user.name}</div>
        ))}
      </div>
    );
  }
  getUsers = () => {
    api.fetchUsers().then(users => this.setState({ users }));
  };
}

export default Users;
