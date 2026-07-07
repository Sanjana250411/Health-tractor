import { useState } from 'react';
import { BookOpen, HelpCircle, Calculator, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function AboutBMI() {
  const [activeTab, setActiveTab] = useState<'overview' | 'formula' | 'pros-cons'>('overview');

  return (
    <section id="about-bmi" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 dark:text-white tracking-tight">
            Understanding Body Mass Index (BMI)
          </h2>
          <div className="w-16 h-1.5 bg-green-500 rounded-full mx-auto mt-4 mb-4" />
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Learn what your BMI numbers mean, why they are used globally by medical systems, and how to interpret them correctly.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-200 outline-none focus:ring-2 focus:ring-green-500/20 ${
              activeTab === 'overview'
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> What is BMI?
          </button>
          <button
            onClick={() => setActiveTab('formula')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-200 outline-none focus:ring-2 focus:ring-green-500/20 ${
              activeTab === 'formula'
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Calculator className="w-4 h-4" /> How it's Calculated
          </button>
          <button
            onClick={() => setActiveTab('pros-cons')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-200 outline-none focus:ring-2 focus:ring-green-500/20 ${
              activeTab === 'pros-cons'
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                : 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Advantages & Limits
          </button>
        </div>

        {/* Tab Contents */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 sm:p-10 shadow-xl shadow-slate-200/20 dark:shadow-none min-h-[350px] transition-all duration-300">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center animate-fadeIn">
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-green-500" />
                  What is Body Mass Index?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  Body Mass Index (BMI) is a simple, internationally recognized calculation that estimates high tissue fat composition in humans. It compares your weight against your height, classifying individuals into key healthy ranges: Underweight, Normal, Overweight, and Obese.
                </p>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-semibold">
                  Why is BMI so important in healthcare?
                </p>
                <ul className="space-y-3">
                  {[
                    'Acts as a rapid, affordable screening tool for potential weight-related health risks.',
                    'Helps physicians monitor population-level fitness and health trends over years.',
                    'Correlates strongly with major health risks like cardiovascular disease, hypertension, and diabetes.',
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400 items-start">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Graphic container */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-sm aspect-square bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-slate-100 dark:border-slate-800/80">
                  {/* Custom SVG scale graphics */}
                  <svg viewBox="0 0 120 120" className="w-32 h-32 mb-4 drop-shadow-md" aria-hidden="true">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#10B981" strokeWidth="6" strokeDasharray="314" strokeDashoffset="100" strokeLinecap="round" />
                    <g transform="translate(60,60) rotate(-35)">
                      <line x1="0" y1="0" x2="0" y2="-42" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="0" cy="0" r="6" fill="#1E293B" />
                    </g>
                  </svg>
                  <div className="text-sm font-sans font-bold text-slate-800 dark:text-white mb-1">Standard Screening</div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[240px]">
                    While not direct fat measurement, it is a highly trusted general health indicator worldwide.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* FORMULA TAB */}
          {activeTab === 'formula' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center animate-fadeIn">
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-sans font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-green-500" />
                  How is BMI Calculated?
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  BMI is calculated similarly for both adults and children, relying strictly on height and weight. The mathematical formula divides weight in kilograms by the square of the height in meters.
                </p>

                {/* Formula Displays */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                    <div className="text-xs font-extrabold text-slate-400 dark:text-slate-500 mb-2 uppercase">Metric Formula</div>
                    <div className="text-lg font-mono font-bold text-slate-800 dark:text-white mb-1">
                      Weight (kg) / Height² (m)
                    </div>
                    <p className="text-xs text-slate-500">Universal scientific standard.</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                    <div className="text-xs font-extrabold text-slate-400 dark:text-slate-500 mb-2 uppercase">Imperial Formula</div>
                    <div className="text-lg font-mono font-bold text-slate-800 dark:text-white mb-1">
                      [Weight (lbs) / Height² (in)] × 703
                    </div>
                    <p className="text-xs text-slate-500">Converts standard US pounds & inches.</p>
                  </div>
                </div>
              </div>

              {/* Graphical representation of the mathematical formula */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-sm bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-center items-center text-center border border-slate-100 dark:border-slate-800/80">
                  <div className="text-xs font-extrabold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-4">
                    Visual Formula
                  </div>
                  <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold bg-green-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-md">W</span>
                      <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Weight</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-400">/</div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold bg-blue-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-md">H²</span>
                      <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Height²</span>
                    </div>
                    <div className="text-2xl font-bold text-slate-400">=</div>
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 h-12 rounded-2xl flex items-center justify-center shadow-md">BMI</span>
                      <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Score</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROS & CONS TAB */}
          {activeTab === 'pros-cons' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-fadeIn">
              {/* Advantages */}
              <div className="space-y-5">
                <h3 className="text-lg sm:text-xl font-sans font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5.5 h-5.5 text-green-500" />
                  Key Advantages
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      title: 'Non-Invasive Screen',
                      desc: 'Requires no bloodwork, imaging, or physical discomfort. Can be performed instantly anywhere.',
                    },
                    {
                      title: 'Consistent Global Scale',
                      desc: 'Utilizes standardized metric and imperial equations recognized globally by doctors and scientists.',
                    },
                    {
                      title: 'Highly Correlative',
                      desc: 'Strongly matches physical body fat trends in large populations, mapping cardiac and organ risks.',
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="bg-green-50/40 dark:bg-green-950/10 p-4 rounded-2xl border border-green-500/10">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-green-300 mb-1">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Limitations */}
              <div className="space-y-5">
                <h3 className="text-lg sm:text-xl font-sans font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <AlertTriangle className="w-5.5 h-5.5 text-orange-500" />
                  Physiological Limitations
                </h3>
                <ul className="space-y-4">
                  {[
                    {
                      title: 'Muscular Athletes Bias',
                      desc: 'Muscle is much denser than fat. Elite athletes or bodybuilders might calculate as "overweight" or "obese" when they have very low body fat.',
                    },
                    {
                      title: 'No Fat Distribution Insights',
                      desc: 'Does not differ between visceral fat (dangerous fat surrounding internal organs) and subcutaneous fat.',
                    },
                    {
                      title: 'Age & Muscle Loss Bias',
                      desc: 'Elderly adults who have lost muscle tissue may show a "normal" BMI while actually possessing a high proportion of visceral fat.',
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="bg-orange-50/40 dark:bg-orange-950/10 p-4 rounded-2xl border border-orange-500/10">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-orange-300 mb-1">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
