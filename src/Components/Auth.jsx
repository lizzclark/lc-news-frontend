import React, { Component } from 'react';
import Users from './Users';
import './Auth.css';

class Auth extends Component {
  state = { username: 'happyamy2016' };

  render() {
    const { user, children } = this.props;
    const { username } = this.state;
    if (user.username) return children;
    return (
      <div className="auth">
        <form onSubmit={this.handleSubmit}>
          <label for="username">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            required
          />
          <button>Log in</button>
        </form>
        <Users isLinked={false} />
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
