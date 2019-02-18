import React from 'react';
import Articles from './Articles';
import Topics from './Topics';
import Users from './Users';
import { Router } from '@reach/router';

const Main = () => {
  return (
    <Router className="main">
      <Articles path="/" />
      <Topics path="/topics" />
      <Users path="/users" />
    </Router>
  );
};

export default Main;
