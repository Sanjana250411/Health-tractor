import { useState, useEffect, MouseEvent } from 'react';
import { Activity, Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export default function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'BMI Calculator', href: '#calculator' },
    { label: 'About BMI', href: '#about-bmi' },
    { label: 'Health Tips', href: '#health-tips' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleSmoothScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, '#home')}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg p-1"
          >
            <div className="p-2 bg-green-500 text-white rounded-xl shadow-md shadow-green-500/20">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-xl font-sans font-bold tracking-tight text-slate-800 dark:text-white">
              Health<span className="text-green-500">Tracker</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-sm font-medium text-slate-600 hover:text-green-500 dark:text-slate-300 dark:hover:text-green-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md px-2 py-1"
              >
                {item.label}
              </a>
            ))}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Right Buttons */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all duration-200 focus:outline-none"
              aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-green-500 dark:text-slate-300 dark:hover:text-green-400 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
