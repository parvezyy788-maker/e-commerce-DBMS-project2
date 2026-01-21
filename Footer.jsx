import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-pro">
      <div className="footer-top">
        <div className="footer-col">
          <h3>MyStore<span>.</span></h3>
          <p>Your one-stop shop for the latest fashion trends. Quality and style delivered to your doorstep.</p>
          <div className="social-icons">
            <span>fb</span> <span>ig</span> <span>tw</span> <span>yt</span>
          </div> 
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">New Arrivals</Link></li>
            <li><Link to="/register">Create Account</Link></li>
            <li><Link to="/cart">View Cart</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Service</h4>
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Shipping Info</li>
            <li>Return Policy</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Info</h4>
          <p>📞 +92 300 1234567</p>
          <p>✉️ support@mystore.com</p>
          <p>📍 Main Commercial, Rawalpindi</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 <strong>MyStore</strong>. All Rights Reserved | Built with ❤️ by You</p>
      </div>
    </footer>
  );
};

export default Footer;