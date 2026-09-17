import React from 'react';
import { formatIndianNumber } from '../src/utils/formatters';

export default function SliderInput({
  id,
  label,
  labelHi,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix = '',
  suffix = '',
  accent = 'blue',
  minLabel,
  maxLabel,
  presets = []
}) {
  const accentClasses = {
    blue: 'accent-blue-600 focus:ring-blue-500',
    green: 'accent-emerald-600 focus:ring-emerald-500',
    red: 'accent-rose-600 focus:ring-rose-500',
    purple: 'accent-purple-600 focus:ring-purple-500',
  };

  const handleTextChange = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    if (raw === '') {
      onChange(min);
      return;
    }
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      onChange(num);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <label htmlFor={id} className="text-sm font-semibold text-slate-800">
            {label}
          </label>
          {labelHi && (
            <span className="block text-xs text-slate-500 font-normal">
              {labelHi}
            </span>
          )}
        </div>

        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3 text-slate-500 font-medium text-sm select-none">
              {prefix}
            </span>
          )}
          <input
            type="text"
            id={id}
            value={formatIndianNumber(value)}
            onChange={handleTextChange}
            className={`w-36 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:bg-white focus:ring-2 ${
              prefix ? 'pl-7' : ''
            } ${suffix ? 'pr-7' : ''} ${accentClasses[accent] || accentClasses.blue}`}
          />
          {suffix && (
            <span className="absolute right-3 text-slate-500 font-medium text-sm select-none">
              {suffix}
            </span>
          )}
        </div>
      </div>

      <div className="pt-1">
        <input
          type="range"
          id={`${id}-slider`}
          aria-label={label}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={`w-full h-2 bg-slate-200 rounded-lg cursor-pointer ${accentClasses[accent] || accentClasses.blue}`}
        />
        
        <div className="flex justify-between text-[11px] text-slate-500 pt-1">
          <span>{minLabel || `${prefix}${formatIndianNumber(min)}${suffix}`}</span>
          <span>{maxLabel || `${prefix}${formatIndianNumber(max)}${suffix}`}</span>
        </div>
      </div>

      {presets && presets.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-400 font-medium mr-1">Quick:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onChange(preset.value)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                value === preset.value
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
