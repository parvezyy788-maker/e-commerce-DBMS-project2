import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '' });
  
  const navigate = useNavigate();

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = () => {
    axios.get('http://127.0.0.1:5000/api/products').then(res => setProducts(res.data));
  };

  const handleDelete = (id) => {
    if(window.confirm("Delete kar doon?")) {
      axios.delete(`http://127.0.0.1:5000/api/products/${id}`).then(() => fetchProducts());
    }
  };

  const handleUpdate = (id) => {
    axios.put(`http://127.0.0.1:5000/api/products/${id}`, editData).then(() => {
      setEditId(null);
      fetchProducts();
    });
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="back-home-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>
                {editId === p.id ? 
                  <input value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} /> 
                  : p.name}
              </td>
              <td>{p.category}</td>
              <td>
                {editId === p.id ? 
                  <input type="number" value={editData.price} onChange={(e) => setEditData({...editData, price: e.target.value})} /> 
                  : `Rs. ${p.price}`}
              </td>
              <td>
                {editId === p.id ? 
                  <button className="save-btn" onClick={() => handleUpdate(p.id)}>Save</button>
                  : <button className="edit-btn" onClick={() => { setEditId(p.id); setEditData({name: p.name, price: p.price}); }}>Edit</button>
                }
                <button className="del-btn" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;