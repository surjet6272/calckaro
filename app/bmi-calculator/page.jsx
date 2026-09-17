import React, { useState, useMemo } from 'react';
import SliderInput from '../../components/SliderInput.jsx';
import { Activity, ArrowLeft, HeartPulse, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BMICalculator() {
  const [weightKg, setWeightKg] = useState(68);
  const [heightUnit, setHeightUnit] = useState('cm'); // 'cm' | 'ft'
  const [heightCm, setHeightCm] = useState(172);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(8);

  const effectiveHeightMeters = useMemo(() => {
    if (heightUnit === 'cm') {
      return (heightCm || 1) / 100;
    } else {
      const totalInches = (heightFeet || 0) * 12 + (heightInches || 0);
      return (totalInches * 2.54) / 100;
    }
  }, [heightUnit, heightCm, heightFeet, heightInches]);

  const bmiData = useMemo(() => {
    const h = effectiveHeightMeters;
    const w = weightKg;

    if (h <= 0 || w <= 0) return null;

    const bmi = w / (h * h);
    const minHealthyWeight = 18.5 * (h * h);
    const maxHealthyWeight = 22.9 * (h * h);

    let category = 'Normal Weight';
    let categoryHi = 'सामान्य व स्वस्थ वजन';
    let color = 'emerald';
    let badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    let advice = 'आपका वजन आपकी लंबाई के हिसाब से बिल्कुल सही है। स्वस्थ आहार और नियमित व्यायाम बनाए रखें।';

    if (bmi < 18.5) {
      category = 'Underweight';
      categoryHi = 'कम वजन (अंडरवेट)';
      color = 'amber';
      badgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
      advice = 'आपका वजन सामान्य से कम है। प्रोटीन और पौष्टिक संतुलित आहार से वजन बढ़ाने की सलाह दी जाती है।';
    } else if (bmi >= 18.5 && bmi <= 22.9) {
      category = 'Normal (Healthy)';
      categoryHi = 'आदर्श स्वस्थ वजन (Asian Guidelines)';
      color = 'emerald';
      badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      advice = 'उत्कृष्ट! आपका वजन सामान्य व सुरक्षित सीमा में है।';
    } else if (bmi >= 23 && bmi <= 24.9) {
      category = 'Overweight';
      categoryHi = 'अधिक वजन (ओवरवेट)';
      color = 'amber';
      badgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
      advice = 'भारतीयों के लिए 23 से अधिक BMI अधिक वजन की श्रेणी में आता है। दैनिक वॉक या कार्डियो शुरू करें।';
    } else {
      category = 'Obesity';
      categoryHi = 'मोटापा (ओबेसिटी)';
      color = 'rose';
      badgeBg = 'bg-rose-50 text-rose-800 border-rose-200';
      advice = 'मोटापे से ब्लड प्रेशर और डायबिटीज का खतरा बढ़ सकता है। डॉक्टर या डाइटिशियन से परामर्श लें।';
    }

    return {
      bmi: bmi.toFixed(1),
      category,
      categoryHi,
      color,
      badgeBg,
      advice,
      minWeight: minHealthyWeight.toFixed(1),
      maxWeight: maxHealthyWeight.toFixed(1),
    };
  }, [weightKg, effectiveHeightMeters]);

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
            ⚖️
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              BMI Calculator <span className="text-emerald-600">(बीएमआई कैलकुलेटर)</span>
            </h1>
            <p className="text-sm text-slate-600">
              Check your Body Mass Index (BMI) & ideal weight range calibrated for Indian body types.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <SliderInput
            id="weight-kg"
            label="Weight (शरीर का वजन)"
            labelHi="Enter weight in kilograms"
            value={weightKg}
            onChange={setWeightKg}
            min={30}
            max={180}
            step={0.5}
            suffix=" kg"
            accent="green"
            minLabel="30 kg"
            maxLabel="180 kg"
            presets={[
              { label: '55 kg', value: 55 },
              { label: '65 kg', value: 65 },
              { label: '75 kg', value: 75 },
              { label: '85 kg', value: 85 },
            ]}
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800">
                Height (आपकी लंबाई)
              </label>
              <div className="inline-flex p-0.5 bg-slate-100 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setHeightUnit('cm')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    heightUnit === 'cm' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Centimeters (cm)
                </button>
                <button
                  type="button"
                  onClick={() => setHeightUnit('ft')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    heightUnit === 'ft' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Feet + Inches (ft/in)
                </button>
              </div>
            </div>

            {heightUnit === 'cm' ? (
              <SliderInput
                id="height-cm"
                label="Height in CM"
                labelHi="सेंटीमीटर में लंबाई"
                value={heightCm}
                onChange={setHeightCm}
                min={100}
                max={230}
                step={1}
                suffix=" cm"
                accent="blue"
                minLabel="100 cm"
                maxLabel="230 cm"
                presets={[
                  { label: '160 cm', value: 160 },
                  { label: '168 cm', value: 168 },
                  { label: '175 cm', value: 175 },
                  { label: '182 cm', value: 182 },
                ]}
              />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Feet (फीट)
                  </label>
                  <select
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    {[3, 4, 5, 6, 7].map((f) => (
                      <option key={f} value={f}>{f} Feet</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">
                    Inches (इंच)
                  </label>
                  <select
                    value={heightInches}
                    onChange={(e) => setHeightInches(parseInt(e.target.value, 10))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                      <option key={i} value={i}>{i} Inches</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          {bmiData && (
            <>
              <div className={`p-6 rounded-2xl border shadow-md text-white ${
                bmiData.color === 'emerald' ? 'bg-emerald-600' :
                bmiData.color === 'amber' ? 'bg-amber-600' : 'bg-rose-600'
              }`}>
                <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
                  Your BMI Score (बीएमआई स्कोर)
                </div>
                <div className="text-4xl sm:text-5xl font-black mt-2 tracking-tight">
                  {bmiData.bmi} <span className="text-xl font-normal opacity-80">kg/m²</span>
                </div>
                <div className="text-sm font-bold mt-2 bg-black/20 inline-block px-3 py-1 rounded-full">
                  {bmiData.category} • {bmiData.categoryHi}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Healthy Weight Range for Your Height
                </span>
                <div className="text-2xl font-extrabold text-slate-900">
                  {bmiData.minWeight} kg - {bmiData.maxWeight} kg
                </div>
                <p className="text-xs text-slate-600">
                  {bmiData.advice}
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="font-bold text-slate-800">
                  🇮🇳 Indian / Asian BMI Cutoffs (WHO Recommended):
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                  <div className="p-1.5 bg-white rounded border border-slate-200">
                    <span className="text-amber-700 font-semibold block">&lt; 18.5</span>
                    <span>Underweight</span>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-slate-200">
                    <span className="text-emerald-700 font-semibold block">18.5 – 22.9</span>
                    <span>Normal Healthy</span>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-slate-200">
                    <span className="text-amber-700 font-semibold block">23.0 – 24.9</span>
                    <span>Overweight</span>
                  </div>
                  <div className="p-1.5 bg-white rounded border border-slate-200">
                    <span className="text-rose-700 font-semibold block">&gt; 25.0</span>
                    <span>Obesity</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
