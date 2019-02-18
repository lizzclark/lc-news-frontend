import React from 'react';
import Articles from './Articles';
import Topics from './Topics';
import Users from './Users';
import ArticlePage from './ArticlePage';
import { Router } from '@reach/router';

const Main = () => {
  return (
    <Router className="main">
      <Articles path="/" />
      <Articles path="/topics/:topic" />
      <ArticlePage path="/articles/:article_id" />
      <Topics path="/topics" />
      <Users path="/users" />
    </Router>
  );
};

export default Main;
