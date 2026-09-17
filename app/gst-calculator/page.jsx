import React, { useState, useMemo } from 'react';
import SliderInput from '../../components/SliderInput.jsx';
import { formatINR } from '../../src/utils/formatters';
import { Percent, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GST_SLABS = [0, 5, 12, 18, 28];

export default function GSTCalculator() {
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [isInclusive, setIsInclusive] = useState(false);
  const [taxType, setTaxType] = useState('intra');

  const results = useMemo(() => {
    const amt = Math.max(0, amount);
    const rate = Math.max(0, gstRate);

    let netAmount = 0;
    let gstAmount = 0;
    let grossAmount = 0;

    if (isInclusive) {
      grossAmount = amt;
      netAmount = grossAmount / (1 + rate / 100);
      gstAmount = grossAmount - netAmount;
    } else {
      netAmount = amt;
      gstAmount = (netAmount * rate) / 100;
      grossAmount = netAmount + gstAmount;
    }

    const halfGst = gstAmount / 2;

    return {
      netAmount: Math.round(netAmount),
      gstAmount: Math.round(gstAmount),
      grossAmount: Math.round(grossAmount),
      cgst: Math.round(halfGst),
      sgst: Math.round(halfGst),
      igst: Math.round(gstAmount),
    };
  }, [amount, gstRate, isInclusive]);

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
            🧾
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              GST Calculator <span className="text-purple-600">(जीएसटी कैलकुलेटर)</span>
            </h1>
            <p className="text-sm text-slate-600">
              Calculate GST Exclusive (Add GST) or GST Inclusive (Remove GST) with CGST, SGST and IGST breakdown.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Calculation Type (गणना का प्रकार)
            </span>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                id="gst-mode-exclusive"
                onClick={() => setIsInclusive(false)}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  !isInclusive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                GST Exclusive (Add GST / जीएसटी जोड़ें)
              </button>
              <button
                type="button"
                id="gst-mode-inclusive"
                onClick={() => setIsInclusive(true)}
                className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  isInclusive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                GST Inclusive (Remove GST / निकालें)
              </button>
            </div>
          </div>

          <SliderInput
            id="gst-amount"
            label={isInclusive ? "Total Invoice Price (कुल बिल राशि)" : "Base Price (मूल राशि)"}
            labelHi={isInclusive ? "Price including GST" : "Pre-tax price without GST"}
            value={amount}
            onChange={setAmount}
            min={100}
            max={500000}
            step={100}
            prefix="₹"
            accent="purple"
            minLabel="₹100"
            maxLabel="₹5 Lakh"
            presets={[
              { label: '₹1,000', value: 1000 },
              { label: '₹5,000', value: 5000 },
              { label: '₹10,000', value: 10000 },
              { label: '₹50,000', value: 50000 },
              { label: '₹1 Lakh', value: 100000 },
            ]}
          />

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-800">
                GST Rate (% दर)
              </label>
              <span className="text-sm font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-lg border border-purple-200">
                {gstRate}%
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {GST_SLABS.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  id={`gst-rate-${rate}`}
                  onClick={() => setGstRate(rate)}
                  className={`py-2 text-xs font-bold rounded-lg transition-all ${
                    gstRate === rate
                      ? 'bg-purple-600 text-white shadow-xs ring-2 ring-purple-600/30'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {rate}%
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Transaction Territory
            </span>
            <div className="flex gap-4 text-xs font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="taxType"
                  value="intra"
                  checked={taxType === 'intra'}
                  onChange={() => setTaxType('intra')}
                  className="accent-purple-600"
                />
                <span>Intra-State (Same State: CGST 50% + SGST 50%)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="taxType"
                  value="inter"
                  checked={taxType === 'inter'}
                  onChange={() => setTaxType('inter')}
                  className="accent-purple-600"
                />
                <span>Inter-State (IGST 100%)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-purple-700 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="text-xs font-semibold uppercase tracking-wider text-purple-200">
              Total Invoice Amount (कुल बिल राशि)
            </div>
            <div className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
              {formatINR(results.grossAmount)}
            </div>
            <div className="text-xs text-purple-100 mt-1">
              Base Price + GST @ {gstRate}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="text-xs font-semibold text-slate-600 uppercase">
                Base Amount (मूल कीमत)
              </div>
              <div className="text-xl font-bold text-slate-900 mt-1">
                {formatINR(results.netAmount)}
              </div>
              <div className="text-[11px] text-slate-500">Without tax</div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="text-xs font-semibold text-purple-800 uppercase">
                Total GST (कुल टैक्स)
              </div>
              <div className="text-xl font-bold text-purple-700 mt-1">
                {formatINR(results.gstAmount)}
              </div>
              <div className="text-[11px] text-purple-700">Tax liability</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Tax Split Breakdown (टैक्स विभाजन)
            </h3>

            {taxType === 'intra' ? (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Central GST (CGST - {(gstRate/2).toFixed(1)}%):</span>
                  <span className="font-bold text-slate-900">{formatINR(results.cgst)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-600">State GST (SGST - {(gstRate/2).toFixed(1)}%):</span>
                  <span className="font-bold text-slate-900">{formatINR(results.sgst)}</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center py-1.5 text-xs">
                <span className="text-slate-600">Integrated GST (IGST - {gstRate}%):</span>
                <span className="font-bold text-slate-900">{formatINR(results.igst)}</span>
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700">
            <b>GST Slabs Guide:</b> 
            0% (Essentials, milk, grain), 5% (Packaged food, footwear &lt;1k), 12% (Electronics, processed items), 18% (Standard services, IT, hotels), 28% (Luxury goods, cars, tobacco).
          </div>
        </div>
      </div>
    </div>
  );
}
