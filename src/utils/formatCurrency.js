import { BRAND_CONFIG } from '../data/config';

export function formatPrice(amount, currencyCode = 'NGN') {
  if (!amount) return 'Price on Request';
  
  if (currencyCode === 'USD') {
    const usd = Math.round(amount * BRAND_CONFIG.currencies.USD.rate);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(usd);
  }

  // NGN format
  if (amount >= 1000000000) {
    const b = (amount / 1000000000).toFixed(2);
    return `₦${b.replace(/\.00$/, '')} Billion`;
  }
  if (amount >= 1000000) {
    const m = (amount / 1000000).toFixed(1);
    return `₦${m.replace(/\.0$/, '')} Million`;
  }

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount);
}
