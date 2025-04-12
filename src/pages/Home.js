// src/pages/Home.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Fetch stock prices from API
    fetch('http://localhost:3001/stocks')
      .then(response => response.json())
      .then(data => setStocks(data))
      .catch(error => console.error('Error fetching stocks:', error));
  }, []);

  const addToWatchlist = (id) => {
    fetch('http://localhost:3001/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then(response => response.json())
      .then(data => console.log(data.message))
      .catch(error => console.error('Error adding to watchlist:', error));
  };

  return (
    <div>
      <h2 className="page-title">StockPulse</h2>
      <div className="stock-banner">
        <div className="banner-content">
          {stocks.map((stock) => (
            <span key={stock.id} className="banner-item">
              {stock.id}: ${stock.price.toFixed(2)}
            </span>
          ))}
          {stocks.map((stock) => (
            <span key={`${stock.id}-dup`} className="banner-item">
              {stock.id}: ${stock.price.toFixed(2)}
            </span>
          ))}
        </div>
      </div>
      <p className="placeholder-text">Explore available stocks.</p>
      <div className="stocks-grid">
        {stocks.map((stock) => (
          <div key={stock.id} className="stock-card" onClick={() => navigate(`/stock/${stock.id}`)}>
            <h3>{stock.id}</h3>
            <p>${stock.price.toFixed(2)}</p>
            <button onClick={(e) => { e.stopPropagation(); addToWatchlist(stock.id); }} className="button">
              Add to Watchlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;