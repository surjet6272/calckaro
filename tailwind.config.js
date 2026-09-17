/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb', // Primary color requested
          700: '#1d4ed8',
          800: '#1e40af',
        },
        money: {
          light: '#dcfce7',
          DEFAULT: '#16a34a', // Accent green for money
          dark: '#15803d',
        },
        interest: {
          light: '#fee2e2',
          DEFAULT: '#dc2626', // Accent red for interest
          dark: '#b91c1c',
        },
        tenure: {
          light: '#f3e8ff',
          DEFAULT: '#9333ea', // Accent purple for tenure
          dark: '#7e22ce',
        },
        canvas: '#f8fafc',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
