import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calculator, 
  Menu, 
  X, 
  ChevronDown, 
  TrendingUp, 
  Percent, 
  Calendar, 
  Receipt, 
  Activity, 
  GraduationCap, 
  Landmark,
  Sparkles
} from 'lucide-react';

export const CALCULATORS_LIST = [
  {
    id: 'emi',
    name: 'EMI Calculator',
    nameHi: 'ईएमआई कैलकुलेटर',
    path: '/emi-calculator',
    icon: Landmark,
    emoji: '🏦',
    desc: 'Home, Car & Personal Loan Monthly EMI'
  },
  {
    id: 'sip',
    name: 'SIP Calculator',
    nameHi: 'एसआईपी कैलकुलेटर',
    path: '/sip-calculator',
    icon: TrendingUp,
    emoji: '📈',
    desc: 'Mutual Fund Wealth & Returns Projection'
  },
  {
    id: 'income-tax',
    name: 'Income Tax',
    nameHi: 'इनकम टैक्स कैलकुलेटर',
    path: '/income-tax-calculator',
    icon: Receipt,
    emoji: '💼',
    desc: 'Compare New vs Old Tax Regime (FY 2024-26)'
  },
  {
    id: 'gst',
    name: 'GST Calculator',
    nameHi: 'जीएसटी कैलकुलेटर',
    path: '/gst-calculator',
    icon: Percent,
    emoji: '🧾',
    desc: 'Calculate GST Inclusive & Exclusive with Slabs'
  },
  {
    id: 'age',
    name: 'Age Calculator',
    nameHi: 'आयु कैलकुलेटर',
    path: '/age-calculator',
    icon: Calendar,
    emoji: '🎂',
    desc: 'Exact Age in Years, Months, Days & Next Birthday'
  },
  {
    id: 'bmi',
    name: 'BMI Calculator',
    nameHi: 'बीएमआई कैलकुलेटर',
    path: '/bmi-calculator',
    icon: Activity,
    emoji: '⚖️',
    desc: 'Body Mass Index & Healthy Indian Weight Range'
  },
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    nameHi: 'प्रतिशत कैलकुलेटर',
    path: '/percentage-calculator',
    icon: Percent,
    emoji: '🔢',
    desc: 'Calculate % of value, increase, decrease & discount'
  },
  {
    id: 'cgpa',
    name: 'CGPA to Percentage',
    nameHi: 'सीजीपीए टू प्रतिशत',
    path: '/cgpa-to-percentage',
    icon: GraduationCap,
    emoji: '🎓',
    desc: 'CBSE, College & University CGPA Conversion'
  }
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link 
            to="/" 
            id="brand-logo-link"
            onClick={closeMenu}
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:bg-blue-700 transition-colors">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">Calc<span className="text-blue-600">Karo</span></span>
                <span className="inline-block text-xs font-semibold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                  🇮🇳 IN
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 leading-none">
                Smart Indian Calculator Hub
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/"
              id="nav-home"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/' 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </Link>

            {/* Quick direct links for popular */}
            <Link
              to="/emi-calculator"
              id="nav-emi"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/emi-calculator' 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              EMI
            </Link>

            <Link
              to="/sip-calculator"
              id="nav-sip"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/sip-calculator' 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              SIP
            </Link>

            <Link
              to="/income-tax-calculator"
              id="nav-tax"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/income-tax-calculator' 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Tax (FY 24-26)
            </Link>

            <Link
              to="/gst-calculator"
              id="nav-gst"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/gst-calculator' 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              GST
            </Link>

            {/* Dropdown for All 8 Calculators */}
            <div className="relative">
              <button
                type="button"
                id="nav-calculators-dropdown-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dropdownOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>All Calculators (8)</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-20">
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      सभी कैलकुलेटर की सूची
                    </div>
                    {CALCULATORS_LIST.map((calc) => {
                      const isActive = location.pathname === calc.path;
                      return (
                        <Link
                          key={calc.id}
                          to={calc.path}
                          id={`dropdown-calc-${calc.id}`}
                          onClick={closeMenu}
                          className={`flex items-center gap-3 px-3 py-2.5 mx-1 rounded-lg text-sm transition-colors ${
                            isActive 
                              ? 'bg-blue-50 text-blue-700 font-semibold' 
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="text-xl">{calc.emoji}</span>
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-900">{calc.name}</span>
                            <span className="text-xs text-slate-500">{calc.nameHi}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

          </nav>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              id="mobile-hamburger-toggle"
              aria-label="Toggle Navigation Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg">
          <div className="px-2 py-1 text-xs font-semibold text-slate-400 uppercase">
            Navigation Menu (नेविगेशन)
          </div>
          <Link
            to="/"
            onClick={closeMenu}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
              location.pathname === '/' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>🏠</span>
            <span>Home (होम पेज)</span>
          </Link>
          
          <div className="pt-2 pb-1 px-2 text-xs font-semibold text-slate-400 uppercase">
            All 8 Calculators (कैलकुलेटर)
          </div>

          <div className="grid grid-cols-1 gap-1 max-h-[65vh] overflow-y-auto pr-1">
            {CALCULATORS_LIST.map((calc) => (
              <Link
                key={calc.id}
                to={calc.path}
                id={`mobile-nav-${calc.id}`}
                onClick={closeMenu}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                  location.pathname === calc.path 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-xl">{calc.emoji}</span>
                <div>
                  <div className="font-medium text-slate-900">{calc.name}</div>
                  <div className="text-xs text-slate-500">{calc.nameHi}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
