import { useState } from 'react';
import { Target, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const QUESTIONS = [
  {
    id: 'horizon',
    question: 'What is your investment time horizon?',
    options: [
      { label: 'Less than 1 year', score: 1 },
      { label: '1–3 years', score: 2 },
      { label: '3–7 years', score: 3 },
      { label: 'More than 7 years', score: 4 },
    ],
  },
  {
    id: 'loss',
    question: 'How would you react if your portfolio dropped 20%?',
    options: [
      { label: 'Sell everything immediately', score: 1 },
      { label: 'Sell some to reduce exposure', score: 2 },
      { label: 'Hold and wait for recovery', score: 3 },
      { label: 'Buy more — great opportunity!', score: 4 },
    ],
  },
  {
    id: 'income',
    question: 'How stable is your income?',
    options: [
      { label: 'Very unstable / freelance', score: 1 },
      { label: 'Somewhat stable', score: 2 },
      { label: 'Stable salaried job', score: 3 },
      { label: 'Multiple income streams', score: 4 },
    ],
  },
  {
    id: 'goal',
    question: 'What is your primary investment goal?',
    options: [
      { label: 'Capital preservation', score: 1 },
      { label: 'Steady income (dividends)', score: 2 },
      { label: 'Balanced growth', score: 3 },
      { label: 'Maximum capital growth', score: 4 },
    ],
  },
  {
    id: 'experience',
    question: 'How would you describe your investing experience?',
    options: [
      { label: 'Complete beginner', score: 1 },
      { label: 'Some basic knowledge', score: 2 },
      { label: 'Comfortable with markets', score: 3 },
      { label: 'Experienced investor', score: 4 },
    ],
  },
];

function getProfile(totalScore) {
  if (totalScore <= 10) return {
    label: 'Conservative',
    color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0',
    description: 'You prefer capital safety over high returns. Focus on large-cap blue-chip stocks, fixed deposits, and debt funds.',
    stocks: ['TCS', 'HDFCBANK', 'INFY'],
    emoji: '🛡️',
  };
  if (totalScore <= 15) return {
    label: 'Balanced',
    color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
    description: 'You seek a mix of safety and growth. A diversified portfolio across sectors works best for you.',
    stocks: ['RELIANCE', 'TCS', 'TATAMOTORS'],
    emoji: '⚖️',
  };
  return {
    label: 'Aggressive',
    color: '#dc2626', bg: '#fef2f2', border: '#fecaca',
    description: 'You aim for maximum returns and can stomach high risk. Small/mid-caps and growth stocks suit you.',
    stocks: ['TATAMOTORS', 'BAJFINANCE', 'WIPRO'],
    emoji: '🚀',
  };
}

export default function RiskQuiz({ onClose, onResult }) {
  const [step, setStep] = useState(0); // 0 = intro
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [, setStoredProfile] = useLocalStorage('stockai_risk_profile', null);

  const currentQ = QUESTIONS[step - 1];
  const isIntro = step === 0;
  const isDone = step > QUESTIONS.length;

  const handleAnswer = (score) => {
    const newAnswers = { ...answers, [currentQ.id]: score };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length) {
      setStep(s => s + 1);
    } else {
      const total = Object.values(newAnswers).reduce((a, b) => a + b, 0);
      const profile = getProfile(total);
      setResult(profile);
      setStoredProfile(profile.label);
      onResult?.(profile.label);
      setStep(QUESTIONS.length + 1);
    }
  };

  const reset = () => { setStep(0); setAnswers({}); setResult(null); };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 520, width: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb',
            }}>
              <Target size={22} />
            </div>
            <div>
              <h3 className="modal-title" style={{ marginBottom: 0 }}>Risk Profile Quiz</h3>
              {!isIntro && !isDone && (
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Question {step} of {QUESTIONS.length}</div>
              )}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', padding: '4px', display: 'flex', borderRadius: 6 }}>
            <X size={18} />
          </button>
        </div>

        {/* Progress bar */}
        {!isIntro && !isDone && (
          <div style={{ height: 4, background: 'var(--slate-100)', borderRadius: 9999, marginBottom: '1.5rem', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 9999,
              background: 'linear-gradient(90deg, #3b82f6, #14b8a6)',
              width: `${(step / QUESTIONS.length) * 100}%`,
              transition: 'width 0.4s ease',
            }} />
          </div>
        )}

        {/* Intro */}
        {isIntro && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h4 style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--slate-900)', marginBottom: '0.75rem' }}>
              Discover Your Risk Profile
            </h4>
            <p style={{ color: 'var(--slate-600)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '0.9375rem' }}>
              Answer 5 quick questions and we'll identify whether you're a <strong>Conservative</strong>, <strong>Balanced</strong>, or <strong>Aggressive</strong> investor — then tailor our AI recommendations to match.
            </p>
            <button
              onClick={() => setStep(1)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 2rem', borderRadius: 'var(--radius)',
                background: 'linear-gradient(135deg, #3b82f6, #14b8a6)',
                color: 'white', border: 'none', fontWeight: 700, fontSize: '1rem',
                fontFamily: 'inherit', cursor: 'pointer',
              }}
            >
              Start Quiz <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Question */}
        {!isIntro && !isDone && currentQ && (
          <div style={{ animation: 'fadeInUp 0.3s ease' }}>
            <h4 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--slate-900)', marginBottom: '1.25rem', lineHeight: 1.4 }}>
              {currentQ.question}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.score)}
                  style={{
                    textAlign: 'left', padding: '0.875rem 1rem',
                    border: '1.5px solid var(--slate-200)', borderRadius: 'var(--radius)',
                    background: 'white', cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: '0.9375rem', color: 'var(--slate-700)', fontWeight: 500,
                    transition: 'all 0.18s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.background = '#eff6ff';
                    e.currentTarget.style.color = 'var(--primary-dark)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--slate-200)';
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = 'var(--slate-700)';
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                style={{
                  marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.375rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--slate-500)', fontSize: '0.875rem', fontFamily: 'inherit',
                }}
              >
                <ChevronLeft size={16} /> Back
              </button>
            )}
          </div>
        )}

        {/* Result */}
        {isDone && result && (
          <div style={{ textAlign: 'center', animation: 'fadeInUp 0.4s ease' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>{result.emoji}</div>
            <div style={{
              display: 'inline-block', padding: '0.5rem 1.5rem', borderRadius: 9999,
              fontWeight: 800, fontSize: '1.125rem',
              background: result.bg, color: result.color, border: `2px solid ${result.border}`,
              marginBottom: '1rem',
            }}>
              {result.label} Investor
            </div>
            <p style={{ color: 'var(--slate-600)', lineHeight: 1.7, marginBottom: '1.25rem', fontSize: '0.9375rem' }}>
              {result.description}
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-500)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Suggested Stocks For You
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                {result.stocks.map(s => (
                  <span key={s} style={{
                    padding: '0.3rem 0.875rem', borderRadius: 9999,
                    background: result.bg, color: result.color, border: `1.5px solid ${result.border}`,
                    fontWeight: 700, fontSize: '0.875rem',
                  }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={reset} className="btn-ghost">Retake Quiz</button>
              <button onClick={onClose} className="btn-primary" style={{ justifyContent: 'center' }}>
                Done — Apply to AI
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
