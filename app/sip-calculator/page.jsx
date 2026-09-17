import React, { useState, useMemo } from 'react';
import SliderInput from '../../components/SliderInput.jsx';
import { formatINR, formatCompactINR } from '../../src/utils/formatters';
import { TrendingUp, ArrowLeft, HelpCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [returnRate, setReturnRate] = useState(12.5);
  const [timeYears, setTimeYears] = useState(15);

  const results = useMemo(() => {
    const P = Math.max(0, monthlyInvestment);
    const i = (Math.max(0, returnRate) / 12) / 100;
    const n = Math.max(1, timeYears * 12);

    const investedAmount = P * n;
    let totalValue = 0;

    if (i === 0) {
      totalValue = investedAmount;
    } else {
      totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    }

    const wealthGained = Math.max(0, totalValue - investedAmount);
    const investedRatio = totalValue > 0 ? (investedAmount / totalValue) * 100 : 100;
    const returnsRatio = totalValue > 0 ? (wealthGained / totalValue) * 100 : 0;

    return {
      investedAmount: Math.round(investedAmount),
      wealthGained: Math.round(wealthGained),
      totalValue: Math.round(totalValue),
      investedRatio: investedRatio.toFixed(1),
      returnsRatio: returnsRatio.toFixed(1),
      compoundingMultiplier: investedAmount > 0 ? (totalValue / investedAmount).toFixed(2) : '1.00',
    };
  }, [monthlyInvestment, returnRate, timeYears]);

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
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
            📈
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              SIP Calculator <span className="text-emerald-600">(एसआईपी रिटर्न कैलकुलेटर)</span>
            </h1>
            <p className="text-sm text-slate-600">
              Calculate the future value of your Mutual Fund SIP investments with compounding interest.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <SliderInput
            id="monthly-sip"
            label="Monthly Investment (मासिक निवेश)"
            labelHi="Amount you want to invest every month"
            value={monthlyInvestment}
            onChange={setMonthlyInvestment}
            min={500}
            max={200000}
            step={500}
            prefix="₹"
            accent="green"
            minLabel="₹500"
            maxLabel="₹2 Lakh"
            presets={[
              { label: '₹2.5K', value: 2500 },
              { label: '₹5K', value: 5000 },
              { label: '₹10K', value: 10000 },
              { label: '₹25K', value: 25000 },
              { label: '₹50K', value: 50000 },
            ]}
          />

          <SliderInput
            id="sip-return-rate"
            label="Expected Return Rate (% P.A.)"
            labelHi="अनुमानित वार्षिक रिटर्न"
            value={returnRate}
            onChange={setReturnRate}
            min={1}
            max={30}
            step={0.5}
            suffix="%"
            accent="blue"
            minLabel="1%"
            maxLabel="30%"
            presets={[
              { label: 'FD: 7%', value: 7 },
              { label: 'Nifty 50: 12%', value: 12 },
              { label: 'Flexi Cap: 14%', value: 14 },
              { label: 'Small Cap: 16%', value: 16 },
            ]}
          />

          <SliderInput
            id="sip-time-period"
            label="Time Period (निवेश अवधि)"
            labelHi="Number of years you wish to invest"
            value={timeYears}
            onChange={setTimeYears}
            min={1}
            max={35}
            step={1}
            suffix=" Years"
            accent="purple"
            minLabel="1 Year"
            maxLabel="35 Years"
            presets={[
              { label: '5 Yrs', value: 5 },
              { label: '10 Yrs', value: 10 },
              { label: '15 Yrs', value: 15 },
              { label: '20 Yrs', value: 20 },
              { label: '25 Yrs', value: 25 },
            ]}
          />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-emerald-600 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
              Total Maturity Value (कुल मैच्योरिटी राशि)
            </div>
            <div className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
              {formatINR(results.totalValue)}
            </div>
            <div className="text-xs text-emerald-100 mt-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grows your wealth by {results.compoundingMultiplier}x!</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Invested Amount (कुल निवेश)
              </div>
              <div className="text-2xl font-extrabold text-slate-800 mt-1.5">
                {formatINR(results.investedAmount)}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {results.investedRatio}% of total value
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Est. Returns (अनुमानित मुनाफा)
              </div>
              <div className="text-2xl font-extrabold text-emerald-700 mt-1.5">
                {formatINR(results.wealthGained)}
              </div>
              <div className="text-xs text-emerald-700 mt-1">
                {results.returnsRatio}% compounding gain
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Invested vs Returns Growth</span>
              <span>100%</span>
            </div>

            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${results.investedRatio}%` }}
                className="bg-slate-400 transition-all duration-300"
                title={`Invested: ${results.investedRatio}%`}
              />
              <div 
                style={{ width: `${results.returnsRatio}%` }}
                className="bg-emerald-500 transition-all duration-300"
                title={`Returns: ${results.returnsRatio}%`}
              />
            </div>

            <div className="flex justify-between text-xs pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-400" />
                <span className="text-slate-600">Invested: <b>{formatCompactINR(results.investedAmount)}</b></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                <span className="text-slate-600">Profit: <b>{formatCompactINR(results.wealthGained)}</b></span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900">
            <b>Power of Compounding (कंपाउंडिंग की ताकत):</b> जैसे-जैसे निवेश का समय 10-15 साल से आगे बढ़ता है, आपका मुनाफा आपके मूल निवेश से कई गुना बड़ा हो जाता है।
          </div>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <span>What is SIP? (एसआईपी क्या है?)</span>
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly into mutual funds. It eliminates the need to time the stock market and benefits from Rupee Cost Averaging.
        </p>
      </div>
    </div>
  );
}
