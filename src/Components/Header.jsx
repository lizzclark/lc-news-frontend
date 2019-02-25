import React from 'react';
import { Link } from '@reach/router';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1>LC News</h1>
      </Link>
    </header>
  );
};

export default Header;
