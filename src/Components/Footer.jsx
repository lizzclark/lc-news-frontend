import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        by <a href="https://github.com/lizzclark">Lizz Clark</a> |{' '}
        <a href="https://github.com/lizzclark/lc-news-frontend">
          LC News on Github
        </a>{' '}
        |{' '}
        <a href="https://github.com/lizzclark/lc-news">
          Backend news API on Github
        </a>{' '}
        |{' '}
        <a href="https://lc-news.herokuapp.com/api">
          Backend news API on Heroku
        </a>
      </p>
    </footer>
  );
};

export default Footer;
