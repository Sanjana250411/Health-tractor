import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Calculator from './components/Calculator';
import ResultCard from './components/ResultCard';
import AboutBMI from './components/AboutBMI';
import HealthTips from './components/HealthTips';
import Contact from './components/Contact';
import Confetti from './components/Confetti';
import BackToTop from './components/BackToTop';
import { BMIResult } from './types';
import { HeartPulse, Sparkles, Activity } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [result, setResult] = useState<BMIResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

  // Sync dark mode class on root document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleCalculate = (res: BMIResult) => {
    setResult(res);
    setShowConfetti(false);

    // Trigger celebratory confetti if BMI is in the normal/healthy category
    if (res.category === 'normal') {
      // Delay slightly for maximum visual impact as the result card loads
      setTimeout(() => {
        setShowConfetti(true);
      }, 300);
    }

    // Smooth scroll down to the result card so the user doesn't miss it on small screens
    setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 antialiased selection:bg-green-500/30">
      {/* Confetti Celebration */}
      {showConfetti && <Confetti />}

      {/* Navigation */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Home Hero Section */}
      <Hero />

      {/* Calculator Section */}
      <section
        id="calculator"
        className="py-16 sm:py-24 bg-white dark:bg-slate-950 transition-colors duration-300 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Title */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight">
              Instantly Analyze Your BMI
            </h2>
            <div className="w-16 h-1.5 bg-green-500 rounded-full mx-auto mt-4 mb-4" />
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
              Provide your details below. We support both metric and imperial systems with automatic conversion.
            </p>
          </div>

          {/* Interactive Calculation Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Form */}
            <div className="lg:col-span-5 flex">
              <Calculator onCalculate={handleCalculate} onReset={handleReset} />
            </div>

            {/* Right Side: Report Dashboard or Welcome Guide */}
            <div ref={resultRef} className="lg:col-span-7 flex flex-col justify-center">
              {result ? (
                <ResultCard result={result} />
              ) : (
                <div className="w-full h-full bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center text-center min-h-[400px] transition-all duration-300">
                  <div className="p-4 bg-green-500/10 text-green-500 rounded-full mb-6">
                    <HeartPulse className="w-12 h-12 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-sans font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                    Ready for Analysis
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                    Enter your name, age, gender, height, and weight in the form. Your real-time medical-standard Body Mass Index evaluation, personalized advice, and colorful meter gauge will appear right here.
                  </p>
                  <div className="mt-8 flex gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Activity className="w-4.5 h-4.5 text-green-500" /> Metric Support
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-4.5 h-4.5 text-blue-500" /> Imperial Support
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About BMI Section */}
      <AboutBMI />

      {/* Health Tips Section */}
      <HealthTips />

      {/* Contact Section & Footer */}
      <Contact />

      {/* Back to Top Navigation Assist */}
      <BackToTop />
    </div>
  );
}
