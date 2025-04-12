// src/components/Header.js
function Header() {
  const currentPath = window.location.pathname;

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleWatchlistClick = () => {
    window.location.href = '/watchlist';
  };

  return (
    <header>
      <div className="header-content">
        <h1>StockPulse</h1>
        <nav>
          <ul>
            {currentPath !== '/' && (
              <li>
                <button onClick={handleHomeClick} className="nav-button">
                  Home
                </button>
              </li>
            )}
            {currentPath !== '/watchlist' && (
              <li>
                <button onClick={handleWatchlistClick} className="nav-button">
                  Watchlist
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;