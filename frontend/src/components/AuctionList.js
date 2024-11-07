// src/components/AuctionList.js
import React from 'react';

const AuctionList = () => {
  // Sample data for items
  const auctions = [
    { id: 1, item: 'Laptop', startingPrice: '$500' },
    { id: 2, item: 'Phone', startingPrice: '$300' },
    { id: 3, item: 'Car', startingPrice: '$5000' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Current Auctions</h2>
      <ul className="space-y-4">
        {auctions.map(auction => (
          <li key={auction.id} className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">{auction.item}</h3>
            <p className="text-gray-600">Starting Price: {auction.startingPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionList;
