import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client"); // Default role is "client"
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track error message
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error before submitting

    // Mock registration process
    const mockDatabase = [
      { username: "admin", email: "admin@example.com", password: "admin123", role: "admin" },
      { username: "auctioneer", email: "auctioneer@example.com", password: "auction123", role: "auctioneer" },
      { username: "client", email: "client@example.com", password: "client123", role: "client" },
    ];

    try {
      // Check if username or email already exists in the mock database
      const existingUser = mockDatabase.find(
        (user) => user.username === username || user.email === email
      );

      if (existingUser) {
        setError("Username or email already exists.");
        setLoading(false);
        return;
      }

      // Check if an admin already exists in the mock database
      const existingAdmin = mockDatabase.find((user) => user.role === "admin");

      if (role === "admin" && existingAdmin) {
        setError("An admin already exists. Only one admin is allowed.");
        setLoading(false);
        return;
      }

      // If no existing user or admin, simulate successful registration
      mockDatabase.push({ username, email, password, role });

      // Simulate a successful registration by storing the mock user
      localStorage.setItem("newUser", JSON.stringify({ username, email, role }));

      // Alert and redirect to login page after successful registration
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      setError("Registration Failed! Please try again."); // Display error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create an Account</h2>

        {/* Show error message if there's any */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="client">Client</option>
          <option value="auctioneer">Auctioneer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Registration;
