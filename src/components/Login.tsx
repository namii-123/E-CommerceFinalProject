import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Input from "./Input";
import "../assets/Login.css";
import { sendEmailVerification, sendSignInLinkToEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 // Sa imong handleSubmit, i-track ang failed attempts
const MAX_ATTEMPTS = 3;
let failedAttempts = 0; // In real app, i-store ni sa localStorage or Firestore per user


const getMagicLinkUrl = () => {
  // Change this to your actual preview channel or ngrok URL
  const DEV_URL = "https://your-project-id--dev-magiclink.web.app/home";
  const PROD_URL = `${window.location.origin}/home`;

  return import.meta.env.DEV ? DEV_URL : PROD_URL;
};

const actionCodeSettings = {
  url: getMagicLinkUrl(),
  handleCodeInApp: true,
};
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
    const user = userCredential.user;

    // Reset failed attempts on success
    localStorage.removeItem(`failed_${email}`);
    
    if (!user.emailVerified) {
      await sendEmailVerification(user);
      setError("Please verify your email. New link sent.");
      await auth.signOut();
      return;
    }

    navigate("/home");
  } catch (err: any) {
    // Increment failed attempts
    failedAttempts = (Number(localStorage.getItem(`failed_${email}`)) || 0) + 1;
    localStorage.setItem(`failed_${email}`, failedAttempts.toString());

    if (failedAttempts >= MAX_ATTEMPTS) {
      // TRIGGER MAGIC LINK INSTEAD
      localStorage.removeItem(`failed_${email}`); // reset after sending

      try {
        const actionCodeSettings = {
          url: `${window.location.origin}/home`, // where to redirect after click
          handleCodeInApp: true,
        };

        await sendSignInLinkToEmail(auth, email.trim(), actionCodeSettings);
        
        // Save email for later completion
        window.localStorage.setItem('emailForSignIn', email.trim());

        setError("Too many attempts. We sent a secure login link to your email. Check your inbox!");
      } catch (linkErr) {
        setError("Failed to send login link. Try again.");
      }
    } else {
      // Normal error messages
      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
          setError(`Wrong password. Attempt ${failedAttempts}/3`);
          break;
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        default:
          setError("Login failed.");
      }
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue shopping</p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <div className="password-wrappers">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="toggle-passwords"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;