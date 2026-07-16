import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TrendingUp, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const scrollTo = (id) => {
    if (!isHome) { navigate('/'); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300); }
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
        <div className="navbar-logo-icon">
          <TrendingUp size={20} />
        </div>
        StockAI Consultant
      </Link>

      <ul className="navbar-links">
        {isHome ? (
          <>
            <li><a href="#features" onClick={e => { e.preventDefault(); scrollTo('features'); }}>Features</a></li>
            <li><a href="#portfolio" onClick={e => { e.preventDefault(); scrollTo('portfolio'); }}>Portfolio</a></li>
            <li><a href="#chat" onClick={e => { e.preventDefault(); scrollTo('chat'); }}>AI Chat</a></li>
            <li><a href="#dashboard" onClick={e => { e.preventDefault(); scrollTo('dashboard'); }}>Dashboard</a></li>
          </>
        ) : null}
        <li>
          <Link
            to="/demo"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 500,
              color: location.pathname === '/demo' ? 'var(--primary)' : 'var(--slate-600)',
              textDecoration: 'none', borderRadius: 'var(--radius)', transition: 'all 0.2s',
              background: location.pathname === '/demo' ? 'rgba(59,130,246,0.08)' : 'transparent'
            }}
          >
            <LayoutDashboard size={15} />
            Stock Demo
          </Link>
        </li>
        <li>
          <a
            href="#portfolio"
            className="navbar-cta"
            onClick={e => { e.preventDefault(); scrollTo('portfolio'); }}
          >
            Analyse Now
          </a>
        </li>
      </ul>
    </nav>
  );
}
