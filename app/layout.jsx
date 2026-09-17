import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export const metadata = {
  title: 'CalcKaro - Calculator Hub (स्मार्ट कैलकुलेटर हब)',
  description: 'CalcKaro is India’s fast, client-side calculator hub for Loan EMI, SIP Wealth, Income Tax FY 2024-26, GST, Age, BMI, Percentage & CGPA calculations.',
  keywords: 'EMI calculator India, SIP calculator mutual funds, Income tax calculator FY 2024-25, GST calculator online, Age calculator, BMI calculator, CGPA to percentage CBSE',
  authors: [{ name: 'CalcKaro India' }],
};

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Navbar with all calculator links & mobile drawer */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 pb-12">
        {children}
      </main>

      {/* Footer with Made in India branding */}
      <Footer />
    </div>
  );
}
