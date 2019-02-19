import React, { Component } from 'react';
import Users from './Users';

class Auth extends Component {
  state = { username: '', users: [] };

  render() {
    const { user } = this.props;
    const { users } = this.state;
    if (user.username) return this.props.children;
    return (
      <div className="auth">
        <form onSubmit={this.handleSubmit}>
          <label for="username">Username:</label>
          <input type="text" name="username" onChange={this.handleChange} />
          <button onClick={this.handleSubmit}>Log in</button>
        </form>
        {users ? <Users isLinked={false} /> : 'Loading users...'}
      </div>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username } = this.state;
    const { login } = this.props;
    login(username);
  };

  handleChange = ({ target }) => {
    this.setState({ username: target.value });
  };
}

export default Auth;
