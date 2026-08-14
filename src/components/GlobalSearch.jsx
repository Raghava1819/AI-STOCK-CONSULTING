import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { STOCK_LIST } from '../data/stockData';

export default function GlobalSearch({ onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return STOCK_LIST.slice(0, 8);
    const q = query.toUpperCase();
    return STOCK_LIST.filter(s =>
      s.symbol.includes(q) || s.name.toUpperCase().includes(q) || s.sector.toUpperCase().includes(q)
    ).slice(0, 10);
  }, [query]);

  const go = (symbol) => {
    navigate(`/stock/${symbol}`);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
        zIndex: 2000, display: 'flex', alignItems: 'flex-start',
        justifyContent: 'center', paddingTop: '5rem',
        backdropFilter: 'blur(4px)',
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: 'white', borderRadius: 'var(--radius-xl)',
        width: '100%', maxWidth: 580, boxShadow: '0 24px 64px rgba(0,0,0,0.22)',
        animation: 'fadeInUp 0.2s ease', overflow: 'hidden',
      }}>
        {/* Search input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--slate-100)',
        }}>
          <Search size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && results.length > 0) go(results[0].symbol); }}
            placeholder="Search stocks by name, symbol or sector…"
            style={{
              flex: 1, border: 'none', outline: 'none', fontSize: '1.0625rem',
              fontFamily: 'inherit', color: 'var(--slate-900)', background: 'transparent',
            }}
          />
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', display: 'flex', padding: '4px', borderRadius: 6 }}>
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div style={{ maxHeight: 420, overflowY: 'auto' }}>
          {!query.trim() && (
            <div style={{ padding: '0.75rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-400)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Popular Stocks
            </div>
          )}
          {results.map((s, i) => {
            const isUp = s.changePercent >= 0;
            return (
              <div
                key={s.symbol}
                onClick={() => go(s.symbol)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.875rem 1.25rem', cursor: 'pointer',
                  borderBottom: i < results.length - 1 ? '1px solid var(--slate-50)' : 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}
              >
                {/* Logo placeholder */}
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '0.75rem', color: 'var(--primary-dark)',
                }}>
                  {s.symbol.slice(0, 3)}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--slate-900)', fontSize: '0.9375rem' }}>{s.symbol}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {s.name} · {s.sector}
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--slate-900)', fontSize: '0.9375rem' }}>
                    ₹{s.price.toLocaleString('en-IN')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', justifyContent: 'flex-end', fontSize: '0.8rem', fontWeight: 700, color: isUp ? '#16a34a' : '#dc2626' }}>
                    {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {isUp ? '+' : ''}{s.changePercent?.toFixed(2)}%
                  </div>
                </div>

                <ArrowRight size={16} color="var(--slate-300)" />
              </div>
            );
          })}
          {results.length === 0 && (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--slate-400)' }}>
              <Search size={36} strokeWidth={1.5} style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ fontWeight: 600 }}>No results for "{query}"</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Try TCS, INFY, RELIANCE…</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.625rem 1.25rem', borderTop: '1px solid var(--slate-100)',
          display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--slate-400)',
        }}>
          <span>↵ to open</span>
          <span>ESC to close</span>
          <span style={{ marginLeft: 'auto' }}>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}
