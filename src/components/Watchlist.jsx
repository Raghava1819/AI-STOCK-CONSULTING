import { Star, X, TrendingUp, TrendingDown } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Link } from 'react-router-dom';
import { toast } from './ToastManager';

export function useWatchlist() {
  const [watchlist, setWatchlist] = useLocalStorage('stockai_watchlist', []);

  const isWatched = (symbol) => watchlist.some(s => s.symbol === symbol);

  const toggleWatch = (stock) => {
    if (isWatched(stock.symbol)) {
      setWatchlist(prev => prev.filter(s => s.symbol !== stock.symbol));
      toast.alert(`${stock.symbol} removed from watchlist`, 'info');
    } else {
      setWatchlist(prev => [...prev, {
        symbol: stock.symbol, name: stock.name, price: stock.price,
        change: stock.change, changePercent: stock.changePercent,
        recommendation: stock.recommendation, sector: stock.sector,
      }]);
      toast.success(`${stock.symbol} added to watchlist ⭐`);
    }
  };

  return { watchlist, isWatched, toggleWatch, setWatchlist };
}

export function WatchButton({ stock, isWatched, onToggle, size = 'sm' }) {
  const pad = size === 'sm' ? '0.3rem' : '0.5rem 0.875rem';
  return (
    <button
      onClick={e => { e.preventDefault(); e.stopPropagation(); onToggle(stock); }}
      title={isWatched ? 'Remove from watchlist' : 'Add to watchlist'}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
        padding: pad, borderRadius: size === 'sm' ? '0.5rem' : 'var(--radius)',
        border: isWatched ? '1.5px solid #fbbf24' : '1.5px solid var(--slate-200)',
        background: isWatched ? '#fffbeb' : 'white',
        cursor: 'pointer', transition: 'all 0.2s',
        color: isWatched ? '#b45309' : 'var(--slate-400)',
        fontFamily: 'inherit', fontWeight: 600, fontSize: '0.8rem',
      }}
      onMouseEnter={e => {
        if (!isWatched) {
          e.currentTarget.style.borderColor = '#fbbf24';
          e.currentTarget.style.color = '#b45309';
        }
      }}
      onMouseLeave={e => {
        if (!isWatched) {
          e.currentTarget.style.borderColor = 'var(--slate-200)';
          e.currentTarget.style.color = 'var(--slate-400)';
        }
      }}
    >
      <Star size={size === 'sm' ? 14 : 15} fill={isWatched ? '#fbbf24' : 'none'} />
      {size !== 'sm' && (isWatched ? 'Watching' : 'Watch')}
    </button>
  );
}

export function WatchlistPanel({ watchlist, isWatched, toggleWatch, onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: 380,
      background: 'white', boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
      zIndex: 1200, display: 'flex', flexDirection: 'column',
      animation: 'slideInRight 0.3s ease',
    }}>
      <div style={{
        padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--slate-100)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'linear-gradient(135deg, #fffbeb, #fef9c3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={18} color="#b45309" fill="#fbbf24" />
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>Watchlist</span>
          <span style={{
            background: '#b45309', color: 'white', fontSize: '0.7rem',
            borderRadius: 9999, padding: '0.1rem 0.5rem', fontWeight: 700,
          }}>{watchlist.length}</span>
        </div>
        <button onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-500)', padding: '4px', display: 'flex', borderRadius: 6 }}>
          <X size={18} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
        {watchlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--slate-400)' }}>
            <Star size={40} strokeWidth={1.5} style={{ margin: '0 auto 0.75rem' }} />
            <p style={{ fontWeight: 600 }}>Your watchlist is empty</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Star stocks on the Demo page or stock details</p>
          </div>
        ) : watchlist.map(s => {
          const isUp = s.changePercent >= 0;
          return (
            <div key={s.symbol} style={{
              padding: '0.875rem 1rem', marginBottom: '0.75rem',
              border: '1px solid var(--slate-200)', borderRadius: 'var(--radius)',
              background: 'var(--slate-50)', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--slate-50)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Link to={`/stock/${s.symbol}`}
                      style={{ fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.9375rem', textDecoration: 'none' }}>
                      {s.symbol}
                    </Link>
                    <span style={{
                      fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: 9999,
                      background: 'var(--slate-100)', color: 'var(--slate-500)',
                    }}>{s.sector}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '0.15rem' }}>{s.name}</div>
                </div>
                <button onClick={() => toggleWatch(s)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fbbf24', padding: '4px', display: 'flex', borderRadius: 6 }}>
                  <Star size={15} fill="#fbbf24" />
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.625rem' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--slate-900)' }}>
                  ₹{s.price.toLocaleString('en-IN')}
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.25rem',
                  fontSize: '0.8rem', fontWeight: 700,
                  color: isUp ? '#16a34a' : '#dc2626',
                }}>
                  {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                  {isUp ? '+' : ''}{s.changePercent?.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
