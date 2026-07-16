import { useState } from 'react';
import { Plus, TrendingUp, Trash2, AlertCircle, BarChart2 } from 'lucide-react';

export default function PortfolioBuilder({ portfolio, setPortfolio, onAnalyse }) {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!symbol.trim()) { setError('Please enter a stock symbol.'); return; }
    if (!quantity || Number(quantity) <= 0) { setError('Enter a valid quantity.'); return; }
    if (!avgPrice || Number(avgPrice) <= 0) { setError('Enter a valid average price.'); return; }

    const sym = symbol.trim().toUpperCase();
    if (portfolio.find(p => p.symbol === sym)) {
      setError(`${sym} is already in your portfolio.`);
      return;
    }

    setPortfolio(prev => [
      ...prev,
      {
        symbol: sym,
        quantity: Number(quantity),
        avgPrice: Number(avgPrice),
        totalValue: Number(quantity) * Number(avgPrice),
      }
    ]);
    setSymbol('');
    setQuantity('');
    setAvgPrice('');
    setError('');
  };

  const handleRemove = (sym) => {
    setPortfolio(prev => prev.filter(p => p.symbol !== sym));
  };

  const totalPortfolioValue = portfolio.reduce((sum, p) => sum + p.totalValue, 0);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <section id="portfolio" className="main-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Build Your Portfolio</h2>
          <p className="section-subtitle">Add your current stock holdings to get personalized advice</p>
        </div>

        <div className="two-col">
          {/* Add Form */}
          <div className="card">
            <div className="card-header">
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb'
              }}>
                <Plus size={18} />
              </div>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                Add Stock Holdings
              </h3>
            </div>
            <div className="card-body portfolio-form">
              <div className="form-row">
                <div>
                  <label>Stock Symbol</label>
                  <input
                    id="stock-symbol"
                    className="input-field"
                    placeholder="E.g., AAPL"
                    value={symbol}
                    onChange={e => { setSymbol(e.target.value.toUpperCase()); setError(''); }}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div>
                  <label>Quantity</label>
                  <input
                    id="stock-qty"
                    className="input-field"
                    type="number"
                    placeholder="100"
                    value={quantity}
                    onChange={e => { setQuantity(e.target.value); setError(''); }}
                    onKeyDown={handleKeyDown}
                    min="1"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label>Average Price (₹)</label>
                <input
                  id="stock-price"
                  className="input-field"
                  type="number"
                  placeholder="150.00"
                  value={avgPrice}
                  onChange={e => { setAvgPrice(e.target.value); setError(''); }}
                  onKeyDown={handleKeyDown}
                  min="0.01"
                  step="0.01"
                />
              </div>

              {error && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.625rem 0.875rem', background: '#fef2f2',
                  border: '1px solid #fecaca', borderRadius: 'var(--radius)',
                  color: '#dc2626', fontSize: '0.875rem', marginBottom: '1rem'
                }}>
                  <AlertCircle size={15} />
                  {error}
                </div>
              )}

              <button
                id="add-to-portfolio-btn"
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleAdd}
              >
                <Plus size={18} />
                Add to Portfolio
              </button>
            </div>
          </div>

          {/* Portfolio List */}
          <div className="card">
            <div className="card-header" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d9488'
                }}>
                  <TrendingUp size={18} />
                </div>
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                  Your Portfolio
                </h3>
              </div>
              {portfolio.length > 0 && (
                <span className="badge badge-blue">
                  ₹{totalPortfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              )}
            </div>

            <div className="card-body">
              {portfolio.length === 0 ? (
                <div className="empty-state">
                  <AlertCircle size={40} strokeWidth={1.5} style={{ margin: '0 auto 1rem' }} />
                  <p>No stocks added yet.<br />Add your first holding to get started.</p>
                </div>
              ) : (
                <>
                  <div className="scroll-area">
                    {portfolio.map(item => (
                      <div key={item.symbol} className="portfolio-item">
                        <div className="portfolio-item-info">
                          <div className="portfolio-item-symbol">
                            <span className="badge badge-blue" style={{ marginRight: '0.5rem', fontSize: '0.8125rem' }}>
                              {item.symbol}
                            </span>
                          </div>
                          <div className="portfolio-item-details">
                            {item.quantity} shares @ ₹{item.avgPrice.toFixed(2)}
                          </div>
                        </div>
                        <span className="portfolio-item-value">
                          ₹{item.totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </span>
                        <button
                          className="btn-remove"
                          onClick={() => handleRemove(item.symbol)}
                          title={`Remove ${item.symbol}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="portfolio-total">
                    <div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                        TOTAL PORTFOLIO VALUE
                      </div>
                      <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
                        ₹{totalPortfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontWeight: 600 }}>HOLDINGS</div>
                      <div style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--teal-dark)' }}>
                        {portfolio.length}
                      </div>
                    </div>
                  </div>

                  <button
                    id="get-ai-analysis-btn"
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={() => onAnalyse(portfolio)}
                  >
                    <BarChart2 size={18} />
                    Get AI Analysis
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
