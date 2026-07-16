import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PortfolioBuilder from './components/PortfolioBuilder';
import ChatAdvisor from './components/ChatAdvisor';
import UsageDashboard from './components/UsageDashboard';
import DemoPage from './pages/DemoPage';
import StockDetailPage from './pages/StockDetailPage';
import { TrendingUp } from 'lucide-react';

// ─── Home Page ─────────────────────────────────────────────────────────────────
function HomePage() {
  const [portfolio, setPortfolio] = useState([]);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [chatCount, setChatCount] = useState(0);
  const [reportCount] = useState(0);
  const [chatTrigger, setChatTrigger] = useState(null);

  const handleAnalyse = (portfolioData) => {
    setAnalysisCount(prev => prev + 1);
    const prompt = `Please analyze my stock portfolio:\n${
      portfolioData.map(p =>
        `- ${p.symbol}: ${p.quantity} shares @ ₹${p.avgPrice} (Total: ₹${p.totalValue.toLocaleString('en-IN')})`
      ).join('\n')
    }\n\nGive me:\n1. Portfolio health assessment\n2. Diversification advice\n3. Top 2-3 actionable recommendations\n4. Overall risk level (Low/Medium/High)`;
    setChatTrigger({ text: prompt, id: Date.now() });
    setTimeout(() => { document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' }); }, 300);
  };

  const handleLoadDemo = (demoStocks) => {
    const withTotals = demoStocks.map(s => ({ ...s, totalValue: s.quantity * s.avgPrice }));
    setPortfolio(withTotals);
    setTimeout(() => {
      setAnalysisCount(prev => prev + 1);
      const prompt = `Please analyze this sample portfolio (demo mode):\n${
        withTotals.map(p => `- ${p.symbol}: ${p.quantity} shares @ ₹${p.avgPrice} (Total: ₹${p.totalValue.toLocaleString('en-IN')})`).join('\n')
      }\n\nGive me a full analysis:\n1. Portfolio health assessment\n2. Sector diversification review\n3. Risk level (Low/Medium/High)\n4. Top 3 actionable recommendations for a beginner investor`;
      setChatTrigger({ text: prompt, id: Date.now() });
      setTimeout(() => { document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' }); }, 600);
    }, 800);
  };

  return (
    <div>
      <Navbar />
      <HeroSection onLoadDemo={handleLoadDemo} />
      <FeaturesSection />
      <PortfolioBuilder portfolio={portfolio} setPortfolio={setPortfolio} onAnalyse={handleAnalyse} />
      <ChatAdvisor portfolio={portfolio} chatTrigger={chatTrigger} onMessageSent={() => setChatCount(prev => prev + 1)} />
      <UsageDashboard analysisCount={analysisCount} chatCount={chatCount} reportCount={reportCount} />
      <footer className="footer">
        <div className="footer-logo">
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #3b82f6, #14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={18} />
          </div>
          StockAI Consultant
        </div>
        <p style={{ marginBottom: '0.375rem' }}>AI-powered stock guidance for every investor — beginners to pros.</p>
        <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
          ⚠️ Not financial advice. Always consult a registered financial advisor before investing.
        </p>
      </footer>
    </div>
  );
}

// ─── App with Router ───────────────────────────────────────────────────────────
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/stock/:symbol" element={<StockDetailPage />} />
    </Routes>
  );
}
