import React from 'react';
import Articles from './Articles';
import Topics from './Topics';
import { Router } from '@reach/router';

const Main = () => {
  return (
    <Router>
      <Articles path="/articles" />
      <Topics path="/topics" />
    </Router>
  );
};

export default Main;
