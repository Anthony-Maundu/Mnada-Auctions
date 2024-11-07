import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userRole, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // Call the handleLogout function passed from App.js
    handleLogout();

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Mnada Auctioneering</h1>

        {/* Show the logout button if the user is logged in */}
        {userRole && (
          <button
            onClick={handleLogoutClick}
            className="bg-red-500 text-white p-2 rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
