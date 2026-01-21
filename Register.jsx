import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = ({ setIsLoggedIn }) => {
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:5000/api/register', user);
            
            // If registration is successful
            alert(res.data.message);
            
            // Automatically log them in
            localStorage.setItem("userLoggedIn", "true");
            setIsLoggedIn(true);
            
            // Redirect to Home
            navigate("/"); 
        } catch (err) {
            alert("Registration failed!");
        }
    };

    return (
        <div className="register-page">
            <form onSubmit={handleSubmit} className="form-card">
                <h2>Register</h2>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">Create Account</button>
                
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;