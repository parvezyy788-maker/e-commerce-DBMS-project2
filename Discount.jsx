import React, { useState, useEffect } from 'react';
import './Discount.css';

const Discount = () => {
  const [text, setText] = useState("");
  const fullText = "Buy upto Rs. 20,000 and get amazing discounts!";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        i = 0; // Loop chalane ke liye
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="discount-wrapper">
      <div className="discount-content">
        <h2 className="typing-text">{text}<span className="cursor">|</span></h2>
      </div>
      
      <div className="rotating-box">
        <div className="discount-badge">
          <span>25%</span>
          <p>OFF</p>
        </div>
      </div>
    </div>
  );
};

export default Discount;