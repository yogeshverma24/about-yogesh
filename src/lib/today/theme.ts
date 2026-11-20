// src/lib/today/theme.ts
import { DashboardMode } from './types';

export interface ModeTheme {
  name: string;
  colorName: 'green' | 'blue' | 'yellow' | 'indigo';
  
  // Luxury hex palette
  accentHex: string;
  accentSoftHex: string;
  bgHex: string;
  cardHex: string;
  borderHex: string;

  // Tailwind styling
  bgCanvas: string;
  bgCard: string;
  bgCardHover: string;
  borderSubtle: string;
  borderActive: string;
  textPrimary: string;
  textMuted: string;
  badge: string;
  buttonPrimary: string;
  activePill: string;
  ring: string;
  progressBar: string;
  indicator: string;
}

export const modeThemes: Record<DashboardMode, ModeTheme> = {
  overview: {
    name: 'Executive Overview',
    colorName: 'indigo',
    accentHex: '#818cf8', // Luxury Royal Iris / Indigo
    accentSoftHex: '#a5b4fc',
    bgHex: '#080811', // Deep indigo obsidian
    cardHex: '#0f0f20',
    borderHex: 'rgba(129, 140, 248, 0.18)',

    bgCanvas: 'bg-[#080811]',
    bgCard: 'bg-[#0f0f20]/75',
    bgCardHover: 'hover:bg-[#15152c]/85',
    borderSubtle: 'border-indigo-500/15',
    borderActive: 'border-indigo-400/40',
    textPrimary: 'text-indigo-400',
    textMuted: 'text-indigo-300/70',
    badge: 'bg-indigo-950/40 text-indigo-300 border border-indigo-500/25',
    buttonPrimary: 'bg-indigo-500 hover:bg-indigo-400 text-zinc-950 font-bold shadow-sm',
    activePill: 'bg-indigo-500 text-zinc-950 font-bold shadow-md shadow-indigo-900/30',
    ring: 'ring-indigo-500/20',
    progressBar: 'bg-indigo-500',
    indicator: 'bg-indigo-400',
  },
  personal: {
    name: 'Personal',
    colorName: 'green',
    accentHex: '#10b981', // Refined Emerald
    accentSoftHex: '#34d399',
    bgHex: '#080d0a', // Deep forest obsidian
    cardHex: '#0f1712',
    borderHex: 'rgba(52, 211, 153, 0.14)',

    bgCanvas: 'bg-[#080d0a]',
    bgCard: 'bg-[#0f1712]/70',
    bgCardHover: 'hover:bg-[#131e17]/80',
    borderSubtle: 'border-emerald-500/15',
    borderActive: 'border-emerald-400/40',
    textPrimary: 'text-emerald-400',
    textMuted: 'text-emerald-300/70',
    badge: 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/25',
    buttonPrimary: 'bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-semibold shadow-sm',
    activePill: 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-900/30',
    ring: 'ring-emerald-500/20',
    progressBar: 'bg-emerald-400',
    indicator: 'bg-emerald-400',
  },
  business: {
    name: 'Business',
    colorName: 'blue',
    accentHex: '#38bdf8', // Ice Cyan / Glacier Blue
    accentSoftHex: '#60a5fa',
    bgHex: '#070a14', // Deep midnight obsidian
    cardHex: '#0d1322',
    borderHex: 'rgba(96, 165, 250, 0.14)',

    bgCanvas: 'bg-[#070a14]',
    bgCard: 'bg-[#0d1322]/70',
    bgCardHover: 'hover:bg-[#11192e]/80',
    borderSubtle: 'border-sky-500/15',
    borderActive: 'border-sky-400/40',
    textPrimary: 'text-sky-400',
    textMuted: 'text-sky-300/70',
    badge: 'bg-sky-950/40 text-sky-300 border border-sky-500/25',
    buttonPrimary: 'bg-sky-400 hover:bg-sky-300 text-zinc-950 font-semibold shadow-sm',
    activePill: 'bg-sky-400 text-zinc-950 font-bold shadow-md shadow-sky-900/30',
    ring: 'ring-sky-500/20',
    progressBar: 'bg-sky-400',
    indicator: 'bg-sky-400',
  },
  job: {
    name: 'Job Prep',
    colorName: 'yellow',
    accentHex: '#f59e0b', // Rich Warm Golden Amber (Vibrant, warm, neither washed out nor piercing)
    accentSoftHex: '#fbbf24',
    bgHex: '#0a0803', // Deep warm amber obsidian
    cardHex: '#120f06',
    borderHex: 'rgba(245, 158, 11, 0.22)',

    bgCanvas: 'bg-[#0a0803]',
    bgCard: 'bg-[#120f06]/75',
    bgCardHover: 'hover:bg-[#181409]/85',
    borderSubtle: 'border-amber-500/20',
    borderActive: 'border-amber-400/50',
    textPrimary: 'text-amber-400',
    textMuted: 'text-amber-300/80',
    badge: 'bg-amber-950/50 text-amber-300 border border-amber-500/30',
    buttonPrimary: 'bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold shadow-sm',
    activePill: 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-900/30',
    ring: 'ring-amber-500/25',
    progressBar: 'bg-amber-500',
    indicator: 'bg-amber-400',
  },
};
