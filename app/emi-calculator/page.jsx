import React, { useState, useMemo } from 'react';
import SliderInput from '../../components/SliderInput.jsx';
import { formatINR, formatCompactINR } from '../../src/utils/formatters';
import { Landmark, ArrowLeft, Info, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.75);
  const [tenureYears, setTenureYears] = useState(15);
  const [tenureMode, setTenureMode] = useState('years');

  const results = useMemo(() => {
    const P = Math.max(0, loanAmount);
    const totalMonths = tenureMode === 'years' ? tenureYears * 12 : tenureYears;
    const n = Math.max(1, totalMonths);
    const annualR = Math.max(0, interestRate);
    const monthlyR = (annualR / 12) / 100;

    let emi = 0;
    if (annualR === 0) {
      emi = P / n;
    } else {
      const pow = Math.pow(1 + monthlyR, n);
      emi = (P * monthlyR * pow) / (pow - 1);
    }

    const totalPayment = emi * n;
    const totalInterest = Math.max(0, totalPayment - P);
    const principalRatio = totalPayment > 0 ? (P / totalPayment) * 100 : 100;
    const interestRatio = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

    return {
      monthlyEMI: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalRatio: principalRatio.toFixed(1),
      interestRatio: interestRatio.toFixed(1),
      totalMonths: n,
    };
  }, [loanAmount, interestRate, tenureYears, tenureMode]);

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
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-2xl">
            🏦
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              EMI Calculator <span className="text-blue-600">(ईएमआई कैलकुलेटर)</span>
            </h1>
            <p className="text-sm text-slate-600">
              Calculate Monthly Loan EMI, Total Interest Payable & Amortization in seconds.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <SliderInput
            id="loan-amount"
            label="Loan Amount (लोन की राशि)"
            labelHi="Enter principal loan requirement"
            value={loanAmount}
            onChange={setLoanAmount}
            min={50000}
            max={20000000}
            step={25000}
            prefix="₹"
            accent="blue"
            minLabel="₹50 K"
            maxLabel="₹2 Crore"
            presets={[
              { label: '₹10 Lakh', value: 1000000 },
              { label: '₹25 Lakh', value: 2500000 },
              { label: '₹50 Lakh', value: 5000000 },
              { label: '₹1 Crore', value: 10000000 },
            ]}
          />

          <SliderInput
            id="interest-rate"
            label="Interest Rate (% P.A.)"
            labelHi="ब्याज दर (सालाना)"
            value={interestRate}
            onChange={setInterestRate}
            min={4}
            max={22}
            step={0.1}
            suffix="%"
            accent="red"
            minLabel="4%"
            maxLabel="22%"
            presets={[
              { label: 'Home: 8.5%', value: 8.5 },
              { label: 'Car: 9.2%', value: 9.2 },
              { label: 'Personal: 12.5%', value: 12.5 },
              { label: '14%', value: 14 },
            ]}
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Tenure Format
              </span>
              <div className="inline-flex p-0.5 bg-slate-100 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    if (tenureMode === 'months') {
                      setTenureYears(Math.max(1, Math.round(tenureYears / 12)));
                      setTenureMode('years');
                    }
                  }}
                  className={`px-3 py-1 rounded-md transition-all ${
                    tenureMode === 'years' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Years (वर्ष)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (tenureMode === 'years') {
                      setTenureYears(tenureYears * 12);
                      setTenureMode('months');
                    }
                  }}
                  className={`px-3 py-1 rounded-md transition-all ${
                    tenureMode === 'months' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Months (महीने)
                </button>
              </div>
            </div>

            <SliderInput
              id="loan-tenure"
              label={`Loan Tenure (${tenureMode === 'years' ? 'Years' : 'Months'})`}
              labelHi="लोन की अवधि"
              value={tenureYears}
              onChange={setTenureYears}
              min={1}
              max={tenureMode === 'years' ? 30 : 360}
              step={1}
              suffix={tenureMode === 'years' ? ' Yr' : ' Mo'}
              accent="purple"
              minLabel={tenureMode === 'years' ? '1 Year' : '1 Month'}
              maxLabel={tenureMode === 'years' ? '30 Years' : '360 Months'}
              presets={
                tenureMode === 'years'
                  ? [
                      { label: '5 Yrs', value: 5 },
                      { label: '10 Yrs', value: 10 },
                      { label: '15 Yrs', value: 15 },
                      { label: '20 Yrs', value: 20 },
                      { label: '25 Yrs', value: 25 },
                    ]
                  : [
                      { label: '36 Mo', value: 36 },
                      { label: '60 Mo', value: 60 },
                      { label: '120 Mo', value: 120 },
                      { label: '240 Mo', value: 240 },
                    ]
              }
            />
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">
              Monthly Loan EMI (प्रति माह किस्त)
            </div>
            <div className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
              {formatINR(results.monthlyEMI)}
            </div>
            <div className="text-xs text-blue-100 mt-1">
              For {results.totalMonths} monthly installments
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-rose-800">
                Total Interest (कुल ब्याज)
              </div>
              <div className="text-2xl font-extrabold text-rose-600 mt-1.5">
                {formatINR(results.totalInterest)}
              </div>
              <div className="text-xs text-rose-700 mt-1">
                {results.interestRatio}% of total repayment
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                Total Payment (कुल भुगतान)
              </div>
              <div className="text-2xl font-extrabold text-emerald-700 mt-1.5">
                {formatINR(results.totalPayment)}
              </div>
              <div className="text-xs text-emerald-700 mt-1">
                Principal + Interest
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Payment Ratio (भुगतान अनुपात)</span>
              <span>100%</span>
            </div>

            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex">
              <div 
                style={{ width: `${results.principalRatio}%` }}
                className="bg-blue-600 transition-all duration-300"
                title={`Principal: ${results.principalRatio}%`}
              />
              <div 
                style={{ width: `${results.interestRatio}%` }}
                className="bg-rose-500 transition-all duration-300"
                title={`Interest: ${results.interestRatio}%`}
              />
            </div>

            <div className="flex justify-between text-xs pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-600" />
                <span className="text-slate-600">Principal: <b>{formatCompactINR(loanAmount)}</b> ({results.principalRatio}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-rose-500" />
                <span className="text-slate-600">Interest: <b>{formatCompactINR(results.totalInterest)}</b> ({results.interestRatio}%)</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <b>Smart Tip:</b> लोन अवधि (Tenure) जितनी कम होगी, कुल ब्याज (Total Interest) उतना ही कम लगेगा। यदि संभव हो, तो हर साल 1 अतिरिक्त ईएमआई का प्री-पेमेंट करें।
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span>EMI Calculation Formula (ईएमआई फॉर्मूला)</span>
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The mathematical formula for calculating EMI is: <br />
          <code className="bg-slate-100 px-2 py-1 rounded text-xs font-mono text-blue-700">
            EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
          </code>
          <br className="my-1" />
          Where <b>P</b> = Principal loan amount, <b>R</b> = Monthly interest rate (Annual rate / 12 / 100), and <b>N</b> = Number of monthly installments.
        </p>
      </div>
    </div>
  );
}
