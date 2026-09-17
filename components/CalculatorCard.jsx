import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CalculatorCard({
  id,
  title,
  titleHi,
  emoji,
  description,
  path,
  badgeText,
  accentColor = 'blue'
}) {
  const borderColors = {
    blue: 'hover:border-blue-300 group-hover:bg-blue-50/50',
    green: 'hover:border-emerald-300 group-hover:bg-emerald-50/50',
    red: 'hover:border-rose-300 group-hover:bg-rose-50/50',
    purple: 'hover:border-purple-300 group-hover:bg-purple-50/50',
  };

  const badgeColors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-emerald-100 text-emerald-800',
    red: 'bg-rose-100 text-rose-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <Link
      to={path}
      id={`card-${id}`}
      className={`group relative bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between ${borderColors[accentColor] || borderColors.blue}`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {emoji}
          </div>
          {badgeText && (
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${badgeColors[accentColor] || badgeColors.blue}`}>
              {badgeText}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        {titleHi && (
          <p className="text-xs font-medium text-slate-500 mb-2">
            {titleHi}
          </p>
        )}

        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-semibold text-blue-600 group-hover:text-blue-700">
        <span>Calculate Now (गणना करें)</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
