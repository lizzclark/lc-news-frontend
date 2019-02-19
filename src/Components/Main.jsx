import React from 'react';
import Articles from './Articles';
import Topics from './Topics';
import Users from './Users';
import ArticlePage from './ArticlePage';
import UserPage from './UserPage';
import { Router } from '@reach/router';

const Main = ({ user }) => {
  return (
    <Router className="main">
      <Articles path="/" user={user} />
      <Articles path="/topics/:topic" user={user} />
      <ArticlePage path="/articles/:article_id" />
      <Topics path="/topics" />
      <Users path="/users" isLinked={true} />
      <UserPage path="/users/:username" />
    </Router>
  );
};

export default Main;
