import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  const imageSource = `/assets/${product.image}`;

  return (
    <div className="product-card">
      <div className="product-img-container">
        <img 
          src={imageSource} 
          alt={product.name} 
          onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }} 
        />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">Rs. {product.price}</p>
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;