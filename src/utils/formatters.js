// CalcKaro - Indian Number and Currency Formatting Utilities

/**
 * Format a number to Indian Rupee representation (e.g. ₹12,34,567)
 * @param {number|string} amount
 * @param {boolean} [includeDecimals=false]
 * @returns {string}
 */
export function formatINR(amount, includeDecimals = false) {
  const numeric = Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  }).format(numeric);
}

/**
 * Format a raw number into Indian comma pattern (e.g. 12,34,567)
 * @param {number|string} num
 * @returns {string}
 */
export function formatIndianNumber(num) {
  const numeric = Number(num) || 0;
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(numeric);
}

/**
 * Format compact amounts in Indian words (e.g. ₹10 Lakhs, ₹1.5 Crore)
 * @param {number} num
 * @returns {string}
 */
export function formatCompactINR(num) {
  const val = Number(num) || 0;
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(val % 10000000 === 0 ? 0 : 2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(val % 100000 === 0 ? 0 : 2)} Lakh`;
  }
  if (val >= 1000) {
    return `₹${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 1)} K`;
  }
  return `₹${val}`;
}

/**
 * Parses numeric input safely
 * @param {string|number} val
 * @param {number} fallback
 * @returns {number}
 */
export function parseSafeNumber(val, fallback = 0) {
  if (typeof val === 'number') return isNaN(val) ? fallback : val;
  if (!val) return fallback;
  const cleaned = String(val).replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? fallback : parsed;
}
