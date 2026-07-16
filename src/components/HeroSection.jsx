import { Sparkles, BarChart3, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DEMO_STOCKS = [
  { symbol: 'RELIANCE', quantity: 50, avgPrice: 2450 },
  { symbol: 'TCS', quantity: 20, avgPrice: 3780 },
  { symbol: 'INFY', quantity: 30, avgPrice: 1520 },
  { symbol: 'HDFC', quantity: 15, avgPrice: 1680 },
];

export default function HeroSection({ onLoadDemo }) {
  const navigate = useNavigate();
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewDemo = () => {
    navigate('/demo');
  };

  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 4}s`,
    size: `${Math.random() * 5 + 2}px`,
  }));

  return (
    <section className="hero">
      <div className="hero-particles">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              top: p.top,
              left: p.left,
              animationDelay: p.delay,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      <div className="hero-content animate-fadeInUp">
        <div className="hero-badge">
          <Sparkles size={14} />
          AI-Powered Investment Intelligence
        </div>

        <h1>
          Smart Stock Consulting Agent
          <br />
          <span style={{ color: '#7dd3fc' }}>for Every Investor</span>
        </h1>

        <p>
          Get personalized stock advice in plain English. Our AI agent analyzes
          your portfolio and provides simple buy/sell/hold recommendations that
          make sense — even for beginners.
        </p>

        <div className="hero-cta">
          <button
            id="analyse-now-btn"
            className="btn-primary"
            style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
            onClick={() => scrollTo('portfolio')}
          >
            <BarChart3 size={18} />
            Analyse Now
          </button>
          <button
            id="view-demo-btn"
            className="btn-secondary"
            style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
            onClick={handleViewDemo}
          >
            <Play size={16} style={{ fill: 'white' }} />
            View Demo
          </button>
        </div>

        <div className="hero-stats">
          {[
            { value: '10K+', label: 'Portfolios Analyzed' },
            { value: '95%', label: 'Accuracy Rate' },
            { value: '24/7', label: 'Live Updates' },
            { value: '₹0', label: 'Hidden Fees' },
          ].map(({ value, label }) => (
            <div key={label} className="hero-stat">
              <span className="hero-stat-value">{value}</span>
              <span className="hero-stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
