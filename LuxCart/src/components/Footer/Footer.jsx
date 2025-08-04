// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CartGenius</h3>
          <p>Your one-stop shopping destination</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/categories" className="footer-link">Categories</Link>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@cartgenius.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CartGenius. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;