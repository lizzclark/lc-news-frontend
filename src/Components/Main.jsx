import React from 'react';
import Articles from './Articles';
import Topics from './Topics';
import Users from './Users';
import ArticlePage from './ArticlePage';
import UserPage from './UserPage';
import { Router } from '@reach/router';

class Main extends React.Component {
  componentDidMount() {
    const { user } = this.props;
    localStorage.setItem('user', JSON.stringify(user));
  }
  render() {
    const { user } = this.props;
    return (
      <Router className="main">
        <Articles path="/" user={user} />
        <Articles path="/topics/:topic" user={user} />
        <ArticlePage path="/articles/:article_id" user={user} />
        <Topics path="/topics" />
        <Users path="/users" isLinked={true} />
        <UserPage path="/users/:username" />
      </Router>
    );
  }
}

export default Main;
