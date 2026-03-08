// theme/colors.ts

export const colors = {
  // Brand Colors (PURPLE)
  primary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7', 
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },

  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Neutral / Gray Scale
  neutral: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },

  // Status Colors
  success: {
    light: '#dcfce7',
    DEFAULT: '#22c55e',
    dark: '#15803d',
  },

  warning: {
    light: '#fef3c7',
    DEFAULT: '#f59e0b',
    dark: '#b45309',
  },

  error: {
    light: '#fee2e2',
    DEFAULT: '#ef4444',
    dark: '#b91c1c',
  },

  info: {
    light: '#e0f2fe',
    DEFAULT: '#0ea5e9',
    dark: '#0369a1',
  },

  // Backgrounds
  background: {
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    dark: '#0f172a',
    muted: '#f9fafb',
  },

  // Text Colors
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    tertiary: '#64748b',
    muted: '#94a3b8',
    inverse: '#ffffff',
    accent: '#a855f7',
  },

  // Border & Divider
  border: {
    light: '#e5e7eb',
    DEFAULT: '#d1d5db',
    dark: '#94a3b8',
    accent: '#a855f7',
  },

  // Shadows
  shadow: {
    sm: 'rgba(0,0,0,0.05)',
    md: 'rgba(0,0,0,0.1)',
    lg: 'rgba(0,0,0,0.15)',
  },

  // Gradients
  gradient: {
    primary: 'linear-gradient(135deg, #a855f7, #9333ea)',
    soft: 'linear-gradient(135deg, #faf5ff, #ffffff)',
    dark: 'linear-gradient(135deg, #0f172a, #020617)',
  },
} as const


// Tailwind Utility Classes Mapping
export const colorClasses = {
  primary: {
    bg: 'bg-purple-500',
    hover: 'hover:bg-purple-600',
    text: 'text-purple-500',
    border: 'border-purple-500',
    ring: 'ring-purple-500',
  },

  secondary: {
    bg: 'bg-slate-900',
    text: 'text-slate-900',
    border: 'border-slate-900',
  },

  neutral: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    border: 'border-gray-300',
  },

  success: {
    bg: 'bg-green-500',
    text: 'text-green-600',
    border: 'border-green-500',
  },

  warning: {
    bg: 'bg-amber-500',
    text: 'text-amber-600',
    border: 'border-amber-500',
  },

  error: {
    bg: 'bg-red-500',
    text: 'text-red-600',
    border: 'border-red-500',
  },

  info: {
    bg: 'bg-sky-500',
    text: 'text-sky-600',
    border: 'border-sky-500',
  },
} as const
