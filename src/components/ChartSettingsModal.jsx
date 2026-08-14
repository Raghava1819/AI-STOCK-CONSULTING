import { useState } from 'react';
import { X, Sliders, Activity, Eye, Compass, Layers, Check } from 'lucide-react';

export default function ChartSettingsModal({ settings, onSave, onClose }) {
  const [localSettings, setLocalSettings] = useState(() => ({ ...settings }));

  const toggleSetting = (category, key) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChartType = (type) => {
    setLocalSettings(prev => ({ ...prev, chartType: type }));
  };

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15, 23, 42, 0.75)', zIndex: 2000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1.5rem', backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        background: '#0f172a', color: '#f8fafc', borderRadius: '16px',
        width: '100%', maxWidth: '640px', maxHeight: '90vh',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        border: '1px solid #1e293b', fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ background: '#2563eb', padding: '0.4rem', borderRadius: 8, display: 'flex' }}>
              <Sliders size={18} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#f8fafc' }}>Chart Customization & Settings</h3>
              <span style={{ fontSize: '0.775rem', color: '#94a3b8' }}>Customize indicators, candle styles, patterns & visuals</span>
            </div>
          </div>
          <X size={20} style={{ cursor: 'pointer', color: '#94a3b8' }} onClick={onClose} />
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Section 1: Chart Style */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={14} /> CHART STYLE & TYPE
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.65rem' }}>
              {[
                { id: 'candles', label: '🕯️ Candlesticks' },
                { id: 'line', label: '📈 Line Chart' },
                { id: 'bar', label: '📊 Bar Graph' },
                { id: 'area', label: '🏔️ Area Fill' }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => handleChartType(type.id)}
                  style={{
                    padding: '0.65rem 0.5rem', borderRadius: '8px',
                    background: localSettings.chartType === type.id ? '#2563eb' : '#1e293b',
                    color: localSettings.chartType === type.id ? '#ffffff' : '#cbd5e1',
                    border: localSettings.chartType === type.id ? '1px solid #3b82f6' : '1px solid #334155',
                    fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', textAlign: 'center'
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Technical Indicators */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Activity size={14} /> TECHNICAL INDICATORS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { key: 'showSMA50', label: 'SMA 50 (Moving Average)', desc: '50-Day Simple Moving Average' },
                { key: 'showSMA200', label: 'SMA 200 (Long Trend)', desc: '200-Day Simple Moving Average' },
                { key: 'showEMA20', label: 'EMA 20 (Short Trend)', desc: '20-Day Exponential Moving Average' },
                { key: 'showBollinger', label: 'Bollinger Bands', desc: 'Volatility envelopes (20, 2)' },
                { key: 'showRSI', label: 'RSI Indicator (14)', desc: 'Relative Strength Index Oscillator' },
                { key: 'showMACD', label: 'MACD (12, 26, 9)', desc: 'Moving Average Convergence Divergence' },
                { key: 'showVolume', label: 'Volume Sub-Chart', desc: 'Daily trading volume bars' },
              ].map(ind => (
                <label
                  key={ind.key}
                  onClick={() => toggleSetting('indicators', ind.key)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                    background: '#1e293b', padding: '0.75rem 0.875rem', borderRadius: '10px',
                    border: localSettings[ind.key] ? '1px solid #3b82f6' : '1px solid #334155',
                    cursor: 'pointer', userSelect: 'none'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!localSettings[ind.key]}
                    onChange={() => {}}
                    style={{ accentColor: '#3b82f6', width: '16px', height: '16px', marginTop: '2px', cursor: 'pointer' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: localSettings[ind.key] ? '#ffffff' : '#e2e8f0' }}>{ind.label}</div>
                    <div style={{ fontSize: '0.725rem', color: '#94a3b8', marginTop: '2px' }}>{ind.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Auto Chart Patterns & Overlays */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Compass size={14} /> CHART PATTERNS & AUTOMATED OVERLAYS
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { key: 'showSupportResistance', label: '🎯 Support & Resistance', desc: 'Auto pivot high/low levels with ₹ prices' },
                { key: 'showTrendlines', label: '📐 Auto Trendlines', desc: 'Peak-to-trough automated trend connectors' },
                { key: 'showPatterns', label: '🔨 Candlestick Pattern Recognition', desc: 'Detect Hammer, Engulfing & Doji patterns' },
                { key: 'showTargetLine', label: '🎯 Target Price Reference Line', desc: 'Display analyst 12-month target price' },
              ].map(pat => (
                <label
                  key={pat.key}
                  onClick={() => toggleSetting('patterns', pat.key)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                    background: '#1e293b', padding: '0.75rem 0.875rem', borderRadius: '10px',
                    border: localSettings[pat.key] ? '1px solid #10b981' : '1px solid #334155',
                    cursor: 'pointer', userSelect: 'none'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!localSettings[pat.key]}
                    onChange={() => {}}
                    style={{ accentColor: '#10b981', width: '16px', height: '16px', marginTop: '2px', cursor: 'pointer' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: localSettings[pat.key] ? '#ffffff' : '#e2e8f0' }}>{pat.label}</div>
                    <div style={{ fontSize: '0.725rem', color: '#94a3b8', marginTop: '2px' }}>{pat.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Section 4: Grid & Appearance */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Eye size={14} /> VISUAL & GRID PREFERENCES
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {[
                { key: 'showGrid', label: '🌐 Cartesian Grid Lines', desc: 'Show subtle background dashed grid lines' },
                { key: 'darkTheme', label: '🌙 Dark Mode Chart Box', desc: 'Toggle dark vs clean white chart canvas' },
              ].map(vis => (
                <label
                  key={vis.key}
                  onClick={() => toggleSetting('visuals', vis.key)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                    background: '#1e293b', padding: '0.75rem 0.875rem', borderRadius: '10px',
                    border: localSettings[vis.key] ? '1px solid #38bdf8' : '1px solid #334155',
                    cursor: 'pointer', userSelect: 'none'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!localSettings[vis.key]}
                    onChange={() => {}}
                    style={{ accentColor: '#38bdf8', width: '16px', height: '16px', marginTop: '2px', cursor: 'pointer' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: localSettings[vis.key] ? '#ffffff' : '#e2e8f0' }}>{vis.label}</div>
                    <div style={{ fontSize: '0.725rem', color: '#94a3b8', marginTop: '2px' }}>{vis.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#090d16' }}>
          <button
            onClick={() => {
              setLocalSettings({
                chartType: 'candles',
                showSMA50: false,
                showSMA200: false,
                showEMA20: false,
                showBollinger: false,
                showRSI: false,
                showMACD: false,
                showVolume: false,
                showSupportResistance: false,
                showTrendlines: false,
                showPatterns: true,
                showTargetLine: false,
                showGrid: true,
                darkTheme: false,
              });
            }}
            style={{
              background: 'transparent', border: 'none', color: '#94a3b8',
              fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline'
            }}
          >
            Reset Defaults
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={onClose}
              style={{
                background: '#1e293b', color: '#cbd5e1', border: '1px solid #334155',
                padding: '0.5rem 1.15rem', borderRadius: '6px', fontWeight: 600,
                fontSize: '0.825rem', cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              style={{
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: 'white', border: 'none',
                padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: 700,
                fontSize: '0.825rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }}
            >
              <Check size={16} /> Apply Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
