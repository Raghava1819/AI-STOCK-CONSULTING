import { useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Target, Award } from 'lucide-react';

// Nifty benchmark returns for each period
const NIFTY = { '1W': 0.8, '1M': 1.8, '3M': 4.2, '6M': 7.5, '1Y': 14.3, '3Y': 42.1 };

// Simulate historical returns for a stock
function simulateReturns(price, high52, low52) {
  const periods = ['1W', '1M', '3M', '6M', '1Y', '3Y'];
  const seed = price % 7;
  const base = [0.5, 2.1, 5.8, 9.2, 18.4, 52.3];
  return periods.map((p, i) => {
    const variance = (seed * (i + 1) * 0.137) % 8 - 3.5;
    const stockReturn = parseFloat((base[i] + variance).toFixed(2));
    return {
      period: p,
      Stock: stockReturn,
      'Nifty 50': NIFTY[p],
      outperforms: stockReturn > NIFTY[p],
    };
  });
}

// Generate a mini sparkline trend
function generateSparkline(price, days) {
  const data = [];
  let p = price * 0.88;
  for (let i = days; i >= 0; i--) {
    const change = (Math.random() - 0.47) * price * 0.018;
    p = Math.max(p + change, price * 0.6);
    data.push({ v: parseFloat(p.toFixed(2)) });
  }
  data[data.length - 1].v = price;
  return data;
}

const ReturnTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'white', border: '1px solid var(--slate-200)',
        borderRadius: '0.5rem', padding: '0.625rem 0.875rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontSize: '0.8rem',
      }}>
        <div style={{ fontWeight: 700, color: 'var(--slate-700)', marginBottom: '0.375rem' }}>{label} Performance</div>
        {payload.map(p => (
          <div key={p.name} style={{ color: p.fill || p.color, fontWeight: 700 }}>
            {p.name}: {p.value >= 0 ? '+' : ''}{p.value}%
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function StockPerformanceTab({ stock }) {
  const returns = useMemo(() => simulateReturns(stock.price, stock.high52, stock.low52), [stock.symbol]);
  const sparkline1Y = useMemo(() => generateSparkline(stock.price, 365), [stock.symbol]);

  const priceFromLow = ((stock.price - stock.low52) / (stock.high52 - stock.low52)) * 100;

  const performanceScore = useMemo(() => {
    const r = returns.find(r => r.period === '1Y');
    if (!r) return 50;
    // Score 0–100 based on 1Y return vs Nifty
    return Math.min(100, Math.max(0, 50 + (r.Stock - r['Nifty 50']) * 2));
  }, [returns]);

  const scoreColor = performanceScore >= 65 ? '#16a34a' : performanceScore >= 45 ? '#b45309' : '#dc2626';
  const scoreLabel = performanceScore >= 65 ? 'Outperformer' : performanceScore >= 45 ? 'Market Performer' : 'Underperformer';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Performance Score + 52W range */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {/* Performance Score */}
        <div style={{ padding: '1.25rem', background: 'linear-gradient(135deg, #f0f9ff, #f0fdfa)', borderRadius: 'var(--radius-lg)', border: '1px solid #bfdbfe' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
            Performance Score
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: scoreColor, lineHeight: 1 }}>
              {Math.round(performanceScore)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginBottom: '0.375rem' }}>/100</div>
          </div>
          <div style={{ height: 8, background: 'var(--slate-200)', borderRadius: 9999, overflow: 'hidden', marginBottom: '0.5rem' }}>
            <div style={{
              height: '100%', borderRadius: 9999, width: `${performanceScore}%`,
              background: `linear-gradient(90deg, ${performanceScore < 45 ? '#ef4444' : '#22c55e'}, ${scoreColor})`,
              transition: 'width 1s ease',
            }} />
          </div>
          <span style={{
            display: 'inline-block', padding: '0.2rem 0.625rem', borderRadius: 9999,
            fontSize: '0.75rem', fontWeight: 700,
            background: scoreColor + '18', color: scoreColor,
            border: `1px solid ${scoreColor}40`,
          }}>{scoreLabel}</span>
        </div>

        {/* 52-week range */}
        <div style={{ padding: '1.25rem', background: 'var(--slate-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
            52-Week Price Range
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#dc2626' }}>₹{stock.low52.toLocaleString('en-IN')}</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--primary-dark)' }}>₹{stock.price.toLocaleString('en-IN')}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#16a34a' }}>₹{stock.high52.toLocaleString('en-IN')}</span>
          </div>
          <div style={{ position: 'relative', height: 10, background: 'linear-gradient(90deg, #fecaca, #fde68a, #bbf7d0)', borderRadius: 9999, marginBottom: '0.375rem' }}>
            <div style={{
              position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)',
              left: `${priceFromLow}%`, width: 16, height: 16,
              background: 'var(--primary)', borderRadius: '50%',
              border: '3px solid white', boxShadow: '0 2px 8px rgba(59,130,246,0.4)',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--slate-400)' }}>
            <span>52W Low</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{priceFromLow.toFixed(0)}% from low</span>
            <span>52W High</span>
          </div>
        </div>

        {/* Target price upside */}
        <div style={{ padding: '1.25rem', background: 'var(--slate-50)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>
            Analyst Target
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 900, color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
            ₹{stock.targetPrice.toLocaleString('en-IN')}
          </div>
          {(() => {
            const upside = ((stock.targetPrice - stock.price) / stock.price) * 100;
            const isUp = upside >= 0;
            return (
              <>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: isUp ? '#16a34a' : '#dc2626', marginBottom: '0.5rem' }}>
                  {isUp ? '▲' : '▼'} {Math.abs(upside).toFixed(1)}% {isUp ? 'upside' : 'downside'}
                </div>
                <div style={{ height: 6, background: 'var(--slate-200)', borderRadius: 9999, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 9999,
                    width: `${Math.min(100, (stock.price / stock.targetPrice) * 100)}%`,
                    background: isUp ? 'linear-gradient(90deg, #22c55e, #3b82f6)' : '#ef4444',
                  }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '0.375rem' }}>
                  Current: ₹{stock.price.toLocaleString('en-IN')}
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* 1Y Trend Sparkline */}
      <div className="card" style={{ border: '1px solid var(--slate-200)' }}>
        <div className="card-header">
          <TrendingUp size={17} color="var(--primary)" />
          <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--slate-900)' }}>1-Year Price Trend</h3>
        </div>
        <div className="card-body" style={{ paddingTop: '0.5rem' }}>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={sparkline1Y} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="perfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" vertical={false} />
              <XAxis dataKey="period" hide />
              <YAxis
                domain={['auto', 'auto']}
                tick={{ fontSize: 11, fill: 'var(--slate-400)' }}
                axisLine={false} tickLine={false}
                tickFormatter={v => `₹${v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v}`}
                width={52}
              />
              <Tooltip
                formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Price']}
                contentStyle={{ fontSize: '0.8rem', borderRadius: '0.5rem', border: '1px solid var(--slate-200)' }}
              />
              <Area type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2.5}
                fill="url(#perfGrad)" dot={false}
                activeDot={{ r: 5, fill: '#3b82f6', strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Period Returns vs Benchmark */}
      <div className="card" style={{ border: '1px solid var(--slate-200)' }}>
        <div className="card-header">
          <Award size={17} color="#f59e0b" />
          <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--slate-900)' }}>Period Returns vs Nifty 50</h3>
        </div>
        <div className="card-body">
          {/* Period return table */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {returns.map(r => (
              <div key={r.period} style={{
                padding: '0.875rem 0.75rem', borderRadius: 'var(--radius)',
                background: r.outperforms ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${r.outperforms ? '#bbf7d0' : '#fecaca'}`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '0.375rem' }}>
                  {r.period}
                </div>
                <div style={{ fontSize: '1.125rem', fontWeight: 800, color: r.Stock >= 0 ? '#16a34a' : '#dc2626', marginBottom: '0.25rem' }}>
                  {r.Stock >= 0 ? '+' : ''}{r.Stock}%
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--slate-400)' }}>
                  Nifty: {r['Nifty 50']}%
                </div>
                <div style={{
                  marginTop: '0.375rem', fontSize: '0.65rem', fontWeight: 700,
                  color: r.outperforms ? '#16a34a' : '#dc2626',
                }}>
                  {r.outperforms ? '↑ Beat' : '↓ Lagged'}
                </div>
              </div>
            ))}
          </div>

          {/* Bar chart comparison */}
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={returns} margin={{ top: 4, right: 4, left: 0, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" vertical={false} />
              <XAxis dataKey="period" tick={{ fontSize: 11, fill: 'var(--slate-500)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--slate-400)' }} axisLine={false} tickLine={false}
                tickFormatter={v => `${v}%`} />
              <ReferenceLine y={0} stroke="var(--slate-300)" strokeWidth={1} />
              <Tooltip content={<ReturnTooltip />} />
              <Bar dataKey="Stock" name={stock.symbol} fill="#3b82f6" fillOpacity={0.85} radius={[4, 4, 0, 0]} maxBarSize={32} />
              <Bar dataKey="Nifty 50" fill="#f59e0b" fillOpacity={0.7} radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
