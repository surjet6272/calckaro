import React, { useState } from 'react';
import { Percent, ArrowLeft, Tag, TrendingUp, HelpCircle, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatIndianNumber, formatINR } from '../../src/utils/formatters';

export default function PercentageCalculator() {
  const [activeTab, setActiveTab] = useState('percentOf');

  // Mode 1: What is X% of Y?
  const [p1Rate, setP1Rate] = useState(18);
  const [p1Base, setP1Base] = useState(5000);
  const p1Result = ((p1Rate || 0) * (p1Base || 0)) / 100;

  // Mode 2: X is what % of Y?
  const [p2Part, setP2Part] = useState(425);
  const [p2Total, setP2Total] = useState(500);
  const p2Result = p2Total > 0 ? ((p2Part || 0) / p2Total) * 100 : 0;

  // Mode 3: Percentage Increase / Decrease from X to Y
  const [p3Initial, setP3Initial] = useState(1200);
  const [p3Final, setP3Final] = useState(1500);
  const p3Diff = (p3Final || 0) - (p3Initial || 0);
  const p3Percent = p3Initial > 0 ? (p3Diff / p3Initial) * 100 : 0;

  // Mode 4: Discount Calculator
  const [originalPrice, setOriginalPrice] = useState(2499);
  const [discountPercent, setDiscountPercent] = useState(30);
  const discountAmount = ((originalPrice || 0) * (discountPercent || 0)) / 100;
  const finalPrice = Math.max(0, (originalPrice || 0) - discountAmount);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      <div>
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Calculators (होम पेज पर जाएं)</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-2xl">
            🔢
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Percentage Calculator <span className="text-purple-600">(प्रतिशत कैलकुलेटर)</span>
            </h1>
            <p className="text-sm text-slate-600">
              Calculate % of value, student exam marks %, percentage change, and shopping discounts.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-1 bg-slate-200/70 rounded-xl max-w-2xl">
        {[
          { id: 'percentOf', label: '1. What is X% of Y?' },
          { id: 'isWhatPercent', label: '2. Exam Marks % (X of Y)' },
          { id: 'discount', label: '3. Discount / Sale (छूट)' },
          { id: 'change', label: '4. % Increase / Decrease' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'percentOf' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              What is X% of Y? (संख्या का प्रतिशत निकालें)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Percentage (प्रतिशत %)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={p1Rate}
                    onChange={(e) => setP1Rate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold pr-8"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 font-bold">%</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Of Value (संख्या / कुल राशि)
                </label>
                <input
                  type="number"
                  value={p1Base}
                  onChange={(e) => setP1Base(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>
            </div>

            <div className="text-xs text-slate-500 pt-2">
              Formula: <code>({p1Rate} / 100) × {p1Base} = {p1Result.toFixed(2)}</code>
            </div>
          </div>

          <div className="md:col-span-5 bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col justify-center text-center">
            <span className="text-xs font-semibold text-blue-800 uppercase">Calculated Value (परिणाम)</span>
            <div className="text-4xl font-black text-blue-700 my-2">
              {formatIndianNumber(p1Result.toFixed(2))}
            </div>
            <span className="text-xs text-blue-600">
              {p1Rate}% of {formatIndianNumber(p1Base)} is <b>{formatIndianNumber(p1Result.toFixed(2))}</b>
            </span>
          </div>
        </div>
      )}

      {activeTab === 'isWhatPercent' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Exam Marks / Share Percentage (प्राप्तांक प्रतिशत)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Marks Obtained / Part (प्राप्तांक)
                </label>
                <input
                  type="number"
                  value={p2Part}
                  onChange={(e) => setP2Part(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Total Maximum Marks (पूर्णांक)
                </label>
                <input
                  type="number"
                  value={p2Total}
                  onChange={(e) => setP2Total(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>
            </div>

            <div className="text-xs text-slate-500 pt-2">
              Formula: <code>({p2Part} / {p2Total}) × 100 = {p2Result.toFixed(2)}%</code>
            </div>
          </div>

          <div className="md:col-span-5 bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex flex-col justify-center text-center">
            <span className="text-xs font-semibold text-emerald-800 uppercase">Score Percentage</span>
            <div className="text-4xl font-black text-emerald-700 my-2">
              {p2Result.toFixed(2)}%
            </div>
            <span className="text-xs text-emerald-700">
              {p2Part} marks out of {p2Total} total
            </span>
          </div>
        </div>
      )}

      {activeTab === 'discount' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Shopping Discount Calculator (छूट / सेल कैलकुलेटर)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Original Price (MRP / मूल कीमत)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(parseFloat(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Discount Percentage (छूट %)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold pr-8"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 font-bold">%</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              {[10, 20, 30, 40, 50].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDiscountPercent(d)}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-purple-700"
                >
                  {d}% OFF
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 bg-purple-50 border border-purple-200 rounded-xl p-6 flex flex-col justify-center text-center">
            <span className="text-xs font-semibold text-purple-800 uppercase">You Pay (अंतिम कीमत)</span>
            <div className="text-4xl font-black text-purple-700 my-2">
              {formatINR(finalPrice)}
            </div>
            <div className="text-xs font-semibold text-emerald-600 bg-white py-1 px-2.5 rounded-full inline-block border border-emerald-200 mx-auto">
              You Save: {formatINR(discountAmount)} ({discountPercent}%)
            </div>
          </div>
        </div>
      )}

      {activeTab === 'change' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Percentage Increase / Decrease (वृद्धि या कमी)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Initial Value (शुरुआती मूल्य)
                </label>
                <input
                  type="number"
                  value={p3Initial}
                  onChange={(e) => setP3Initial(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1 block">
                  Final Value (अंतिम मूल्य)
                </label>
                <input
                  type="number"
                  value={p3Final}
                  onChange={(e) => setP3Final(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                />
              </div>
            </div>
          </div>

          <div className={`md:col-span-5 p-6 rounded-xl border flex flex-col justify-center text-center ${
            p3Percent >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
          }`}>
            <span className={`text-xs font-semibold uppercase ${
              p3Percent >= 0 ? 'text-emerald-800' : 'text-rose-800'
            }`}>
              {p3Percent >= 0 ? 'Percentage Increase (वृद्धि)' : 'Percentage Decrease (कमी)'}
            </span>
            <div className={`text-4xl font-black my-2 ${
              p3Percent >= 0 ? 'text-emerald-700' : 'text-rose-700'
            }`}>
              {p3Percent >= 0 ? `+${p3Percent.toFixed(2)}%` : `${p3Percent.toFixed(2)}%`}
            </div>
            <span className="text-xs text-slate-600">
              Absolute Change: {p3Diff >= 0 ? `+${p3Diff}` : p3Diff}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
