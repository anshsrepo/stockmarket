// src/pages/Watchlist.js
import { useState } from 'react';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([
    { id: 'AAPL', name: 'Apple Inc.' },
    { id: 'TSLA', name: 'Tesla Inc.' },
  ]);

  const removeFromWatchlist = (id) => {
    setWatchlist((prevWatchlist) => prevWatchlist.filter((stock) => stock.id !== id));
  };

  return (
    <div>
      <h2 className="page-title">Watchlist</h2>
      <p className="placeholder-text">
        {watchlist.length ? 'Your favorite stocks.' : 'No stocks in watchlist.'}
      </p>
      <div className="watchlist-container">
        {watchlist.map((stock) => (
          <div key={stock.id} className="watchlist-item">
            <span>{stock.name}</span>
            <button onClick={() => removeFromWatchlist(stock.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;