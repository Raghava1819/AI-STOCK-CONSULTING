import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, Star, Download, TrendingUp, TrendingDown,
  BarChart2, FileText, Users, PieChart, ChevronRight, CheckCircle, XCircle, BookOpen
} from 'lucide-react';
import { STOCKS } from '../data/stockData';

const TABS = ['Overview', 'Quarters', 'Analysis', 'Shareholding', 'Peers', 'Documents'];

function MetricBox({ label, value }) {
  return (
    <div style={{
      padding: '1rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)',
      borderRadius: 'var(--radius)', transition: 'all 0.2s'
    }}
      onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--slate-50)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.375rem' }}>
        {label}
      </div>
      <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>{value}</div>
    </div>
  );
}

function RecommendationBadge({ rec, large }) {
  const colors = {
    'BUY': { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0' },
    'STRONG BUY': { bg: '#dcfce7', color: '#15803d', border: '#86efac' },
    'HOLD': { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
    'SELL': { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  };
  const c = colors[rec] || colors['HOLD'];
  return (
    <span style={{
      display: 'inline-block', padding: large ? '0.375rem 1rem' : '0.15rem 0.6rem',
      borderRadius: 9999, fontSize: large ? '0.9375rem' : '0.75rem',
      fontWeight: 700, background: c.bg, color: c.color,
      border: `1px solid ${c.border}`, letterSpacing: '0.05em'
    }}>
      {rec}
    </span>
  );
}

// ─── Tab: Overview ────────────────────────────────────────────────────────────
function OverviewTab({ stock }) {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.75rem', fontSize: '1.0625rem' }}>About {stock.name}</h3>
        <p style={{ color: 'var(--slate-600)', lineHeight: 1.7, fontSize: '0.9375rem' }}>{stock.about}</p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.75rem', fontSize: '1.0625rem' }}>Key Points</h3>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {stock.keyPoints.map((point, i) => (
            <li key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
              <CheckCircle size={16} color="#16a34a" style={{ marginTop: '0.1rem', flexShrink: 0 }} />
              <span style={{ color: 'var(--slate-700)', fontSize: '0.9375rem' }}>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <h3 style={{ fontWeight: 700, color: '#16a34a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
            <CheckCircle size={17} /> Pros
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {stock.pros.map((p, i) => (
              <li key={i} style={{
                padding: '0.625rem 0.875rem', background: '#f0fdf4', border: '1px solid #bbf7d0',
                borderRadius: 'var(--radius)', fontSize: '0.875rem', color: '#15803d'
              }}>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 style={{ fontWeight: 700, color: '#dc2626', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem' }}>
            <XCircle size={17} /> Cons
          </h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {stock.cons.map((c, i) => (
              <li key={i} style={{
                padding: '0.625rem 0.875rem', background: '#fef2f2', border: '1px solid #fecaca',
                borderRadius: 'var(--radius)', fontSize: '0.875rem', color: '#dc2626'
              }}>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Quarters ────────────────────────────────────────────────────────────
function QuartersTab({ stock }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: 'var(--slate-50)', borderBottom: '2px solid var(--slate-200)' }}>
            {['Quarter', 'Net Sales (₹ Cr)', 'Expenses (₹ Cr)', 'Op. Profit (₹ Cr)', 'Op. Margin %'].map(h => (
              <th key={h} style={{ padding: '0.875rem 1rem', textAlign: h === 'Quarter' ? 'left' : 'right', fontWeight: 700, color: 'var(--slate-700)', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stock.quarterly.map((q, i) => {
            const margin = ((q.opProfit / q.sales) * 100).toFixed(1);
            return (
              <tr key={i} style={{ borderBottom: '1px solid var(--slate-100)', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: 'var(--slate-900)' }}>{q.period}</td>
                <td style={{ padding: '0.875rem 1rem', textAlign: 'right', color: 'var(--slate-700)' }}>{q.sales.toLocaleString('en-IN')}</td>
                <td style={{ padding: '0.875rem 1rem', textAlign: 'right', color: 'var(--slate-700)' }}>{q.expenses.toLocaleString('en-IN')}</td>
                <td style={{ padding: '0.875rem 1rem', textAlign: 'right', fontWeight: 700, color: 'var(--primary-dark)' }}>{q.opProfit.toLocaleString('en-IN')}</td>
                <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                  <span style={{
                    display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: 9999,
                    fontSize: '0.8125rem', fontWeight: 700,
                    background: Number(margin) > 20 ? '#f0fdf4' : '#fffbeb',
                    color: Number(margin) > 20 ? '#16a34a' : '#b45309'
                  }}>
                    {margin}%
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Tab: Analysis ────────────────────────────────────────────────────────────
function AnalysisTab({ stock }) {
  const colors = { BUY: '#16a34a', 'STRONG BUY': '#15803d', HOLD: '#b45309', SELL: '#dc2626' };
  return (
    <div>
      <div style={{
        padding: '1.5rem', background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
        borderRadius: 'var(--radius-lg)', border: '1px solid #bae6fd', marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontWeight: 600, marginBottom: '0.375rem' }}>AI RECOMMENDATION</div>
            <RecommendationBadge rec={stock.recommendation} large />
            <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--slate-600)' }}>
              12-month target price: <strong style={{ color: 'var(--primary-dark)', fontSize: '1.0625rem' }}>₹{stock.targetPrice.toLocaleString('en-IN')}</strong>
              <span style={{ marginLeft: '0.5rem', color: 'var(--teal-dark)', fontWeight: 600 }}>
                (+{(((stock.targetPrice - stock.price) / stock.price) * 100).toFixed(1)}% upside)
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontWeight: 600, marginBottom: '0.375rem' }}>OVERALL RATING</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: colors[stock.recommendation] || '#b45309' }}>{stock.rating}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>out of 10</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontWeight: 600, marginBottom: '0.375rem' }}>AI CONFIDENCE</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-dark)' }}>{stock.confidence}%</div>
            <div style={{ width: '100%', height: 6, background: 'var(--slate-200)', borderRadius: 9999, marginTop: '0.375rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${stock.confidence}%`, background: 'linear-gradient(90deg, var(--primary), var(--teal))', borderRadius: 9999 }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <h3 style={{ fontWeight: 700, color: '#16a34a', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={17} /> Strengths
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {stock.pros.map((p, i) => (
              <div key={i} style={{
                display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
                padding: '0.625rem', background: '#f0fdf4', borderRadius: 'var(--radius)', border: '1px solid #dcfce7'
              }}>
                <CheckCircle size={15} color="#16a34a" style={{ marginTop: '0.1rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.875rem', color: '#15803d' }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ fontWeight: 700, color: '#dc2626', marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <XCircle size={17} /> Concerns
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {stock.cons.map((c, i) => (
              <div key={i} style={{
                display: 'flex', gap: '0.5rem', alignItems: 'flex-start',
                padding: '0.625rem', background: '#fef2f2', borderRadius: 'var(--radius)', border: '1px solid #fee2e2'
              }}>
                <XCircle size={15} color="#dc2626" style={{ marginTop: '0.1rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.875rem', color: '#dc2626' }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Shareholding ────────────────────────────────────────────────────────
function ShareholdingTab({ stock }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: 'var(--slate-50)', borderBottom: '2px solid var(--slate-200)' }}>
            {['Quarter', 'Promoter %', 'FII %', 'DII %', 'Public %'].map(h => (
              <th key={h} style={{ padding: '0.875rem 1rem', textAlign: h === 'Quarter' ? 'left' : 'right', fontWeight: 700, color: 'var(--slate-700)', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stock.shareholding.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--slate-100)', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: 'var(--slate-900)' }}>{row.period}</td>
              {[
                { val: row.promoter, color: '#2563eb' },
                { val: row.fii, color: '#0d9488' },
                { val: row.dii, color: '#f59e0b' },
                { val: row.public, color: '#8b5cf6' },
              ].map(({ val, color }, idx) => (
                <td key={idx} style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                  <span style={{ fontWeight: 700, color }}>{val.toFixed(1)}%</span>
                  <div style={{ height: 4, background: 'var(--slate-100)', borderRadius: 9999, marginTop: '0.25rem', overflow: 'hidden', width: '100%' }}>
                    <div style={{ height: '100%', width: `${val}%`, background: color, borderRadius: 9999, opacity: 0.4 }} />
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Tab: Peers ───────────────────────────────────────────────────────────────
function PeersTab({ stock }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ background: 'var(--slate-50)', borderBottom: '2px solid var(--slate-200)' }}>
            {['Company', 'Price', 'Mkt Cap (₹ Cr)', 'P/E', 'ROE %', 'Debt/Equity'].map(h => (
              <th key={h} style={{ padding: '0.875rem 1rem', textAlign: h === 'Company' ? 'left' : 'right', fontWeight: 700, color: 'var(--slate-700)', fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stock.peers.map((peer, i) => (
            <tr key={i}
              style={{
                borderBottom: '1px solid var(--slate-100)', transition: 'background 0.15s',
                background: peer.symbol === stock.symbol ? '#eff6ff' : 'transparent'
              }}
              onMouseEnter={e => { if (peer.symbol !== stock.symbol) e.currentTarget.style.background = '#f8fafc'; }}
              onMouseLeave={e => { if (peer.symbol !== stock.symbol) e.currentTarget.style.background = 'transparent'; }}
            >
              <td style={{ padding: '0.875rem 1rem' }}>
                <Link to={`/stock/${peer.symbol}`} style={{ textDecoration: 'none' }}>
                  <div style={{ fontWeight: 700, color: peer.symbol === stock.symbol ? 'var(--primary-dark)' : 'var(--slate-900)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {peer.symbol === stock.symbol && <span style={{ fontSize: '0.7rem', background: 'var(--primary-dark)', color: 'white', padding: '0.1rem 0.4rem', borderRadius: 4 }}>Current</span>}
                    {peer.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-400)' }}>{peer.symbol}</div>
                </Link>
              </td>
              <td style={{ padding: '0.875rem 1rem', textAlign: 'right', fontWeight: 700, color: 'var(--slate-900)' }}>₹{peer.price.toLocaleString('en-IN')}</td>
              <td style={{ padding: '0.875rem 1rem', textAlign: 'right', color: 'var(--slate-700)' }}>{peer.marketCap}</td>
              <td style={{ padding: '0.875rem 1rem', textAlign: 'right', color: 'var(--slate-700)' }}>{peer.pe}x</td>
              <td style={{ padding: '0.875rem 1rem', textAlign: 'right', fontWeight: 600, color: peer.roe > 20 ? '#16a34a' : 'var(--slate-700)' }}>{peer.roe}%</td>
              <td style={{ padding: '0.875rem 1rem', textAlign: 'right', color: peer.debtEquity > 0.5 ? '#dc2626' : 'var(--slate-700)' }}>{peer.debtEquity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Tab: Documents ───────────────────────────────────────────────────────────
function DocumentsTab({ stock }) {
  const [downloaded, setDownloaded] = useState(null);
  return (
    <div>
      <p style={{ fontSize: '0.9rem', color: 'var(--slate-500)', marginBottom: '1.5rem' }}>
        Official filings and reports for {stock.name}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {stock.documents.map((doc, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '1rem 1.25rem', background: 'var(--slate-50)', border: '1px solid var(--slate-200)',
            borderRadius: 'var(--radius)', transition: 'all 0.2s'
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.borderColor = 'var(--primary-light)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--slate-50)'; e.currentTarget.style.borderColor = 'var(--slate-200)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} color="#dc2626" />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--slate-900)', fontSize: '0.9375rem' }}>{doc.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-400)', marginTop: '0.125rem' }}>{doc.type} · {doc.date}</div>
              </div>
            </div>
            <button
              onClick={() => { setDownloaded(i); setTimeout(() => setDownloaded(null), 2000); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.375rem',
                padding: '0.5rem 1rem', borderRadius: 'var(--radius)',
                background: downloaded === i ? '#f0fdf4' : 'white',
                border: `1px solid ${downloaded === i ? '#bbf7d0' : 'var(--slate-200)'}`,
                color: downloaded === i ? '#16a34a' : 'var(--slate-600)',
                cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'inherit',
                transition: 'all 0.2s'
              }}
            >
              {downloaded === i ? <><CheckCircle size={15} /> Downloaded!</> : <><Download size={15} /> Download</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Stock Detail Page ────────────────────────────────────────────────────
export default function StockDetailPage() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [followed, setFollowed] = useState(false);
  const [exported, setExported] = useState(false);

  const stock = STOCKS[symbol?.toUpperCase()];

  if (!stock) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ fontSize: '4rem' }}>🔍</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)' }}>Stock not found</h2>
        <p style={{ color: 'var(--slate-500)' }}>"{symbol}" is not in our database yet.</p>
        <button className="btn-primary" onClick={() => navigate('/demo')}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>
    );
  }

  const isUp = stock.change >= 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--slate-50)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 40%, #0369a1 80%, #0f766e 100%)',
        padding: '1.5rem 2rem 2rem', color: 'white'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Back button */}
          <button
            onClick={() => navigate('/demo')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1.25rem',
              background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
              color: 'white', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer',
              fontSize: '0.875rem', fontWeight: 500, fontFamily: 'inherit', transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          >
            <ArrowLeft size={16} /> Back to Demo
          </button>

          {/* Company info row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em' }}>{stock.name}</h1>
                <span style={{
                  padding: '0.2rem 0.75rem', borderRadius: 9999,
                  background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)',
                  fontSize: '0.8125rem', border: '1px solid rgba(255,255,255,0.3)'
                }}>
                  {stock.sector}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', flexWrap: 'wrap' }}>
                <a href={`https://${stock.website}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                  <ExternalLink size={13} /> {stock.website}
                </a>
                <span>BSE: {stock.bseCode}</span>
                <span>NSE: {stock.nseCode}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => { setExported(true); setTimeout(() => setExported(false), 2000); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.625rem 1.25rem', borderRadius: 'var(--radius)',
                  background: exported ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  color: exported ? 'var(--primary-dark)' : 'white',
                  cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s'
                }}
              >
                <Download size={15} />
                {exported ? 'Exported!' : 'Export to Excel'}
              </button>
              <button
                onClick={() => setFollowed(f => !f)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.625rem 1.25rem', borderRadius: 'var(--radius)',
                  background: followed ? 'rgba(255,215,0,0.25)' : 'rgba(255,255,255,0.15)',
                  border: `1px solid ${followed ? 'rgba(255,215,0,0.6)' : 'rgba(255,255,255,0.4)'}`,
                  color: followed ? '#fcd34d' : 'white',
                  cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s'
                }}
              >
                <Star size={15} style={{ fill: followed ? '#fcd34d' : 'transparent' }} />
                {followed ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>

          {/* Price row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginTop: '1.25rem' }}>
            <div style={{ fontSize: '2.75rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
              ₹{stock.price.toLocaleString('en-IN')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '1.0625rem', fontWeight: 700, color: isUp ? '#4ade80' : '#f87171' }}>
              {isUp ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              {isUp ? '+' : ''}{stock.change} ({isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
        {/* Key Metrics Grid */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BarChart2 size={18} /> Key Metrics
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
            <MetricBox label="Market Cap" value={`₹${stock.marketCap}`} />
            <MetricBox label="P/E Ratio" value={stock.pe} />
            <MetricBox label="Book Value" value={`₹${stock.bookValue}`} />
            <MetricBox label="Dividend Yield" value={`${stock.dividendYield}%`} />
            <MetricBox label="ROCE" value={`${stock.roce}%`} />
            <MetricBox label="ROE" value={`${stock.roe}%`} />
            <MetricBox label="Face Value" value={`₹${stock.faceValue}`} />
            <MetricBox label="PAT" value={`₹${stock.pat}`} />
            <MetricBox label="52W High" value={`₹${stock.high52.toLocaleString('en-IN')}`} />
            <MetricBox label="52W Low" value={`₹${stock.low52.toLocaleString('en-IN')}`} />
            <MetricBox label="EPS Growth" value={`${stock.epsGrowth}%`} />
            <MetricBox label="Debt/Equity" value={stock.debtEquity} />
            <MetricBox label="Promoter %" value={`${stock.promoterHolding}%`} />
            <MetricBox label="FII %" value={`${stock.fiiHolding}%`} />
            <MetricBox label="DII %" value={`${stock.diiHolding}%`} />
            <MetricBox label="PEG Ratio" value={stock.peg} />
            <MetricBox label="EV/EBITDA" value={stock.evEbitda} />
            <MetricBox label="Target Price" value={`₹${stock.targetPrice.toLocaleString('en-IN')}`} />
          </div>
        </div>

        {/* Tabs */}
        <div className="card">
          {/* Tab Buttons */}
          <div style={{ display: 'flex', borderBottom: '2px solid var(--slate-100)', overflowX: 'auto' }}>
            {TABS.map(tab => (
              <button
                key={tab}
                id={`tab-${tab.toLowerCase()}`}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.875rem 1.25rem', border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 600, whiteSpace: 'nowrap',
                  background: 'transparent', transition: 'all 0.2s',
                  color: activeTab === tab ? 'var(--primary-dark)' : 'var(--slate-500)',
                  borderBottom: activeTab === tab ? '2px solid var(--primary-dark)' : '2px solid transparent',
                  marginBottom: '-2px',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div style={{ padding: '1.75rem' }}>
            {activeTab === 'Overview' && <OverviewTab stock={stock} />}
            {activeTab === 'Quarters' && <QuartersTab stock={stock} />}
            {activeTab === 'Analysis' && <AnalysisTab stock={stock} />}
            {activeTab === 'Shareholding' && <ShareholdingTab stock={stock} />}
            {activeTab === 'Peers' && <PeersTab stock={stock} />}
            {activeTab === 'Documents' && <DocumentsTab stock={stock} />}
          </div>
        </div>
      </div>
    </div>
  );
}
