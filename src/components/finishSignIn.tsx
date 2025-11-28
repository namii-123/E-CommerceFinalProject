// finishSignIn.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "./firebase";

const FinishSignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }

      signInWithEmailLink(auth, email!, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn');
          navigate("/home");
        })
        .catch((err) => {
          alert("Link expired or invalid.");
          navigate("/login");
        });
    }
  }, [navigate]);

  return <div>Completing login...</div>;
};

export default FinishSignIn;