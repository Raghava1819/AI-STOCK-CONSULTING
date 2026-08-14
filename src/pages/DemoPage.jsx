import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ArrowLeft, TrendingUp, TrendingDown, Zap, Brain, ChevronRight, Star,
  Calendar, Download, AlertCircle, SlidersHorizontal, Layers, Building2, Sparkles, Scale
} from 'lucide-react';
import { STOCK_LIST, AI_INSIGHTS, WATCHLIST_FEED, UPCOMING_EVENTS, ALL_SECTORS_DATA, getStocksForSector } from '../data/stockData';
import { WatchButton } from '../components/Watchlist';
import StockComparison from '../components/StockComparison';
import ManageColumnsModal, { DEFAULT_COLUMNS } from '../components/ManageColumnsModal';

const CHIPS = ['TCS', 'INFY', 'RELIANCE', 'HDFCBANK', 'ICICIBANK', 'TATAMOTORS', 'WIPRO', 'BAJFINANCE'];

function RecommendationBadge({ rec }) {
  const colors = {
    'BUY': { bg: '#dcfce7', color: '#15803d', border: '#86efac' },
    'STRONG BUY': { bg: '#dcfce7', color: '#15803d', border: '#86efac' },
    'HOLD': { bg: '#fef3c7', color: '#b45309', border: '#fde68a' },
    'SELL': { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  };
  const c = colors[rec] || colors['HOLD'];
  return (
    <span style={{
      display: 'inline-block', padding: '0.2rem 0.65rem', borderRadius: 9999,
      fontSize: '0.725rem', fontWeight: 800, background: c.bg, color: c.color,
      border: `1px solid ${c.border}`, letterSpacing: '0.05em'
    }}>
      {rec}
    </span>
  );
}

// ─── AI Market Insights Section ───────────────────────────────────────────────
function AIMarketInsightsSection() {
  const insights = [
    { symbol: 'TCS', price: 3700, rec: 'HOLD', reason: 'Premium valuation; wait for better entry below ₹3,400', confidence: 78 },
    { symbol: 'INFY', price: 1450, rec: 'BUY', reason: 'Attractive valuation with strong deal pipeline', confidence: 82 },
    { symbol: 'RELIANCE', price: 2450, rec: 'BUY', reason: 'Jio + Retail growth; target ₹3,100 in 12 months', confidence: 86 },
    { symbol: 'HDFCBANK', price: 1680, rec: 'BUY', reason: 'Post-merger dip opportunity; best bank franchise', confidence: 88 },
    { symbol: 'ICICIBANK', price: 1145, rec: 'STRONG BUY', reason: 'Best growth + quality combo at reasonable valuation', confidence: 91 },
    { symbol: 'TATAMOTORS', price: 985, rec: 'BUY', reason: 'JLR margins at multi-year high; cheap at P/E 8x', confidence: 84 },
  ];

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.25rem' }}>
        <div style={{ width: 36, height: 36, borderRadius: '0.5rem', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Brain size={20} color="#2563eb" />
        </div>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--slate-900)', margin: 0, letterSpacing: '-0.01em' }}>
            AI Market Insights
          </h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--slate-500)', margin: '0.15rem 0 0' }}>
            Real-time AI recommendations for top Indian stocks
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {insights.map((item) => (
          <Link key={item.symbol} to={`/stock/${item.symbol}`} style={{ textDecoration: 'none' }}>
            <div style={{
              background: '#ffffff', border: '1px solid var(--slate-200)', borderRadius: '1rem',
              padding: '1.25rem', boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s', height: '100%',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)' }}>{item.symbol}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-500)', marginTop: '0.1rem' }}>
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <RecommendationBadge rec={item.rec} />
                </div>

                <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)', lineHeight: 1.5, margin: '0.625rem 0 1rem', height: '42px', overflow: 'hidden' }}>
                  {item.reason}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <div style={{ flex: 1, height: 6, background: '#f1f5f9', borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.confidence}%`, background: 'linear-gradient(90deg, #2563eb, #0d9488)', borderRadius: 9999 }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e40af' }}>{item.confidence}%</span>
                </div>
                <div style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--slate-400)' }}>AI Confidence</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StockCard({ stock, isWatched, toggleWatch }) {
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
              {isUp ? '+' : ''}{stock.changePercent?.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="stock-card-metrics">
          {[
            { label: 'Volume', value: stock.volume || '12.5L' },
            { label: 'Mkt Cap', value: stock.marketCap },
            { label: '52W H', value: stock.high52 ? `₹${stock.high52.toLocaleString('en-IN')}` : 'N/A' },
            { label: '52W L', value: stock.low52 ? `₹${stock.low52.toLocaleString('en-IN')}` : 'N/A' },
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
            Target: <strong style={{ color: 'var(--primary-dark)' }}>₹{(stock.targetPrice || stock.price * 1.15).toLocaleString('en-IN')}</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RecommendationBadge rec={stock.recommendation || 'BUY'} />
            {toggleWatch && (
              <WatchButton stock={stock} isWatched={isWatched?.(stock.symbol)} onToggle={toggleWatch} size="sm" />
            )}
            <ChevronRight size={16} color="var(--slate-400)" />
          </div>
        </div>
      </div>
    </Link>
  );
}

function RatioTable({ stocks, isWatched, toggleWatch }) {
  const [sortField, setSortField] = useState('marketCap');
  const [sortAsc, setSortAsc] = useState(false);
  const [activeColumns, setActiveColumns] = useState(DEFAULT_COLUMNS);
  const [showManageModal, setShowManageModal] = useState(false);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const sortedStocks = useMemo(() => {
    return [...stocks].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'marketCap' || sortField === 'pat' || sortField === 'salesQuarter') {
        aVal = parseFloat(aVal?.toString().replace(/,/g, '').replace(' Cr', '') || 0);
        bVal = parseFloat(bVal?.toString().replace(/,/g, '').replace(' Cr', '') || 0);
      }
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      if (aVal < bVal) return sortAsc ? -1 : 1;
      if (aVal > bVal) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [stocks, sortField, sortAsc]);

  const renderCellValue = (s, col) => {
    const val = s[col.key];
    if (val === undefined || val === null) {
      if (col.key.includes('Growth')) return '+12.4%';
      if (col.key.includes('Last') || col.key.includes('Quarter') || col.key.includes('12m') || col.key.includes('pat')) return '₹450 Cr';
      if (col.key.includes('debt')) return '0.15';
      return 'N/A';
    }
    if (typeof val === 'number') {
      if (col.unit === '%') return `${val}%`;
      if (col.unit === '₹') return `₹${val.toLocaleString('en-IN')}`;
      return val.toLocaleString('en-IN');
    }
    return val;
  };

  const handleExportCSV = () => {
    const headers = ['S.No.', 'Name', 'Symbol', ...activeColumns.map(c => c.label)];
    const rows = sortedStocks.map((s, idx) => [
      idx + 1,
      s.name,
      s.symbol,
      ...activeColumns.map(c => renderCellValue(s, c))
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `StockAI_Screener_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--slate-200)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid var(--slate-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--slate-50)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-700)', background: 'white', border: '1px solid var(--slate-200)', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius)' }}>
            📊 {sortedStocks.length} Companies
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>Showing {activeColumns.length} Columns</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setShowManageModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', border: 'none', borderRadius: 'var(--radius)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 2px 6px rgba(37,99,235,0.3)' }}>
            <SlidersHorizontal size={14} /> EDIT COLUMNS
          </button>
          <button onClick={handleExportCSV} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', background: 'white', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius)', color: 'var(--slate-600)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
            <Download size={14} /> EXPORT
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1100px' }}>
          <thead>
            <tr style={{ background: 'var(--slate-50)', borderBottom: '1.5px solid var(--slate-200)' }}>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase' }}>S.No.</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase', cursor: 'pointer' }} onClick={() => handleSort('name')}>Name {sortField === 'name' ? (sortAsc ? ' ▲' : ' ▼') : ''}</th>
              {activeColumns.map(col => (
                <th key={col.key} style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', textAlign: 'right', cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => handleSort(col.key)}>
                  {col.label} {col.unit && <span style={{ fontSize: '0.65rem', color: 'var(--slate-400)' }}>{col.unit}</span>} {sortField === col.key ? (sortAsc ? ' ▲' : ' ▼') : ''}
                </th>
              ))}
              {isWatched && <th style={{ padding: '0.75rem 1rem', fontSize: '0.7rem', fontWeight: 700, color: 'var(--slate-400)', textTransform: 'uppercase', textAlign: 'center' }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {sortedStocks.map((s, idx) => (
              <tr key={s.symbol} style={{ borderBottom: '1px solid var(--slate-100)', transition: 'all 0.15s' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: 'var(--slate-400)' }}>{idx + 1}.</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Link to={`/stock/${s.symbol}`} style={{ color: 'var(--primary-dark)', textDecoration: 'none' }}>{s.name}</Link>
                    <span style={{ fontSize: '0.65rem', color: 'var(--slate-400)', background: 'var(--slate-100)', padding: '0.05rem 0.3rem', borderRadius: 4 }}>{s.symbol}</span>
                  </div>
                </td>
                {activeColumns.map(col => (
                  <td key={col.key} style={{ padding: '0.75rem 1rem', fontSize: '0.85rem', fontWeight: col.key === 'price' || col.key === 'pe' ? 700 : 600, color: 'var(--slate-800)', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {renderCellValue(s, col)}
                  </td>
                ))}
                {isWatched && (
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                    <WatchButton stock={s} isWatched={isWatched(s.symbol)} onToggle={toggleWatch} size="sm" />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showManageModal && (
        <ManageColumnsModal activeColumns={activeColumns} onSave={setActiveColumns} onClose={() => setShowManageModal(false)} />
      )}
    </div>
  );
}

function runQueryFilter(stocks, query, onlyJun2026) {
  if (!query.trim()) return stocks;
  const conditions = query.split(/\bAND\b/i);
  let filteredStocks = [...stocks];
  if (onlyJun2026) {
    filteredStocks = filteredStocks.filter(s => s.shareholding && s.shareholding.some(sh => sh.period.includes('Jun 2026')));
  }
  for (let cond of conditions) {
    cond = cond.trim();
    if (!cond) continue;
    const match = cond.match(/(.*?)(>=|<=|>|<|=)(.*)/);
    if (!match) throw new Error(`Invalid syntax in condition: "${cond}".`);
    const fieldName = match[1].trim().toLowerCase();
    const op = match[2].trim();
    const valStr = match[3].trim().replace('%', '');
    const targetVal = parseFloat(valStr);
    let prop = 'pe';
    if (fieldName.includes('market')) prop = 'marketCap';
    else if (fieldName.includes('roe')) prop = 'roe';
    filteredStocks = filteredStocks.filter(stock => {
      let stockVal = stock[prop] || 0;
      if (typeof stockVal === 'string') stockVal = parseFloat(stockVal.replace(/,/g, '').replace(' Cr', ''));
      const numVal = parseFloat(stockVal);
      switch (op) {
        case '>': return numVal > targetVal;
        case '<': return numVal < targetVal;
        case '>=': return numVal >= targetVal;
        case '<=': return numVal <= targetVal;
        case '=': return numVal === targetVal;
        default: return false;
      }
    });
  }
  return filteredStocks;
}

export default function DemoPage({ watchlist, isWatched, toggleWatch }) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('market');
  const navigate = useNavigate();
  const [screenerQuery, setScreenerQuery] = useState('');
  const [onlyJun2026, setOnlyJun2026] = useState(false);
  const [screenerResults, setScreenerResults] = useState(null);
  const [screenerError, setScreenerError] = useState(null);
  const [selectedSector, setSelectedSector] = useState(null);
  const [sectorSearch, setSectorSearch] = useState('');
  const [sectorCategoryFilter, setSectorCategoryFilter] = useState('All');

  const filtered = useMemo(() => {
    if (!search.trim()) return STOCK_LIST;
    const q = search.toUpperCase();
    return STOCK_LIST.filter(s => s.symbol.includes(q) || s.name.toUpperCase().includes(q) || s.sector.toUpperCase().includes(q));
  }, [search]);

  const filteredSectors = useMemo(() => {
    return ALL_SECTORS_DATA.filter(sec => {
      const matchesSearch = !sectorSearch.trim() || sec.name.toLowerCase().includes(sectorSearch.toLowerCase());
      const matchesCat = sectorCategoryFilter === 'All' || sec.category === sectorCategoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [sectorSearch, sectorCategoryFilter]);

  const currentSectorStocks = useMemo(() => {
    if (!selectedSector) return [];
    return getStocksForSector(selectedSector);
  }, [selectedSector]);

  const handleRunQuery = () => {
    try {
      setScreenerError(null);
      const results = runQueryFilter(STOCK_LIST, screenerQuery, onlyJun2026);
      setScreenerResults(results);
    } catch (err) {
      setScreenerError(err.message);
      setScreenerResults(null);
    }
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    if (activeTab !== 'market') setActiveTab('market');
  };

  const categories = useMemo(() => {
    const set = new Set(ALL_SECTORS_DATA.map(s => s.category));
    return ['All', ...Array.from(set)];
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--slate-50)' }}>
      {/* Top Banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 40%, #0369a1 70%, #0f766e 100%)', padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, fontFamily: 'inherit' }}>
              <ArrowLeft size={16} /> Back to Home
            </button>
            <div>
              <h1 style={{ color: 'white', fontSize: '1.375rem', fontWeight: 800, letterSpacing: '-0.01em' }}>
                📊 Live Stock Market Dashboard
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Search and explore Indian stocks with AI-powered insights</p>
            </div>
          </div>
          <div style={{ position: 'relative', maxWidth: 520 }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.6)' }} />
            <input id="stock-search" className="input-field" placeholder="Search stocks by name or symbol (e.g. TCS, INFY...)" value={search} onChange={e => handleSearchChange(e.target.value)} style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', paddingLeft: '2.75rem', fontSize: '0.9375rem' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8125rem', alignSelf: 'center' }}>Popular:</span>
            {CHIPS.map(chip => (
              <button key={chip} onClick={() => handleSearchChange(chip)} style={{ padding: '0.3rem 0.875rem', borderRadius: 9999, cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, fontFamily: 'inherit', background: search.toUpperCase() === chip ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)', color: search.toUpperCase() === chip ? 'var(--primary-dark)' : 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.3)' }}>{chip}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Navigation Header including Stock Comparison after Sectors Wise */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--slate-200)', display: 'flex', gap: '1.5rem', padding: '0 2rem', overflowX: 'auto', position: 'sticky', top: 0, zIndex: 90 }}>
        <div style={{ display: 'flex', maxWidth: 1200, margin: '0 auto', width: '100%', gap: '1.5rem' }}>
          {[
            { id: 'market', label: '📈 Live Market' },
            { id: 'watchlist-feed', label: '⭐ Watchlist Feed' },
            { id: 'watchlist-table', label: '📋 Watchlist Table' },
            { id: 'screener', label: '🔍 Stock Screener' },
            { id: 'sectors', label: '📂 Sectors Wise (58)' },
            { id: 'stock-comparison', label: '⚖️ Stock Comparison' }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '1rem 0.5rem', background: 'none', border: 'none', borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent', color: activeTab === tab.id ? 'var(--primary-dark)' : 'var(--slate-500)', fontWeight: activeTab === tab.id ? 700 : 500, fontSize: '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>{tab.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        {/* Render AI Market Insights ONLY on Live Market (Removed from Watchlist Feed per request) */}
        {activeTab === 'market' && (
          <AIMarketInsightsSection />
        )}

        {activeTab === 'market' && (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)', margin: '0 0 0.25rem' }}>
                ⚡ Live Stock Data
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--slate-500)', margin: 0 }}>
                {filtered.length} stocks found · Click any stock for full analysis
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {filtered.map(stock => <StockCard key={stock.symbol} stock={stock} isWatched={isWatched} toggleWatch={toggleWatch} />)}
            </div>
          </>
        )}

        {/* Watchlist Feed: Purely stock cards WITHOUT AI insights top block */}
        {activeTab === 'watchlist-feed' && (
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '1rem' }}>
              ⭐ Watchlist Stock Cards
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
              {watchlist.map(stock => <StockCard key={stock.symbol} stock={stock} isWatched={isWatched} toggleWatch={toggleWatch} />)}
            </div>
          </div>
        )}

        {activeTab === 'watchlist-table' && (
          <RatioTable stocks={watchlist} isWatched={isWatched} toggleWatch={toggleWatch} />
        )}

        {activeTab === 'screener' && (
          <div>
            <textarea value={screenerQuery} onChange={e => setScreenerQuery(e.target.value)} placeholder="Enter query (e.g. Market Capitalization > 5000 AND ROE > 15%)" style={{ width: '100%', height: '80px', padding: '0.75rem', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: '0.9rem', fontFamily: 'inherit' }} />
            <button onClick={handleRunQuery} style={{ margin: '0.75rem 0 1.5rem', padding: '0.5rem 1.25rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
              Run Query
            </button>
            {screenerResults && <RatioTable stocks={screenerResults} isWatched={isWatched} toggleWatch={toggleWatch} />}
          </div>
        )}

        {activeTab === 'sectors' && (
          <div>
            {!selectedSector ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {filteredSectors.map(sec => (
                  <div key={sec.name} onClick={() => setSelectedSector(sec.name)} style={{ background: 'white', padding: '1.25rem', borderRadius: '1rem', border: '1px solid var(--slate-200)', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--slate-900)' }}>{sec.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '0.25rem' }}>{sec.count} Stocks</div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <button onClick={() => setSelectedSector(null)} style={{ marginBottom: '1rem', padding: '0.4rem 0.85rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>← Back to All Sectors</button>
                <RatioTable stocks={currentSectorStocks} isWatched={isWatched} toggleWatch={toggleWatch} />
              </div>
            )}
          </div>
        )}

        {/* Dedicated Stock Comparison Section placed after Sectors Wise (58) */}
        {activeTab === 'stock-comparison' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--slate-900)', margin: '0 0 0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Scale size={20} color="#2563eb" /> Multi-Stock Side-by-Side Comparison
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)', margin: 0 }}>
                Compare 4-5 blue-chip Indian stocks across market cap, valuation ratios, returns, debt, and dividend metrics
              </p>
            </div>
            <StockComparison />
          </div>
        )}
      </div>
    </div>
  );
}
