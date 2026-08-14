import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Key, X, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { STOCKS } from '../data/stockData';

const STORAGE_KEY = 'stockai_gemini_key';

function formatTime(date) {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function buildSystemPrompt(portfolio, riskProfile) {
  const portfolioStr = portfolio && portfolio.length > 0
    ? portfolio.map(p => `${p.symbol}: ${p.quantity} shares @ ₹${p.avgPrice} (Total: ₹${p.totalValue || (p.quantity * p.avgPrice)})`).join('\n')
    : 'No portfolio data provided.';

  const riskStr = riskProfile ? `\nUser's Risk Profile: ${riskProfile} investor. Tailor all recommendations accordingly.` : '';

  return `You are a professional Stock Market Consultant Agent specializing in the Indian stock market (BSE/NSE). 
Your role is to provide personalized, easy-to-understand investment advice in plain English.

Current User Portfolio:
${portfolioStr}${riskStr}

Guidelines:
- Always give actionable buy/sell/hold recommendations with clear reasons.
- Explain concepts simply — assume the user is a beginner.
- Use ₹ (Indian Rupee) for all price mentions.
- Reference Indian stocks (NSE/BSE) when making suggestions.
- Mention risk levels (Low/Medium/High) for recommendations.
- Keep answers concise but informative (3-5 sentences max unless detailed analysis is requested).
- Format responses clearly with bullet points when listing multiple items.`;
}

function generateFallbackResponse(msgText, portfolio = [], riskProfile = null) {
  const query = msgText.toLowerCase();

  // 1. Portfolio Analysis
  if (query.includes('portfolio') || query.includes('analyze my') || query.includes('sample portfolio')) {
    if (!portfolio || portfolio.length === 0) {
      return `📊 **Portfolio Analysis**\n\nYour portfolio is currently empty! Add some stocks in the **Portfolio Builder** above to get personalized risk assessment, sector diversification analysis, and buy/sell/hold recommendations.\n\n💡 *Tip: Click "Load Demo Portfolio" in the Hero section to test with a sample portfolio.*`;
    }

    const totalVal = portfolio.reduce((acc, p) => acc + (p.totalValue || (p.quantity * p.avgPrice)), 0);
    const stockDetails = portfolio.map(p => {
      const stock = STOCKS[p.symbol?.toUpperCase()];
      const curPrice = stock ? stock.price : p.avgPrice;
      const curVal = p.quantity * curPrice;
      const gain = curVal - (p.totalValue || (p.quantity * p.avgPrice));
      const gainPct = ((gain / (p.totalValue || (p.quantity * p.avgPrice))) * 100).toFixed(1);
      return { ...p, curPrice, curVal, gain, gainPct, sector: stock ? stock.sector : 'Other', rec: stock ? stock.recommendation : 'HOLD' };
    });

    const sectors = [...new Set(stockDetails.map(s => s.sector))];
    const riskText = riskProfile ? `Tailored for a **${riskProfile}** risk profile.` : 'Standard Moderate risk approach.';

    return `📊 **Portfolio Health & Advisory Report** (${riskText})\n\n` +
      `• **Total Portfolio Value**: ₹${totalVal.toLocaleString('en-IN')}\n` +
      `• **Holdings**: ${portfolio.length} Stock(s) across ${sectors.length} Sector(s) (${sectors.join(', ')})\n\n` +
      `🔍 **Stock Breakdown**:\n` +
      stockDetails.map(s => `  - **${s.symbol}**: ${s.quantity} shares | Value: ₹${s.curVal.toLocaleString('en-IN')} (${s.gain >= 0 ? '+' : ''}${s.gainPct}%) → Rec: **${s.rec}**`).join('\n') +
      `\n\n💡 **Actionable Recommendations**:\n` +
      `1. **Diversification**: ${sectors.length < 3 ? 'Consider adding exposure to Banking or IT sectors to reduce concentration risk.' : 'Good sector spread across your holdings.'}\n` +
      `2. **Risk Management**: Maintain a strict stop-loss of 8-10% on high-beta holdings.\n` +
      `3. **Strategy**: Continue SIP accumulation in blue-chip leaders on market dips.`;
  }

  // 2. Specific Stock Query
  const matchedStockKey = Object.keys(STOCKS).find(sym => query.includes(sym.toLowerCase()) || STOCKS[sym].name.toLowerCase().includes(query));
  if (matchedStockKey) {
    const s = STOCKS[matchedStockKey];
    return `📈 **Stock Advisory: ${s.name} (${s.symbol})**\n\n` +
      `• **Current Price**: ₹${s.price} (${s.change >= 0 ? '+' : ''}${s.changePercent}%)\n` +
      `• **Recommendation**: **${s.recommendation}** (Target: ₹${s.targetPrice})\n` +
      `• **Valuation**: P/E ${s.pe}x | Market Cap: ₹${s.marketCap}\n` +
      `• **52-Week Range**: ₹${s.low52} - ₹${s.high52}\n\n` +
      `📋 **Key Takeaways**:\n` +
      s.keyPoints.slice(0, 3).map(k => `  - ${k}`).join('\n') +
      `\n\n✅ **Pros**: ${s.pros[0] || 'Strong fundamentals'}\n` +
      `⚠️ **Cons**: ${s.cons[0] || 'Market cyclicality'}`;
  }

  // 3. Best Indian Stocks
  if (query.includes('best') || query.includes('stocks to buy') || query.includes('recommend')) {
    return `🚀 **Top Recommended Indian Blue-Chip Stocks**:\n\n` +
      `1. **HDFC Bank (HDFCBANK)** - Target: ₹2,050 | Rating: BUY (P/E 19.4x)\n` +
      `   *Reason*: Credit quality leader with strong CASA ratio and attractive post-merger valuation.\n\n` +
      `2. **Reliance Industries (RELIANCE)** - Target: ₹3,100 | Rating: BUY (P/E 26.8x)\n` +
      `   *Reason*: Growth in Retail, Telecom (Jio 5G), and New Energy transition.\n\n` +
      `3. **Infosys (INFY)** - Target: ₹1,750 | Rating: BUY (P/E 24.1x)\n` +
      `   *Reason*: AI-first Topaz platform and strong large deal pipeline.\n\n` +
      `4. **Tata Motors (TATAMOTORS)** - Target: ₹1,250 | Rating: BUY (P/E 8.2x)\n` +
      `   *Reason*: JLR turnaround, EV leadership in India, and debt reduction.`;
  }

  // 4. P/E Ratio
  if (query.includes('p/e') || query.includes('pe ratio') || query.includes('earnings ratio')) {
    return `💡 **Understanding the P/E (Price-to-Earnings) Ratio**:\n\n` +
      `The **P/E ratio** measures how much investors pay for every ₹1 of profit a company generates.\n\n` +
      `• **Formula**: \`P/E = Stock Price / Earnings Per Share (EPS)\`\n` +
      `• **High P/E (e.g. TCS @ 28x)**: Indicates high growth expectations or premium brand valuation.\n` +
      `• **Low P/E (e.g. Tata Motors @ 8x)**: May indicate an undervalued bargain stock or cyclical industry.\n\n` +
      `📌 *Advisor Tip*: Always compare P/E against industry peers, not across unrelated sectors!`;
  }

  // 5. SIP Investing
  if (query.includes('sip') || query.includes('systematic')) {
    return `🔄 **SIP (Systematic Investment Plan) Strategy**:\n\n` +
      `SIP allows you to invest a fixed amount regularly (e.g., monthly) in stocks or mutual funds.\n\n` +
      `• **Rupee Cost Averaging**: Buys more units when market is low, fewer when high.\n` +
      `• **Power of Compounding**: Investing ₹10,000/month @ 12% CAGR turns into **₹23 Lakhs in 10 years**!\n` +
      `• **Disciplined Growth**: Eliminates the urge to time market highs and lows.\n\n` +
      `💡 *Recommendation*: Set up automated SIPs in quality Nifty 50 index funds or top blue-chips.`;
  }

  // Default fallback
  return `🤖 **Stock Consultant Advisor**\n\n` +
    `Thank you for asking about "${msgText}".\n\n` +
    `• **Market Sentiment**: Indian markets (Nifty & Sensex) are showing strong resilience backed by domestic institutional inflows.\n` +
    `• **Strategy**: Allocate 60% in Large Caps (HDFC Bank, Reliance, TCS), 25% in Mid Caps, and 15% cash reserve for market dips.\n` +
    `• **Risk Advisory**: Always check valuation multiples (P/E, Debt-to-Equity) and set stop-loss limits on volatile trades.`;
}

export default function ChatAdvisor({ portfolio, chatTrigger, onMessageSent, riskProfile }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [useDemoMode, setUseDemoMode] = useState(() => !localStorage.getItem(STORAGE_KEY));
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState('');
  const [keyError, setKeyError] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'agent',
      content: "Hi! I'm your Stock Market Consultant Agent. I'm here to help you make smarter investment decisions. You can ask me about any stock, request portfolio analysis, or get buy/sell/hold recommendations. What would you like to know today?",
      time: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const lastTriggerId = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (chatTrigger && chatTrigger.id !== lastTriggerId.current) {
      lastTriggerId.current = chatTrigger.id;
      setTimeout(() => {
        sendMessage(chatTrigger.text);
      }, 400);
    }
  }, [chatTrigger]);

  const openModal = () => {
    setTempKey(apiKey);
    setKeyError('');
    setShowKeyModal(true);
  };

  const saveKey = () => {
    const trimmedKey = tempKey.trim();
    if (!trimmedKey) {
      setKeyError('Please enter an API key or switch to Demo Mode.');
      return;
    }

    if (!trimmedKey.startsWith('AIza')) {
      setKeyError('⚠️ Notice: Google Gemini API keys start with "AIza...". Keys like "AQ.Ab..." are invalid. Please get a key at aistudio.google.com or use Demo Mode.');
    } else {
      setKeyError('');
    }

    localStorage.setItem(STORAGE_KEY, trimmedKey);
    setApiKey(trimmedKey);
    setUseDemoMode(false);
    setShowKeyModal(false);
  };

  const enableDemoMode = () => {
    setUseDemoMode(true);
    setShowKeyModal(false);
  };

  const sendMessage = async (text) => {
    const msgText = (text || input).trim();
    if (!msgText || loading) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: msgText,
      time: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    if (onMessageSent) onMessageSent();

    // Check if we should use Demo Mode or if Key is obviously invalid format (doesn't start with AIza)
    const storedKey = apiKey || localStorage.getItem(STORAGE_KEY) || '';
    const isKeyInvalidFormat = storedKey && !storedKey.startsWith('AIza');

    if (useDemoMode || !storedKey || isKeyInvalidFormat) {
      // Simulate network delay for natural feel
      setTimeout(() => {
        const responseText = generateFallbackResponse(msgText, portfolio, riskProfile);
        const prefix = isKeyInvalidFormat
          ? '⚠️ *Note: Your saved Gemini key format was invalid (must start with AIza...). Responding via Built-in AI Advisor:*\n\n'
          : (!storedKey ? '💡 *[Demo Mode - Built-in Advisor]*\n\n' : '');

        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'agent',
          content: prefix + responseText,
          time: new Date(),
        }]);
        setLoading(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }, 700);
      return;
    }

    // Try Gemini API call with saved key
    try {
      const genAI = new GoogleGenerativeAI(storedKey);
      // Try gemini-1.5-flash
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const systemPrompt = buildSystemPrompt(portfolio, riskProfile);
      const fullPrompt = `${systemPrompt}\n\nUser question: ${msgText}`;

      const result = await model.generateContent(fullPrompt);
      const responseText = result.response.text();

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'agent',
        content: responseText,
        time: new Date(),
      }]);
    } catch (err) {
      console.warn('Gemini API call failed, falling back to Built-in AI:', err);

      const fallbackText = generateFallbackResponse(msgText, portfolio, riskProfile);
      const detailedNotice = `⚠️ *Gemini API Notice: Key validation failed (${err.message || 'Invalid key'}). Switched to Built-in Stock Advisor:*\n\n`;

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'agent',
        content: detailedNotice + fallbackText,
        time: new Date(),
      }]);

      // Automatically enable Demo Mode so subsequent messages are fast and uninterrupted
      setUseDemoMode(true);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="chat" className="chat-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">AI Stock Advisor Chat</h2>
          <p className="section-subtitle">
            Ask anything about stocks, your portfolio, or the Indian market
          </p>
        </div>

        {/* API Key Modal */}
        {showKeyModal && (
          <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowKeyModal(false)}>
            <div className="modal" style={{ maxWidth: 520 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb'
                  }}>
                    <Key size={20} />
                  </div>
                  <h3 className="modal-title" style={{ marginBottom: 0 }}>Gemini API Settings</h3>
                </div>
                <button
                  onClick={() => setShowKeyModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="modal-desc" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                Enter your <strong>Google Gemini API key</strong> (starts with <code>AIza...</code>).
                Get a free key at{' '}
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--primary)', fontWeight: 600 }}>
                  aistudio.google.com
                </a>.
              </p>

              {keyError && (
                <div style={{
                  padding: '0.75rem 1rem', background: '#fff1f2', border: '1px solid #fecdd3',
                  borderRadius: 8, color: '#e11d48', fontSize: '0.8125rem', marginBottom: '1rem', lineHeight: 1.5
                }}>
                  {keyError}
                </div>
              )}

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-700)', marginBottom: '0.375rem' }}>
                  Gemini API Key:
                </label>
                <input
                  className="input-field"
                  type="password"
                  placeholder="AIzaSy..."
                  value={tempKey}
                  onChange={e => setTempKey(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveKey()}
                  autoFocus
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <button className="btn-primary" style={{ justifyContent: 'center' }} onClick={saveKey}>
                  Save Gemini Key
                </button>
                <button
                  className="btn-ghost"
                  onClick={enableDemoMode}
                  style={{ justifyContent: 'center', background: '#f8fafc', border: '1px solid var(--slate-200)' }}
                >
                  <Sparkles size={16} style={{ color: 'var(--teal)' }} /> Use Built-in Demo Advisor (No Key Needed)
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="card" style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Chat Header */}
          <div className="card-header" style={{ justifyContent: 'space-between', background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--teal))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
              }}>
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--slate-900)', fontSize: '0.9375rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Stock Consultant Agent
                  {useDemoMode && (
                    <span style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 9999, background: '#e0f2fe', color: '#0369a1', fontWeight: 600 }}>
                      Built-in AI Mode
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                  <div className="status-dot" />
                  Online · {useDemoMode ? 'Built-in Intelligent Engine' : 'Powered by Gemini AI'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                className="btn-ghost"
                onClick={openModal}
                title="API Key Settings"
                style={{ gap: '0.375rem', fontSize: '0.8125rem' }}
              >
                <Key size={14} />
                {apiKey && !useDemoMode ? 'Key Active' : 'API Key / Demo'}
              </button>
            </div>
          </div>

          {/* Key Notice Banner if key starts with non-AIza */}
          {apiKey && !apiKey.startsWith('AIza') && !useDemoMode && (
            <div style={{
              padding: '0.625rem 1rem', background: '#fffbeb', borderBottom: '1px solid #fef3c7',
              fontSize: '0.8125rem', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={15} />
                <span>Saved key format <code>{apiKey.substring(0, 8)}...</code> is invalid for Gemini API (must start with <code>AIza</code>).</span>
              </div>
              <button
                onClick={enableDemoMode}
                style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: 4, padding: '0.2rem 0.5rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 700, color: '#92400e' }}
              >
                Switch to Demo Mode
              </button>
            </div>
          )}

          {/* Suggestions */}
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--slate-100)', background: 'var(--slate-50)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              'Analyze my portfolio',
              'Best Indian stocks to buy?',
              'What is SIP investing?',
              'Explain P/E ratio',
              'Reliance stock review'
            ].map(s => (
              <button
                key={s}
                onClick={() => { sendMessage(s); }}
                disabled={loading}
                style={{
                  padding: '0.3rem 0.75rem', fontSize: '0.8rem', border: '1px solid var(--slate-200)',
                  borderRadius: 9999, background: 'white', cursor: loading ? 'not-allowed' : 'pointer',
                  color: 'var(--slate-600)', fontFamily: 'inherit', transition: 'all 0.2s',
                  opacity: loading ? 0.5 : 1,
                }}
                onMouseEnter={e => { if (!loading) { e.target.style.borderColor = 'var(--primary)'; e.target.style.color = 'var(--primary)'; e.target.style.background = '#eff6ff'; } }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--slate-200)'; e.target.style.color = 'var(--slate-600)'; e.target.style.background = 'white'; }}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="chat-window">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-msg ${msg.role}`}>
                <div className="chat-avatar" style={{
                  background: msg.role === 'agent'
                    ? 'linear-gradient(135deg, var(--primary), var(--teal))'
                    : 'linear-gradient(135deg, var(--slate-700), var(--slate-900))',
                  color: 'white',
                  fontSize: '1rem',
                }}>
                  {msg.role === 'agent' ? <Bot size={18} /> : <User size={18} />}
                </div>
                <div>
                  <div className={`chat-bubble`} style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {msg.content}
                  </div>
                  <div className="chat-timestamp">{formatTime(msg.time)}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-msg agent">
                <div className="chat-avatar" style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--teal))',
                  color: 'white',
                }}>
                  <Bot size={18} />
                </div>
                <div className="typing-indicator">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-row">
            <input
              ref={inputRef}
              id="chat-input"
              className="chat-input"
              placeholder="Ask about your portfolio, market trends, or specific stocks..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              id="send-chat-btn"
              className="btn-send"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
            >
              {loading ? <div className="spinner" style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }} /> : <Send size={18} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

