import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell,
  LineChart, Line, Legend
} from 'recharts';
import { TrendingUp, TrendingDown, Award, AlertTriangle, DollarSign, BarChart2 } from 'lucide-react';
import { STOCK_LIST } from '../data/stockData';

function getPriceForSymbol(symbol) {
  const s = STOCK_LIST.find(x => x.symbol === symbol);
  return s?.price ?? null;
}

function getSectorForSymbol(symbol) {
  const s = STOCK_LIST.find(x => x.symbol === symbol);
  return s?.sector ?? 'Other';
}

// Simulated historical returns for benchmark comparison
function generateReturnsData(portfolio) {
  const periods = ['1M', '3M', '6M', '1Y'];
  const niftyReturns = { '1M': 1.8, '3M': 4.2, '6M': 7.5, '1Y': 14.3 };
  return periods.map(p => {
    const mul = { '1M': 0.02, '3M': 0.06, '6M': 0.12, '1Y': 0.25 };
    let totalInvested = 0, totalCurrent = 0;
    portfolio.forEach(item => {
      const cp = getPriceForSymbol(item.symbol) ?? item.avgPrice;
      const variance = (Math.random() - 0.45) * mul[p];
      const historicalPrice = cp * (1 - mul[p] / 2 + variance);
      totalInvested += item.quantity * historicalPrice;
      totalCurrent += item.quantity * cp;
    });
    const portfolioReturn = totalInvested > 0
      ? parseFloat(((totalCurrent - totalInvested) / totalInvested * 100).toFixed(2))
      : 0;
    return { period: p, Portfolio: portfolioReturn, 'Nifty 50': niftyReturns[p] };
  });
}

const BarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value;
    const isUp = val >= 0;
    return (
      <div style={{
        background: 'white', border: '1px solid var(--slate-200)',
        borderRadius: '0.5rem', padding: '0.625rem 0.875rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontSize: '0.8rem',
      }}>
        <div style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.25rem' }}>{label}</div>
        <div style={{ fontWeight: 700, color: isUp ? '#16a34a' : '#dc2626' }}>
          {isUp ? '+' : ''}{val.toFixed(2)}%
        </div>
      </div>
    );
  }
  return null;
};

const BenchmarkTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'white', border: '1px solid var(--slate-200)',
        borderRadius: '0.5rem', padding: '0.625rem 0.875rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontSize: '0.8rem',
      }}>
        <div style={{ fontWeight: 700, color: 'var(--slate-700)', marginBottom: '0.375rem' }}>{label} Returns</div>
        {payload.map(p => (
          <div key={p.name} style={{ color: p.color, fontWeight: 700 }}>
            {p.name}: {p.value >= 0 ? '+' : ''}{p.value}%
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function PortfolioPerformance({ portfolio, setPortfolio }) {
  const enriched = useMemo(() => {
    return portfolio.map(item => {
      const currentPrice = getPriceForSymbol(item.symbol) ?? item.avgPrice;
      const investedValue = item.quantity * item.avgPrice;
      const currentValue = item.quantity * currentPrice;
      const gain = currentValue - investedValue;
      const gainPct = (gain / investedValue) * 100;
      const sector = getSectorForSymbol(item.symbol);
      const stockInfo = STOCK_LIST.find(st => st.symbol === item.symbol);
      const pe = stockInfo?.pe ?? 20;
      const dividendYield = stockInfo?.dividendYield ?? 0;
      return { ...item, currentPrice, investedValue, currentValue, gain, gainPct, sector, pe, dividendYield };
    });
  }, [portfolio]);

  const totalInvested = enriched.reduce((s, x) => s + x.investedValue, 0);
  const totalCurrent = enriched.reduce((s, x) => s + x.currentValue, 0);
  const totalGain = totalCurrent - totalInvested;
  const totalGainPct = totalInvested > 0 ? (totalGain / totalInvested) * 100 : 0;

  const best = [...enriched].sort((a, b) => b.gainPct - a.gainPct)[0];
  const worst = [...enriched].sort((a, b) => a.gainPct - b.gainPct)[0];

  const barData = enriched.map(x => ({ name: x.symbol, return: parseFloat(x.gainPct.toFixed(2)) }));
  const returnsData = useMemo(() => generateReturnsData(portfolio), [portfolio]);

  // Sector P&L grouping
  const sectorData = useMemo(() => {
    const map = {};
    enriched.forEach(x => {
      if (!map[x.sector]) map[x.sector] = { invested: 0, current: 0 };
      map[x.sector].invested += x.investedValue;
      map[x.sector].current += x.currentValue;
    });
    return Object.entries(map).map(([sector, d]) => ({
      sector,
      gain: parseFloat(((d.current - d.invested) / d.invested * 100).toFixed(2)),
    }));
  }, [enriched]);

  // Sector weight allocation
  const sectorWeights = useMemo(() => {
    const weights = {};
    enriched.forEach(item => {
      weights[item.sector] = (weights[item.sector] || 0) + item.currentValue;
    });
    return Object.entries(weights).map(([sector, val]) => ({
      sector,
      weight: (val / totalCurrent) * 100
    }));
  }, [enriched, totalCurrent]);

  // Average PE
  const avgPE = useMemo(() => {
    if (enriched.length === 0) return 0;
    const peSum = enriched.reduce((s, x) => s + x.pe * x.currentValue, 0);
    return peSum / totalCurrent;
  }, [enriched, totalCurrent]);

  // Average Yield
  const avgYield = useMemo(() => {
    if (enriched.length === 0) return 0;
    const yieldSum = enriched.reduce((s, x) => s + x.dividendYield * x.currentValue, 0);
    return yieldSum / totalCurrent;
  }, [enriched, totalCurrent]);

  // Rebalance Handler
  const handleRebalance = (type) => {
    if (!setPortfolio) return;
    let updated = [...portfolio];
    
    if (type === 'sector') {
      const itIdx = updated.findIndex(s => ['TCS', 'INFY', 'WIPRO'].includes(s.symbol));
      if (itIdx !== -1) {
        const itStock = updated[itIdx];
        const reduceQty = Math.floor(itStock.quantity * 0.35);
        if (reduceQty > 0) {
          updated[itIdx] = { ...itStock, quantity: itStock.quantity - reduceQty };
          const buyQty = Math.floor((reduceQty * (itStock.symbol === 'TCS' ? 3700 : 1450)) / 253.05);
          const vIdx = updated.findIndex(s => s.symbol === 'VEDL');
          if (vIdx !== -1) {
            updated[vIdx].quantity += buyQty;
          } else {
            updated.push({ symbol: 'VEDL', quantity: buyQty, avgPrice: 253.05 });
          }
          setPortfolio(updated);
          alert(`Successfully rebalanced! Reduced IT exposure by selling ${reduceQty} shares of ${itStock.symbol} and purchased ${buyQty} shares of VEDL (Vedanta) to diversify sector concentration.`);
        }
      }
    } else if (type === 'pe') {
      const highPEIdx = updated.findIndex(s => ['TCS', 'INFY'].includes(s.symbol));
      if (highPEIdx !== -1) {
        const stock = updated[highPEIdx];
        const reduceQty = Math.floor(stock.quantity * 0.4);
        if (reduceQty > 0) {
          updated[highPEIdx] = { ...stock, quantity: stock.quantity - reduceQty };
          const buyQty = Math.floor((reduceQty * (stock.symbol === 'TCS' ? 3700 : 1450)) / 253.05);
          const vIdx = updated.findIndex(s => s.symbol === 'VEDL');
          if (vIdx !== -1) {
            updated[vIdx].quantity += buyQty;
          } else {
            updated.push({ symbol: 'VEDL', quantity: buyQty, avgPrice: 253.05 });
          }
          setPortfolio(updated);
          alert(`Successfully optimized! Sold ${reduceQty} shares of high-valuation ${stock.symbol} and bought ${buyQty} shares of value-stock VEDL (P/E 5.7x) to reduce average P/E.`);
        }
      }
    } else if (type === 'yield') {
      const vIdx = updated.findIndex(s => s.symbol === 'VEDL');
      const buyQty = 100;
      if (vIdx !== -1) {
        updated[vIdx].quantity += buyQty;
      } else {
        updated.push({ symbol: 'VEDL', quantity: buyQty, avgPrice: 253.05 });
      }
      setPortfolio(updated);
      alert(`Yield boosted! Added ${buyQty} shares of VEDL (Vedanta, 17.19% dividend yield) to your holdings to increase income generation.`);
    }
  };

  const recommendations = [];
  const itWeight = sectorWeights.find(w => w.sector === 'Information Technology')?.weight || 0;
  if (itWeight > 40) {
    recommendations.push({
      type: 'sector',
      title: '🚨 High Sector Over-concentration (IT)',
      desc: `Information Technology makes up ${itWeight.toFixed(1)}% of your portfolio value. Consider diversifying into Metals & Mining (Vedanta) or Chemicals (Asian Paints) to reduce sector risk.`,
      btn: 'Diversify IT weight'
    });
  }
  if (avgPE > 24) {
    recommendations.push({
      type: 'pe',
      title: '💎 High Average Valuation (P/E)',
      desc: `Your portfolio's average P/E ratio is ${avgPE.toFixed(1)}x, which is relatively premium. Swap some high-PE stocks for value stocks like Vedanta (P/E 5.7x) to optimize downside protection.`,
      btn: 'Optimize Valuation'
    });
  }
  if (avgYield < 1.5) {
    recommendations.push({
      type: 'yield',
      title: '💰 Low Dividend Yield',
      desc: `Your portfolio average dividend yield is ${avgYield.toFixed(2)}%, which is below average. Add high-dividend yield stocks like Vedanta (17.19% yield) or National Aluminium (3.09% yield) to boost cash inflow.`,
      btn: 'Boost Dividend Yield'
    });
  }

  if (portfolio.length === 0) return null;

  const isUp = totalGain >= 0;
  const fmt = (n) => n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <section id="performance" style={{ padding: '3rem 0', background: 'var(--slate-50)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">📊 Stock Performance</h2>
          <p className="section-subtitle">Real-time gain/loss analysis across your entire portfolio</p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            {
              label: 'Total Invested',
              value: `₹${fmt(totalInvested)}`,
              sub: `${portfolio.length} holdings`,
              color: '#2563eb', bg: '#eff6ff', icon: <DollarSign size={20} />,
            },
            {
              label: 'Current Value',
              value: `₹${fmt(totalCurrent)}`,
              sub: `Live market estimate`,
              color: '#0d9488', bg: '#f0fdfa', icon: <BarChart2 size={20} />,
            },
            {
              label: 'Total P&L',
              value: `${isUp ? '+' : ''}₹${fmt(Math.abs(totalGain))}`,
              sub: `${isUp ? '+' : ''}${totalGainPct.toFixed(2)}% overall`,
              color: isUp ? '#16a34a' : '#dc2626',
              bg: isUp ? '#f0fdf4' : '#fef2f2',
              icon: isUp ? <TrendingUp size={20} /> : <TrendingDown size={20} />,
            },
            best && {
              label: 'Best Performer',
              value: best.symbol,
              sub: `+${best.gainPct.toFixed(2)}% gain`,
              color: '#16a34a', bg: '#f0fdf4', icon: <Award size={20} />,
            },
            worst && enriched.length > 1 && {
              label: 'Needs Attention',
              value: worst.symbol,
              sub: `${worst.gainPct.toFixed(2)}% return`,
              color: worst.gainPct < 0 ? '#dc2626' : '#b45309',
              bg: worst.gainPct < 0 ? '#fef2f2' : '#fffbeb',
              icon: <AlertTriangle size={20} />,
            },
          ].filter(Boolean).map((card, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 'var(--radius-lg)',
              padding: '1.25rem', border: '1px solid var(--slate-100)',
              boxShadow: 'var(--shadow-sm)', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.625rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {card.label}
                </div>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: card.color }}>
                  {card.icon}
                </div>
              </div>
              <div style={{ fontSize: '1.375rem', fontWeight: 800, color: card.color, marginBottom: '0.25rem' }}>{card.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>{card.sub}</div>
            </div>
          ))}
        </div>

        {/* AI Portfolio Optimizer Card */}
        {recommendations.length > 0 && (
          <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #f0fdf4, #eff6ff)', borderColor: '#bbf7d0' }}>
            <div className="card-header" style={{ background: 'transparent', borderBottom: '1px solid rgba(22, 163, 74, 0.1)' }}>
              <Award size={18} color="var(--primary)" />
              <h3 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--slate-900)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🤖 AI Portfolio Optimizer
              </h3>
            </div>
            <div className="card-body">
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1rem', lineHeight: 1.5 }}>
                Our AI model has detected the following optimization adjustments to improve your risk-adjusted performance:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {recommendations.map((rec, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: 'var(--radius)', border: '1px solid var(--slate-200)', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ flex: '1 1 500px' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '0.25rem' }}>{rec.title}</h4>
                      <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>{rec.desc}</p>
                    </div>
                    <button
                      onClick={() => handleRebalance(rec.type)}
                      className="btn-primary"
                      style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.375rem', whiteSpace: 'nowrap', fontFamily: 'inherit' }}
                    >
                      ⚖️ {rec.btn}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>

          {/* Per-stock returns bar chart */}
          <div className="card">
            <div className="card-header">
              <BarChart2 size={18} color="var(--primary)" />
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>Returns by Stock</h3>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--slate-500)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--slate-400)' }} axisLine={false} tickLine={false}
                    tickFormatter={v => `${v >= 0 ? '+' : ''}${v}%`} />
                  <ReferenceLine y={0} stroke="var(--slate-300)" strokeWidth={1.5} />
                  <Tooltip content={<BarTooltip />} />
                  <Bar dataKey="return" radius={[4, 4, 0, 0]} maxBarSize={48}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.return >= 0 ? '#22c55e' : '#ef4444'} fillOpacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Benchmark comparison line chart */}
          <div className="card">
            <div className="card-header">
              <TrendingUp size={18} color="var(--teal)" />
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>vs Nifty 50 Benchmark</h3>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={returnsData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" vertical={false} />
                  <XAxis dataKey="period" tick={{ fontSize: 11, fill: 'var(--slate-500)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--slate-400)' }} axisLine={false} tickLine={false}
                    tickFormatter={v => `${v}%`} />
                  <Tooltip content={<BenchmarkTooltip />} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.8rem' }} />
                  <Line type="monotone" dataKey="Portfolio" stroke="#3b82f6" strokeWidth={2.5}
                    dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Nifty 50" stroke="#f59e0b" strokeWidth={2}
                    strokeDasharray="5 4" dot={{ r: 3, fill: '#f59e0b', strokeWidth: 0 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sector P&L */}
          {sectorData.length > 1 && (
            <div className="card">
              <div className="card-header">
                <Award size={18} color="#f59e0b" />
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>Sector Returns</h3>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={sectorData} layout="vertical" margin={{ top: 4, right: 40, left: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--slate-100)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--slate-400)' }} axisLine={false} tickLine={false}
                      tickFormatter={v => `${v}%`} />
                    <YAxis type="category" dataKey="sector" tick={{ fontSize: 11, fill: 'var(--slate-500)' }} axisLine={false} tickLine={false} width={110} />
                    <ReferenceLine x={0} stroke="var(--slate-300)" strokeWidth={1.5} />
                    <Tooltip content={<BarTooltip />} />
                    <Bar dataKey="gain" radius={[0, 4, 4, 0]} maxBarSize={28}>
                      {sectorData.map((entry, i) => (
                        <Cell key={i} fill={entry.gain >= 0 ? '#14b8a6' : '#f97316'} fillOpacity={0.85} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Per-stock P&L table */}
        <div className="card">
          <div className="card-header">
            <BarChart2 size={18} color="var(--primary)" />
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>Holdings P&amp;L Breakdown</h3>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--slate-50)', borderBottom: '2px solid var(--slate-100)' }}>
                    {['Stock', 'Qty', 'Avg Price', 'Current Price', 'Invested', 'Current Value', 'P&L (₹)', 'P&L (%)', 'Status'].map(h => (
                      <th key={h} style={{
                        textAlign: h === 'Stock' ? 'left' : 'right',
                        padding: '0.75rem 1rem', color: 'var(--slate-500)',
                        fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase',
                        letterSpacing: '0.04em', whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enriched.map((item, idx) => {
                    const isGain = item.gain >= 0;
                    return (
                      <tr key={item.symbol} style={{
                        borderBottom: idx < enriched.length - 1 ? '1px solid var(--slate-100)' : 'none',
                        transition: 'background 0.15s',
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--slate-50)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <td style={{ padding: '0.875rem 1rem' }}>
                          <div style={{ fontWeight: 700, color: 'var(--primary-dark)', fontSize: '0.9375rem' }}>{item.symbol}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{item.sector}</div>
                        </td>
                        <td style={{ padding: '0.875rem 1rem', textAlign: 'right', color: 'var(--slate-700)', fontWeight: 500 }}>{item.quantity}</td>
                        <td style={{ padding: '0.875rem 1rem', textAlign: 'right', color: 'var(--slate-600)' }}>₹{item.avgPrice.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '0.875rem 1rem', textAlign: 'right', fontWeight: 700, color: 'var(--slate-900)' }}>
                          ₹{item.currentPrice.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '0.875rem 1rem', textAlign: 'right', color: 'var(--slate-600)' }}>₹{fmt(item.investedValue)}</td>
                        <td style={{ padding: '0.875rem 1rem', textAlign: 'right', fontWeight: 600, color: 'var(--slate-900)' }}>₹{fmt(item.currentValue)}</td>
                        <td style={{ padding: '0.875rem 1rem', textAlign: 'right', fontWeight: 700, color: isGain ? '#16a34a' : '#dc2626' }}>
                          {isGain ? '+' : ''}₹{fmt(Math.abs(item.gain))}
                        </td>
                        <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                            fontWeight: 700, fontSize: '0.875rem',
                            color: isGain ? '#16a34a' : '#dc2626',
                          }}>
                            {isGain ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                            {isGain ? '+' : ''}{item.gainPct.toFixed(2)}%
                          </span>
                        </td>
                        <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                          <span style={{
                            display: 'inline-block', padding: '0.2rem 0.625rem', borderRadius: 9999,
                            fontSize: '0.7rem', fontWeight: 700,
                            background: isGain ? '#f0fdf4' : '#fef2f2',
                            color: isGain ? '#16a34a' : '#dc2626',
                            border: `1px solid ${isGain ? '#bbf7d0' : '#fecaca'}`,
                          }}>
                            {item.gainPct > 10 ? '🚀 Strong' : item.gainPct > 0 ? '✅ Profit' : item.gainPct > -5 ? '⚠️ Minor Loss' : '🔴 Loss'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                {/* Totals row */}
                <tfoot>
                  <tr style={{ background: 'linear-gradient(135deg, #f0f9ff, #f0fdfa)', borderTop: '2px solid var(--slate-200)' }}>
                    <td colSpan={4} style={{ padding: '0.875rem 1rem', fontWeight: 700, color: 'var(--slate-700)', fontSize: '0.875rem' }}>
                      TOTAL ({portfolio.length} holdings)
                    </td>
                    <td style={{ padding: '0.875rem 1rem', textAlign: 'right', fontWeight: 700, color: 'var(--slate-900)' }}>₹{fmt(totalInvested)}</td>
                    <td style={{ padding: '0.875rem 1rem', textAlign: 'right', fontWeight: 700, color: 'var(--slate-900)' }}>₹{fmt(totalCurrent)}</td>
                    <td style={{ padding: '0.875rem 1rem', textAlign: 'right', fontWeight: 800, color: isUp ? '#16a34a' : '#dc2626', fontSize: '1rem' }}>
                      {isUp ? '+' : ''}₹{fmt(Math.abs(totalGain))}
                    </td>
                    <td style={{ padding: '0.875rem 1rem', textAlign: 'right', fontWeight: 800, color: isUp ? '#16a34a' : '#dc2626', fontSize: '1rem' }}>
                      {isUp ? '+' : ''}{totalGainPct.toFixed(2)}%
                    </td>
                    <td style={{ padding: '0.875rem 1rem', textAlign: 'right' }}>
                      <span style={{
                        display: 'inline-block', padding: '0.2rem 0.75rem', borderRadius: 9999,
                        fontSize: '0.75rem', fontWeight: 700,
                        background: isUp ? '#f0fdf4' : '#fef2f2',
                        color: isUp ? '#16a34a' : '#dc2626',
                        border: `1px solid ${isUp ? '#bbf7d0' : '#fecaca'}`,
                      }}>
                        {isUp ? '📈 Overall Profit' : '📉 Overall Loss'}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
