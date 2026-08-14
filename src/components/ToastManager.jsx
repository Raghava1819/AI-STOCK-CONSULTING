import { useState, useEffect, useCallback } from 'react';
import { Bell, TrendingUp, TrendingDown, X, CheckCircle } from 'lucide-react';

let _addToast = null;
export const toast = {
  alert: (msg, type = 'info') => _addToast?.({ msg, type, id: Date.now() }),
  success: (msg) => _addToast?.({ msg, type: 'success', id: Date.now() }),
  error: (msg) => _addToast?.({ msg, type: 'error', id: Date.now() }),
};

export default function ToastManager() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((t) => {
    setToasts(prev => [...prev.slice(-4), t]);
    setTimeout(() => setToasts(prev => prev.filter(x => x.id !== t.id)), 4500);
  }, []);

  useEffect(() => {
    _addToast = addToast;
    return () => { _addToast = null; };
  }, [addToast]);

  const colors = {
    success: { bg: '#f0fdf4', border: '#bbf7d0', icon: '#16a34a' },
    error:   { bg: '#fef2f2', border: '#fecaca', icon: '#dc2626' },
    alert:   { bg: '#fffbeb', border: '#fde68a', icon: '#b45309' },
    info:    { bg: '#eff6ff', border: '#bfdbfe', icon: '#2563eb' },
  };

  return (
    <div style={{
      position: 'fixed', bottom: '1.5rem', right: '1.5rem',
      display: 'flex', flexDirection: 'column', gap: '0.625rem',
      zIndex: 9999, maxWidth: 360,
    }}>
      {toasts.map(t => {
        const c = colors[t.type] || colors.info;
        const Icon = t.type === 'success' ? CheckCircle : t.type === 'error' ? TrendingDown : Bell;
        return (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
            padding: '0.875rem 1rem', borderRadius: '0.75rem',
            background: c.bg, border: `1.5px solid ${c.border}`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            animation: 'slideInRight 0.3s ease',
          }}>
            <Icon size={18} color={c.icon} style={{ marginTop: '0.1rem', flexShrink: 0 }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--slate-800)', flex: 1, lineHeight: 1.5 }}>{t.msg}</span>
            <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', padding: '2px', display: 'flex' }}>
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
