import { useState } from 'react';
import { GitCompare, X, ChevronDown } from 'lucide-react';
import { STOCK_LIST } from '../data/stockData';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Legend, Tooltip
} from 'recharts';

const METRICS = [
  { key: 'price', label: 'Price (₹)', format: v => `₹${v.toLocaleString('en-IN')}`, higherIsBetter: false },
  { key: 'pe', label: 'P/E Ratio', format: v => v?.toFixed(1), higherIsBetter: false },
  { key: 'roe', label: 'ROE (%)', format: v => `${v}%`, higherIsBetter: true },
  { key: 'roce', label: 'ROCE (%)', format: v => `${v}%`, higherIsBetter: true },
  { key: 'dividendYield', label: 'Div Yield (%)', format: v => `${v}%`, higherIsBetter: true },
  { key: 'debtEquity', label: 'Debt to Equity', format: v => v !== undefined ? v.toFixed(2) : '0.00', higherIsBetter: false },
  { key: 'promoterHolding', label: 'Promoter Holding (%)', format: v => v !== undefined ? `${v}%` : 'N/A', higherIsBetter: true },
  { key: 'epsGrowth', label: 'Sales Growth (%)', format: v => v !== undefined ? `${v}%` : 'N/A', higherIsBetter: true },
  { key: 'high52', label: '52W High (₹)', format: v => `₹${v.toLocaleString('en-IN')}`, higherIsBetter: true },
  { key: 'low52', label: '52W Low (₹)', format: v => `₹${v.toLocaleString('en-IN')}`, higherIsBetter: false },
  { key: 'confidence', label: 'AI Confidence (%)', format: v => `${v}%`, higherIsBetter: true },
];

const RADAR_METRICS = ['roe', 'roce', 'dividendYield', 'confidence'];
const RADAR_LABELS = { roe: 'ROE', roce: 'ROCE', dividendYield: 'Div Yield', confidence: 'AI Conf' };

const COLORS = ['#3b82f6', '#14b8a6', '#f59e0b', '#dc2626'];

function getBestIdx(stocks, key, higherIsBetter) {
  if (stocks.length < 2) return -1;
  const vals = stocks.map(s => {
    let val = s[key];
    if (key === 'marketCap' && typeof val === 'string') {
      val = parseFloat(val.replace(/,/g, '').replace(' Cr', ''));
    }
    return val ?? 0;
  });
  const best = higherIsBetter ? Math.max(...vals) : Math.min(...vals);
  return vals.findIndex(v => v === best);
}

export default function StockComparison() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState('');

  const filtered = STOCK_LIST.filter(s =>
    !selected.find(x => x.symbol === s.symbol) &&
    (s.symbol.includes(search.toUpperCase()) || s.name.toUpperCase().includes(search.toUpperCase()))
  ).slice(0, 8);

  const addStock = (stock) => {
    if (selected.length >= 4) return;
    setSelected(prev => [...prev, stock]);
    setSearch('');
  };

  const removeStock = (symbol) => setSelected(prev => prev.filter(s => s.symbol !== symbol));

  const radarData = RADAR_METRICS.map(key => {
    const row = { metric: RADAR_LABELS[key] };
    selected.forEach(s => { row[s.symbol] = s[key] ?? 0; });
    return row;
  });

  const recColor = { 'BUY': '#16a34a', 'STRONG BUY': '#15803d', 'HOLD': '#b45309', 'SELL': '#dc2626' };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.625rem 1.25rem', borderRadius: 'var(--radius)',
          background: open ? 'linear-gradient(135deg, #3b82f6, #14b8a6)' : 'white',
          color: open ? 'white' : 'var(--primary)',
          border: '1.5px solid var(--primary)', fontWeight: 700, fontSize: '0.875rem',
          fontFamily: 'inherit', cursor: 'pointer', transition: 'all 0.2s',
        }}
      >
        <GitCompare size={16} /> Compare Stocks
        <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {open && (
        <div style={{ marginTop: '1rem', background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-md)', padding: '1.5rem', animation: 'fadeInUp 0.3s ease' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.5rem', fontSize: '1rem' }}>
              Select 2–4 stocks to compare
              <span style={{ fontWeight: 400, color: 'var(--slate-500)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>({selected.length}/4 selected)</span>
            </div>

            {/* Selected chips */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              {selected.map((s, i) => (
                <span key={s.symbol} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.3rem 0.75rem', borderRadius: 9999, fontWeight: 700, fontSize: '0.8rem',
                  background: COLORS[i] + '1a', color: COLORS[i], border: `1.5px solid ${COLORS[i]}`,
                }}>
                  {s.symbol}
                  <button onClick={() => removeStock(s.symbol)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS[i], padding: 0, display: 'flex' }}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>

            {/* Search */}
            {selected.length < 4 && (
              <div style={{ position: 'relative' }}>
                <input
                  placeholder="Search to add stock…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: '100%', padding: '0.5rem 0.875rem',
                    border: '1.5px solid var(--slate-200)', borderRadius: 'var(--radius)',
                    fontSize: '0.875rem', fontFamily: 'inherit', background: 'var(--slate-50)',
                  }}
                />
                {search && (
                  <div style={{
                    position: 'absolute', top: '110%', left: 0, right: 0, zIndex: 50,
                    background: 'white', border: '1px solid var(--slate-200)', borderRadius: 'var(--radius)',
                    boxShadow: 'var(--shadow-lg)', maxHeight: 220, overflowY: 'auto',
                  }}>
                    {filtered.map(s => (
                      <div key={s.symbol}
                        onClick={() => addStock(s)}
                        style={{
                          padding: '0.625rem 1rem', cursor: 'pointer',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          borderBottom: '1px solid var(--slate-100)', transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'white'}
                      >
                        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--slate-900)' }}>{s.symbol}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>{s.name}</span>
                      </div>
                    ))}
                    {filtered.length === 0 && <div style={{ padding: '0.75rem 1rem', color: 'var(--slate-400)', fontSize: '0.875rem' }}>No results</div>}
                  </div>
                )}
              </div>
            )}
          </div>

          {selected.length >= 2 && (
            <>
              {/* Metrics table */}
              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--slate-200)' }}>
                      <th style={{ textAlign: 'left', padding: '0.5rem 0.75rem', color: 'var(--slate-500)', fontWeight: 600, fontSize: '0.8rem' }}>Metric</th>
                      {selected.map((s, i) => (
                        <th key={s.symbol} style={{ textAlign: 'right', padding: '0.5rem 0.75rem', color: COLORS[i], fontWeight: 700 }}>{s.symbol}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {METRICS.map(m => {
                      const bestIdx = getBestIdx(selected, m.key, m.higherIsBetter);
                      return (
                        <tr key={m.key} style={{ borderBottom: '1px solid var(--slate-100)' }}>
                          <td style={{ padding: '0.5rem 0.75rem', color: 'var(--slate-600)', fontWeight: 500 }}>{m.label}</td>
                          {selected.map((s, i) => (
                            <td key={s.symbol} style={{
                              textAlign: 'right', padding: '0.5rem 0.75rem', fontWeight: 700,
                              color: i === bestIdx ? '#16a34a' : 'var(--slate-800)',
                              background: i === bestIdx ? '#f0fdf4' : 'transparent',
                              borderRadius: i === bestIdx ? '4px' : 0,
                            }}>
                              {m.format(s[m.key])}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                    {/* Recommendation row */}
                    <tr style={{ borderBottom: '1px solid var(--slate-100)' }}>
                      <td style={{ padding: '0.5rem 0.75rem', color: 'var(--slate-600)', fontWeight: 500 }}>Recommendation</td>
                      {selected.map(s => (
                        <td key={s.symbol} style={{ textAlign: 'right', padding: '0.5rem 0.75rem' }}>
                          <span style={{
                            display: 'inline-block', padding: '0.15rem 0.6rem', borderRadius: 9999,
                            fontSize: '0.7rem', fontWeight: 700,
                            color: recColor[s.recommendation] || 'var(--slate-600)',
                            background: (recColor[s.recommendation] || '#64748b') + '18',
                            border: `1px solid ${(recColor[s.recommendation] || '#64748b')}50`,
                          }}>
                            {s.recommendation}
                          </span>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Radar chart */}
              <div>
                <div style={{ fontWeight: 700, color: 'var(--slate-700)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                  📊 Visual Comparison
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                    <PolarGrid stroke="var(--slate-200)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: 'var(--slate-600)' }} />
                    {selected.map((s, i) => (
                      <Radar key={s.symbol} name={s.symbol} dataKey={s.symbol}
                        stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.15} strokeWidth={2}
                      />
                    ))}
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
