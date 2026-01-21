import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import Footer from './component/Footer/Footer';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login'; 
import Cart from './pages/Cart/Cart';
import Hero from './component/Hero/Hero';
import Contact from './component/Contact/Contact';
import Discount from './component/Discount/Discount';
import Admin from './pages/Admin/Admin';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [category, setCategory] = useState("All"); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userLoggedIn");
    if (user === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // --- Added Logout Logic ---
  const handleLogout = () => {
    localStorage.removeItem("userLoggedIn"); // Clear the session
    setIsLoggedIn(false); // Update state to lock the app
  };

  const addToCart = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((x) => x.id !== product.id));
  };

  const updateQuantity = (product, action) => {
    setCartItems(
      cartItems.map((x) =>
        x.id === product.id
          ? {
              ...x,
              qty: action === 'add' ? x.qty + 1 : (x.qty > 1 ? x.qty - 1 : 1),
            }
          : x
      )
    );
  };

  return (
    <Router>
      <div className="app-wrapper">
        {/* Pass handleLogout to Navbar so you can click a button to logout */}
        {isLoggedIn && (
          <Navbar 
            cartCount={cartItems.length} 
            setSearchTerm={setSearchTerm} 
            setCategory={setCategory} 
            handleLogout={handleLogout} 
          />
        )}
        
        <div className="main-content">
          <Routes>
            <Route 
              path="/login" 
              element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />} 
            />
            
            {/* Pass setIsLoggedIn to Register so it can unlock the app after signup */}
            <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />

            <Route 
              path="/" 
              element={
                isLoggedIn ? (
                  <>
                    <Hero />
                    <Discount /> 
                    <Home 
                      addToCart={addToCart} 
                      searchTerm={searchTerm} 
                      category={category} 
                    />
                    <Contact />
                  </>
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />

            <Route 
              path="/admin" 
              element={isLoggedIn ? <Admin /> : <Navigate to="/login" />} 
            />

            <Route 
              path="/cart" 
              element={
                isLoggedIn ? (
                  <Cart 
                    cartItems={cartItems} 
                    removeFromCart={removeFromCart} 
                    updateQuantity={updateQuantity} 
                  />
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
          </Routes>
        </div>
        
        {isLoggedIn && <Footer />}
      </div>
    </Router>
  );
}

export default App;