import { MouseEvent } from 'react';
import { ArrowDown, CheckCircle, Flame, Heart, TrendingUp } from 'lucide-react';

export default function Hero() {
  const handleScrollToCalc = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#calculator');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-b from-green-50/50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 flex items-center min-h-[90vh]"
    >
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-green-200 dark:bg-green-950/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200 dark:bg-blue-950/20 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 text-xs font-semibold tracking-wide uppercase shadow-sm">
              <CheckCircle className="w-4.5 h-4.5" /> Easy Health Tracking
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Health Tracker <br />
              <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                BMI Calculator
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed">
              Know your Body Mass Index instantly and take proactive steps to maintain a healthy lifestyle.
              Get personalized insights, smart advice, and track your progress in real-time.
            </p>

            {/* Benefit badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200/40 dark:border-slate-800">
                <Flame className="w-4 h-4 text-orange-500" /> Instant Results
              </span>
              <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200/40 dark:border-slate-800">
                <TrendingUp className="w-4 h-4 text-blue-500" /> Interactive Gauge
              </span>
              <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200/40 dark:border-slate-800">
                <Heart className="w-4 h-4 text-red-500" /> Custom Advice
              </span>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button
                onClick={handleScrollToCalc}
                className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-green-500 hover:bg-green-600 rounded-2xl shadow-lg shadow-green-500/20 active:scale-98 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-500/30"
              >
                Calculate BMI Now
              </button>
              <a
                href="#about-bmi"
                className="text-slate-700 dark:text-slate-200 hover:text-green-500 dark:hover:text-green-400 font-semibold text-sm transition-colors duration-200 px-4 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900"
              >
                Learn more about BMI
              </a>
            </div>
          </div>

          {/* Interactive Healthcare Illustration */}
          <div className="flex justify-center items-center relative lg:pl-8">
            <div className="relative w-full max-w-md sm:max-w-lg aspect-square flex justify-center items-center">
              {/* Spinning background dashboard pattern */}
              <div className="absolute inset-0 border border-dashed border-slate-200 dark:border-slate-800 rounded-full animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-8 border border-dashed border-slate-200/60 dark:border-slate-800/60 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

              {/* Central Vector SVG Illustration */}
              <svg
                viewBox="0 0 500 500"
                className="w-10/12 h-10/12 relative z-10 drop-shadow-2xl"
                aria-hidden="true"
              >
                {/* Floating health element circles */}
                <circle cx="250" cy="250" r="140" fill="url(#hero-circle-grad)" opacity="0.15" />
                <circle cx="250" cy="250" r="90" fill="url(#hero-circle-grad-inner)" opacity="0.3" />

                {/* Grid lines */}
                <line x1="100" y1="250" x2="400" y2="250" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />
                <line x1="250" y1="100" x2="250" y2="400" stroke="#2196F3" strokeWidth="1" strokeDasharray="5,5" opacity="0.3" />

                {/* Heart Rate Pulse wave - SVG path animated */}
                <path
                  d="M 100 250 L 170 250 L 190 200 L 210 320 L 230 230 L 245 270 L 260 250 L 400 250"
                  fill="none"
                  stroke="url(#pulse-grad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-[dash_4s_ease-in-out_infinite]"
                  style={{
                    strokeDasharray: '1000',
                    strokeDashoffset: '1000',
                    animation: 'pulseDash 4s linear infinite',
                  }}
                />

                {/* Central Scale Balance Plate Graphic */}
                <g transform="translate(150, 150)">
                  {/* Outer Shield/Card */}
                  <rect x="20" y="20" width="160" height="160" rx="30" fill="#FFFFFF" filter="url(#drop-shadow)" />
                  {/* Dynamic Pointer circle gauge */}
                  <circle cx="100" cy="90" r="45" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                  <path
                    d="M 68 122 A 45 45 0 1 1 132 122"
                    fill="none"
                    stroke="url(#gauge-grad-hero)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <polygon points="100,55 95,90 105,90" fill="#4CAF50" transform="rotate(30, 100, 90)" />
                  <circle cx="100" cy="90" r="6" fill="#1E293B" />
                  {/* Metric display text block */}
                  <rect x="70" y="145" width="60" height="25" rx="8" fill="#F1F5F9" />
                  <text x="100" y="162" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                    BMI 22.4
                  </text>
                </g>

                {/* Mini health stats cards (floating) */}
                <g transform="translate(320, 100)" className="animate-bounce" style={{ animationDuration: '6s' }}>
                  <rect width="90" height="48" rx="12" fill="#2196F3" />
                  <text x="45" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif">
                    WEIGHT
                  </text>
                  <text x="45" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
                    70 kg
                  </text>
                </g>

                <g transform="translate(70, 310)" className="animate-bounce" style={{ animationDuration: '8s' }}>
                  <rect width="90" height="48" rx="12" fill="#4CAF50" />
                  <text x="45" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif">
                    HEIGHT
                  </text>
                  <text x="45" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="sans-serif">
                    1.75 m
                  </text>
                </g>

                {/* Definitions for SVG gradients */}
                <defs>
                  <linearGradient id="hero-circle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4CAF50" />
                    <stop offset="100%" stopColor="#2196F3" />
                  </linearGradient>
                  <linearGradient id="hero-circle-grad-inner" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4CAF50" />
                    <stop offset="100%" stopColor="#00E5FF" />
                  </linearGradient>
                  <linearGradient id="pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4CAF50" />
                    <stop offset="50%" stopColor="#2196F3" />
                    <stop offset="100%" stopColor="#00E5FF" />
                  </linearGradient>
                  <linearGradient id="gauge-grad-hero" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2196F3" />
                    <stop offset="50%" stopColor="#4CAF50" />
                    <stop offset="100%" stopColor="#FF9800" />
                  </linearGradient>
                  <filter id="drop-shadow" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="2" dy="8" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.12" />
                  </filter>
                </defs>
              </svg>

              {/* Style injections for raw SVG animation */}
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulseDash {
                  to {
                    strokeDashoffset: -1000;
                  }
                }
              ` }} />
            </div>
          </div>
        </div>

        {/* Floating smooth scroll down indicator */}
        <div className="flex justify-center pt-8">
          <a
            href="#calculator"
            onClick={(e) => {
              e.preventDefault();
              const target = document.querySelector('#calculator');
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            className="p-3 bg-white dark:bg-slate-900 text-slate-500 hover:text-green-500 dark:text-slate-400 dark:hover:text-green-400 rounded-full shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-800 active:scale-95 transition-all duration-200"
            aria-label="Scroll down to BMI Calculator"
          >
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
