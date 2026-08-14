import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TrendingUp, LayoutDashboard, Sun, Moon, Star, Bell, Target, Search } from 'lucide-react';
import { WatchlistPanel } from './Watchlist';
import { AlertsPanel } from './PriceAlerts';
import GlobalSearch from './GlobalSearch';

export default function Navbar({ watchlist, isWatched, toggleWatch, alerts, removeAlert }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [theme, setTheme] = useState(() => localStorage.getItem('stockai_theme') || 'light');
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [riskProfile] = useState(() => localStorage.getItem('stockai_risk_profile') || null);

  // Sync theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('stockai_theme', theme);
  }, [theme]);

  // Keyboard shortcut: Cmd/Ctrl + K → open search
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const scrollTo = (id) => {
    if (!isHome) { navigate('/'); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300); }
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const riskColors = { Conservative: '#16a34a', Balanced: '#2563eb', Aggressive: '#dc2626' };

  const iconBtn = (onClick, title, badge, children) => (
    <button onClick={onClick} title={title} style={{
      position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
      padding: '0.4rem', borderRadius: 'var(--radius)', color: 'var(--slate-600)',
      display: 'flex', transition: 'all 0.2s', flexShrink: 0,
    }}>
      {children}
      {badge > 0 && (
        <span style={{
          position: 'absolute', top: -4, right: -4, background: '#b45309',
          color: 'white', fontSize: '0.6rem', borderRadius: 9999,
          padding: '0 4px', minWidth: 16, height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700,
        }}>{badge}</span>
      )}
    </button>
  );

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="navbar-logo" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div className="navbar-logo-icon">
            <TrendingUp size={20} />
          </div>
          <span style={{ whiteSpace: 'nowrap' }}>StockAI</span>
        </Link>

        {/* Search bar (center — hidden on small) */}
        <button
          onClick={() => setShowSearch(true)}
          style={{
            flex: '1 1 auto', maxWidth: 320, margin: '0 1rem',
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.45rem 0.875rem', borderRadius: 'var(--radius)',
            border: '1.5px solid var(--slate-200)', background: 'var(--slate-50)',
            color: 'var(--slate-400)', cursor: 'pointer', fontFamily: 'inherit',
            fontSize: '0.875rem', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--slate-600)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--slate-200)'; e.currentTarget.style.color = 'var(--slate-400)'; }}
        >
          <Search size={15} />
          <span style={{ flex: 1, textAlign: 'left' }}>Search stocks…</span>
          <kbd style={{ fontSize: '0.65rem', padding: '0.1rem 0.35rem', background: 'var(--slate-200)', borderRadius: 4, color: 'var(--slate-500)', letterSpacing: 0 }}>⌘K</kbd>
        </button>

        {/* Right-side links */}
        <ul className="navbar-links" style={{ flexShrink: 0 }}>
          {isHome ? (
            <>
              <li className="nav-home-link"><a href="#features" onClick={e => { e.preventDefault(); scrollTo('features'); }}>Features</a></li>
              <li className="nav-home-link"><a href="#portfolio" onClick={e => { e.preventDefault(); scrollTo('portfolio'); }}>Portfolio</a></li>
              <li className="nav-home-link"><a href="#chat" onClick={e => { e.preventDefault(); scrollTo('chat'); }}>AI Chat</a></li>
            </>
          ) : null}

          <li>
            <Link to="/demo" style={{
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontWeight: 600,
              color: location.pathname === '/demo' ? 'var(--primary)' : 'var(--slate-600)',
              textDecoration: 'none', borderRadius: 'var(--radius)', transition: 'all 0.2s',
              background: location.pathname === '/demo' ? 'rgba(59,130,246,0.08)' : 'transparent',
              whiteSpace: 'nowrap',
            }}>
              <LayoutDashboard size={14} />
              Stock Demo
            </Link>
          </li>

          {/* Risk badge */}
          {riskProfile && (
            <li>
              <span style={{
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                padding: '0.3rem 0.625rem', borderRadius: 9999,
                fontSize: '0.7rem', fontWeight: 700,
                color: riskColors[riskProfile] || 'var(--slate-600)',
                background: (riskColors[riskProfile] || '#64748b') + '18',
                border: `1.5px solid ${(riskColors[riskProfile] || '#64748b')}40`,
                whiteSpace: 'nowrap',
              }}>
                <Target size={11} /> {riskProfile}
              </span>
            </li>
          )}

          {/* Watchlist */}
          <li>
            {iconBtn(
              () => { setShowWatchlist(s => !s); setShowAlerts(false); },
              'Watchlist',
              watchlist?.length || 0,
              <Star size={18} fill={watchlist?.length ? '#fbbf24' : 'none'} color={watchlist?.length ? '#b45309' : 'currentColor'} />
            )}
          </li>

          {/* Alerts */}
          <li>
            {iconBtn(
              () => { setShowAlerts(s => !s); setShowWatchlist(false); },
              'Price Alerts',
              alerts?.length || 0,
              <Bell size={18} color={alerts?.length ? '#b45309' : 'currentColor'} />
            )}
          </li>

          {/* Dark mode */}
          <li>
            <button onClick={toggleTheme}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              style={{
                background: theme === 'dark' ? 'rgba(255,255,255,0.12)' : 'var(--slate-100)',
                border: '1.5px solid ' + (theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'var(--slate-200)'),
                borderRadius: '0.5rem', cursor: 'pointer', padding: '0.35rem 0.5rem',
                display: 'flex', alignItems: 'center', color: theme === 'dark' ? '#fbbf24' : 'var(--slate-600)',
                transition: 'all 0.2s', flexShrink: 0,
              }}>
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </li>

          <li>
            <a href="#portfolio" className="navbar-cta"
              style={{ fontSize: '0.8rem', padding: '0.45rem 1rem', whiteSpace: 'nowrap' }}
              onClick={e => { e.preventDefault(); scrollTo('portfolio'); }}>
              Analyse
            </a>
          </li>
        </ul>
      </nav>

      {/* Panels overlay */}
      {(showWatchlist || showAlerts) && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1100 }}
          onClick={() => { setShowWatchlist(false); setShowAlerts(false); }} />
      )}

      {showWatchlist && (
        <WatchlistPanel watchlist={watchlist} isWatched={isWatched} toggleWatch={toggleWatch} onClose={() => setShowWatchlist(false)} />
      )}
      {showAlerts && (
        <AlertsPanel alerts={alerts} removeAlert={removeAlert} onClose={() => setShowAlerts(false)} />
      )}
      {showSearch && <GlobalSearch onClose={() => setShowSearch(false)} />}
    </>
  );
}
