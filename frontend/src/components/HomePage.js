import React from 'react';
import Navbar from './Navbar';
import AuctionList from './AuctionList';

const HomePage = ({ userRole, handleLogout }) => {
  return (
    <div>
      {/* Navbar */}
      <Navbar userRole={userRole} handleLogout={handleLogout} />

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-6">Available Auctions</h2>

        {/* Auction list in grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AuctionList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
