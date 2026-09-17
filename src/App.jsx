import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RootLayout from '../app/layout.jsx';
import HomePage from '../app/page.jsx';
import EMICalculator from '../app/emi-calculator/page.jsx';
import SIPCalculator from '../app/sip-calculator/page.jsx';
import IncomeTaxCalculator from '../app/income-tax-calculator/page.jsx';
import GSTCalculator from '../app/gst-calculator/page.jsx';
import AgeCalculator from '../app/age-calculator/page.jsx';
import BMICalculator from '../app/bmi-calculator/page.jsx';
import PercentageCalculator from '../app/percentage-calculator/page.jsx';
import CGPACalculator from '../app/cgpa-to-percentage/page.jsx';

// Scroll to top helper on route navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/sip-calculator" element={<SIPCalculator />} />
          <Route path="/income-tax-calculator" element={<IncomeTaxCalculator />} />
          <Route path="/gst-calculator" element={<GSTCalculator />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/cgpa-to-percentage" element={<CGPACalculator />} />
          {/* Fallback to home */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
}
