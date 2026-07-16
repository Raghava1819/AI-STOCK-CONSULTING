import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, User, Key, X } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const STORAGE_KEY = 'stockai_gemini_key';

function formatTime(date) {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function buildSystemPrompt(portfolio) {
  const portfolioStr = portfolio.length > 0
    ? portfolio.map(p => `${p.symbol}: ${p.quantity} shares @ ₹${p.avgPrice} (Total: ₹${p.totalValue})`).join('\n')
    : 'No portfolio data provided.';

  return `You are a professional Stock Market Consultant Agent specializing in the Indian stock market (BSE/NSE). 
Your role is to provide personalized, easy-to-understand investment advice in plain English.

Current User Portfolio:
${portfolioStr}

Guidelines:
- Always give actionable buy/sell/hold recommendations with clear reasons.
- Explain concepts simply — assume the user is a beginner.
- Use ₹ (Indian Rupee) for all price mentions.
- Reference Indian stocks (NSE/BSE) when making suggestions.
- Mention risk levels (Low/Medium/High) for recommendations.
- Keep answers concise but informative (3-5 sentences max unless detailed analysis is requested).
- Be honest about limitations — you don't have real-time price data.
- Format responses clearly with bullet points when listing multiple items.`;
}

export default function ChatAdvisor({ portfolio, chatTrigger, onMessageSent }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [showKeyModal, setShowKeyModal] = useState(() => !localStorage.getItem(STORAGE_KEY));
  const [tempKey, setTempKey] = useState('');
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

  // Handle portfolio analysis trigger — fires every time chatTrigger.id changes
  useEffect(() => {
    if (chatTrigger && chatTrigger.id !== lastTriggerId.current) {
      lastTriggerId.current = chatTrigger.id;
      setTimeout(() => {
        sendMessage(chatTrigger.text);
      }, 400);
    }
  }, [chatTrigger]);

  const saveKey = () => {
    if (!tempKey.trim()) return;
    localStorage.setItem(STORAGE_KEY, tempKey.trim());
    setApiKey(tempKey.trim());
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

    try {
      if (!apiKey) {
        throw new Error('NO_API_KEY');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const systemPrompt = buildSystemPrompt(portfolio);
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
      let errorMsg = "Sorry, I encountered an error. Please check your API key and try again.";
      if (err.message === 'NO_API_KEY') {
        errorMsg = "⚠️ Please set your Gemini API key to enable AI responses. Click the key icon above to add it.";
      } else if (err.message?.includes('API_KEY_INVALID') || err.message?.includes('400')) {
        errorMsg = "⚠️ Invalid API key. Please click the key icon to update your Gemini API key.";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'agent',
        content: errorMsg,
        time: new Date(),
      }]);
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
            <div className="modal">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb'
                  }}>
                    <Key size={20} />
                  </div>
                  <h3 className="modal-title" style={{ marginBottom: 0 }}>Gemini API Key Required</h3>
                </div>
                <button
                  onClick={() => setShowKeyModal(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="modal-desc">
                To enable real AI responses, enter your <strong>Google Gemini API key</strong>.
                You can get a free key at{' '}
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--primary)', fontWeight: 600 }}>
                  aistudio.google.com
                </a>.
                Your key is stored only in your browser.
              </p>
              <input
                className="input-field"
                type="password"
                placeholder="AIza..."
                value={tempKey}
                onChange={e => setTempKey(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveKey()}
                style={{ marginBottom: '1rem' }}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={saveKey}>
                  Save & Continue
                </button>
                <button className="btn-ghost" onClick={() => setShowKeyModal(false)}>
                  Skip for now
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
                <div style={{ fontWeight: 700, color: 'var(--slate-900)', fontSize: '0.9375rem' }}>
                  Stock Consultant Agent
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                  <div className="status-dot" />
                  Online · Powered by Gemini AI
                </div>
              </div>
            </div>
            <button
              className="btn-ghost"
              onClick={() => setShowKeyModal(true)}
              title="Update API Key"
              style={{ gap: '0.375rem' }}
            >
              <Key size={14} />
              API Key
            </button>
          </div>

          {/* Suggestions — clicking auto-sends the message */}
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--slate-100)', background: 'var(--slate-50)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              'Analyze my portfolio',
              'Best Indian stocks to buy?',
              'What is SIP investing?',
              'Explain P/E ratio',
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
