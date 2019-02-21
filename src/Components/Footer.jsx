import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        by <a href="#">Lizz Clark</a> | <a href="">LC News on Github</a> |{' '}
        <a href="#">Backend news API on Github</a> |{' '}
        <a href="#">Backend news API on Heroku</a>
      </p>
    </footer>
  );
};

export default Footer;
