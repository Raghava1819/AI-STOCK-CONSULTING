import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';

export const DEFAULT_COLUMNS = [
  { key: 'price', label: 'Current price', unit: 'Rs.' },
  { key: 'marketCap', label: 'Market Capitalization', unit: 'Rs.Cr.' },
  { key: 'roe', label: 'Return on equity', unit: '%' },
  { key: 'roce', label: 'Return on capital employed', unit: '%' },
  { key: 'debt', label: 'Debt', unit: 'Rs.Cr.' },
  { key: 'debtEquity', label: 'Debt to equity', unit: '' },
  { key: 'promoterHolding', label: 'Promoter holding', unit: '%' },
  { key: 'pe', label: 'Price to Earning', unit: '' },
  { key: 'dividendYield', label: 'Dividend yield', unit: '%' },
  { key: 'bookValue', label: 'Book value', unit: 'Rs.' },
  { key: 'pat', label: 'Net Profit latest quarter', unit: 'Rs.Cr.' },
  { key: 'salesQuarter', label: 'Sales latest quarter', unit: 'Rs.Cr.' },
  { key: 'salesGrowth', label: 'Sales growth', unit: '%' },
  { key: 'pat12m', label: 'Profit after tax', unit: 'Rs.Cr.' },
  { key: 'evEbitda', label: 'EVEBITDA', unit: '' }
];

export const RATIO_CATEGORIES = {
  'Most Used': {
    recent: [
      { key: 'sales', label: 'Sales' },
      { key: 'opm', label: 'OPM' },
      { key: 'pat12m', label: 'Profit after tax' },
      { key: 'marketCap', label: 'Market Capitalization' },
      { key: 'salesQuarter', label: 'Sales latest quarter' },
      { key: 'pat', label: 'Profit after tax latest quarter' },
      { key: 'salesGrowthQuarter', label: 'YOY Quarterly sales growth' },
      { key: 'profitGrowthQuarter', label: 'YOY Quarterly profit growth' },
      { key: 'pe', label: 'Price to Earning' },
      { key: 'dividendYield', label: 'Dividend yield' },
      { key: 'priceBook', label: 'Price to book value' },
      { key: 'roce', label: 'Return on capital employed' },
      { key: 'returnAssets', label: 'Return on assets' },
      { key: 'debtEquity', label: 'Debt to equity' },
      { key: 'roe', label: 'Return on equity' },
      { key: 'eps', label: 'EPS' },
      { key: 'debt', label: 'Debt' },
      { key: 'promoterHolding', label: 'Promoter holding' },
      { key: 'promoterHoldingChange', label: 'Change in promoter holding' },
      { key: 'earningsYield', label: 'Earnings yield' },
      { key: 'pledgedPct', label: 'Pledged percentage' },
      { key: 'industryPe', label: 'Industry PE' },
      { key: 'salesGrowth', label: 'Sales growth' },
      { key: 'profitGrowth', label: 'Profit growth' },
      { key: 'price', label: 'Current price' },
      { key: 'priceSales', label: 'Price to Sales' },
      { key: 'priceFreeCashFlow', label: 'Price to Free Cash Flow' },
      { key: 'evEbitda', label: 'EVEBITDA' }
    ],
    preceding: [],
    historical: [
      { key: 'salesGrowth3Y', label: 'Sales growth 3Years' },
      { key: 'salesGrowth5Y', label: 'Sales growth 5Years' },
      { key: 'profitGrowth3Y', label: 'Profit growth 3Years' },
      { key: 'profitGrowth5Y', label: 'Profit growth 5Years' },
      { key: 'avgRoe5Y', label: 'Average return on equity 5Years' },
      { key: 'avgRoe3Y', label: 'Average return on equity 3Years' },
      { key: 'return1Y', label: 'Return over 1Year' },
      { key: 'return3Y', label: 'Return over 3Years' },
      { key: 'return5Y', label: 'Return over 5Years' }
    ]
  },
  'Annual P&L': {
    recent: [
      { key: 'sales', label: 'Sales' },
      { key: 'opm', label: 'OPM' },
      { key: 'pat12m', label: 'Profit after tax' },
      { key: 'roce', label: 'Return on capital employed' },
      { key: 'eps', label: 'EPS' },
      { key: 'promoterHoldingChange', label: 'Change in promoter holding' },
      { key: 'salesLastYear', label: 'Sales last year' },
      { key: 'opProfitLastYear', label: 'Operating profit last year' },
      { key: 'otherIncomeLastYear', label: 'Other income last year' },
      { key: 'ebidtLastYear', label: 'EBIDT last year' },
      { key: 'deprLastYear', label: 'Depreciation last year' },
      { key: 'ebitLastYear', label: 'EBIT last year' },
      { key: 'interestLastYear', label: 'Interest last year' },
      { key: 'pbtLastYear', label: 'Profit before tax last year' },
      { key: 'taxLastYear', label: 'Tax last year' },
      { key: 'patLastYear', label: 'Profit after tax last year' },
      { key: 'operatingProfit', label: 'Operating profit' }
    ],
    preceding: [
      { key: 'salesPreceding', label: 'Sales preceding year' },
      { key: 'opProfitPreceding', label: 'Operating profit preceding year' },
      { key: 'otherIncomePreceding', label: 'Other income preceding year' },
      { key: 'ebidtPreceding', label: 'EBIDT preceding year' },
      { key: 'deprPreceding', label: 'Depreciation preceding year' },
      { key: 'ebitPreceding', label: 'EBIT preceding year' },
      { key: 'interestPreceding', label: 'Interest preceding year' },
      { key: 'pbtPreceding', label: 'Profit before tax preceding year' },
      { key: 'taxPreceding', label: 'Tax preceding year' },
      { key: 'patPreceding', label: 'Profit after tax preceding year' },
      { key: 'netProfitPreceding', label: 'Net Profit preceding year' }
    ],
    historical: [
      { key: 'salesGrowth3Y', label: 'Sales growth 3Years' },
      { key: 'salesGrowth5Y', label: 'Sales growth 5Years' },
      { key: 'profitGrowth3Y', label: 'Profit growth 3Years' },
      { key: 'profitGrowth5Y', label: 'Profit growth 5Years' },
      { key: 'salesGrowth10YMedian', label: 'Sales growth 10Years median' },
      { key: 'salesGrowth5YMedian', label: 'Sales growth 5Years median' },
      { key: 'ebidtGrowth3Y', label: 'EBIDT growth 3Years' },
      { key: 'ebidtGrowth5Y', label: 'EBIDT growth 5Years' },
      { key: 'epsGrowth3Y', label: 'EPS growth 3Years' },
      { key: 'epsGrowth5Y', label: 'EPS growth 5Years' }
    ]
  },
  'Quarter P&L': {
    recent: [
      { key: 'salesQuarter', label: 'Sales latest quarter' },
      { key: 'pat', label: 'Profit after tax latest quarter' },
      { key: 'salesGrowthQuarter', label: 'YOY Quarterly sales growth' },
      { key: 'profitGrowthQuarter', label: 'YOY Quarterly profit growth' },
      { key: 'salesGrowth', label: 'Sales growth' },
      { key: 'profitGrowth', label: 'Profit growth' },
      { key: 'opProfitQuarter', label: 'Operating profit latest quarter' },
      { key: 'otherIncomeQuarter', label: 'Other income latest quarter' },
      { key: 'ebidtQuarter', label: 'EBIDT latest quarter' },
      { key: 'ebitQuarter', label: 'EBIT latest quarter' },
      { key: 'interestQuarter', label: 'Interest latest quarter' }
    ],
    preceding: [
      { key: 'salesPrecedingQuarter', label: 'Sales preceding quarter' },
      { key: 'opProfitPrecedingQuarter', label: 'Operating profit preceding quarter' },
      { key: 'ebidtPrecedingQuarter', label: 'EBIDT preceding quarter' },
      { key: 'ebitPrecedingQuarter', label: 'EBIT preceding quarter' },
      { key: 'patPrecedingQuarter', label: 'Profit after tax preceding quarter' }
    ],
    historical: [
      { key: 'salesPrecedingYearQuarter', label: 'Sales preceding year quarter' },
      { key: 'opProfitPrecedingYearQuarter', label: 'Operating profit preceding year quarter' },
      { key: 'patPrecedingYearQuarter', label: 'Profit after tax preceding year quarter' }
    ]
  },
  'Balance Sheet': {
    recent: [
      { key: 'debt', label: 'Debt' },
      { key: 'equityCapital', label: 'Equity capital' },
      { key: 'reserves', label: 'Reserves' },
      { key: 'securedLoan', label: 'Secured loan' },
      { key: 'unsecuredLoan', label: 'Unsecured loan' },
      { key: 'grossBlock', label: 'Gross block' },
      { key: 'netBlock', label: 'Net block' },
      { key: 'currentAssets', label: 'Current assets' },
      { key: 'currentLiabilities', label: 'Current liabilities' },
      { key: 'workingCapital', label: 'Working capital' },
      { key: 'bookValue', label: 'Book value' }
    ],
    preceding: [
      { key: 'equitySharesPreceding', label: 'Number of equity shares preceding year' },
      { key: 'debtPreceding', label: 'Debt preceding year' },
      { key: 'workingCapPreceding', label: 'Working capital preceding year' }
    ],
    historical: [
      { key: 'workingCap3YBack', label: 'Working capital 3Years back' },
      { key: 'workingCap5YBack', label: 'Working capital 5Years back' },
      { key: 'debt3YBack', label: 'Debt 3Years back' },
      { key: 'debt5YBack', label: 'Debt 5Years back' }
    ]
  },
  'Ratios': {
    recent: [
      { key: 'marketCap', label: 'Market Capitalization' },
      { key: 'pe', label: 'Price to Earning' },
      { key: 'dividendYield', label: 'Dividend yield' },
      { key: 'priceBook', label: 'Price to book value' },
      { key: 'returnAssets', label: 'Return on assets' },
      { key: 'debtEquity', label: 'Debt to equity' },
      { key: 'roe', label: 'Return on equity' },
      { key: 'promoterHolding', label: 'Promoter holding' },
      { key: 'pledgedPct', label: 'Pledged percentage' },
      { key: 'industryPe', label: 'Industry PE' },
      { key: 'evEbitda', label: 'Enterprise Value / EBITDA' },
      { key: 'quickRatio', label: 'Quick ratio' },
      { key: 'assetTurnover', label: 'Asset Turnover Ratio' }
    ],
    preceding: [
      { key: 'bookValuePreceding', label: 'Book value preceding year' },
      { key: 'rocePreceding', label: 'Return on capital employed preceding year' },
      { key: 'roePreceding', label: 'Return on equity preceding year' }
    ],
    historical: [
      { key: 'avgRoe3Y', label: 'Average return on equity 3Years' },
      { key: 'avgRoe5Y', label: 'Average return on equity 5Years' },
      { key: 'avgRoce5Y', label: 'Average return on capital employed 5Years' },
      { key: 'historicalPe3Y', label: 'Historical PE 3Years' },
      { key: 'historicalPe5Y', label: 'Historical PE 5Years' }
    ]
  }
};

export default function ManageColumnsModal({ activeColumns, onSave, onClose }) {
  const [selectedKeys, setSelectedKeys] = useState(() => activeColumns.map(c => c.key));
  const [activeTab, setActiveTab] = useState('Most Used');
  const [filterText, setFilterText] = useState('');
  const [draggedIdx, setDraggedIdx] = useState(null);

  // Map of all available ratio definitions
  const allMetricMap = useMemo(() => {
    const map = new Map();
    DEFAULT_COLUMNS.forEach(c => map.set(c.key, c));
    Object.values(RATIO_CATEGORIES).forEach(cat => {
      ['recent', 'preceding', 'historical'].forEach(sub => {
        cat[sub]?.forEach(item => {
          if (!map.has(item.key)) {
            map.set(item.key, { key: item.key, label: item.label, unit: item.unit || '' });
          }
        });
      });
    });
    return map;
  }, []);

  const toggleKey = (key) => {
    if (selectedKeys.includes(key)) {
      setSelectedKeys(selectedKeys.filter(k => k !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };

  const removeKey = (key) => {
    setSelectedKeys(selectedKeys.filter(k => k !== key));
  };

  const resetDefaults = () => {
    setSelectedKeys(DEFAULT_COLUMNS.map(c => c.key));
  };

  const handleSave = () => {
    const finalColumns = selectedKeys.map(k => {
      return allMetricMap.get(k) || { key: k, label: k, unit: '' };
    });
    onSave(finalColumns);
    onClose();
  };

  const handleDragStart = (e, index) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    const updated = [...selectedKeys];
    const item = updated.splice(draggedIdx, 1)[0];
    updated.splice(index, 0, item);
    setDraggedIdx(index);
    setSelectedKeys(updated);
  };

  const currentCategory = RATIO_CATEGORIES[activeTab] || RATIO_CATEGORIES['Most Used'];

  const filterItem = (item) => {
    if (!filterText.trim()) return true;
    return item.label.toLowerCase().includes(filterText.toLowerCase()) || item.key.toLowerCase().includes(filterText.toLowerCase());
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)', zIndex: 2000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem', backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: '#151c28', color: '#e2e8f0', borderRadius: '12px',
        width: '100%', maxWidth: '1050px', maxHeight: '90vh',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid #2d3748', fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem 1rem', borderBottom: '1px solid #2d3748' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>Manage quick_ratios</h2>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Drag names to reorder them.</span>
            </div>
            <button
              onClick={resetDefaults}
              style={{
                background: 'transparent', border: '1px solid #ef4444', color: '#f87171',
                padding: '0.35rem 0.85rem', borderRadius: '6px', fontSize: '0.75rem',
                fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em'
              }}
            >
              RESET DEFAULTS
            </button>
          </div>

          {/* Active Badges row (Reorderable via Drag and Drop) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1rem', maxHeight: '110px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {selectedKeys.map((k, idx) => {
              const item = allMetricMap.get(k) || { label: k };
              return (
                <span
                  key={k}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragEnd={() => setDraggedIdx(null)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    background: draggedIdx === idx ? '#3b82f6' : '#243044',
                    color: '#cbd5e1', border: '1px solid #334155',
                    padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem',
                    fontWeight: 500, cursor: 'grab', userSelect: 'none'
                  }}
                >
                  {item.label}
                  <X size={13} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={(e) => { e.stopPropagation(); removeKey(k); }} />
                </span>
              );
            })}
          </div>

          {/* Buttons & Search bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleSave}
                style={{
                  background: '#2563eb', color: 'white', border: 'none',
                  padding: '0.45rem 1.15rem', borderRadius: '4px', fontWeight: 700,
                  fontSize: '0.8rem', cursor: 'pointer', letterSpacing: '0.05em'
                }}
              >
                SAVE QUICK_RATIOS
              </button>
              <button
                onClick={onClose}
                style={{
                  background: '#243044', color: '#94a3b8', border: '1px solid #334155',
                  padding: '0.45rem 1.15rem', borderRadius: '4px', fontWeight: 600,
                  fontSize: '0.8rem', cursor: 'pointer'
                }}
              >
                CANCEL
              </button>
            </div>

            {/* Filter ratios search */}
            <div style={{ position: 'relative', width: '280px' }}>
              <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                placeholder="eg. return on capital"
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                style={{
                  width: '100%', background: '#0f172a', border: '1px solid #334155',
                  color: '#e2e8f0', padding: '0.4rem 0.75rem 0.4rem 2.2rem', borderRadius: '4px',
                  fontSize: '0.8rem', outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Category Tabs Bar */}
        <div style={{
          background: '#0f172a', borderBottom: '1px solid #2d3748',
          display: 'flex', gap: '1.25rem', padding: '0 1.5rem', overflowX: 'auto'
        }}>
          {['Most Used', 'Annual P&L', 'Quarter P&L', 'Balance Sheet', 'Cash Flow', 'Ratios', 'Price', 'User Ratios'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                background: 'none', border: 'none',
                borderBottom: activeTab === cat ? '2px solid #3b82f6' : '2px solid transparent',
                color: activeTab === cat ? '#38bdf8' : '#94a3b8',
                padding: '0.65rem 0.25rem', fontWeight: activeTab === cat ? 700 : 500,
                fontSize: '0.8rem', cursor: 'pointer', whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-Column Content Body */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '1.5rem',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem'
        }}>
          {/* Column 1: RECENT */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              RECENT
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {currentCategory.recent?.filter(filterItem).map(item => (
                <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#cbd5e1', cursor: 'pointer', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(item.key)}
                    onChange={() => toggleKey(item.key)}
                    style={{ accentColor: '#3b82f6', width: '14px', height: '14px', cursor: 'pointer' }}
                  />
                  {item.label}
                </label>
              ))}
            </div>
          </div>

          {/* Column 2: PRECEDING */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              PRECEDING
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {currentCategory.preceding?.filter(filterItem).map(item => (
                <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#cbd5e1', cursor: 'pointer', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(item.key)}
                    onChange={() => toggleKey(item.key)}
                    style={{ accentColor: '#3b82f6', width: '14px', height: '14px', cursor: 'pointer' }}
                  />
                  {item.label}
                </label>
              ))}
              {(!currentCategory.preceding || currentCategory.preceding.length === 0) && (
                <span style={{ fontSize: '0.75rem', color: '#475569' }}>No preceding ratios in this category</span>
              )}
            </div>
          </div>

          {/* Column 3: HISTORICAL */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              HISTORICAL
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {currentCategory.historical?.filter(filterItem).map(item => (
                <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#cbd5e1', cursor: 'pointer', userSelect: 'none' }}>
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(item.key)}
                    onChange={() => toggleKey(item.key)}
                    style={{ accentColor: '#3b82f6', width: '14px', height: '14px', cursor: 'pointer' }}
                  />
                  {item.label}
                </label>
              ))}
              {(!currentCategory.historical || currentCategory.historical.length === 0) && (
                <span style={{ fontSize: '0.75rem', color: '#475569' }}>No historical ratios in this category</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
