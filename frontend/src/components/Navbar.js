import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa'; // Removed FaUserPlus since it's not used
import { FiLogOut } from 'react-icons/fi';

const Navbar = ({ userRole, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>
          Mnada Auctioneers       </h1>

        <div className="flex items-center space-x-6">
          {!userRole && (
            <button
              onClick={() => navigate('/login')} // Navigate to the login page
              className="flex items-center text-white bg-blue-600 px-3 py-2 rounded-md hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <FaSignInAlt className="mr-2" />
              Log In / Register {/* Display 'Log In / Register' */}
            </button>
          )}

          {userRole && (
            <button
              onClick={handleLogoutClick}
              className="flex items-center text-white bg-red-600 px-3 py-2 rounded-md hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
