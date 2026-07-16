# StockAI Consultant 🚀

An **AI-powered Stock Market Consulting Agent** — a full-featured clone of the [Clear Market](https://preview--clear-market.lovable.app/) app, built with **React + Vite** and powered by **Google Gemini AI**.

---

## ✨ Features

### 🏠 Home Page
- **Portfolio Builder** — Add/remove stocks with live ₹ total calculation
- **AI Chat Advisor** — Real Gemini AI responses, portfolio-aware context, typing indicators
- **Usage Dashboard** — Track analyses, chat queries, and billing metrics

### 📊 /demo — Live Stock Dashboard
- **Search** stocks by symbol, name, or sector
- **Popular chips** — TCS, INFY, RELIANCE, HDFCBANK quick filters
- **AI Market Insights** — BUY/HOLD/SELL with confidence scores
- **Live Stock Grid** — 8 major Indian stocks with full metrics

### 📈 /stock/:symbol — Stock Detail Pages
| Tab | Contents |
|---|---|
| **Overview** | About, Key Points, Pros & Cons |
| **Quarters** | 6-quarter financial results table |
| **Analysis** | AI recommendation, target price, rating |
| **Shareholding** | 5-quarter promoter/FII/DII/public history |
| **Peers** | Benchmarking vs. competitor stocks |
| **Documents** | Reports, presentations, filings |

---

## 🛠️ Tech Stack

- **React 18** + **Vite 5**
- **React Router DOM** — Client-side routing
- **Google Generative AI SDK** — Gemini 1.5 Flash
- **Lucide React** — Icons
- **Vanilla CSS** — Custom design system with CSS variables

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run dev server
```bash
npm run dev
```

App runs at **http://localhost:5173/**

### 3. Set up Gemini API Key
- Get a **free key** at: https://aistudio.google.com/app/apikey
- Enter it in the app's API Key modal when prompted
- Key is stored only in your browser's `localStorage`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         # Navigation with router links
│   ├── HeroSection.jsx    # Hero with particles + CTA
│   ├── FeaturesSection.jsx
│   ├── PortfolioBuilder.jsx
│   ├── ChatAdvisor.jsx    # Gemini AI chat integration
│   └── UsageDashboard.jsx
├── pages/
│   ├── DemoPage.jsx       # /demo route
│   └── StockDetailPage.jsx # /stock/:symbol route
├── data/
│   └── stockData.js       # Mock data for 8 Indian stocks
├── App.jsx                # Routes: /, /demo, /stock/:symbol
├── main.jsx               # BrowserRouter entry
└── index.css              # Global design system
```

---

## ⚠️ Disclaimer

This application is for **educational and demonstration purposes only**.  
It is **not financial advice**. Always consult a registered financial advisor before investing.

---

## 📸 Stocks Available

TCS · INFY · RELIANCE · HDFCBANK · WIPRO · ICICIBANK · TATAMOTORS · BAJFINANCE
