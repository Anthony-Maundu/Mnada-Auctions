import React, { useState, useEffect } from "react";
import './index.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from './components/Registration';
import Login from './components/Login';

// Import the new user dashboard pages
import AdminDashboard from './pages/AdminDashboard';
import AuctioneerDashboard from './pages/AuctioneerDashboard';
import ClientDashboard from './pages/ClientDashboard';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [showLogin, setShowLogin] = useState(true); // State to toggle between login and register forms

  useEffect(() => {
    // Check if a user is logged in by checking for the JWT token in localStorage
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        // Validate if token has three parts (header, payload, signature)
        const tokenParts = token.split(".");
        if (tokenParts.length === 3) {
          const decodedToken = JSON.parse(atob(tokenParts[1])); // Decode the payload part
          setUserRole(decodedToken.role); // Assuming role is stored in the JWT token
        } else {
          console.error("Invalid token format");
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("access_token");
      }
    }
  }, []);

  const toggleForm = () => {
    setShowLogin(!showLogin); // Toggle between login and registration
  };

  // Function to handle logout and update userRole state to null
  const handleLogout = () => {
    // Remove the access token from localStorage
    localStorage.removeItem("access_token");

    // Set the userRole to null, which will trigger a re-render
    setUserRole(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Pass userRole and handleLogout to Navbar */}
        {userRole && <Navbar userRole={userRole} handleLogout={handleLogout} />}
        
        <main className="container mx-auto p-6">
          <Routes>
            {/* Redirect user to dashboard if logged in */}
            <Route
              path="/"
              element={
                userRole ? (
                  <Navigate to={`/${userRole}-dashboard`} />
                ) : (
                  <div className="max-w-md mx-auto">
                    {/* Conditional rendering of login or registration form */}
                    {showLogin ? <Login setUserRole={setUserRole} /> : <Registration />}
                    <div className="text-center mt-4">
                      <button
                        onClick={toggleForm}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {showLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                      </button>
                    </div>
                  </div>
                )
              }
            />

            {/* Explicit login route */}
            <Route
              path="/login"
              element={
                userRole ? (
                  <Navigate to={`/${userRole}-dashboard`} />
                ) : (
                  <Login setUserRole={setUserRole} />
                )
              }
            />

            {/* Explicit registration route */}
            <Route
              path="/registration"
              element={<Registration />}
            />

            {/* User Dashboard Routes */}
            <Route
              path="/admin-dashboard"
              element={userRole === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/auctioneer-dashboard"
              element={userRole === "auctioneer" ? <AuctioneerDashboard /> : <Navigate to="/" />}
            />
            <Route
              path="/client-dashboard"
              element={userRole === "client" ? <ClientDashboard /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
