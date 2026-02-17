import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation (no real authentication)
    if (!formData.username || !formData.password) {
      toast.error("Please enter both username and password");
      return;
    }

    // Mock login - accept any credentials
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", formData.username);
    toast.success(`Welcome, ${formData.username}!`);
    navigate("/students");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🎓 Student Management System</h1>
          <p>Please login to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary login-btn">
            Login
          </button>

          <div className="login-hint">
            <p>💡 <strong>Hint:</strong> Enter any username and password to login</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
