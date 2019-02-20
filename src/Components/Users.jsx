import React, { Component } from 'react';
import * as api from '../api';
import UserCard from './UserCard';
import './Users.css';

class Users extends Component {
  state = { users: [] };
  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    const { users } = this.state;
    const { isLinked } = this.props;
    return (
      <div className="users">
        {users.map(userObj => (
          <UserCard key={userObj.username} user={userObj} isLinked={isLinked} />
        ))}
      </div>
    );
  }
  fetchUsers = () => {
    api.getUsers().then(users => this.setState({ users }));
  };
}

export default Users;
