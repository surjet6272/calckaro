import React, { useState, useMemo } from 'react';
import SliderInput from '../../components/SliderInput.jsx';
import { formatINR, formatCompactINR } from '../../src/utils/formatters';
import { Receipt, ArrowLeft, CheckCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function IncomeTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState(1200000);
  const [otherIncome, setOtherIncome] = useState(50000);
  const [section80C, setSection80C] = useState(150000);
  const [section80D, setSection80D] = useState(25000);
  const [hraDeduction, setHraDeduction] = useState(100000);
  const [showAdvancedDeductions, setShowAdvancedDeductions] = useState(false);

  const taxComparison = useMemo(() => {
    const totalGross = Math.max(0, grossIncome) + Math.max(0, otherIncome);

    // New Regime
    const newStdDeduction = 75000;
    const newTaxableIncome = Math.max(0, totalGross - newStdDeduction);

    let newTax = 0;
    if (newTaxableIncome <= 300000) {
      newTax = 0;
    } else if (newTaxableIncome <= 700000) {
      newTax = (newTaxableIncome - 300000) * 0.05;
    } else if (newTaxableIncome <= 1000000) {
      newTax = 400000 * 0.05 + (newTaxableIncome - 700000) * 0.10;
    } else if (newTaxableIncome <= 1200000) {
      newTax = 400000 * 0.05 + 300000 * 0.10 + (newTaxableIncome - 1000000) * 0.15;
    } else if (newTaxableIncome <= 1500000) {
      newTax = 400000 * 0.05 + 300000 * 0.10 + 200000 * 0.15 + (newTaxableIncome - 1200000) * 0.20;
    } else {
      newTax = 400000 * 0.05 + 300000 * 0.10 + 200000 * 0.15 + 300000 * 0.20 + (newTaxableIncome - 1500000) * 0.30;
    }

    if (newTaxableIncome <= 700000) {
      newTax = 0;
    }

    const newCess = Math.round(newTax * 0.04);
    const newTotalTax = Math.round(newTax + newCess);

    // Old Regime
    const oldStdDeduction = 50000;
    const capped80C = Math.min(150000, Math.max(0, section80C));
    const capped80D = Math.min(100000, Math.max(0, section80D));
    const totalOldDeductions = oldStdDeduction + capped80C + capped80D + Math.max(0, hraDeduction);

    const oldTaxableIncome = Math.max(0, totalGross - totalOldDeductions);

    let oldTax = 0;
    if (oldTaxableIncome <= 250000) {
      oldTax = 0;
    } else if (oldTaxableIncome <= 500000) {
      oldTax = (oldTaxableIncome - 250000) * 0.05;
    } else if (oldTaxableIncome <= 1000000) {
      oldTax = 250000 * 0.05 + (oldTaxableIncome - 500000) * 0.20;
    } else {
      oldTax = 250000 * 0.05 + 500000 * 0.20 + (oldTaxableIncome - 1000000) * 0.30;
    }

    if (oldTaxableIncome <= 500000) {
      oldTax = 0;
    }

    const oldCess = Math.round(oldTax * 0.04);
    const oldTotalTax = Math.round(oldTax + oldCess);

    const diff = Math.abs(newTotalTax - oldTotalTax);
    const recommendation = newTotalTax <= oldTotalTax ? 'new' : 'old';

    return {
      totalGross,
      newTaxableIncome,
      newTotalTax,
      newStdDeduction,
      oldTaxableIncome,
      oldTotalTax,
      totalOldDeductions,
      diff,
      recommendation,
    };
  }, [grossIncome, otherIncome, section80C, section80D, hraDeduction]);

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
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-2xl">
            💼
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Income Tax Calculator <span className="text-rose-600">(इनकम टैक्स कैलकुलेटर)</span>
            </h1>
            <p className="text-sm text-slate-600">
              Compare New Tax Regime vs Old Tax Regime for FY 2024-25 / 2025-26 (AY 2025-26 & 2026-27).
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <SliderInput
            id="gross-salary"
            label="Annual Gross Salary / CTC (वार्षिक आय)"
            labelHi="Total salary income before any deductions"
            value={grossIncome}
            onChange={setGrossIncome}
            min={300000}
            max={5000000}
            step={25000}
            prefix="₹"
            accent="blue"
            minLabel="₹3 Lakh"
            maxLabel="₹50 Lakh"
            presets={[
              { label: '₹7.5L', value: 750000 },
              { label: '₹10L', value: 1000000 },
              { label: '₹12L', value: 1200000 },
              { label: '₹15L', value: 1500000 },
              { label: '₹25L', value: 2500000 },
            ]}
          />

          <SliderInput
            id="other-income"
            label="Other Income (अन्य आय)"
            labelHi="Bank Interest, Freelance, Rental or Capital Gains"
            value={otherIncome}
            onChange={setOtherIncome}
            min={0}
            max={1000000}
            step={10000}
            prefix="₹"
            accent="purple"
            minLabel="₹0"
            maxLabel="₹10 Lakh"
            presets={[
              { label: 'Nil', value: 0 },
              { label: '₹25K', value: 25000 },
              { label: '₹50K', value: 50000 },
              { label: '₹1 Lakh', value: 100000 },
            ]}
          />

          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowAdvancedDeductions(!showAdvancedDeductions)}
              className="flex items-center justify-between w-full text-left py-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>Old Regime Deductions (80C, 80D, HRA)</span>
              <span className="text-xs bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                {showAdvancedDeductions ? 'Hide (छिपाएं)' : 'Customize (बदलें)'}
              </span>
            </button>

            {showAdvancedDeductions && (
              <div className="space-y-4 pt-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <SliderInput
                  id="deduction-80c"
                  label="Section 80C (PPF, EPF, ELSS, LIC)"
                  labelHi="Max deduction limit ₹1,50,000"
                  value={section80C}
                  onChange={setSection80C}
                  min={0}
                  max={150000}
                  step={5000}
                  prefix="₹"
                  accent="green"
                  minLabel="₹0"
                  maxLabel="₹1.5 Lakh"
                />

                <SliderInput
                  id="deduction-80d"
                  label="Section 80D (Health Insurance)"
                  labelHi="Self, Family & Parents Medical Mediclaim"
                  value={section80D}
                  onChange={setSection80D}
                  min={0}
                  max={75000}
                  step={5000}
                  prefix="₹"
                  accent="red"
                  minLabel="₹0"
                  maxLabel="₹75 K"
                />

                <SliderInput
                  id="deduction-hra"
                  label="HRA / Home Loan Interest (Sec 24b)"
                  labelHi="House Rent Allowance or Interest exemption"
                  value={hraDeduction}
                  onChange={setHraDeduction}
                  min={0}
                  max={300000}
                  step={10000}
                  prefix="₹"
                  accent="purple"
                  minLabel="₹0"
                  maxLabel="₹3 Lakh"
                />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className={`p-5 rounded-2xl border shadow-xs ${
            taxComparison.recommendation === 'new' 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-blue-50 border-blue-200 text-blue-950'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle className={`w-5 h-5 ${
                taxComparison.recommendation === 'new' ? 'text-emerald-600' : 'text-blue-600'
              }`} />
              <span className="font-bold text-sm uppercase tracking-wide">
                Best Tax Choice: {taxComparison.recommendation === 'new' ? 'New Tax Regime' : 'Old Tax Regime'}
              </span>
            </div>
            
            <div className="mt-2 text-2xl font-black">
              {taxComparison.diff === 0 
                ? 'Both Regimes have equal tax!' 
                : `Saves you ${formatINR(taxComparison.diff)} in taxes!`}
            </div>
            
            <p className="text-xs mt-1 opacity-80">
              {taxComparison.recommendation === 'new'
                ? 'New regime offers lower slab rates & ₹75,000 standard deduction without locking funds in investments.'
                : 'Old regime is better for you because your high 80C, 80D & HRA deductions exceed the new slab advantage.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={`p-4 rounded-xl border transition-all ${
              taxComparison.recommendation === 'new'
                ? 'bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                : 'bg-white border-slate-200'
            }`}>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">New Regime</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">Default</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 mt-2">
                {formatINR(taxComparison.newTotalTax)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Std Ded: ₹75,000
              </div>
              <div className="text-[11px] text-slate-500">
                Taxable: {formatCompactINR(taxComparison.newTaxableIncome)}
              </div>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${
              taxComparison.recommendation === 'old'
                ? 'bg-white border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                : 'bg-white border-slate-200'
            }`}>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Old Regime</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">Optional</span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900 mt-2">
                {formatINR(taxComparison.oldTotalTax)}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Total Ded: {formatCompactINR(taxComparison.totalOldDeductions)}
              </div>
              <div className="text-[11px] text-slate-500">
                Taxable: {formatCompactINR(taxComparison.oldTaxableIncome)}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-1">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" />
              <span>₹7.75 Lakh Zero-Tax Rule (Section 87A):</span>
            </div>
            <p>
              New Tax Regime में ₹7,00,000 तक की टैक्सेबल इनकम पर 87A छूट मिलती है। ₹75,000 स्टैंडर्ड डिडक्शन मिलाकर ₹7.75 लाख तक की सैलरी पर <b>₹0 टैक्स</b> लगता है।
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h2 className="text-base font-bold text-slate-900">
          New Tax Slabs (Section 115BAC)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block">Up to ₹3,00,000</span>
            <span className="font-bold text-slate-900">0% (Nil)</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block">₹3L - ₹7 Lakh</span>
            <span className="font-bold text-slate-900">5% (Rebate upto 7L)</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block">₹7L - ₹10 Lakh</span>
            <span className="font-bold text-slate-900">10%</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block">₹10L - ₹12 Lakh</span>
            <span className="font-bold text-slate-900">15%</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block">₹12L - ₹15 Lakh</span>
            <span className="font-bold text-slate-900">20%</span>
          </div>
          <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-slate-500 block">Above ₹15 Lakh</span>
            <span className="font-bold text-slate-900">30%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
