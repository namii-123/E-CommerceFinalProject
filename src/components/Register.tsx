import React from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import "../assets/Register.css";

const Register: React.FC = () => {
  return (
    <div className="register-wrapper">
      <div className="register-card">
        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">Start your shopping journey</p>

        <form className="register-form">
          <div className="name-row">
            <Input label="Last Name" type="text" placeholder="Last name" />
            <Input label="First Name" type="text" placeholder="First name" />
          </div>
          <Input label="Email" type="email" placeholder="Enter your email" />
          <Input label="Password" type="password" placeholder="Create a password" />
          <Input label="Confirm Password" type="password" placeholder="Repeat your password" />

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
