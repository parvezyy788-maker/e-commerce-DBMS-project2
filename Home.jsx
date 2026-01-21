import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../component/ProductCard/ProductCard';
import './Home.css';

const Home = ({ addToCart, searchTerm, category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Backend Error:", err));
  }, []);

  // Filter logic for general search and specific category selection
  const getFilteredProducts = (catName) => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm?.toLowerCase() || "");
      const matchesCategory = catName === "All" ? true : p.category === catName;
      
      // Agar user ne specifically Navbar se koi category select ki hai (e.g., "Shoes")
      // toh hum sirf wahi return karenge, warna "All" ke liye sections dikhayenge.
      const currentSelection = (category === "All" || category === catName);

      return matchesSearch && matchesCategory && currentSelection;
    });
  };

  const dressProducts = getFilteredProducts("Dresses");
  const shoeProducts = getFilteredProducts("Shoes");

  return (
    <div className="home-container">
      {searchTerm && (
        <h2 className="search-result-text">Showing results for: "{searchTerm}"</h2>
      )}

      {/* --- Dresses Section --- */}
      {(category === "All" || category === "Dresses") && dressProducts.length > 0 && (
        <div className="category-block">
          <h2 className="section-title">👗 Premium Dresses Collection</h2>
          <div className="home-grid">
            {dressProducts.map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </div>
        </div>
      )}

      {/* --- Shoes Section --- */}
      {(category === "All" || category === "Shoes") && shoeProducts.length > 0 && (
        <div className="category-block" style={{ marginTop: '50px' }}>
          <h2 className="section-title">👟 Stylish Shoes Collection</h2>
          <div className="home-grid">
            {shoeProducts.map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </div>
        </div>
      )}

      {/* No results message */}
      {dressProducts.length === 0 && shoeProducts.length === 0 && (
        <div className="no-products">
          <p>Bhai, is naam ka koi product nahi mila. Kuch aur search karke dekhein!</p>
        </div>
      )}
    </div>
  );
};

export default Home;