// src/components/Header.js
function Header() {
  // Check current path without react-router-dom
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
        <h1>Stock Market App</h1>
        <nav>
          <ul>
            {currentPath !== '/' && (
              <li>
                <button onClick={handleHomeClick} style={{ background: 'none', border: 'none', color: '#f0f2f5', textDecoration: 'none', fontSize: '16px', fontWeight: '400', cursor: 'pointer' }}>
                  Home
                </button>
              </li>
            )}
            {currentPath !== '/watchlist' && (
              <li>
                <button onClick={handleWatchlistClick} style={{ background: 'none', border: 'none', color: '#f0f2f5', textDecoration: 'none', fontSize: '16px', fontWeight: '400', cursor: 'pointer' }}>
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