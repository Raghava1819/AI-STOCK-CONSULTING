import { useState, useMemo } from 'react';
import {
  ComposedChart, Line, Area, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, LineChart
} from 'recharts';
import { Sliders, Eye, TrendingUp, TrendingDown, Layers, Sparkles, Activity } from 'lucide-react';
import ChartSettingsModal from './ChartSettingsModal';

const RANGES = ['1W', '1M', '3M', '6M', '1Y', '2Y', '5Y', '10Y', 'MAX'];

// ─── Generate OHLC history & volume data ──────────────────────────────────────
function generatePriceHistory(basePrice, days, range) {
  const data = [];
  const now = new Date();
  
  let stepDays = 1;
  if (days > 3000) {
    stepDays = 30;
  } else if (days > 1000) {
    stepDays = 15;
  } else if (days > 500) {
    stepDays = 7;
  } else if (days > 200) {
    stepDays = 3;
  }

  let annualGrowthRate = 0.14;
  const totalYears = days / 365;
  let startPrice = basePrice / Math.pow(1 + annualGrowthRate, totalYears);
  startPrice = Math.max(startPrice, basePrice * 0.15);

  for (let i = days; i >= 0; i -= stepDays) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    
    const progress = 1 - (i / days);
    let cycleFactor = Math.sin(progress * Math.PI * 4) * 0.12;
    if (days >= 1825 && progress > 0.3 && progress < 0.45) {
      cycleFactor -= 0.22;
    }

    const targetTrendPrice = startPrice + (basePrice - startPrice) * Math.pow(progress, 1.2) * (1 + cycleFactor);
    const noise = (Math.random() - 0.48) * targetTrendPrice * 0.03;
    const close = Math.max(targetTrendPrice + noise, startPrice * 0.5);
    const open = close * (1 + (Math.random() - 0.5) * 0.018);
    const high = Math.max(open, close) + Math.random() * targetTrendPrice * 0.014;
    const low = Math.min(open, close) - Math.random() * targetTrendPrice * 0.014;
    const volume = Math.floor(Math.random() * 850000 + 150000);

    let dateLabel = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    if (days >= 730) {
      dateLabel = d.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
    }

    data.push({
      date: dateLabel,
      fullDate: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      open: parseFloat(open.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      price: parseFloat(close.toFixed(2)),
      volume: volume,
    });
  }

  if (data.length > 0) {
    data[data.length - 1].close = basePrice;
    data[data.length - 1].price = basePrice;
  }
  return data;
}

// ─── Technical Indicators Calculations ───────────────────────────────────────
function calculateSMA(data, period) {
  return data.map((d, idx) => {
    if (idx < period - 1) return d;
    const slice = data.slice(idx - period + 1, idx + 1);
    const sum = slice.reduce((acc, curr) => acc + curr.price, 0);
    return { ...d, [`SMA_${period}`]: parseFloat((sum / period).toFixed(2)) };
  });
}

function calculateEMA(data, period) {
  const k = 2 / (period + 1);
  let ema = data[0].price;
  return data.map((d, idx) => {
    if (idx === 0) return { ...d, [`EMA_${period}`]: ema };
    ema = d.price * k + ema * (1 - k);
    return { ...d, [`EMA_${period}`]: parseFloat(ema.toFixed(2)) };
  });
}

function calculateRSI(data, period = 14) {
  const gains = [];
  const losses = [];
  for (let i = 1; i < data.length; i++) {
    const diff = data[i].price - data[i - 1].price;
    gains.push(diff > 0 ? diff : 0);
    losses.push(diff < 0 ? -diff : 0);
  }

  return data.map((d, idx) => {
    if (idx < period) return { ...d, RSI: 50 };
    const gainSlice = gains.slice(idx - period, idx);
    const lossSlice = losses.slice(idx - period, idx);
    const avgGain = gainSlice.reduce((s, v) => s + v, 0) / period;
    const avgLoss = lossSlice.reduce((s, v) => s + v, 0) / period;

    if (avgLoss === 0) return { ...d, RSI: 100 };
    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));
    return { ...d, RSI: parseFloat(rsi.toFixed(2)) };
  });
}

function calculateBollinger(data, period = 20, multiplier = 2) {
  return data.map((d, idx) => {
    if (idx < period - 1) return d;
    const slice = data.slice(idx - period + 1, idx + 1);
    const mean = slice.reduce((acc, curr) => acc + curr.price, 0) / period;
    const variance = slice.reduce((acc, curr) => acc + Math.pow(curr.price - mean, 2), 0) / period;
    const stdDev = Math.sqrt(variance);
    return {
      ...d,
      bollingerUpper: parseFloat((mean + multiplier * stdDev).toFixed(2)),
      bollingerLower: parseFloat((mean - multiplier * stdDev).toFixed(2)),
      bollingerMiddle: parseFloat(mean.toFixed(2)),
    };
  });
}

function detectPattern(curr, prev) {
  const bodySize = Math.abs(curr.close - curr.open);
  const range = curr.high - curr.low;
  const upperWick = curr.high - Math.max(curr.open, curr.close);
  const lowerWick = Math.min(curr.open, curr.close) - curr.low;
  const isBull = curr.close >= curr.open;

  if (range === 0) return null;

  if (lowerWick >= 2 * bodySize && upperWick <= 0.25 * bodySize && bodySize > 0) {
    return { label: '🔨 Hammer', type: 'bullish' };
  }
  if (upperWick >= 2 * bodySize && lowerWick <= 0.25 * bodySize && bodySize > 0) {
    return { label: '🌟 Star', type: 'bearish' };
  }
  if (bodySize <= 0.08 * range) {
    return { label: '⚖️ Doji', type: 'neutral' };
  }
  if (prev && isBull && prev.close < prev.open) {
    if (curr.close > prev.open && curr.open < prev.close) {
      return { label: '⚡ Engulf', type: 'bullish' };
    }
  }
  if (prev && !isBull && prev.close > prev.open) {
    if (curr.close < prev.open && curr.open > prev.close) {
      return { label: '🩸 Engulf', type: 'bearish' };
    }
  }
  return null;
}

// ─── Floating Candlestick Shape Renderer (Exact TradingView / Dhan Style) ────────
const FloatingCandlestickShape = (props) => {
  const { x, width, payload, showPatterns, yAxisDomain, chartHeight = 320 } = props;
  if (!payload || !yAxisDomain) return null;

  const { open, close, high, low, pattern } = payload;
  const isGreen = close >= open;

  // Exact TradingView / Dhan color palette from reference screenshot:
  // Bullish: #089981 (Teal Green)
  // Bearish: #f23645 (Coral Red)
  const candleColor = isGreen ? '#089981' : '#f23645';

  const [minY, maxY] = yAxisDomain;
  const topMargin = 15;
  const bottomMargin = 25;
  const usableH = chartHeight - topMargin - bottomMargin;
  const rangeY = Math.max(maxY - minY, 0.001);

  const getPixelY = (val) => topMargin + (1 - (val - minY) / rangeY) * usableH;

  const yHigh = getPixelY(high);
  const yLow = getPixelY(low);
  const yOpen = getPixelY(open);
  const yClose = getPixelY(close);

  const bodyTop = Math.min(yOpen, yClose);
  const bodyBottom = Math.max(yOpen, yClose);
  const bodyH = Math.max(bodyBottom - bodyTop, 1.5);

  const cx = x + width / 2;
  const candleW = Math.max(width * 0.68, 2.5);
  const candleX = cx - candleW / 2;

  return (
    <g style={{ cursor: 'pointer' }}>
      {/* High-Low Thin Wick Line */}
      <line
        x1={cx}
        y1={yHigh}
        x2={cx}
        y2={yLow}
        stroke={candleColor}
        strokeWidth={1.5}
      />
      {/* Solid Candle Body Rectangle */}
      <rect
        x={candleX}
        y={bodyTop}
        width={candleW}
        height={bodyH}
        fill={candleColor}
        stroke={candleColor}
        strokeWidth={1}
        rx={0.5}
      />

      {/* Pattern Recognition Overlay Badge */}
      {showPatterns && pattern && (
        <g transform={`translate(${cx}, ${yHigh - 12})`}>
          <rect
            x={-22}
            y={-9}
            width={44}
            height={14}
            fill={pattern.type === 'bullish' ? 'rgba(8, 153, 129, 0.25)' : 'rgba(242, 54, 69, 0.25)'}
            stroke={pattern.type === 'bullish' ? '#089981' : '#f23645'}
            strokeWidth={1}
            rx={4}
          />
          <text
            x={0}
            y={1}
            textAnchor="middle"
            fill={pattern.type === 'bullish' ? '#089981' : '#f23645'}
            fontSize={8}
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {pattern.label}
          </text>
        </g>
      )}
    </g>
  );
};

// ─── Custom Tooltip (Rupee Formatted) ─────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, chartSettings }) => {
  if (active && payload && payload.length) {
    const item = payload[0]?.payload;
    if (!item) return null;

    const isCandle = chartSettings.chartType === 'candles';

    return (
      <div style={{
        background: '#ffffff', border: '1px solid #cbd5e1',
        borderRadius: '0.65rem', padding: '0.75rem 1rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.12)', fontSize: '0.8rem',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div style={{ color: '#64748b', marginBottom: '0.35rem', fontWeight: 700 }}>{item.fullDate || label}</div>
        {isCandle ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <div>Open: <strong style={{ color: '#334155' }}>₹{item.open?.toLocaleString('en-IN')}</strong></div>
            <div>High: <strong style={{ color: '#16a34a' }}>₹{item.high?.toLocaleString('en-IN')}</strong></div>
            <div>Low: <strong style={{ color: '#dc2626' }}>₹{item.low?.toLocaleString('en-IN')}</strong></div>
            <div>Close: <strong style={{ color: item.close >= item.open ? '#16a34a' : '#dc2626' }}>₹{item.close?.toLocaleString('en-IN')}</strong></div>
          </div>
        ) : (
          <div style={{ fontWeight: 800, color: '#1e40af', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
            ₹{item.close ? item.close.toLocaleString('en-IN') : payload[0].value?.toLocaleString('en-IN')}
          </div>
        )}

        {item.pattern && chartSettings.showPatterns && (
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: item.pattern.type === 'bullish' ? '#16a34a' : '#dc2626', marginTop: '0.2rem' }}>
            Pattern: {item.pattern.label}
          </div>
        )}

        {payload.map(p => {
          if (p.dataKey === 'SMA_50') return <div key="sma50" style={{ color: '#eab308', fontSize: '0.75rem', fontWeight: 600 }}>SMA 50: ₹{p.value}</div>;
          if (p.dataKey === 'SMA_200') return <div key="sma200" style={{ color: '#2563eb', fontSize: '0.75rem', fontWeight: 600 }}>SMA 200: ₹{p.value}</div>;
          if (p.dataKey === 'EMA_20') return <div key="ema20" style={{ color: '#a855f7', fontSize: '0.75rem', fontWeight: 600 }}>EMA 20: ₹{p.value}</div>;
          if (p.dataKey === 'bollingerUpper') return <div key="bUpper" style={{ color: '#0ea5e9', fontSize: '0.75rem' }}>Upper Band: ₹{p.value}</div>;
          if (p.dataKey === 'bollingerLower') return <div key="bLower" style={{ color: '#0ea5e9', fontSize: '0.75rem' }}>Lower Band: ₹{p.value}</div>;
          return null;
        })}
      </div>
    );
  }
  return null;
};

// ─── Main PriceChart Component ────────────────────────────────────────────────
export default function PriceChart({ stock }) {
  const [range, setRange] = useState('3M');
  const [exchange, setExchange] = useState('NSE');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Chart Customization Settings State
  const [chartSettings, setChartSettings] = useState({
    chartType: 'candles',
    showSMA50: false,
    showSMA200: false,
    showEMA20: true,
    showBollinger: false,
    showRSI: false,
    showMACD: false,
    showVolume: true,
    showSupportResistance: true,
    showTrendlines: false,
    showPatterns: true,
    showTargetLine: true,
    showGrid: true,
    darkTheme: false,
  });

  const daysMap = { '1W': 7, '1M': 30, '3M': 90, '6M': 180, '1Y': 365, '2Y': 730, '5Y': 1825, '10Y': 3650, 'MAX': 5475 };
  const days = daysMap[range] || 90;

  const activePrice = useMemo(() => {
    if (exchange === 'NSE') {
      return stock.price_nse || stock.price;
    } else {
      return stock.price_bse || parseFloat((stock.price * 0.9992).toFixed(2));
    }
  }, [stock.price, stock.price_nse, stock.price_bse, exchange]);

  const activeCode = useMemo(() => {
    return exchange === 'NSE' ? `NSE: ${stock.nseCode || stock.symbol}` : `BSE: ${stock.bseCode || '500000'}`;
  }, [stock.nseCode, stock.bseCode, stock.symbol, exchange]);

  const rawData = useMemo(() => {
    let raw = generatePriceHistory(activePrice, days, range);
    raw = calculateSMA(raw, 50);
    raw = calculateSMA(raw, 200);
    raw = calculateEMA(raw, 20);
    raw = calculateRSI(raw, 14);
    raw = calculateBollinger(raw, 20, 2);

    return raw.map((d, idx) => ({
      ...d,
      candleDiff: Math.max(Math.abs(d.close - d.open), 0.5),
      bodyRange: [Math.min(d.open, d.close), Math.max(d.open, d.close)],
      pattern: detectPattern(d, idx > 0 ? raw[idx - 1] : null)
    }));
  }, [activePrice, range, days]);

  const yAxisDomain = useMemo(() => {
    const minL = Math.min(...rawData.map(d => d.low));
    const maxH = Math.max(...rawData.map(d => d.high));
    const pad = Math.max((maxH - minL) * 0.05, 1);
    return [parseFloat((minL - pad).toFixed(2)), parseFloat((maxH + pad).toFixed(2))];
  }, [rawData]);

  const supportLevel = useMemo(() => Math.min(...rawData.map(d => d.low)), [rawData]);
  const resistanceLevel = useMemo(() => Math.max(...rawData.map(d => d.high)), [rawData]);

  const first = rawData[0].close;
  const last = rawData[rawData.length - 1].close;
  const pctChange = ((last - first) / first * 100).toFixed(2);
  const isUp = last >= first;

  const bgCanvas = chartSettings.darkTheme ? '#131722' : '#ffffff';
  const textCanvas = chartSettings.darkTheme ? '#f8fafc' : '#0f172a';

  return (
    <div style={{
      background: bgCanvas, color: textCanvas, borderRadius: '1rem',
      padding: '1.25rem', border: chartSettings.darkTheme ? '1px solid #1e222d' : '1px solid #e2e8f0',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: 'all 0.2s'
    }}>
      {/* Header controls & Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem', borderBottom: chartSettings.darkTheme ? '1px solid #1e222d' : '1px solid #f1f5f9', paddingBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', background: chartSettings.darkTheme ? '#1e222d' : '#eff6ff', padding: '0.2rem 0.6rem', borderRadius: 6, fontWeight: 800, color: chartSettings.darkTheme ? '#38bdf8' : '#2563eb', border: chartSettings.darkTheme ? '1px solid #2a2e39' : '1px solid #bfdbfe' }}>
              {activeCode}
            </span>
            <span style={{ fontSize: '0.75rem', color: chartSettings.darkTheme ? '#787b86' : '#64748b', fontWeight: 600 }}>TBT Charts · Real-time Candlesticks</span>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: chartSettings.darkTheme ? '#089981' : textCanvas, marginTop: '0.35rem', letterSpacing: '-0.02em' }}>
            ₹{activePrice.toLocaleString('en-IN')}
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
            fontSize: '0.875rem', fontWeight: 800,
            color: isUp ? '#089981' : '#f23645', marginTop: '0.15rem',
          }}>
            {isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {isUp ? '+' : ''}{pctChange}% ({range})
          </div>
        </div>

        {/* Action Controls & Settings */}
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {/* Exchange Selector Toggle */}
          <div style={{ display: 'flex', background: chartSettings.darkTheme ? '#1e222d' : '#f1f5f9', borderRadius: 8, padding: '2px', border: chartSettings.darkTheme ? '1px solid #2a2e39' : '1px solid #cbd5e1' }}>
            {[
              { id: 'NSE', label: 'NSE' },
              { id: 'BSE', label: 'BSE' }
            ].map(exch => (
              <button
                key={exch.id}
                onClick={() => setExchange(exch.id)}
                style={{
                  padding: '0.35rem 0.75rem', border: 'none', background: exchange === exch.id ? '#089981' : 'transparent',
                  color: exchange === exch.id ? 'white' : chartSettings.darkTheme ? '#787b86' : '#64748b',
                  fontWeight: 800, fontSize: '0.75rem', cursor: 'pointer', borderRadius: 6,
                  transition: 'all 0.15s'
                }}
              >
                {exch.label}
              </button>
            ))}
          </div>

          {/* Quick Chart Type Buttons */}
          <div style={{ display: 'flex', background: chartSettings.darkTheme ? '#1e222d' : '#f1f5f9', borderRadius: 8, padding: '2px', border: chartSettings.darkTheme ? '1px solid #2a2e39' : '1px solid #cbd5e1' }}>
            {[
              { id: 'candles', label: '🕯️ Candles' },
              { id: 'line', label: '📈 Line' },
              { id: 'bar', label: '📊 Bar' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setChartSettings(prev => ({ ...prev, chartType: t.id }))}
                style={{
                  padding: '0.35rem 0.65rem', border: 'none', background: chartSettings.chartType === t.id ? (chartSettings.darkTheme ? '#2a2e39' : '#ffffff') : 'transparent',
                  color: chartSettings.chartType === t.id ? (chartSettings.darkTheme ? '#38bdf8' : '#1e40af') : (chartSettings.darkTheme ? '#787b86' : '#64748b'),
                  fontWeight: chartSettings.chartType === t.id ? 800 : 600, fontSize: '0.75rem', cursor: 'pointer', borderRadius: 6,
                  boxShadow: chartSettings.chartType === t.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Time Range Selector */}
          <div style={{ display: 'flex', background: chartSettings.darkTheme ? '#1e222d' : '#f1f5f9', borderRadius: 8, padding: '2px', border: chartSettings.darkTheme ? '1px solid #2a2e39' : '1px solid #cbd5e1' }}>
            {RANGES.map(r => (
              <button
                key={r}
                onClick={() => setRange(r)}
                style={{
                  padding: '0.35rem 0.65rem', border: 'none', background: range === r ? '#2563eb' : 'transparent',
                  color: range === r ? 'white' : chartSettings.darkTheme ? '#9b9fae' : '#475569',
                  fontWeight: range === r ? 800 : 600, fontSize: '0.75rem', cursor: 'pointer', borderRadius: 6,
                  transition: 'all 0.15s'
                }}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Comprehensive CHART SETTING Button */}
          <button
            onClick={() => setShowSettingsModal(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.45rem 0.85rem', borderRadius: 8,
              background: 'linear-gradient(135deg, #0f172a, #1e293b)',
              color: '#ffffff', border: '1px solid #334155',
              fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)', transition: 'all 0.15s'
            }}
          >
            <Sliders size={15} color="#38bdf8" /> CHART SETTINGS
          </button>
        </div>
      </div>

      {/* Quick Active Indicators Toolbar Badges */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.875rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.725rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Active Overlays:
        </span>
        {chartSettings.showEMA20 && (
          <span style={{ fontSize: '0.725rem', background: '#f3e8ff', color: '#7e22ce', border: '1px solid #d8b4fe', padding: '0.15rem 0.5rem', borderRadius: 9999, fontWeight: 700 }}>
            EMA 20
          </span>
        )}
        {chartSettings.showSMA50 && (
          <span style={{ fontSize: '0.725rem', background: '#fef9c3', color: '#a16207', border: '1px solid #fef08a', padding: '0.15rem 0.5rem', borderRadius: 9999, fontWeight: 700 }}>
            SMA 50
          </span>
        )}
        {chartSettings.showSMA200 && (
          <span style={{ fontSize: '0.725rem', background: '#dbeafe', color: '#1e40af', border: '1px solid #93c5fd', padding: '0.15rem 0.5rem', borderRadius: 9999, fontWeight: 700 }}>
            SMA 200
          </span>
        )}
        {chartSettings.showBollinger && (
          <span style={{ fontSize: '0.725rem', background: '#e0f2fe', color: '#0369a1', border: '1px solid #7dd3fc', padding: '0.15rem 0.5rem', borderRadius: 9999, fontWeight: 700 }}>
            Bollinger Bands
          </span>
        )}
        {chartSettings.showSupportResistance && (
          <span style={{ fontSize: '0.725rem', background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', padding: '0.15rem 0.5rem', borderRadius: 9999, fontWeight: 700 }}>
            Support & Resistance
          </span>
        )}
        {chartSettings.showPatterns && (
          <span style={{ fontSize: '0.725rem', background: '#fae8ff', color: '#86198f', border: '1px solid #f0abfc', padding: '0.15rem 0.5rem', borderRadius: 9999, fontWeight: 700 }}>
            Pattern Recognition
          </span>
        )}
      </div>

      {/* Main Floating Candlesticks & Price Chart Canvas */}
      <div style={{ height: chartSettings.showRSI ? 280 : 340, width: '100%', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={rawData} margin={{ top: 15, right: 35, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="bullishLineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="bearishLineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            {chartSettings.showGrid && (
              <CartesianGrid strokeDasharray="3 3" stroke={chartSettings.darkTheme ? '#1e222d' : '#f1f5f9'} vertical={false} />
            )}
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={{ stroke: chartSettings.darkTheme ? '#2a2e39' : '#cbd5e1' }}
              tick={{ fontSize: 11, fill: chartSettings.darkTheme ? '#787b86' : '#64748b' }}
            />
            <YAxis
              domain={yAxisDomain}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: chartSettings.darkTheme ? '#787b86' : '#64748b' }}
              tickFormatter={v => `₹${v.toLocaleString('en-IN')}`}
            />
            <Tooltip content={<CustomTooltip chartSettings={chartSettings} />} />

            {/* TradingView / Dhan Style Current Price Badge Horizontal Line */}
            <ReferenceLine
              y={activePrice}
              stroke="#089981"
              strokeDasharray="3 3"
              strokeWidth={1.5}
              label={{
                value: `₹${activePrice.toLocaleString('en-IN')}`,
                fill: '#ffffff',
                backgroundColor: '#089981',
                fontSize: 10,
                fontWeight: 'bold',
                position: 'right'
              }}
            />

            {/* Support and Resistance Reference Lines */}
            {chartSettings.showSupportResistance && (
              <>
                <ReferenceLine
                  y={resistanceLevel}
                  stroke="#f23645"
                  strokeDasharray="4 4"
                  label={{ value: `Resistance: ₹${resistanceLevel.toLocaleString('en-IN')}`, fill: '#f23645', fontSize: 10, fontWeight: 'bold', position: 'insideTopLeft' }}
                />
                <ReferenceLine
                  y={supportLevel}
                  stroke="#089981"
                  strokeDasharray="4 4"
                  label={{ value: `Support: ₹${supportLevel.toLocaleString('en-IN')}`, fill: '#089981', fontSize: 10, fontWeight: 'bold', position: 'insideBottomLeft' }}
                />
              </>
            )}

            {/* Target Price Line */}
            {chartSettings.showTargetLine && stock.targetPrice && (
              <ReferenceLine
                y={stock.targetPrice}
                stroke="#2563eb"
                strokeDasharray="3 3"
                label={{ value: `Target: ₹${stock.targetPrice.toLocaleString('en-IN')}`, fill: '#2563eb', fontSize: 10, fontWeight: 'bold', position: 'insideRight' }}
              />
            )}

            {/* EXACT TRADINGVIEW / DHAN FLOATING CANDLESTICKS */}
            {chartSettings.chartType === 'candles' && (
              <Bar
                dataKey="candleDiff"
                shape={<FloatingCandlestickShape showPatterns={chartSettings.showPatterns} yAxisDomain={yAxisDomain} chartHeight={chartSettings.showRSI ? 280 : 340} />}
              >
                {rawData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.close >= entry.open ? '#089981' : '#f23645'} />
                ))}
              </Bar>
            )}

            {/* Dynamic Bullish (Green) / Bearish (Red) Line & Area Gradient (Google Finance Style) */}
            {(chartSettings.chartType === 'line' || chartSettings.chartType === 'area') && (
              <>
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke={isUp ? '#22c55e' : '#ef4444'}
                  fill={`url(#${isUp ? 'bullishLineGradient' : 'bearishLineGradient'})`}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, fill: isUp ? '#22c55e' : '#ef4444', stroke: '#ffffff', strokeWidth: 2 }}
                />
                <ReferenceLine
                  y={first}
                  stroke={chartSettings.darkTheme ? '#64748b' : '#94a3b8'}
                  strokeDasharray="2 4"
                  label={{
                    value: `Previous close ₹${first.toLocaleString('en-IN')}`,
                    fill: isUp ? '#15803d' : '#b91c1c',
                    fontSize: 10,
                    fontWeight: 'bold',
                    position: 'top'
                  }}
                />
              </>
            )}

            {/* Bar Style */}
            {chartSettings.chartType === 'bar' && (
              <Bar dataKey="price" fill={isUp ? '#22c55e' : '#ef4444'} radius={[4, 4, 0, 0]} maxBarSize={30} />
            )}

            {/* Volume Bar Overlay */}
            {chartSettings.showVolume && (
              <Bar dataKey="volume" yAxisId="vol" fill="rgba(148, 163, 184, 0.25)" maxBarSize={14} />
            )}

            {/* Technical Indicators Overlays */}
            {chartSettings.showEMA20 && <Line type="monotone" dataKey="EMA_20" stroke="#a855f7" strokeWidth={1.5} dot={false} isAnimationActive={false} />}
            {chartSettings.showSMA50 && <Line type="monotone" dataKey="SMA_50" stroke="#eab308" strokeWidth={1.5} dot={false} isAnimationActive={false} />}
            {chartSettings.showSMA200 && <Line type="monotone" dataKey="SMA_200" stroke="#2563eb" strokeWidth={1.5} dot={false} isAnimationActive={false} />}

            {/* Bollinger Bands */}
            {chartSettings.showBollinger && (
              <>
                <Line type="monotone" dataKey="bollingerUpper" stroke="#0ea5e9" strokeDasharray="3 3" strokeWidth={1} dot={false} />
                <Line type="monotone" dataKey="bollingerLower" stroke="#0ea5e9" strokeDasharray="3 3" strokeWidth={1} dot={false} />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* RSI Sub-Chart Panel */}
      {chartSettings.showRSI && (
        <div style={{ height: 110, width: '100%', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', marginBottom: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>📊 RSI (14) Indicator</span>
            <span style={{ color: rawData[rawData.length - 1]?.RSI > 70 ? '#dc2626' : rawData[rawData.length - 1]?.RSI < 30 ? '#16a34a' : '#2563eb' }}>
              {rawData[rawData.length - 1]?.RSI} ({rawData[rawData.length - 1]?.RSI > 70 ? 'Overbought' : rawData[rawData.length - 1]?.RSI < 30 ? 'Oversold' : 'Neutral'})
            </span>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rawData} margin={{ top: 5, right: 15, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <YAxis domain={[0, 100]} ticks={[30, 70]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <ReferenceLine y={70} stroke="#dc2626" strokeDasharray="3 3" />
              <ReferenceLine y={30} stroke="#16a34a" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="RSI" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Chart Settings Modal */}
      {showSettingsModal && (
        <ChartSettingsModal
          settings={chartSettings}
          onSave={(newSettings) => setChartSettings(newSettings)}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
}
