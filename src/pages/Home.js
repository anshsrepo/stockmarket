// src/pages/Home.js
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const stocks = [
    { id: 'AAPL', name: 'Apple Inc.', price: 150.25 },
    { id: 'GOOGL', name: 'Alphabet Inc.', price: 2800.75 },
    { id: 'MSFT', name: 'Microsoft Corp.', price: 305.10 },
    { id: 'TSLA', name: 'Tesla Inc.', price: 1050.50 },
    { id: 'AMZN', name: 'Amazon.com Inc.', price: 3400.20 },
  ];

  return (
    <div>
      <h2 className="page-title">Stock Market</h2>
      <div className="stock-banner">
        <div className="banner-content">
          {stocks.map((stock) => (
            <span key={stock.id} className="banner-item">
              {stock.name}: ${stock.price.toFixed(2)}
            </span>
          ))}
          {stocks.map((stock) => (
            <span key={`${stock.id}-dup`} className="banner-item">
              {stock.name}: ${stock.price.toFixed(2)}
            </span>
          ))}
        </div>
      </div>
      <p className="placeholder-text">Explore available stocks.</p>
      <div className="stocks-grid">
        {stocks.map((stock) => (
          <div
            key={stock.id}
            className="stock-card"
            onClick={() => navigate(`/stock/${stock.id}`)}
          >
            <h3>{stock.name}</h3>
            <p>${stock.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;