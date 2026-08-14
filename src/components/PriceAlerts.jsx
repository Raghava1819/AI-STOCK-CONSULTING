import { useState } from 'react';
import { Bell, BellOff, Trash2, TrendingUp } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { toast } from './ToastManager';

export function usePriceAlerts() {
  const [alerts, setAlerts] = useLocalStorage('stockai_alerts', []);

  const addAlert = (symbol, targetPrice, direction, currentPrice) => {
    const existing = alerts.find(a => a.symbol === symbol);
    if (existing) {
      setAlerts(prev => prev.map(a => a.symbol === symbol
        ? { ...a, targetPrice, direction, currentPrice }
        : a
      ));
      toast.success(`Alert updated for ${symbol} at ₹${targetPrice.toLocaleString('en-IN')}`);
    } else {
      setAlerts(prev => [...prev, { symbol, targetPrice, direction, currentPrice, id: Date.now() }]);
      toast.success(`Alert set for ${symbol} at ₹${targetPrice.toLocaleString('en-IN')}`);
    }
  };

  const removeAlert = (symbol) => {
    setAlerts(prev => prev.filter(a => a.symbol !== symbol));
    toast.alert(`Alert removed for ${symbol}`, 'info');
  };

  return { alerts, addAlert, removeAlert };
}

// Inline alert setter for StockDetailPage
export function PriceAlertSetter({ symbol, currentPrice, alerts, addAlert, removeAlert }) {
  const existing = alerts.find(a => a.symbol === symbol);
  const [target, setTarget] = useState(existing ? String(existing.targetPrice) : '');
  const [direction, setDirection] = useState(existing?.direction || 'above');

  const handleSet = () => {
    const t = parseFloat(target);
    if (!t || t <= 0) return;
    addAlert(symbol, t, direction, currentPrice);
  };

  return (
    <div style={{
      padding: '1rem 1.25rem', background: 'var(--slate-50)',
      border: '1px solid var(--slate-200)', borderRadius: 'var(--radius-lg)',
      marginTop: '0.75rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <Bell size={15} color="var(--primary)" />
        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--slate-800)' }}>Price Alert</span>
        {existing && (
          <span style={{
            marginLeft: 'auto', fontSize: '0.75rem', padding: '0.2rem 0.625rem',
            background: '#fffbeb', color: '#b45309', border: '1px solid #fde68a',
            borderRadius: 9999, fontWeight: 700,
          }}>
            Active: ₹{existing.targetPrice.toLocaleString('en-IN')}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <select
          value={direction}
          onChange={e => setDirection(e.target.value)}
          style={{
            padding: '0.5rem 0.75rem', borderRadius: 'var(--radius)',
            border: '1.5px solid var(--slate-200)', background: 'white',
            fontSize: '0.8rem', fontFamily: 'inherit', color: 'var(--slate-700)',
            cursor: 'pointer',
          }}
        >
          <option value="above">Rises above</option>
          <option value="below">Falls below</option>
        </select>

        <input
          type="number"
          placeholder={`₹ target (now ₹${currentPrice.toLocaleString('en-IN')})`}
          value={target}
          onChange={e => setTarget(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSet()}
          style={{
            flex: 1, minWidth: 120,
            padding: '0.5rem 0.75rem', borderRadius: 'var(--radius)',
            border: '1.5px solid var(--slate-200)', background: 'white',
            fontSize: '0.875rem', fontFamily: 'inherit',
          }}
        />

        <button
          onClick={handleSet}
          style={{
            padding: '0.5rem 1rem', borderRadius: 'var(--radius)', cursor: 'pointer',
            background: 'var(--primary)', color: 'white', border: 'none',
            fontWeight: 600, fontSize: '0.8rem', fontFamily: 'inherit',
          }}
        >
          Set Alert
        </button>

        {existing && (
          <button
            onClick={() => removeAlert(symbol)}
            style={{
              padding: '0.5rem', borderRadius: 'var(--radius)', cursor: 'pointer',
              background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
              display: 'flex', alignItems: 'center',
            }}
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

// Navbar alerts panel
export function AlertsPanel({ alerts, removeAlert, onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: 360,
      background: 'white', boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
      zIndex: 1200, display: 'flex', flexDirection: 'column',
      animation: 'slideInRight 0.3s ease',
    }}>
      <div style={{
        padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--slate-100)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'linear-gradient(135deg, #fffbeb, #fef9c3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={18} color="#b45309" />
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--slate-900)' }}>Price Alerts</span>
          <span style={{
            background: '#b45309', color: 'white', fontSize: '0.7rem',
            borderRadius: 9999, padding: '0.1rem 0.5rem', fontWeight: 700,
          }}>{alerts.length}</span>
        </div>
        <button onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-500)', padding: '4px', display: 'flex', borderRadius: 6 }}>
          ✕
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
        {alerts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--slate-400)' }}>
            <BellOff size={40} strokeWidth={1.5} style={{ margin: '0 auto 0.75rem' }} />
            <p style={{ fontWeight: 600 }}>No active alerts</p>
            <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>Set alerts from any stock's detail page</p>
          </div>
        ) : alerts.map(a => (
          <div key={a.id} style={{
            padding: '0.875rem 1rem', marginBottom: '0.75rem',
            border: '1px solid var(--slate-200)', borderRadius: 'var(--radius)',
            background: 'var(--slate-50)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--slate-900)', fontSize: '0.9rem' }}>{a.symbol}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '0.2rem' }}>
                Alert when {a.direction} <strong style={{ color: 'var(--primary-dark)' }}>₹{a.targetPrice.toLocaleString('en-IN')}</strong>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                Current: ₹{a.currentPrice.toLocaleString('en-IN')}
              </div>
            </div>
            <button onClick={() => removeAlert(a.symbol)}
              style={{
                background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca',
                borderRadius: 'var(--radius)', padding: '0.375rem', cursor: 'pointer', display: 'flex',
              }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
