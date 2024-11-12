import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from './GoogleLogin'; // Import GoogleLogin component

const Login = ({ setUserRole }) => {
  const [selectedRole, setSelectedRole] = useState(''); // Store selected role
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    // Mock token generation (replace with real authentication logic)
    const token = btoa(JSON.stringify({ username, role: selectedRole }));

    // Save token to localStorage
    localStorage.setItem("access_token", token);
    
    // Set user role in the App component state
    setUserRole(selectedRole);

    // Redirect to the user's dashboard based on the selected role
    navigate(`/${selectedRole}-dashboard`);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
      
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Role selection dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700">Login as</label>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="auctioneer">Auctioneer</option>
            <option value="client">Client</option>
          </select>
        </div>

        {/* Username field */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
        {/* Password field */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
      </form>

      {/* Divider for Google Login */}
      <div className="my-4 text-center">or continue with:</div>

      {/* Google Login button */}
      <div className="mt-4">
        <GoogleLogin setUserRole={setUserRole} />
      </div>
    </div>
  );
};

export default Login;
