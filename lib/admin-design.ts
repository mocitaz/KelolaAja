/**
 * Admin Design System
 * Centralized design tokens for consistent styling across admin pages
 */

export const adminColors = {
  primary: {
    from: '#039edb',
    to: '#71bf44',
    light: '#039edb',
    dark: '#0280af',
  },
  green: {
    from: '#71bf44',
    to: '#5a9936',
  },
  red: {
    from: '#ef4444',
    to: '#dc2626',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
};

export const adminSpacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px
};

export const adminTypography = {
  xs: 'text-xs',      // 12px
  sm: 'text-sm',      // 14px
  base: 'text-base',  // 16px
  lg: 'text-lg',      // 18px
  xl: 'text-xl',      // 20px
  '2xl': 'text-2xl',  // 24px
  '3xl': 'text-3xl',  // 30px
};

export const adminShadows = {
  sm: 'shadow-sm',
  md: 'shadow',
  lg: 'shadow-md',
  xl: 'shadow-lg',
};

export const adminRadius = {
  sm: 'rounded-lg',   // 8px
  md: 'rounded-xl',   // 12px
  lg: 'rounded-2xl',  // 16px
  full: 'rounded-full',
};

// Common button styles
export const adminButtons = {
  primary: 'px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#039edb] to-[#71bf44] rounded-lg hover:opacity-90 transition-all shadow-sm hover:shadow-md',
  secondary: 'px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors',
  danger: 'px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:opacity-90 transition-all shadow-sm',
  ghost: 'px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors',
};

// Common input styles
export const adminInputs = {
  base: 'w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] transition-colors',
  search: 'w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#039edb] focus:border-[#039edb] transition-colors',
};

// Common badge styles
export const adminBadges = {
  primary: 'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gradient-to-r from-[#039edb]/10 to-[#71bf44]/10 text-[#039edb] border border-[#039edb]/20',
  success: 'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-green-50 text-green-700 border border-green-200',
  danger: 'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200',
  warning: 'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-yellow-50 text-yellow-700 border border-yellow-200',
  gray: 'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-50 text-gray-700 border border-gray-200',
};







