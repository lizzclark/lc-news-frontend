import React from 'react';
import Articles from './Articles';
import Topics from './Topics';
import Users from './Users';
import TopicArticles from './TopicArticles';
import ArticlePage from './ArticlePage';
import { Router } from '@reach/router';

const Main = () => {
  return (
    <Router className="main">
      <Articles path="/" />
      <Topics path="/topics" />
      <TopicArticles path="/topics/:topic" />
      <Users path="/users" />
      <ArticlePage path="/articles/:article_id" />
    </Router>
  );
};

export default Main;
