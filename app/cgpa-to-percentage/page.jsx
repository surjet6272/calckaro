import React, { useState, useMemo } from 'react';
import SliderInput from '../../components/SliderInput.jsx';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FORMULA_PRESETS = [
  { id: 'cbse', name: 'CBSE Standard', factor: 9.5, desc: 'CGPA × 9.5 (Class 10th & 12th)' },
  { id: 'standard', name: 'Standard 10 Scale', factor: 10, desc: 'CGPA × 10' },
  { id: 'vtu', name: 'VTU Karnataka', type: 'vtu', desc: '(CGPA - 0.75) × 10' },
  { id: 'mumbai', name: 'Mumbai University', type: 'mumbai', desc: '7.1 × CGPA + 12 (Engg)' },
];

export default function CGPACalculator() {
  const [cgpa, setCgpa] = useState(8.6);
  const [selectedPreset, setSelectedPreset] = useState('cbse');
  const [customFactor, setCustomFactor] = useState(9.5);

  const results = useMemo(() => {
    const val = Math.min(10, Math.max(0, cgpa));
    let percentage = 0;

    if (selectedPreset === 'cbse') {
      percentage = val * 9.5;
    } else if (selectedPreset === 'standard') {
      percentage = val * 10;
    } else if (selectedPreset === 'vtu') {
      percentage = val >= 0.75 ? (val - 0.75) * 10 : 0;
    } else if (selectedPreset === 'mumbai') {
      percentage = val > 0 ? 7.1 * val + 12 : 0;
    } else {
      percentage = val * customFactor;
    }

    percentage = Math.min(100, Math.max(0, percentage));

    let division = 'First Class with Distinction';
    let badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
    let grade = 'A+';

    if (percentage >= 75) {
      division = 'First Class with Distinction (विशिष्ट श्रेणी)';
      badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
      grade = val >= 9.5 ? 'O (Outstanding)' : 'A+ (Excellent)';
    } else if (percentage >= 60) {
      division = 'First Division (प्रथम श्रेणी)';
      badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
      grade = 'A (Very Good)';
    } else if (percentage >= 50) {
      division = 'Second Division (द्वितीय श्रेणी)';
      badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
      grade = 'B (Good)';
    } else if (percentage >= 40) {
      division = 'Third Division / Pass (उत्तीर्ण)';
      badgeColor = 'bg-slate-100 text-slate-800 border-slate-200';
      grade = 'C (Average)';
    } else {
      division = 'Needs Improvement';
      badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
      grade = 'F (Fail)';
    }

    return {
      percentage: percentage.toFixed(2),
      division,
      badgeColor,
      grade,
    };
  }, [cgpa, selectedPreset, customFactor]);

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
            🎓
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              CGPA to Percentage <span className="text-blue-600">(सीजीपीए टू प्रतिशत)</span>
            </h1>
            <p className="text-sm text-slate-600">
              Convert 10-point CGPA into percentage for CBSE, Engineering, and State Universities.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Select Grading Scale / Board (बोर्ड या यूनिवर्सिटी चुनें)
            </span>
            <div className="grid grid-cols-2 gap-2">
              {FORMULA_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPreset(p.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedPreset === p.id
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">{p.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <SliderInput
            id="cgpa-slider"
            label="Cumulative Grade Point Average (CGPA)"
            labelHi="Enter CGPA scored (0.00 to 10.00)"
            value={cgpa}
            onChange={setCgpa}
            min={0}
            max={10}
            step={0.05}
            suffix=" CGPA"
            accent="blue"
            minLabel="0.0 CGPA"
            maxLabel="10.0 CGPA"
            presets={[
              { label: '7.0', value: 7.0 },
              { label: '7.5', value: 7.5 },
              { label: '8.0', value: 8.0 },
              { label: '8.5', value: 8.5 },
              { label: '9.0', value: 9.0 },
              { label: '9.5', value: 9.5 },
              { label: '10.0', value: 10.0 },
            ]}
          />

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <b>CBSE Conversion Rule:</b> CBSE ने कक्षा 10वीं व 12वीं के लिए आधिकारिक रूप से <b>9.5</b> गुणक निर्धारित किया है। जैसे, यदि आपका सीजीपीए 8.6 है, तो प्रतिशत = 8.6 × 9.5 = 81.70% होगा।
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">
              Equivalent Percentage (समतुल्य प्रतिशत)
            </div>
            <div className="text-4xl sm:text-5xl font-black mt-2 tracking-tight">
              {results.percentage}%
            </div>
            <div className="text-xs text-blue-100 mt-1">
              Calculated on {cgpa} CGPA (10-point scale)
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-semibold">Grade</span>
              <div className="text-xl font-bold text-slate-900 mt-1">
                {results.grade}
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 uppercase font-semibold">Division</span>
              <div className="text-xs font-bold text-slate-900 mt-1 leading-tight">
                {results.division}
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              CBSE Quick Lookup Table (9.5 Scale)
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between p-1.5 bg-slate-50 rounded">
                <span className="font-semibold text-slate-600">10.0 CGPA</span>
                <span className="font-bold text-slate-900">95.0%</span>
              </div>
              <div className="flex justify-between p-1.5 bg-slate-50 rounded">
                <span className="font-semibold text-slate-600">9.5 CGPA</span>
                <span className="font-bold text-slate-900">90.25%</span>
              </div>
              <div className="flex justify-between p-1.5 bg-slate-50 rounded">
                <span className="font-semibold text-slate-600">9.0 CGPA</span>
                <span className="font-bold text-slate-900">85.5%</span>
              </div>
              <div className="flex justify-between p-1.5 bg-slate-50 rounded">
                <span className="font-semibold text-slate-600">8.5 CGPA</span>
                <span className="font-bold text-slate-900">80.75%</span>
              </div>
              <div className="flex justify-between p-1.5 bg-slate-50 rounded">
                <span className="font-semibold text-slate-600">8.0 CGPA</span>
                <span className="font-bold text-slate-900">76.0%</span>
              </div>
              <div className="flex justify-between p-1.5 bg-slate-50 rounded">
                <span className="font-semibold text-slate-600">7.5 CGPA</span>
                <span className="font-bold text-slate-900">71.25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
