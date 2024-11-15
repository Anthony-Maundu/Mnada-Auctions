import React, { useState, useEffect } from "react";
import './index.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Authentication from './components/Authentication';
import HomePage from './components/HomePage';
import AuctioneerDashboard from './pages/AuctioneerDashboard';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Constants for routes and user roles
const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  ADMIN_DASHBOARD: "/admin-dashboard",
  AUCTIONEER_DASHBOARD: "/auctioneer-dashboard",
  CLIENT_DASHBOARD: "/client-dashboard",
};

const ROLES = {
  ADMIN: "admin",
  AUCTIONEER: "auctioneer",
  CLIENT: "client",
};

const App = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Try to fetch the user role from localStorage (decoding JWT)
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const tokenParts = token.split(".");
        if (tokenParts.length === 3) {
          const decodedToken = JSON.parse(atob(tokenParts[1])); // Decode the JWT payload
          setUserRole(decodedToken.role); // Set user role from token
        } else {
          console.error("Invalid token format");
          localStorage.removeItem("access_token"); // Remove invalid token
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("access_token"); // Remove invalid token on error
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Remove token on logout
    setUserRole(null); // Reset user role
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {userRole && <Navbar userRole={userRole} handleLogout={handleLogout} />} {/* Display Navbar if user is logged in */}
        
        <main className="container mx-auto !ml-0">
          <Routes>
            {/* Default route */}
            <Route path={ROUTES.HOME} element={<HomePage userRole={userRole} handleLogout={handleLogout} />} />

            {/* Conditional login route - redirect to dashboard if already logged in */}
            <Route
              path={ROUTES.LOGIN}
              element={
                userRole ? (
                  <Navigate to={`/${userRole}-dashboard`} /> // Redirect based on role
                ) : (
                  <Authentication setUserRole={setUserRole} /> // Show Authentication form
                )
              }
            />

            {/* Registration route */}
            <Route path={ROUTES.REGISTRATION} element={<Authentication setUserRole={setUserRole} />} />

            {/* Role-based dashboard routes */}
            <Route
              path={ROUTES.ADMIN_DASHBOARD}
              element={userRole === ROLES.ADMIN ? <AdminDashboard /> : <Navigate to={ROUTES.HOME} />}
            />
            <Route
              path={ROUTES.AUCTIONEER_DASHBOARD}
              element={userRole === ROLES.AUCTIONEER ? <AuctioneerDashboard /> : <Navigate to={ROUTES.HOME} />}
            />
            <Route
              path={ROUTES.CLIENT_DASHBOARD}
              element={userRole === ROLES.CLIENT ? <ClientDashboard /> : <Navigate to={ROUTES.HOME} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
