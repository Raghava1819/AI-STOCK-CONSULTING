import { MessageCircle, PieChart, Shield } from 'lucide-react';

const features = [
  {
    icon: <MessageCircle size={26} />,
    iconBg: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
    iconColor: '#2563eb',
    title: 'AI Chat Advisor',
    desc: 'Get instant answers to your stock questions in simple, actionable terms. Ask anything from "Should I buy TCS?" to "How diversified am I?"',
  },
  {
    icon: <PieChart size={26} />,
    iconBg: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)',
    iconColor: '#0d9488',
    title: 'Portfolio Analysis',
    desc: 'Comprehensive analysis of your holdings with clear diversification advice. Understand your risk exposure and sector allocation at a glance.',
  },
  {
    icon: <Shield size={26} />,
    iconBg: 'linear-gradient(135deg, #fefce8, #fef9c3)',
    iconColor: '#b45309',
    title: 'Risk Management',
    desc: 'Smart risk assessment to help you make informed investment decisions. Know exactly where you stand before putting your money on the line.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" style={{ color: 'white', marginBottom: '0.5rem' }}>
            Everything You Need to Invest Smart
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Powered by cutting-edge AI to give you professional-grade insights
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="feature-card animate-fadeInUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div
                className="feature-icon"
                style={{ background: f.iconBg, color: f.iconColor }}
              >
                {f.icon}
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
