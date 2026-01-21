import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount, setSearchTerm, setCategory }) => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const handleAdminAuth = (e) => {
    if (e.key === 'Enter') {
      if (adminPassword === "admin123") {
        navigate("/admin");
        setShowInput(false);
        setAdminPassword("");
      } else {
        alert("Wrong ID! Access Denied.");
        setAdminPassword("");
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyStore</Link>
      </div>

      <div className="nav-search">
        <input 
          type="text" 
          placeholder="Search..." 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        
        <li>
          {showInput ? (
            <input 
              type="password" 
              className="admin-password-input"
              placeholder="Secret ID..."
              autoFocus
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyDown={handleAdminAuth}
              onBlur={() => setShowInput(false)}
            />
          ) : (
            <span onClick={() => setShowInput(true)} className="admin-link">
              Admin 🔒
            </span>
          )}
        </li>

        <li><Link to="/register">Register</Link></li>
        <li>
          <Link to="/cart">
            Cart <span className="cart-count">{cartCount || 0}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;