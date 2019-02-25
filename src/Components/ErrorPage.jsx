import React from 'react';
import { Link } from '@reach/router';

const ErrorPage = ({ statusCode, message, isLinkedHome }) => {
  return (
    <div className="error-page">
      <h2>Something went wrong</h2>
      <h3>Error {statusCode && statusCode}</h3>
      <p>{message}</p>
      {isLinkedHome && (
        <Link to="/">
          <h3>Back to home</h3>
        </Link>
      )}
    </div>
  );
};

export default ErrorPage;
