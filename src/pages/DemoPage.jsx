import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, TrendingUp, TrendingDown, Zap, Brain, ChevronRight, Star } from 'lucide-react';
import { STOCK_LIST, AI_INSIGHTS } from '../data/stockData';

const CHIPS = ['TCS', 'INFY', 'RELIANCE', 'HDFCBANK', 'ICICIBANK', 'TATAMOTORS', 'WIPRO', 'BAJFINANCE'];

function RecommendationBadge({ rec }) {
  const colors = {
    'BUY': { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    'STRONG BUY': { bg: '#dcfce7', color: '#15803d', border: '#86efac' },
    'HOLD': { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
    'SELL': { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  };
  const c = colors[rec] || colors['HOLD'];
  return (
    <span style={{
      display: 'inline-block', padding: '0.15rem 0.6rem', borderRadius: 9999,
      fontSize: '0.7rem', fontWeight: 700, background: c.bg, color: c.color,
      border: `1px solid ${c.border}`, letterSpacing: '0.05em'
    }}>
      {rec}
    </span>
  );
}

function StockCard({ stock }) {
  const isUp = stock.change >= 0;
  return (
    <Link to={`/stock/${stock.symbol}`} style={{ textDecoration: 'none' }}>
      <div className="stock-card">
        <div className="stock-card-header">
          <div>
            <div className="stock-card-symbol">{stock.symbol}</div>
            <div className="stock-card-name">{stock.name}</div>
            <span className="stock-card-sector">{stock.sector}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="stock-card-price">₹{stock.price.toLocaleString('en-IN')}</div>
            <div className={`stock-card-change ${isUp ? 'up' : 'down'}`}>
              {isUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="stock-card-metrics">
          {[
            { label: 'Volume', value: stock.volume },
            { label: 'Mkt Cap', value: `₹${stock.marketCap}` },
            { label: '52W H', value: `₹${stock.high52.toLocaleString('en-IN')}` },
            { label: '52W L', value: `₹${stock.low52.toLocaleString('en-IN')}` },
            { label: 'P/E', value: stock.pe },
            { label: 'ROE', value: `${stock.roe}%` },
            { label: 'ROCE', value: `${stock.roce}%` },
            { label: 'Div Yld', value: `${stock.dividendYield}%` },
          ].map(m => (
            <div key={m.label} className="stock-metric-item">
              <div className="stock-metric-label">{m.label}</div>
              <div className="stock-metric-value">{m.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
          <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
            Target: <strong style={{ color: 'var(--primary-dark)' }}>₹{stock.targetPrice.toLocaleString('en-IN')}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RecommendationBadge rec={stock.recommendation} />
            <ChevronRight size={16} color="var(--slate-400)" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function InsightCard({ insight }) {
  const stock = STOCK_LIST.find(s => s.symbol === insight.symbol);
  if (!stock) return null;
  return (
    <div className="insight-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--slate-900)' }}>{insight.symbol}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>₹{stock.price.toLocaleString('en-IN')}</div>
        </div>
        <RecommendationBadge rec={insight.recommendation} />
      </div>
      <p style={{ fontSize: '0.8125rem', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '0.625rem' }}>
        {insight.reason}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <div style={{ flex: 1, height: 4, background: 'var(--slate-100)', borderRadius: 9999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${insight.confidence}%`, background: 'linear-gradient(90deg, var(--primary), var(--teal))', borderRadius: 9999 }} />
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-dark)' }}>{insight.confidence}%</span>
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)', marginTop: '0.25rem' }}>AI Confidence</div>
    </div>
  );
}

export default function DemoPage() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!search.trim()) return STOCK_LIST;
    const q = search.toUpperCase();
    return STOCK_LIST.filter(s =>
      s.symbol.includes(q) || s.name.toUpperCase().includes(q) || s.sector.toUpperCase().includes(q)
    );
  }, [search]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--slate-50)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 40%, #0369a1 70%, #0f766e 100%)',
        padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                color: 'white', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer',
                fontSize: '0.875rem', fontWeight: 500, fontFamily: 'inherit', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            >
              <ArrowLeft size={16} /> Back to Home
            </button>
            <div>
              <h1 style={{ color: 'white', fontSize: '1.375rem', fontWeight: 800, letterSpacing: '-0.01em' }}>
                📊 Live Stock Market Dashboard
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
                Search and explore Indian stocks with AI-powered insights
              </p>
            </div>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', maxWidth: 520 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)' }} />
            <input
              id="stock-search"
              className="input-field"
              placeholder="Search stocks by name or symbol (e.g. TCS, INFY...)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)',
                color: 'white', paddingLeft: '2.75rem', fontSize: '0.9375rem',
                backdropFilter: 'blur(8px)'
              }}
            />
          </div>

          {/* Popular Chips */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem', alignSelf: 'center' }}>Popular:</span>
            {CHIPS.map(chip => (
              <button
                key={chip}
                id={`chip-${chip}`}
                onClick={() => setSearch(chip)}
                style={{
                  padding: '0.3rem 0.875rem', borderRadius: 9999, cursor: 'pointer',
                  fontSize: '0.8rem', fontWeight: 600, fontFamily: 'inherit',
                  transition: 'all 0.2s',
                  background: search.toUpperCase() === chip ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)',
                  color: search.toUpperCase() === chip ? 'var(--primary-dark)' : 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
                onMouseEnter={e => { if (search.toUpperCase() !== chip) e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
                onMouseLeave={e => { if (search.toUpperCase() !== chip) e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        {/* AI Market Insights */}
        {!search && (
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain size={18} color="var(--primary-dark)" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--slate-900)' }}>AI Market Insights</h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>Real-time AI recommendations for top Indian stocks</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              {AI_INSIGHTS.map(i => <InsightCard key={i.symbol} insight={i} />)}
            </div>
          </div>
        )}

        {/* Stock Grid */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} color="var(--teal-dark)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Live Stock Data
                {search && <span style={{ color: 'var(--primary)', marginLeft: '0.5rem' }}>— "{search}"</span>}
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>{filtered.length} stocks found · Click any stock for full analysis</p>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--slate-400)' }}>
            <Search size={48} strokeWidth={1.5} style={{ margin: '0 auto 1rem' }} />
            <p style={{ fontSize: '1.0625rem', fontWeight: 600, marginBottom: '0.5rem' }}>No stocks found for "{search}"</p>
            <p style={{ fontSize: '0.9rem' }}>Try searching for TCS, INFY, RELIANCE, or HDFCBANK</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
            {filtered.map(stock => <StockCard key={stock.symbol} stock={stock} />)}
          </div>
        )}
      </div>
    </div>
  );
}
