import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const [showForm, setShowForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // --- LOGIC: Calculation with 25% Discount ---
  const basePrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const discountThreshold = 20000;
  const discountRate = 0.25; // 25%

  const discount = basePrice > discountThreshold ? basePrice * discountRate : 0;
  const finalTotal = basePrice - discount;

  // --- LOGIC: Send to WhatsApp ---
  const sendToWhatsApp = (e) => {
    e.preventDefault();
    
    const sellerNumber = "923071114753"; // Aapka number
    
    let message = `*--- NEW ORDER ---*%0A%0A`;
    message += `*Customer Details:*%0A`;
    message += `Name: ${customerInfo.name}%0A`;
    message += `Phone: ${customerInfo.phone}%0A`;
    message += `Address: ${customerInfo.address}%0A%0A`;
    
    message += `*Ordered Items:*%0A`;
    cartItems.forEach(item => {
      message += `- ${item.name} (Qty: ${item.qty}) - Rs. ${item.price * item.qty}%0A`;
    });
    
    message += `%0A--------------------------%0A`;
    message += `Subtotal: Rs. ${basePrice.toLocaleString()}%0A`;
    if (discount > 0) {
      message += `Discount (25% Off): -Rs. ${discount.toLocaleString()}%0A`;
    }
    message += `*Grand Total: Rs. ${finalTotal.toLocaleString()}*%0A`;
    message += `--------------------------`;

    const whatsappUrl = `https://wa.me/${sellerNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="cart-page">
      <h1>Shopping Bag</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart-msg">
            <p>Your bag is empty. Explore our collection!</p>
        </div>
      ) : (
        <div className="cart-container">
          {/* LEFT SIDE: ITEMS LIST */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img src={`http://localhost:5000/static/products/${item.image}`} alt={item.name} />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p>Rs. {item.price.toLocaleString()}</p>
                </div>
                <div className="qty-controls">
                  <button onClick={() => updateQuantity(item, 'remove')}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQuantity(item, 'add')}>+</button>
                </div>
                <button className="delete-btn" onClick={() => removeFromCart(item)}>🗑️</button>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: SUMMARY & CHECKOUT */}
          <div className="cart-summary">
            {!showForm ? (
              <>
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>Rs. {basePrice.toLocaleString()}</span>
                </div>
                
                {discount > 0 ? (
                  <div className="summary-row discount-text">
                    <span>Discount (25%):</span>
                    <span>- Rs. {discount.toLocaleString()}</span>
                  </div>
                ) : (
                  <p className="promo-hint">Add Rs. {discountThreshold - basePrice} more to get 25% OFF!</p>
                )}

                <div className="summary-row">
                  <span>Shipping:</span>
                  <span className="free-text">FREE</span>
                </div>
                <hr />
                <div className="summary-row total">
                  <span>Total Payable:</span>
                  <span>Rs. {finalTotal.toLocaleString()}</span>
                </div>
                
                <button className="checkout-btn" onClick={() => setShowForm(true)}>
                  Proceed to Checkout
                </button>
              </>
            ) : (
              <div className="checkout-form">
                <h3>Delivery Details</h3>
                <form onSubmit={sendToWhatsApp}>
                  <input type="text" name="name" placeholder="Full Name" required onChange={handleInputChange} />
                  <input type="text" name="phone" placeholder="WhatsApp Number" required onChange={handleInputChange} />
                  <textarea name="address" placeholder="Complete Address" required onChange={handleInputChange}></textarea>
                  
                  <button type="submit" className="confirm-btn">Confirm Order (WhatsApp)</button>
                  <button type="button" className="back-link" onClick={() => setShowForm(false)}>← Back to Summary</button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;