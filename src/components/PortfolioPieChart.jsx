import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { STOCK_LIST } from '../data/stockData';

const PALETTE = [
  '#3b82f6', '#14b8a6', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#10b981', '#f97316', '#ec4899', '#6366f1',
];

const LABEL_RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * LABEL_RADIAN);
  const y = cy + r * Math.sin(-midAngle * LABEL_RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      style={{ fontSize: 11, fontWeight: 700 }}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div style={{
        background: 'white', border: '1px solid var(--slate-200)',
        borderRadius: '0.5rem', padding: '0.625rem 0.875rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)', fontSize: '0.8rem',
      }}>
        <div style={{ fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.2rem' }}>{d.sector}</div>
        <div style={{ color: 'var(--slate-600)' }}>₹{d.value.toLocaleString('en-IN')}</div>
        <div style={{ color: 'var(--slate-500)' }}>{d.stocks.join(', ')}</div>
      </div>
    );
  }
  return null;
};

export default function PortfolioPieChart({ portfolio }) {
  if (!portfolio || portfolio.length < 2) return null;

  // Aggregate by sector
  const sectorMap = {};
  portfolio.forEach(item => {
    const stockInfo = STOCK_LIST.find(s => s.symbol === item.symbol);
    const sector = stockInfo?.sector || 'Other';
    if (!sectorMap[sector]) sectorMap[sector] = { value: 0, stocks: [] };
    sectorMap[sector].value += item.totalValue;
    sectorMap[sector].stocks.push(item.symbol);
  });

  const data = Object.entries(sectorMap).map(([sector, d]) => ({ sector, ...d }));
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{ fontWeight: 700, color: 'var(--slate-900)', fontSize: '0.9375rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        📊 Sector Allocation
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginBottom: '1rem' }}>
        How your ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })} portfolio is distributed
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%" cy="50%"
            innerRadius={62} outerRadius={98}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
            animationBegin={0}
            animationDuration={700}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value, entry) => (
              <span style={{ fontSize: '0.8rem', color: 'var(--slate-700)' }}>
                {entry.payload.sector}
              </span>
            )}
            iconType="circle"
            iconSize={10}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
