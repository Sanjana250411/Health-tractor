import { useEffect, useState, useRef } from 'react';
import { Award, User, ArrowRight, Heart, Calendar } from 'lucide-react';
import { BMIResult } from '../types';

interface ResultCardProps {
  result: BMIResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const [displayBmi, setDisplayBmi] = useState(0);
  const animationRef = useRef<number | null>(null);

  // Smooth Count Up animation for the BMI value
  useEffect(() => {
    setDisplayBmi(0);
    const duration = 1000; // ms
    const startTime = performance.now();
    const target = result.bmi;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing function outQuad
      const easedProgress = progress * (2 - progress);
      const currentVal = easedProgress * target;

      setDisplayBmi(parseFloat(currentVal.toFixed(2)));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayBmi(target);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [result.bmi]);

  // Map BMI to gauge rotation angle (from -90 deg [left] to +90 deg [right])
  const getNeedleAngle = (val: number) => {
    if (val < 15) return -90;
    if (val > 40) return 90;

    // We segment the gauge:
    // Underweight: 15 to 18.5 -> maps to -90 to -45
    // Normal: 18.5 to 25 -> maps to -45 to 0
    // Overweight: 25 to 30 -> maps to 0 to 45
    // Obese: 30 to 40 -> maps to 45 to 90
    if (val < 18.5) {
      const ratio = (val - 15) / (18.5 - 15);
      return -90 + ratio * 45;
    } else if (val < 25) {
      const ratio = (val - 18.5) / (25 - 18.5);
      return -45 + ratio * 45;
    } else if (val < 30) {
      const ratio = (val - 25) / (30 - 25);
      return 0 + ratio * 45;
    } else {
      const ratio = (val - 30) / (40 - 30);
      return 45 + ratio * 45;
    }
  };

  const needleAngle = getNeedleAngle(result.bmi);

  // Set colors according to BMI Category
  const categoryConfig = {
    underweight: {
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'border-blue-100 dark:border-blue-900/30',
      fill: '#3B82F6',
    },
    normal: {
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-950/20',
      border: 'border-green-100 dark:border-green-900/30',
      fill: '#10B981',
    },
    overweight: {
      color: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-950/20',
      border: 'border-orange-100 dark:border-orange-900/30',
      fill: '#F59E0B',
    },
    obese: {
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-950/20',
      border: 'border-red-100 dark:border-red-900/30',
      fill: '#EF4444',
    },
  };

  const activeConf = categoryConfig[result.category];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-100 dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 sm:p-8 relative overflow-hidden transition-all duration-300 animate-fadeIn">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <h2 className="text-2xl font-sans font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
        <Award className="w-6 h-6 text-green-500" />
        BMI Analysis Report
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Text Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* User Bio Stats Chips */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200/50 dark:border-slate-800">
              <User className="w-3.5 h-3.5" /> {result.name}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200/50 dark:border-slate-800">
              <Calendar className="w-3.5 h-3.5" /> Age: {result.age}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200/50 dark:border-slate-800 capitalize">
              {result.gender}
            </span>
          </div>

          {/* Large BMI Figure Display */}
          <div className="flex items-baseline gap-3">
            <div className="text-5xl sm:text-6xl font-extrabold font-sans text-slate-950 dark:text-white tracking-tight">
              {displayBmi}
            </div>
            <div className="space-y-0.5">
              <div className="text-xs font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                Your BMI
              </div>
              <span
                className={`inline-block text-sm font-bold px-3 py-0.5 rounded-full uppercase border ${activeConf.bg} ${activeConf.color} ${activeConf.border}`}
              >
                {result.status}
              </span>
            </div>
          </div>

          {/* Horizontal mini breakdown summary bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 p-3 rounded-2xl">
              <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold mb-1">HEIGHT</div>
              <div className="text-sm font-bold text-slate-800 dark:text-white">{result.height}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 p-3 rounded-2xl">
              <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold mb-1">WEIGHT</div>
              <div className="text-sm font-bold text-slate-800 dark:text-white">{result.weight}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 p-3 rounded-2xl col-span-2">
              <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold mb-1">HEALTH STATUS</div>
              <div className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: activeConf.fill }} />
                {result.status}
              </div>
            </div>
          </div>

          {/* Advice block with a visual quote */}
          <div className="space-y-4 pt-2">
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5">
              <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-2">
                Personalized Recommendation
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {result.advice}
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-1 italic text-slate-500 dark:text-slate-400 font-serif text-sm">
              &ldquo;{result.quote}&rdquo;
            </div>
          </div>
        </div>

        {/* Right Side: Circular/Semi-circular Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 lg:pl-8">
          <div className="relative w-full max-w-[260px] aspect-video sm:aspect-square flex flex-col justify-end items-center">
            {/* SVG Arc Gauge */}
            <svg viewBox="0 0 200 110" className="w-full h-auto drop-shadow-md overflow-visible" aria-hidden="true">
              {/* Segments backgrounds */}
              {/* Underweight (10 - 18.5): -90deg to -45deg -> Blue */}
              <path
                d="M 15 100 A 85 85 0 0 1 75 15"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="14"
                strokeDasharray="94.2"
                strokeDashoffset="47.1"
                className="opacity-20 hover:opacity-100 transition-opacity duration-200"
              />
              <path
                d="M 15 100 A 85 85 0 0 1 75 15"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="14"
                strokeDasharray="94.2"
                strokeDashoffset="47.1"
                className={result.category === 'underweight' ? 'opacity-100' : 'opacity-55'}
              />

              {/* Normal (18.5 - 25): -45deg to 0deg -> Green */}
              <path
                d="M 75 15 A 85 85 0 0 1 125 15"
                fill="none"
                stroke="#10B981"
                strokeWidth="14"
                className={result.category === 'normal' ? 'opacity-100' : 'opacity-55'}
              />

              {/* Overweight (25 - 30): 0deg to 45deg -> Orange */}
              <path
                d="M 125 15 A 85 85 0 0 1 185 100"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="14"
                strokeDasharray="94.2"
                strokeDashoffset="47.1"
                className="opacity-20"
              />
              <path
                d="M 125 15 A 85 85 0 0 1 185 100"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="14"
                strokeDasharray="94.2"
                strokeDashoffset="0"
                className={result.category === 'overweight' ? 'opacity-100' : 'opacity-55'}
              />

              {/* Obese (30 - 40+): 45deg to 90deg -> Red */}
              <path
                d="M 155 40 A 85 85 0 0 1 185 100"
                fill="none"
                stroke="#EF4444"
                strokeWidth="14"
                className={result.category === 'obese' ? 'opacity-100 font-bold' : 'opacity-55'}
              />

              {/* Label Markers */}
              <text x="25" y="106" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">15</text>
              <text x="75" y="32" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">18.5</text>
              <text x="125" y="32" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">25</text>
              <text x="175" y="106" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">30+</text>

              {/* Rotating Needle Group */}
              <g
                transform={`translate(100, 100) rotate(${needleAngle})`}
                className="transition-transform duration-1000 ease-out"
              >
                {/* Needle path */}
                <path d="M 0 0 L -4 -88 L 0 -92 L 4 -88 Z" fill="#1E293B" className="dark:fill-slate-100" />
                <circle cx="0" cy="0" r="10" fill="#1E293B" className="dark:fill-slate-100" />
                <circle cx="0" cy="0" r="4" fill="#10B981" />
              </g>
            </svg>

            {/* Needle angle reflection in text */}
            <div className="text-center mt-3">
              <div className="text-xs font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                Gauge Marker
              </div>
              <div className="text-base font-bold text-slate-800 dark:text-white">
                {result.bmi} <span className="text-slate-400 font-normal">BMI</span>
              </div>
            </div>
          </div>

          {/* Color-Coded legend labels */}
          <div className="w-full grid grid-cols-2 gap-2 mt-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
              <span className="w-2.5 h-2.5 rounded bg-blue-500" /> Underweight (&lt;18.5)
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
              <span className="w-2.5 h-2.5 rounded bg-green-500" /> Normal (18.5-24.9)
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
              <span className="w-2.5 h-2.5 rounded bg-orange-500" /> Overweight (25-29.9)
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
              <span className="w-2.5 h-2.5 rounded bg-red-500" /> Obese (&gt;30)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
