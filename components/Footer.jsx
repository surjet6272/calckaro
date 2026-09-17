import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Heart, ShieldCheck, Zap } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Calc<span className="text-blue-500">Karo</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              CalcKaro is India's dedicated client-side calculator hub. Calculate your Loan EMI, SIP investments, Income Tax (FY 2024-26), GST, Age, BMI, Percentages, and CGPA in real-time.
            </p>
            <p className="text-xs text-slate-500">
              सभी गणनाएं आपके ब्राउज़र में सुरक्षित और तुरंत होती हैं। कोई डेटा सेव या शेयर नहीं होता।
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-emerald-400 border border-slate-700">
                <Zap className="w-3.5 h-3.5" />
                <span>100% Client-Side Fast</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-blue-400 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Data Upload</span>
              </div>
            </div>
          </div>

          {/* Calculators Column 1 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Financial Tools (फाइनेंशियल)
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/emi-calculator" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>🏦</span> <span>EMI Calculator</span>
                </Link>
              </li>
              <li>
                <Link to="/sip-calculator" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>📈</span> <span>SIP Calculator</span>
                </Link>
              </li>
              <li>
                <Link to="/income-tax-calculator" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>💼</span> <span>Income Tax Calculator</span>
                </Link>
              </li>
              <li>
                <Link to="/gst-calculator" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>🧾</span> <span>GST Calculator</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Calculators Column 2 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Daily & Academic (दैनिक व शिक्षा)
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/age-calculator" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>🎂</span> <span>Age Calculator</span>
                </Link>
              </li>
              <li>
                <Link to="/bmi-calculator" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>⚖️</span> <span>BMI Health Calculator</span>
                </Link>
              </li>
              <li>
                <Link to="/percentage-calculator" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>🔢</span> <span>Percentage Calculator</span>
                </Link>
              </li>
              <li>
                <Link to="/cgpa-to-percentage" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>🎓</span> <span>CGPA to Percentage</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} CalcKaro. All rights reserved. Free for personal & educational use.
          </div>

          {/* Made in India tagline */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>in</span>
            <span className="font-semibold text-white tracking-wide flex items-center gap-1">
              INDIA <span className="inline-block">🇮🇳</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
