import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        by Lizz Clark | <a href="https://github.com/lizzclark">portfolio</a> |{' '}
        <a href="https://github.com/lizzclark/lc-news-frontend">
          view this site on Github
        </a>
      </p>
    </footer>
  );
};

export default Footer;
