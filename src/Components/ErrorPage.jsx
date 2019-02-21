import React from 'react';

const ErrorPage = ({ errorCode, message }) => {
  return (
    <div className="error-page">
      <h2>Something went wrong</h2>
      <h3>Error {errorCode && errorCode}</h3>
      <p>{message}</p>
    </div>
  );
};

export default ErrorPage;
