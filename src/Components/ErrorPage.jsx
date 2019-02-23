import React from 'react';
import { Link } from '@reach/router';

const ErrorPage = ({ errorCode, message }) => {
  return (
    <div className="error-page">
      <h2>Something went wrong</h2>
      <h3>Error {errorCode && errorCode}</h3>
      <p>{message}</p>
      <Link to="/">
        <h3>Back to home</h3>
      </Link>
    </div>
  );
};

export default ErrorPage;
