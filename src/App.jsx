import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PortfolioBuilder from './components/PortfolioBuilder';
import ChatAdvisor from './components/ChatAdvisor';
import UsageDashboard from './components/UsageDashboard';
import AIMarketSummary from './components/AIMarketSummary';
import RiskQuiz from './components/RiskQuiz';
import ToastManager, { toast } from './components/ToastManager';
import PortfolioPerformance from './components/PortfolioPerformance';
import DemoPage from './pages/DemoPage';
import StockDetailPage from './pages/StockDetailPage';
import { TrendingUp } from 'lucide-react';
import { useWatchlist } from './components/Watchlist';
import { usePriceAlerts } from './components/PriceAlerts';
import { useLocalStorage } from './hooks/useLocalStorage';
import { STOCKS, STOCK_LIST } from './data/stockData';

// ─── Home Page ──────────────────────────────────────────────────────────────────
function HomePage({ watchlist, isWatched, toggleWatch, alerts, removeAlert }) {
  const [portfolio, setPortfolio] = useLocalStorage('stockai_portfolio', []);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [chatCount, setChatCount] = useState(0);
  const [reportCount] = useState(0);
  const [chatTrigger, setChatTrigger] = useState(null);
  const [showRiskQuiz, setShowRiskQuiz] = useState(false);
  const [riskProfile, setRiskProfile] = useState(() => localStorage.getItem('stockai_risk_profile') || null);

  const handleAnalyse = (portfolioData) => {
    setAnalysisCount(prev => prev + 1);
    const prompt = `Please analyze my stock portfolio:\n${
      portfolioData.map(p =>
        `- ${p.symbol}: ${p.quantity} shares @ ₹${p.avgPrice} (Total: ₹${p.totalValue.toLocaleString('en-IN')})`
      ).join('\n')
    }\n\nGive me:\n1. Portfolio health assessment\n2. Diversification advice\n3. Top 2-3 actionable recommendations\n4. Overall risk level (Low/Medium/High)${riskProfile ? `\n\nNote: User's risk profile is ${riskProfile}.` : ''}`;
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

  const handleRiskResult = (profile) => {
    setRiskProfile(profile);
  };

  return (
    <div>
      <Navbar watchlist={watchlist} isWatched={isWatched} toggleWatch={toggleWatch} alerts={alerts} removeAlert={removeAlert} />
      <HeroSection onLoadDemo={handleLoadDemo} onOpenQuiz={() => setShowRiskQuiz(true)} />
      <AIMarketSummary />
      <FeaturesSection />
      <PortfolioBuilder portfolio={portfolio} setPortfolio={setPortfolio} onAnalyse={handleAnalyse} />
      <PortfolioPerformance portfolio={portfolio} setPortfolio={setPortfolio} />
      <ChatAdvisor portfolio={portfolio} chatTrigger={chatTrigger} onMessageSent={() => setChatCount(prev => prev + 1)} riskProfile={riskProfile} />
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

      {showRiskQuiz && (
        <RiskQuiz onClose={() => setShowRiskQuiz(false)} onResult={handleRiskResult} />
      )}
    </div>
  );
}

// ─── Stock & Demo pages also get the Navbar with shared state ──────────────────
function DemoPageWrapper({ watchlist, isWatched, toggleWatch, alerts, removeAlert }) {
  return (
    <div className="page-content">
      <Navbar watchlist={watchlist} isWatched={isWatched} toggleWatch={toggleWatch} alerts={alerts} removeAlert={removeAlert} />
      <DemoPage watchlist={watchlist} isWatched={isWatched} toggleWatch={toggleWatch} />
    </div>
  );
}

function StockDetailWrapper({ watchlist, isWatched, toggleWatch, alerts, addAlert, removeAlert }) {
  return (
    <div className="page-content">
      <Navbar watchlist={watchlist} isWatched={isWatched} toggleWatch={toggleWatch} alerts={alerts} removeAlert={removeAlert} />
      <StockDetailPage isWatched={isWatched} toggleWatch={toggleWatch} alerts={alerts} addAlert={addAlert} removeAlert={removeAlert} />
    </div>
  );
}

// ─── App with Router ───────────────────────────────────────────────────────────
export default function App() {
  const { watchlist, isWatched, toggleWatch } = useWatchlist();
  const { alerts, addAlert, removeAlert } = usePriceAlerts();
  const [priceTick, setPriceTick] = useState(0);

  // Apply saved theme on mount
  useEffect(() => {
    const theme = localStorage.getItem('stockai_theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  // Background Live Price Ticker
  useEffect(() => {
    const interval = setInterval(() => {
      STOCK_LIST.forEach(stock => {
        if (!stock.price_nse) {
          stock.price_nse = stock.price;
          stock.price_bse = parseFloat((stock.price * (1 - 0.001 + Math.random() * 0.002)).toFixed(2));
        }

        // Fluctuate NSE
        const changePctNse = (Math.random() - 0.5) * 0.005; // -0.25% to +0.25%
        const deltaNse = stock.price_nse * changePctNse;
        stock.price_nse = parseFloat((stock.price_nse + deltaNse).toFixed(2));

        // Fluctuate BSE
        const changePctBse = (Math.random() - 0.5) * 0.005;
        const deltaBse = stock.price_bse * changePctBse;
        stock.price_bse = parseFloat((stock.price_bse + deltaBse).toFixed(2));

        // Keep BSE closely correlated with NSE
        const diffLimit = stock.price_nse * 0.002;
        if (Math.abs(stock.price_bse - stock.price_nse) > diffLimit) {
          stock.price_bse = parseFloat((stock.price_nse * (1 - 0.0005 + Math.random() * 0.001)).toFixed(2));
        }

        // Keep default .price pointing to NSE
        stock.price = stock.price_nse;
        
        // Recalculate stock change using NSE as default
        stock.change = parseFloat((stock.change + deltaNse).toFixed(2));
        const base = stock.price - stock.change;
        if (base > 0) {
          stock.changePercent = (stock.change / base) * 100;
        }
      });

      // Check price alerts (NSE price)
      if (alerts && alerts.length > 0) {
        alerts.forEach(alert => {
          const stock = STOCKS[alert.symbol?.toUpperCase()];
          if (!stock) return;

          let triggered = false;
          if (alert.condition === 'ABOVE' && stock.price_nse >= alert.targetPrice) {
            triggered = true;
          } else if (alert.condition === 'BELOW' && stock.price_nse <= alert.targetPrice) {
            triggered = true;
          }

          if (triggered) {
            toast.success(`🔔 ALERT: ${alert.symbol} crossed target price of ₹${alert.targetPrice}! (Current NSE: ₹${stock.price_nse.toFixed(2)})`);
            removeAlert(alert.id);
          }
        });
      }

      setPriceTick(t => t + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [alerts, removeAlert]);

  const sharedProps = { watchlist, isWatched, toggleWatch, alerts, removeAlert, priceTick };

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage {...sharedProps} />} />
        <Route path="/demo" element={<DemoPageWrapper {...sharedProps} />} />
        <Route path="/stock/:symbol" element={<StockDetailWrapper {...sharedProps} addAlert={addAlert} />} />
      </Routes>
      <ToastManager />
    </>
  );
}
