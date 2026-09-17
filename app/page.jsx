import React, { useState } from 'react';
import CalculatorCard from '../components/CalculatorCard.jsx';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  Search,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ALL_CALCULATORS = [
  {
    id: 'emi',
    title: 'EMI Calculator',
    titleHi: 'होम, कार और पर्सनल लोन ईएमआई',
    emoji: '🏦',
    description: 'Calculate monthly loan EMI, total interest payable, and principal breakdown with interactive sliders.',
    path: '/emi-calculator',
    category: 'finance',
    badgeText: 'Most Popular',
    accentColor: 'blue'
  },
  {
    id: 'sip',
    title: 'SIP Calculator',
    titleHi: 'म्यूचुअल फंड एसआईपी रिटर्न कैलकुलेटर',
    emoji: '📈',
    description: 'Estimate your future wealth creation, total invested amount, and compounding gains from mutual fund SIPs.',
    path: '/sip-calculator',
    category: 'finance',
    badgeText: 'Wealth',
    accentColor: 'green'
  },
  {
    id: 'income-tax',
    title: 'Income Tax Calculator',
    titleHi: 'नया बनाम पुराना टैक्स रिजीम (FY 2024-26)',
    emoji: '💼',
    description: 'Compare Old vs New Tax Regime with latest standard deductions, Section 87A rebate & tax slabs.',
    path: '/income-tax-calculator',
    category: 'finance',
    badgeText: 'Budget 2024-26',
    accentColor: 'red'
  },
  {
    id: 'gst',
    title: 'GST Calculator',
    titleHi: 'जीएसटी जोड़ें (Add) या निकालें (Remove)',
    emoji: '🧾',
    description: 'Calculate GST Inclusive and Exclusive amounts with 5%, 12%, 18%, 28% slabs and CGST/SGST split.',
    path: '/gst-calculator',
    category: 'finance',
    badgeText: 'Business',
    accentColor: 'purple'
  },
  {
    id: 'age',
    title: 'Age Calculator',
    titleHi: 'सटीक उम्र साल, महीने और दिनों में',
    emoji: '🎂',
    description: 'Find your exact age in years, months, and days, along with countdown days until your next birthday.',
    path: '/age-calculator',
    category: 'daily',
    badgeText: 'Daily Life',
    accentColor: 'blue'
  },
  {
    id: 'bmi',
    title: 'BMI Calculator',
    titleHi: 'बॉडी मास इंडेक्स व स्वस्थ वजन गाइड',
    emoji: '⚖️',
    description: 'Check your Body Mass Index (BMI), fitness category, and recommended healthy weight range for your height.',
    path: '/bmi-calculator',
    category: 'health',
    badgeText: 'Health',
    accentColor: 'green'
  },
  {
    id: 'percentage',
    title: 'Percentage Calculator',
    titleHi: 'प्रतिशत, छूट (Discount) और वृद्धि/कमी',
    emoji: '🔢',
    description: 'Solve 4 common percentage calculations: % of number, percentage difference, increase/decrease, and shop discounts.',
    path: '/percentage-calculator',
    category: 'daily',
    badgeText: 'Instant',
    accentColor: 'purple'
  },
  {
    id: 'cgpa',
    title: 'CGPA to Percentage',
    titleHi: 'सीबीएसई और यूनिवर्सिटी ग्रेड प्रतिशत कनवर्टर',
    emoji: '🎓',
    description: 'Convert your 10-point CGPA to accurate percentage for CBSE (9.5 factor), engineering, and college degrees.',
    path: '/cgpa-to-percentage',
    category: 'education',
    badgeText: 'Students',
    accentColor: 'blue'
  }
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCalculators = ALL_CALCULATORS.filter((calc) => {
    const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
    const matchesSearch = 
      calc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto pt-4 sm:pt-8 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>India’s Fastest Client-Side Calculator Suite • 100% Free</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Calculate Anything with <span className="text-blue-600">CalcKaro</span>
        </h1>
        
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          फाइनेंशियल प्लानिंग से लेकर डेली लाइफ और कॉलेज ग्रेड्स तक — सभी 8 जरूरी कैलकुलेटर एक ही जगह, बिना किसी डेटा अपलोड के।
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-6 text-xs sm:text-sm font-medium text-slate-600">
          <div className="flex items-center gap-1.5 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Real-time Interactive Sliders</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>₹ Indian Currency Format</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Zero Sign-up Required</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              id="homepage-calculator-search"
              placeholder="Search calculator... e.g. EMI, SIP, Tax, GST, Age"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl shadow-xs text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {[
              { id: 'all', label: 'All Tools (सभी)' },
              { id: 'finance', label: '💰 Finance & Tax' },
              { id: 'daily', label: '📅 Daily & Utility' },
              { id: 'health', label: '❤️ Health' },
              { id: 'education', label: '🎓 Education' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                id={`tab-${tab.id}`}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Cards Grid - All 8 Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Popular Calculators (लोकप्रिय कैलकुलेटर)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Showing {filteredCalculators.length} calculators available for instant calculation
            </p>
          </div>
        </div>

        {filteredCalculators.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 p-8">
            <p className="text-base text-slate-600 font-medium">
              No calculators found matching "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold"
            >
              Reset Filters (सभी देखें)
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCalculators.map((calc) => (
              <CalculatorCard
                key={calc.id}
                id={calc.id}
                title={calc.title}
                titleHi={calc.titleHi}
                emoji={calc.emoji}
                description={calc.description}
                path={calc.path}
                badgeText={calc.badgeText}
                accentColor={calc.accentColor}
              />
            ))}
          </div>
        )}
      </section>

      {/* Highlight Infobox for Indian Audience */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-medium border border-blue-400/30">
              <span>🇮🇳 Designed for India</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Lakhs & Crores Number System Ready
            </h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Western calculators often use million/billion units. CalcKaro is specifically calibrated with Indian Rupee (₹), Lakhs (L), and Crores (Cr) increments with real-time sliders and official tax laws.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/income-tax-calculator"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl text-sm transition-all"
              >
                <span>Check New Tax Slabs</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/sip-calculator"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-800/80 hover:bg-blue-800 text-white font-medium rounded-xl text-sm border border-blue-700 transition-all"
              >
                <span>Simulate SIP Wealth</span>
              </Link>
            </div>
          </div>
          
          <div className="absolute right-4 bottom-2 opacity-15 select-none pointer-events-none text-9xl font-black">
            ₹
          </div>
        </div>
      </section>

    </div>
  );
}
