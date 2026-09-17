import React, { useState, useMemo } from 'react';
import { Calendar, ArrowLeft, Cake, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('2000-01-15');
  const [targetDate, setTargetDate] = useState(() => new Date().toISOString().split('T')[0]);

  const ageData = useMemo(() => {
    if (!birthDate || !targetDate) return null;

    const bDate = new Date(birthDate);
    const tDate = new Date(targetDate);

    if (isNaN(bDate.getTime()) || isNaN(tDate.getTime()) || bDate > tDate) {
      return { error: 'Birth date must be earlier than the target date' };
    }

    let years = tDate.getFullYear() - bDate.getFullYear();
    let months = tDate.getMonth() - bDate.getMonth();
    let days = tDate.getDate() - bDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(tDate.getFullYear(), tDate.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = tDate.getTime() - bDate.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    const nextBirthdayYear = 
      tDate.getMonth() > bDate.getMonth() || 
      (tDate.getMonth() === bDate.getMonth() && tDate.getDate() >= bDate.getDate())
        ? tDate.getFullYear() + 1
        : tDate.getFullYear();

    const nextBirthday = new Date(nextBirthdayYear, bDate.getMonth(), bDate.getDate());
    const daysToBirthday = Math.ceil((nextBirthday.getTime() - tDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const birthDayName = dayNames[bDate.getDay()];
    const nextBirthdayDayName = dayNames[nextBirthday.getDay()];

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      daysToBirthday,
      birthDayName,
      nextBirthdayDayName,
    };
  }, [birthDate, targetDate]);

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
            🎂
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Age Calculator <span className="text-blue-600">(आयु कैलकुलेटर)</span>
            </h1>
            <p className="text-sm text-slate-600">
              Calculate your exact age in years, months, days, hours, and find upcoming birthday milestones.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-2">
            <label htmlFor="birthdate-input" className="text-sm font-semibold text-slate-800">
              Date of Birth (जन्म तिथि)
            </label>
            <input
              type="date"
              id="birthdate-input"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            {ageData && !ageData.error && (
              <span className="text-xs text-slate-500 block">
                Born on: <b>{ageData.birthDayName}</b>
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="targetdate-input" className="text-sm font-semibold text-slate-800">
              Calculate Age As On (इस तारीख तक आयु)
            </label>
            <input
              type="date"
              id="targetdate-input"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            <span className="text-xs text-slate-500 block">
              Default is Today. Change to calculate age on exam cutoff dates.
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            <b>Government Exam Form Usage:</b> UPSC, SSC, IBPS, Railways और स्टेट पुलिस भर्तियों में फॉर्म भरते समय मांगी गई कट-ऑफ तिथि के अनुसार अपनी सटीक आयु तुरंत जानें।
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          {ageData && !ageData.error ? (
            <>
              <div className="bg-blue-600 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                  Your Exact Age (आपकी कुल उम्र)
                </div>
                <div className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
                  {ageData.years} <span className="text-xl font-normal text-blue-200">Years</span> {ageData.months} <span className="text-xl font-normal text-blue-200">Months</span> {ageData.days} <span className="text-xl font-normal text-blue-200">Days</span>
                </div>
                <div className="text-xs text-blue-100 mt-2">
                  {ageData.years} वर्ष, {ageData.months} माह और {ageData.days} दिन
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl shrink-0">
                  🎂
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                    Next Birthday Countdown
                  </div>
                  <div className="text-xl font-extrabold text-amber-900 mt-0.5">
                    {ageData.daysToBirthday} days to go!
                  </div>
                  <div className="text-xs text-amber-700 mt-0.5">
                    Will fall on a <b>{ageData.nextBirthdayDayName}</b>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Age in Other Units (अन्य इकाइयों में जीवन)
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block">Total Months</span>
                    <span className="text-base font-bold text-slate-900">{ageData.totalMonths}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block">Total Weeks</span>
                    <span className="text-base font-bold text-slate-900">{ageData.totalWeeks}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block">Total Days</span>
                    <span className="text-base font-bold text-slate-900">{ageData.totalDays}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block">Total Hours</span>
                    <span className="text-base font-bold text-slate-900">{ageData.totalHours.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-sm">
              {ageData?.error || 'Please enter valid dates.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
