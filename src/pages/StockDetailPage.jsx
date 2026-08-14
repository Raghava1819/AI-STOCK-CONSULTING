import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, Star, Download, TrendingUp, TrendingDown,
  BarChart2, FileText, Users, PieChart, ChevronRight, CheckCircle, XCircle,
  BookOpen, Bell, Sliders, Edit3, Target, Compass, Sparkles, Building, Info, Eye, Search, Newspaper, Clock, DollarSign, ShoppingCart, CreditCard, Truck, RefreshCw
} from 'lucide-react';
import { STOCKS, STOCK_LIST, getStocksForSector } from '../data/stockData';
import PriceChart from '../components/PriceChart';
import { PriceAlertSetter } from '../components/PriceAlerts';
import { WatchButton } from '../components/Watchlist';

const TABS = [
  { id: 'chart', label: '📈 Chart' },
  { id: 'analysis', label: '🤖 AI Analysis' },
  { id: 'peers', label: '🤝 Peers' },
  { id: 'quarters', label: '📊 Quarters' },
  { id: 'pnl', label: '📑 Profit & Loss' },
  { id: 'balance-sheet', label: '🏛️ Balance Sheet' },
  { id: 'cash-flow', label: '💵 Cash Flow' },
  { id: 'ratios', label: '⚡ Ratios' },
  { id: 'investors', label: '👥 Investors' },
  { id: 'documents', label: '📂 Documents' }
];

function AIInsightBox({ title, text, tags = [] }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      border: '1px solid #bae6fd', borderRadius: '0.75rem',
      padding: '1.25rem 1.5rem', margin: '1.5rem 0', color: '#0369a1',
      boxShadow: '0 4px 12px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.625rem' }}>
        <div style={{ background: '#0284c7', padding: '0.35rem', borderRadius: 6, display: 'flex' }}>
          <Sparkles size={16} color="#ffffff" />
        </div>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0369a1', margin: 0, letterSpacing: '0.02em' }}>
          AI INSIGHT · {title}
        </h4>
      </div>

      <p style={{ fontSize: '0.875rem', color: '#0c4a6e', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
        {text}
      </p>

      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.875rem', flexWrap: 'wrap' }}>
          {tags.map((t, i) => (
            <span key={i} style={{
              fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 9999,
              background: '#e0f2fe', color: '#0369a1', border: '1px solid #7dd3fc'
            }}>
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Company Overview Section (In Front of Key Metrics) ───────────────────────
function CompanyOverviewCard({ stock }) {
  const newsList = [
    { title: `${stock.name} reports Q1 Revenue growth of +${stock.salesGrowth || 12}%, margins expand by 150 bps`, time: '2 hours ago', tag: '🟢 Bullish', source: 'NSE Disclosures' },
    { title: `Board approves dividend distribution and strategic Capex plan for FY26`, time: '1 day ago', tag: '🟢 Bullish', source: 'BSE Filings' },
    { title: `FII & DII institutional holdings increase by +1.4% in latest quarterly report`, time: '3 days ago', tag: '🔵 Neutral', source: 'Market Pulse' }
  ];

  return (
    <div style={{
      background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '1rem',
      padding: '1.75rem', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
        <Building size={20} color="#2563eb" />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
          Company Overview & Strategic Profile
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left Column: About & Present Goal */}
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Info size={14} color="#2563eb" /> ABOUT THE COMPANY
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
              {stock.about || `${stock.name} is a premier industry leader in the ${stock.sector} sector with market-leading market capitalization of ₹${stock.marketCap}. The company maintains strong distribution networks and durable brand equity.`}
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Target size={14} color="#0284c7" /> PRESENT GOAL
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
              Achieve sustainable double-digit revenue growth while expanding operating profit margins (OPM) above 20% and maintaining ROCE of {stock.roce}%.
            </p>
          </div>
        </div>

        {/* Right Column: Future Vision & Mission + Latest News */}
        <div style={{ borderLeft: '1px solid #f1f5f9', paddingLeft: '1.75rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#9333ea', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Compass size={14} color="#9333ea" /> FUTURE VISION AND MISSION
            </h4>
            <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
              Pioneer next-generation innovations, scale international market presence, and deliver superior shareholder returns with zero solvency risk.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Newspaper size={14} color="#16a34a" /> LATEST NEWS OF THE COMPANY
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {newsList.map((item, idx) => (
                <div key={idx} style={{ padding: '0.65rem 0.85rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: 4, background: item.tag.includes('Bullish') ? '#dcfce7' : '#e0f2fe', color: item.tag.includes('Bullish') ? '#15803d' : '#0369a1' }}>
                      {item.tag}
                    </span>
                    <span style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{item.time}</span>
                  </div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0f172a', lineHeight: 1.4 }}>
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import ManageColumnsModal, { DEFAULT_COLUMNS } from '../components/ManageColumnsModal';

// ─── Key Metrics Grid Section (Editable Quick Ratios) ──────────────────────────
function KeyMetricsGrid({ stock }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeColumns, setActiveColumns] = useState(() => {
    try {
      const saved = localStorage.getItem('stockai_key_metrics');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return [
      { key: 'marketCap', label: 'MARKET CAP' },
      { key: 'pe', label: 'P/E RATIO' },
      { key: 'bookValue', label: 'BOOK VALUE' },
      { key: 'dividendYield', label: 'DIVIDEND YIELD' },
      { key: 'roce', label: 'ROCE' },
      { key: 'roe', label: 'ROE' },
      { key: 'faceValue', label: 'FACE VALUE' },
      { key: 'pat', label: 'PAT' },
      { key: 'high52', label: '52W HIGH' },
      { key: 'low52', label: '52W LOW' },
      { key: 'epsGrowth', label: 'EPS GROWTH' },
      { key: 'debtEquity', label: 'DEBT/EQUITY' },
      { key: 'promoterHolding', label: 'PROMOTER %' },
      { key: 'fiiHolding', label: 'FII %' },
      { key: 'diiHolding', label: 'DII %' },
      { key: 'pegRatio', label: 'PEG RATIO' },
      { key: 'evEbitda', label: 'EV/EBITDA' },
      { key: 'targetPrice', label: 'TARGET PRICE' },
    ];
  });

  const resolveMetricValue = (k, unit) => {
    switch (k) {
      case 'price': return `₹${stock.price?.toLocaleString('en-IN') || '2,450'}`;
      case 'marketCap': return stock.marketCap ? `₹${stock.marketCap}` : '₹16,60,000 Cr';
      case 'pe': return `${stock.pe || '26.8'}`;
      case 'bookValue': return stock.bookValue ? `₹${stock.bookValue}` : '₹1,124';
      case 'dividendYield': return `${stock.dividendYield || 0.4}%`;
      case 'roce': return `${stock.roce}%`;
      case 'roe': return `${stock.roe}%`;
      case 'faceValue': return `₹${stock.faceValue || 10}`;
      case 'pat':
      case 'pat12m': return stock.pat ? `₹${stock.pat}` : '₹67,845 Cr';
      case 'high52': return stock.high52 ? `₹${stock.high52.toLocaleString('en-IN')}` : '₹3,028';
      case 'low52': return stock.low52 ? `₹${stock.low52.toLocaleString('en-IN')}` : '₹2,180';
      case 'epsGrowth':
      case 'epsGrowth3Y': return `${stock.epsGrowth || 12.4}%`;
      case 'debtEquity': return `${stock.debtEquity || '0.44'}`;
      case 'promoterHolding': return `${stock.promoterHolding}%`;
      case 'fiiHolding': return `${stock.fiiHolding || 21.4}%`;
      case 'diiHolding': return `${stock.diiHolding || 16.8}%`;
      case 'peg':
      case 'pegRatio': return `${stock.peg || '1.5'}`;
      case 'evEbitda': return `${stock.evEbitda || '14.2'}`;
      case 'targetPrice': return stock.targetPrice ? `₹${stock.targetPrice.toLocaleString('en-IN')}` : '₹3,100';
      case 'sales':
      case 'salesQuarter': return stock.salesQuarter ? `₹${stock.salesQuarter}` : '₹48,500 Cr';
      case 'salesGrowth':
      case 'salesGrowth3Y':
      case 'salesGrowth5Y': return `${stock.salesGrowth || 14.2}%`;
      case 'profitGrowth':
      case 'profitGrowth3Y':
      case 'profitGrowth5Y': return `${stock.profitGrowth || 15.8}%`;
      case 'opm': return `${stock.opm || 24.5}%`;
      case 'debt': return stock.debt || '₹12,450 Cr';
      case 'priceBook': return `${(stock.pe ? (stock.pe * 0.18).toFixed(2) : '4.6')}`;
      case 'returnAssets': return `${stock.returnAssets || '11.8%'}`;
      case 'earningsYield': return `${(100 / (stock.pe || 26.8)).toFixed(2)}%`;
      case 'pledgedPct': return `${stock.pledgedPct || '0.0%'}`;
      case 'industryPe': return `${stock.industryPe || '24.2'}`;
      case 'quickRatio': return `${stock.quickRatio || '1.25'}`;
      case 'assetTurnover': return `${stock.assetTurnover || '0.85'}`;
      case 'eps': return `₹${(stock.price / (stock.pe || 26.8)).toFixed(2)}`;
      default: {
        if (unit === '%') return '12.5%';
        if (unit === 'Rs.' || unit === 'Rs.Cr.') return '₹14,500';
        return '1.8';
      }
    }
  };

  const handleSaveColumns = (newColumns) => {
    setActiveColumns(newColumns);
    try {
      localStorage.setItem('stockai_key_metrics', JSON.stringify(newColumns));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <BarChart2 size={20} color="#2563eb" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.01em' }}>Key Metrics</h3>
          <span style={{ fontSize: '0.75rem', background: '#eff6ff', color: '#2563eb', padding: '0.2rem 0.6rem', borderRadius: 9999, fontWeight: 700, border: '1px solid #bfdbfe' }}>
            {activeColumns.length} Ratios Selected
          </span>
        </div>

        <button
          onClick={() => setShowEditModal(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            padding: '0.45rem 0.95rem', borderRadius: '0.5rem',
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            color: '#ffffff', border: 'none', fontSize: '0.8rem', fontWeight: 800,
            cursor: 'pointer', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
            letterSpacing: '0.02em', transition: 'all 0.15s'
          }}
        >
          <Sliders size={14} /> EDIT RATIOS
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
        {activeColumns.map((col, idx) => (
          <div key={col.key || idx} style={{
            background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.75rem',
            padding: '1rem 1.15rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', transition: 'all 0.15s'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.05em', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
              {col.label}
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
              {resolveMetricValue(col.key, col.unit)}
            </div>
          </div>
        ))}
      </div>

      {showEditModal && (
        <ManageColumnsModal
          activeColumns={activeColumns}
          onSave={handleSaveColumns}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

// ─── Investors Section ────────────────────────────────────────────────────────
function InvestorsTab({ stock }) {
  const quarters = [
    { period: 'Jun 2024', promoter: 50.3, fii: 21.4, dii: 16.8, publicShare: 11.5 },
    { period: 'Mar 2024', promoter: 50.3, fii: 20.8, dii: 17.2, publicShare: 11.7 },
    { period: 'Dec 2023', promoter: 50.2, fii: 20.4, dii: 17.8, publicShare: 11.6 },
    { period: 'Sep 2023', promoter: 50.2, fii: 19.8, dii: 18.2, publicShare: 11.8 },
    { period: 'Jun 2023', promoter: 50.2, fii: 19.2, dii: 18.8, publicShare: 11.8 },
  ];

  const renderProgressBar = (val, max, color) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', justifyContent: 'flex-end' }}>
      <div style={{ width: 90, height: 6, background: '#e2e8f0', borderRadius: 9999, overflow: 'hidden' }}>
        <div style={{ width: `${(val / max) * 100}%`, height: '100%', background: color, borderRadius: 9999 }} />
      </div>
      <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', minWidth: '45px', textAlign: 'right' }}>
        {val}%
      </span>
    </div>
  );

  return (
    <div>
      <AIInsightBox
        title={`Institutional & Shareholding Pattern for ${stock.name}`}
        text={`Promoters hold ${stock.promoterHolding}% with institutional investors (FIIs & DIIs) backing over 38% of total equity.`}
        tags={['Shareholding', 'Promoters', 'FII', 'DII']}
      />

      <div style={{ background: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem', color: '#0f172a', overflowX: 'auto', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>Shareholding Pattern</h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Numbers in percentages with institutional visual indicators</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ padding: '0.35rem 0.75rem', background: '#eff6ff', border: '1px solid #3b82f6', color: '#2563eb', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700 }}>Quarterly</button>
            <button style={{ padding: '0.35rem 0.75rem', background: 'transparent', border: '1px solid #cbd5e1', color: '#64748b', borderRadius: 6, fontSize: '0.75rem' }}>Yearly</button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ textAlign: 'left', padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>QUARTER</th>
              <th style={{ textAlign: 'right', padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>PROMOTER %</th>
              <th style={{ textAlign: 'right', padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>FII %</th>
              <th style={{ textAlign: 'right', padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>DII %</th>
              <th style={{ textAlign: 'right', padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>PUBLIC %</th>
            </tr>
          </thead>
          <tbody>
            {quarters.map((q, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.875rem 1rem', fontWeight: 800, color: '#0f172a' }}>{q.period}</td>
                <td style={{ textAlign: 'right', padding: '0.875rem 1rem' }}>{renderProgressBar(q.promoter, 60, '#3b82f6')}</td>
                <td style={{ textAlign: 'right', padding: '0.875rem 1rem' }}>{renderProgressBar(q.fii, 30, '#14b8a6')}</td>
                <td style={{ textAlign: 'right', padding: '0.875rem 1rem' }}>{renderProgressBar(q.dii, 30, '#f59e0b')}</td>
                <td style={{ textAlign: 'right', padding: '0.875rem 1rem' }}>{renderProgressBar(q.publicShare, 20, '#a855f7')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuartersTab({ stock }) {
  const quarters = ['Mar 2023', 'Jun 2023', 'Sep 2023', 'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024', 'Dec 2024', 'Mar 2025', 'Jun 2025'];
  const baseSales = parseFloat(stock.salesQuarter?.replace(/[^0-9.]/g, '') || 1500);

  const rows = [
    { name: 'Sales +', key: 'sales' },
    { name: 'Expenses +', key: 'exp' },
    { name: 'Operating Profit', key: 'op', isBold: true },
    { name: 'OPM %', key: 'opm', suffix: '%' },
    { name: 'Other Income +', val: 24 },
    { name: 'Net Profit +', key: 'np', isBold: true },
    { name: 'EPS in Rs', key: 'eps' }
  ];

  return (
    <div>
      <AIInsightBox title={`Quarterly Performance for ${stock.name}`} text={`Quarterly sales stand robust at ₹${stock.salesQuarter} with stable OPM.`} tags={['Quarters', 'Sales']} />
      <div style={{ background: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem', overflowX: 'auto', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1.25rem', color: '#0f172a' }}>Quarterly Results</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>Metric</th>
              {quarters.map(q => <th key={q} style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>{q}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: r.isBold ? 800 : 600, color: r.isBold ? '#2563eb' : '#334155' }}>{r.name}</td>
                {quarters.map((q, idx) => {
                  const factor = 0.85 + (idx * 0.03);
                  const sales = Math.round(baseSales * factor);
                  const exp = Math.round(sales * 0.80);
                  const op = sales - exp;
                  const opm = Math.round((op / sales) * 100);
                  const np = Math.round(op * 0.75);
                  let val = r.val || (r.key === 'sales' ? sales : r.key === 'exp' ? exp : r.key === 'op' ? op : r.key === 'opm' ? opm : r.key === 'np' ? np : (np / 30).toFixed(2));
                  return (
                    <td key={q} style={{ textAlign: 'right', padding: '0.75rem 0.75rem', fontWeight: r.isBold ? 800 : 500, color: r.isBold ? '#2563eb' : '#0f172a' }}>
                      {typeof val === 'number' ? val.toLocaleString('en-IN') : val}{r.suffix || ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PnLTab({ stock }) {
  const years = ['Mar 2017', 'Mar 2018', 'Mar 2019', 'Mar 2020', 'Mar 2021', 'Mar 2022', 'Mar 2023', 'Mar 2024', 'Mar 2025'];
  return (
    <div>
      <AIInsightBox title={`Profit & Loss 10-Year View`} text={`Compounded sales growth averages healthy double digits over 5 years.`} tags={['PnL', 'CAGR']} />
      <div style={{ background: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem', overflowX: 'auto', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1.25rem', color: '#0f172a' }}>Profit & Loss</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>Metric</th>
              {years.map(y => <th key={y} style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>{y}</th>)}
            </tr>
          </thead>
          <tbody>
            {['Sales +', 'Expenses +', 'Operating Profit', 'Net Profit +'].map((rowName, rIdx) => (
              <tr key={rowName} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: rIdx === 2 || rIdx === 3 ? 800 : 600, color: rIdx === 3 ? '#2563eb' : '#334155' }}>{rowName}</td>
                {years.map((y, idx) => (
                  <td key={y} style={{ textAlign: 'right', padding: '0.75rem 0.75rem', fontWeight: 600, color: '#0f172a' }}>
                    {Math.round(4000 * (0.6 + idx * 0.08) * (rIdx === 0 ? 1 : rIdx === 1 ? 0.8 : rIdx === 2 ? 0.2 : 0.15)).toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BalanceSheetTab({ stock }) {
  const years = ['Mar 2017', 'Mar 2018', 'Mar 2019', 'Mar 2020', 'Mar 2021', 'Mar 2022', 'Mar 2023', 'Mar 2024', 'Mar 2025'];
  return (
    <div>
      <AIInsightBox title={`Balance Sheet Health`} text={`Robust capital reserves and low debt profile maintain financial safety.`} tags={['BalanceSheet']} />
      <div style={{ background: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem', overflowX: 'auto', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1.25rem', color: '#0f172a' }}>Balance Sheet</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>Metric</th>
              {years.map(y => <th key={y} style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>{y}</th>)}
            </tr>
          </thead>
          <tbody>
            {['Share Capital', 'Reserves', 'Borrowings', 'Total Liabilities'].map((rowName, rIdx) => (
              <tr key={rowName} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: rIdx === 3 ? 800 : 600, color: rIdx === 3 ? '#2563eb' : '#334155' }}>{rowName}</td>
                {years.map((y, idx) => (
                  <td key={y} style={{ textAlign: 'right', padding: '0.75rem 0.75rem', fontWeight: 600, color: '#0f172a' }}>
                    {Math.round(2000 * (0.8 + idx * 0.05) * (rIdx === 0 ? 0.1 : rIdx === 1 ? 0.6 : rIdx === 2 ? 0.2 : 0.9)).toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CashFlowTab({ stock }) {
  const years = ['Mar 2017', 'Mar 2018', 'Mar 2019', 'Mar 2020', 'Mar 2021', 'Mar 2022', 'Mar 2023', 'Mar 2024', 'Mar 2025'];
  return (
    <div>
      <AIInsightBox title={`Cash Flow Trajectory`} text={`Consistently positive operating cash flows support expansion plans.`} tags={['CashFlow']} />
      <div style={{ background: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem', overflowX: 'auto', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1.25rem', color: '#0f172a' }}>Cash Flows</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>Metric</th>
              {years.map(y => <th key={y} style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>{y}</th>)}
            </tr>
          </thead>
          <tbody>
            {['Cash from Operating Activity', 'Cash from Investing Activity', 'Cash from Financing Activity', 'Net Cash Flow'].map((rowName, rIdx) => (
              <tr key={rowName} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: rIdx === 0 ? 800 : 600, color: rIdx === 0 ? '#16a34a' : '#334155' }}>{rowName}</td>
                {years.map((y, idx) => (
                  <td key={y} style={{ textAlign: 'right', padding: '0.75rem 0.75rem', fontWeight: 600, color: '#0f172a' }}>
                    {(rIdx === 0 ? 1500 + idx * 120 : rIdx === 1 ? -800 - idx * 50 : rIdx === 2 ? -500 - idx * 40 : 200).toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RatiosTab({ stock }) {
  const years = ['Mar 2017', 'Mar 2018', 'Mar 2019', 'Mar 2020', 'Mar 2021', 'Mar 2022', 'Mar 2023', 'Mar 2024', 'Mar 2025'];
  return (
    <div>
      <AIInsightBox title={`Financial Ratios`} text={`ROCE of ${stock.roce}% and ROE of ${stock.roe}% demonstrate high efficiency.`} tags={['Ratios']} />
      <div style={{ background: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem', overflowX: 'auto', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1.25rem', color: '#0f172a' }}>Financial Ratios</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>Ratio</th>
              {years.map(y => <th key={y} style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>{y}</th>)}
            </tr>
          </thead>
          <tbody>
            {[['Debtor Days', 18], ['Inventory Days', 45], ['Days Payable', 62], ['ROCE %', `${stock.roce}%`], ['ROE %', `${stock.roe}%`]].map(([rName, rVal]) => (
              <tr key={rName} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0f172a' }}>{rName}</td>
                {years.map(y => <td key={y} style={{ textAlign: 'right', padding: '0.75rem 0.75rem', fontWeight: 600, color: '#2563eb' }}>{rVal}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PeersTab({ stock }) {
  const peers = useMemo(() => getStocksForSector(stock.sector), [stock.sector]);
  return (
    <div>
      <AIInsightBox title={`Sector Peer Comparison`} text={`Benchmarked against top competitors in the ${stock.sector} sector.`} tags={['Peers']} />
      <div style={{ background: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0', padding: '1.5rem', overflowX: 'auto', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 1.25rem', color: '#0f172a' }}>Peer Comparison</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', whiteSpace: 'nowrap' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem 1rem' }}>Name</th>
              <th style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>CMP Rs.</th>
              <th style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>P/E</th>
              <th style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>Mar Cap Rs.Cr.</th>
              <th style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>ROCE %</th>
              <th style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>ROE %</th>
            </tr>
          </thead>
          <tbody>
            {peers.map(p => (
              <tr key={p.symbol} style={{ borderBottom: '1px solid #f1f5f9', background: p.symbol === stock.symbol ? '#f0f9ff' : 'transparent' }}>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>
                  <Link to={`/stock/${p.symbol}`} style={{ color: '#2563eb', textDecoration: 'none' }}>{p.name}</Link>
                </td>
                <td style={{ textAlign: 'right', padding: '0.75rem 0.75rem', fontWeight: 700 }}>₹{p.price.toLocaleString('en-IN')}</td>
                <td style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>{p.pe}</td>
                <td style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>{p.marketCap}</td>
                <td style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>{p.roce}%</td>
                <td style={{ textAlign: 'right', padding: '0.75rem 0.75rem' }}>{p.roe}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalysisTab({ stock }) {
  return (
    <div>
      <AIInsightBox title={`AI Valuation & Risk Rating for ${stock.symbol}`} text={`Overall AI score: ${stock.rating || 8.5}/10. 12-month target price: ₹${stock.targetPrice || (stock.price * 1.18).toFixed(0)}.`} tags={['AIAnalysis']} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '1.25rem' }}>
          <h4 style={{ color: '#16a34a', fontWeight: 800, margin: '0 0 0.5rem' }}>✓ Key Strengths</h4>
          <p style={{ fontSize: '0.875rem', color: '#15803d', margin: 0 }}>Market leader in {stock.sector} with high ROCE ({stock.roce}%).</p>
        </div>
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.75rem', padding: '1.25rem' }}>
          <h4 style={{ color: '#dc2626', fontWeight: 800, margin: '0 0 0.5rem' }}>✕ Monitorables</h4>
          <p style={{ fontSize: '0.875rem', color: '#991b1b', margin: 0 }}>Watch for input cost pressure and general market volatility.</p>
        </div>
      </div>
    </div>
  );
}

function DocumentsTab({ stock }) {
  return (
    <div>
      <AIInsightBox title={`Document Filings`} text={`Audited reports and quarterly investor presentations.`} tags={['Filings']} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {[`${stock.name} Annual Report FY25.pdf`, `${stock.name} Investor Presentation.pdf`].map((doc, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.5rem' }}>
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{doc}</span>
            <button style={{ padding: '0.35rem 0.75rem', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Stock Detail Page Component ────────────────────────────────────────
export default function StockDetailPage({ isWatched, toggleWatch, alerts, addAlert, removeAlert }) {
  const { symbol } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('chart');
  const [exported, setExported] = useState(false);

  const stockSymbolToUse = useMemo(() => symbol ? symbol.toUpperCase() : 'TCS', [symbol]);

  const stock = useMemo(() => {
    if (STOCKS[stockSymbolToUse]) return STOCKS[stockSymbolToUse];
    const found = STOCK_LIST.find(s => s.symbol.toUpperCase() === stockSymbolToUse);
    return found || STOCKS['TCS'];
  }, [stockSymbolToUse]);

  const isUp = stock.change >= 0;

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    document.getElementById('stock-detail-tabs-container')?.scrollIntoView({ behavior: 'smooth' });
  };

  const bseCode = stock.bseCode || '500325';
  const nseCode = stock.nseCode || stock.symbol;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Sleek Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0284c7 100%)',
        padding: '1.5rem 2rem 2rem', color: 'white'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <button
            onClick={() => navigate('/demo')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginBottom: '1.25rem',
              background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
              color: 'white', borderRadius: 8, padding: '0.45rem 0.85rem', cursor: 'pointer',
              fontSize: '0.85rem', fontWeight: 600
            }}
          >
            <ArrowLeft size={16} /> Back to Demo
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.375rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.85rem', fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>{stock.name} Ltd</h1>
                <span style={{
                  padding: '0.25rem 0.75rem', borderRadius: 9999,
                  background: 'rgba(255,255,255,0.15)', color: 'white',
                  fontSize: '0.8rem', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 600
                }}>
                  {stock.sector}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
                <span style={{ color: '#7dd3fc', fontWeight: 600 }}>🌐 {stock.symbol.toLowerCase()}.co.in</span>
                <span style={{ color: 'white', background: 'rgba(255,255,255,0.15)', padding: '0.15rem 0.5rem', borderRadius: 4 }}>BSE: {bseCode}</span>
                <span style={{ color: 'white', background: 'rgba(255,255,255,0.15)', padding: '0.15rem 0.5rem', borderRadius: 4 }}>NSE: {nseCode}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => { setExported(true); setTimeout(() => setExported(false), 2000); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  padding: '0.55rem 1.15rem', borderRadius: 8,
                  background: exported ? 'white' : 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: exported ? '#1e3a8a' : 'white',
                  cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700
                }}
              >
                <Download size={15} /> {exported ? 'Exported!' : 'Export to Excel'}
              </button>

              {toggleWatch && stock && (
                <WatchButton stock={stock} isWatched={isWatched?.(stock.symbol)} onToggle={toggleWatch} size="md" />
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginTop: '1.25rem' }}>
            <div style={{ fontSize: '2.85rem', fontWeight: 900, letterSpacing: '-0.03em' }}>
              ₹{stock.price.toLocaleString('en-IN')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '1.1rem', fontWeight: 800, color: isUp ? '#4ade80' : '#f87171' }}>
              {isUp ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
              {isUp ? '+' : ''}{stock.change} ({isUp ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
        
        {/* Company Overview Section (In Front of Key Metrics) */}
        <CompanyOverviewCard stock={stock} />

        {/* Key Metrics Grid (User Screenshot 2 Format) */}
        <KeyMetricsGrid stock={stock} />

        {/* 10 Screener Navigation Tabs Bar */}
        <div id="stock-detail-tabs-container" style={{
          background: '#ffffff', borderBottom: '2px solid #e2e8f0', borderRadius: '0.75rem 0.75rem 0 0',
          display: 'flex', gap: '0.5rem', padding: '0 1rem', overflowX: 'auto', position: 'sticky', top: 0, zIndex: 90,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              style={{
                padding: '0.875rem 1.15rem', background: 'none', border: 'none',
                borderBottom: activeTab === tab.id ? '3px solid #2563eb' : '3px solid transparent',
                color: activeTab === tab.id ? '#2563eb' : '#64748b',
                fontWeight: activeTab === tab.id ? 800 : 600, fontSize: '0.875rem', cursor: 'pointer',
                whiteSpace: 'nowrap', transition: 'all 0.15s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div style={{ background: '#ffffff', borderRadius: '0 0 0.75rem 0.75rem', padding: '1.75rem', border: '1px solid #e2e8f0', borderTop: 'none' }}>
          {activeTab === 'chart' && (
            <div style={{ background: '#ffffff', padding: '0.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
                📈 Interactive Stock Price Chart
              </h3>
              <PriceChart stock={stock} />
            </div>
          )}

          {activeTab === 'analysis' && <AnalysisTab stock={stock} />}
          {activeTab === 'peers' && <PeersTab stock={stock} />}
          {activeTab === 'quarters' && <QuartersTab stock={stock} />}
          {activeTab === 'pnl' && <PnLTab stock={stock} />}
          {activeTab === 'balance-sheet' && <BalanceSheetTab stock={stock} />}
          {activeTab === 'cash-flow' && <CashFlowTab stock={stock} />}
          {activeTab === 'ratios' && <RatiosTab stock={stock} />}
          {activeTab === 'investors' && <InvestorsTab stock={stock} />}
          {activeTab === 'documents' && <DocumentsTab stock={stock} />}
        </div>
      </div>
    </div>
  );
}
