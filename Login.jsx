import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Replace with your backend URL
            const res = await axios.post('http://127.0.0.1:5000/api/login', { email, password });
            
            if (res.data.success) {
                localStorage.setItem("userLoggedIn", "true");
                setIsLoggedIn(true);
                navigate("/"); // Go to Home
            } else {
                alert("Invalid Credentials");
            }
        } catch (err) {
            alert("Login Failed. Make sure backend is running.");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login to MyStore</h2>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </form>
        </div>
    );
};

export default Login;