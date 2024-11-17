import React from 'react';
import { auth, provider } from './firebase-config';
import { signInWithPopup } from 'firebase/auth';

const GoogleLogin = ({ setUserRole }) => {
  const handleGoogleLogin = async () => {
    try {
      // Trigger Google sign-in popup
      const result = await signInWithPopup(auth, provider);

      // Signed-in user information
      const user = result.user;

      // Set user role (you can add your custom logic here)
      setUserRole('client'); // Adjust based on your application's logic

      // Save user details to local storage
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to a specific page
      window.location.href = "/"; // Update with your desired route
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Login failed, please try again!");
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="w-full bg-red-600 text-white p-2 rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleLogin;
