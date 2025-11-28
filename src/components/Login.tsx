import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "./Input";
import "../assets/Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue shopping</p>

        <form className="login-form">
          <Input label="Email" type="email" placeholder="Enter your email" />
          <Input label="Password" type="password" placeholder="Enter your password" />
          <button
      type="submit"
      className="login-btn"
      onClick={() => navigate("/home")}
    >
      Sign In
    </button>
        </form>

        <p className="login-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
