import { useState, useEffect } from 'react';
import { Activity, MessageSquare, FileText, TrendingUp, Clock, Target, Users, BookOpen } from 'lucide-react';

export default function UsageDashboard({ analysisCount, chatCount, reportCount }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const monthlyLimits = {
    analyses: { used: analysisCount + 45, limit: 50 + Math.floor(analysisCount / 5) * 5 },
    chat: { used: chatCount + 189, limit: 200 + Math.floor(chatCount / 10) * 10 },
    reports: { used: reportCount + 23, limit: 25 + reportCount },
  };

  const totalSpend = (
    (monthlyLimits.analyses.used * 0.5) +
    (monthlyLimits.chat.used * 0.1) +
    (monthlyLimits.reports.used * 1.0)
  ).toFixed(2);

  const getBarColor = (used, limit) => {
    const pct = used / limit;
    if (pct < 0.6) return 'linear-gradient(90deg, #22c55e, #16a34a)';
    if (pct < 0.85) return 'linear-gradient(90deg, #f59e0b, #d97706)';
    return 'linear-gradient(90deg, #ef4444, #dc2626)';
  };

  const todayStats = [
    { label: "Portfolio Analyses", value: analysisCount, cost: `₹${(analysisCount * 0.5).toFixed(1)}`, icon: <Activity size={20} />, color: '#3b82f6', bg: '#eff6ff' },
    { label: "Chat Queries", value: chatCount, cost: `₹${(chatCount * 0.1).toFixed(1)}`, icon: <MessageSquare size={20} />, color: '#14b8a6', bg: '#f0fdfa' },
    { label: "Reports Generated", value: reportCount, cost: `₹${(reportCount * 1.0).toFixed(1)}`, icon: <FileText size={20} />, color: '#f59e0b', bg: '#fffbeb' },
  ];

  return (
    <section id="dashboard" className="dashboard-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Usage Dashboard</h2>
          <p className="section-subtitle">Track your activity and billing in real-time</p>
        </div>

        {/* Today's Activity */}
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={17} /> Today's Activity
        </h3>
        <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
          {todayStats.map(stat => (
            <div key={stat.label} className="stat-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="stat-card-label">{stat.label}</div>
                  <div className="stat-card-value" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="stat-card-sub">Total cost: {stat.cost}</div>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="billing-grid">
          {/* Monthly Usage */}
          <div className="card">
            <div className="card-header">
              <TrendingUp size={18} color="#3b82f6" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>Monthly Usage & Limits</h3>
            </div>
            <div className="card-body">
              {[
                { label: 'Portfolio Analyses', ...monthlyLimits.analyses },
                { label: 'Chat Queries', ...monthlyLimits.chat },
                { label: 'Reports Generated', ...monthlyLimits.reports },
              ].map(item => {
                const pct = Math.min((item.used / item.limit) * 100, 100);
                return (
                  <div key={item.label} style={{ marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--slate-700)', fontWeight: 500 }}>{item.label}</span>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>{item.used}/{item.limit}</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: animated ? `${pct}%` : '0%',
                          background: getBarColor(item.used, item.limit),
                          transition: 'width 1s ease',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Billing Summary */}
          <div className="card">
            <div className="card-header">
              <BookOpen size={18} color="#14b8a6" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>Billing Summary</h3>
            </div>
            <div className="card-body">
              <div style={{
                padding: '1rem', background: 'linear-gradient(135deg, #eff6ff, #f0fdfa)',
                borderRadius: 'var(--radius)', marginBottom: '1.25rem', textAlign: 'center', border: '1px solid #bfdbfe'
              }}>
                <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontWeight: 600, marginBottom: '0.25rem' }}>
                  TOTAL MONTHLY SPEND
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-dark)' }}>₹{totalSpend}</div>
              </div>
              {[
                { name: 'Per Portfolio Analysis', price: '₹0.50' },
                { name: 'Per Chat Query', price: '₹0.10' },
                { name: 'Per Report Generated', price: '₹1.00' },
              ].map(r => (
                <div key={r.name} className="billing-rate">
                  <span className="billing-rate-name">{r.name}</span>
                  <span className="billing-rate-price">{r.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Insights */}
          <div className="card">
            <div className="card-header">
              <Target size={18} color="#f59e0b" />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>Performance Insights</h3>
            </div>
            <div className="card-body">
              {[
                { label: 'Avg Response Time', value: '~2.3s', icon: <Clock size={15} /> },
                { label: 'Accuracy Rate', value: '94%', icon: <Target size={15} /> },
                { label: 'Total Conversations', value: String(156 + chatCount), icon: <Users size={15} /> },
                { label: 'Reports Created', value: String(89 + reportCount), icon: <FileText size={15} /> },
              ].map(m => (
                <div key={m.label} className="perf-metric">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--slate-600)', fontSize: '0.9rem' }}>
                    {m.icon} {m.label}
                  </div>
                  <span className="perf-metric-value">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
