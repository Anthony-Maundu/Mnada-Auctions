import React, { useState, useEffect, useCallback } from "react";
import './index.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from './components/Registration';
import Login from './components/Login';

// Import the new user dashboard pages
import AuctioneerDashboard from './pages/AuctioneerDashboard';
import ClientDashboard from './pages/ClientDashboard';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and register forms

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const tokenParts = token.split(".");
        if (tokenParts.length === 3) {
          const decodedToken = JSON.parse(atob(tokenParts[1])); // Decode JWT payload
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

  const toggleForm = () => setShowLogin(!showLogin);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUserRole(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {userRole && <Navbar userRole={userRole} handleLogout={handleLogout} />}
        
        <main className="container mx-auto p-6">
          <Routes>
            <Route
              path="/"
              element={
                userRole ? (
                  <Navigate to={`/${userRole}-dashboard`} />
                ) : (
                  <div className="max-w-md mx-auto">
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

            <Route
              path="/registration"
              element={<Registration />}
            />

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

const AdminDashboard = () => {
  const [pendingItems, setPendingItems] = useState([]); // List of pending items
  const [approvedItems, setApprovedItems] = useState([]); // List of approved items

  const [startTime, setStartTime] = useState(""); // Auction start time
  const [endTime, setEndTime] = useState(""); // Auction end time
  const [currentTime, setCurrentTime] = useState(new Date()); // Real-time clock
  const [remainingTime, setRemainingTime] = useState(0); // Countdown for auction

  // Memoize calculateRemainingTime
  const calculateRemainingTime = useCallback(() => {
    const end = new Date(endTime);
    const now = new Date();
    return Math.max(0, end - now); // Remaining time in ms
  }, [endTime]);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (startTime && endTime) {
        const remaining = calculateRemainingTime();
        setRemainingTime(remaining);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [startTime, endTime, calculateRemainingTime]);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  // Approve an item
  const approveItem = (item) => {
    setApprovedItems([...approvedItems, item]);
    setPendingItems(pendingItems.filter((i) => i.id !== item.id)); // Remove item from pending
  };

  // Reject an item
  const rejectItem = (item) => {
    setPendingItems(pendingItems.filter((i) => i.id !== item.id)); // Remove item from pending
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      
      {/* System Overview */}
      <div className="mt-6">
        <h2 className="text-2xl font-medium">System Overview</h2>
        <div className="grid grid-cols-3 gap-6 mt-4">
          <div className="bg-blue-100 p-4 rounded">
            <h3 className="font-semibold">Total Users</h3>
            <p>100</p>
          </div>
          <div className="bg-blue-100 p-4 rounded">
            <h3 className="font-semibold">Active Auctions</h3>
            <p>5</p>
          </div>
          <div className="bg-blue-100 p-4 rounded">
            <h3 className="font-semibold">Total Bids</h3>
            <p>350</p>
          </div>
        </div>
      </div>

      {/* Auction Time Setup */}
      <div className="mt-6">
        <h2 className="text-2xl font-medium">Auction Timing</h2>
        <div className="mt-4">
          <label className="block mb-2">Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <label className="block mt-4 mb-2">End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
      </div>

      {/* Auction Countdown */}
      <div className="mt-6">
        {startTime && endTime && (
          <div className="bg-yellow-100 p-4 rounded">
            <h3 className="font-semibold">Auction Countdown</h3>
            <p>Remaining Time: {formatTime(remainingTime)}</p>
          </div>
        )}
      </div>

      {/* Real Time Clock */}
      <div className="mt-6">
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-semibold">Real Time Clock</h3>
          <p>{currentTime.toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Auction Approval Section */}
      <h2 className="text-2xl font-medium mt-6">Pending Auctions</h2>
      <div className="mt-4">
        {pendingItems.length === 0 ? (
          <p>No pending auctions.</p>
        ) : (
          <ul>
            {pendingItems.map((item) => (
              <li key={item.id} className="border p-4 mb-4">
                <h4 className="font-bold">{item.name}</h4>
                <p>{item.description}</p>
                <button onClick={() => approveItem(item)} className="bg-green-600 text-white p-2 rounded mr-2">
                  Approve
                </button>
                <button onClick={() => rejectItem(item)} className="bg-red-600 text-white p-2 rounded">
                  Reject
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Approved Auctions */}
      <h2 className="text-2xl font-medium mt-6">Approved Auctions</h2>
      <div className="mt-4">
        {approvedItems.length === 0 ? (
          <p>No approved auctions.</p>
        ) : (
          <ul>
            {approvedItems.map((item) => (
              <li key={item.id} className="border p-4 mb-4">
                <h4 className="font-bold">{item.name}</h4>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
