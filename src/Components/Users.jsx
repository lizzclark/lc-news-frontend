import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';

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
          <Link to={user.username}>{user.name}</Link>
        ))}
      </div>
    );
  }
  getUsers = () => {
    api.fetchUsers().then(users => this.setState({ users }));
  };
}

export default Users;
