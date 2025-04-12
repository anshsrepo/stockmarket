// src/pages/StockDetails.js
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function StockDetails() {
  const { id } = useParams();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <div>
      <h2 className="page-title">Stock Details: {id}</h2>
      <div>
        <p className="placeholder-text">Placeholder for stock chart.</p>
        <div className="chart-placeholder">[Chart Placeholder]</div>
      </div>
      <div>
        <p className="placeholder-text">Stock Info</p>
        <div className="stock-card">
          <p>Price: $150.25</p>
          <p>Volume: 1.2M</p>
          <button
            className={`button ${isInWatchlist ? 'button-added' : ''}`}
            onClick={handleWatchlistToggle}
          >
            {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StockDetails;