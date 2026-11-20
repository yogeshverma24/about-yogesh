// src/components/today/TimeframeNav.tsx
'use client';

import React from 'react';
import { Timeframe } from '@/lib/today/types';
import { Sun, CalendarDays, CalendarRange, Compass } from 'lucide-react';

interface Props {
  currentTimeframe: Timeframe;
  onSelectTimeframe: (tf: Timeframe) => void;
  counts: Record<Timeframe, { total: number; completed: number }>;
}

export function TimeframeNav({ currentTimeframe, onSelectTimeframe, counts }: Props) {
  const tabs: Array<{
    id: Timeframe;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    color: string;
  }> = [
    {
      id: 'today',
      label: 'Aaj Kya Karna Hai (Today)',
      sublabel: 'Daily Execution & Routine',
      icon: Sun,
      color: 'amber',
    },
    {
      id: 'week',
      label: 'Is Week Mein (This Week)',
      sublabel: 'Weekly Sprint Goals',
      icon: CalendarDays,
      color: 'blue',
    },
    {
      id: 'month',
      label: 'Is Month Mein (This Month)',
      sublabel: 'Monthly Deliverables & SEO',
      icon: CalendarRange,
      color: 'purple',
    },
    {
      id: 'six_months',
      label: '6 Month Vision (Roadmap)',
      sublabel: 'Long-term Career & Wealth',
      icon: Compass,
      color: 'emerald',
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 my-4">
      {tabs.map((tab) => {
        const active = currentTimeframe === tab.id;
        const Icon = tab.icon;
        const countInfo = counts[tab.id] || { total: 0, completed: 0 };
        const percent = countInfo.total > 0 ? Math.round((countInfo.completed / countInfo.total) * 100) : 0;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTimeframe(tab.id)}
            className={`relative text-left p-3 sm:p-4 rounded-2xl border transition-all duration-200 overflow-hidden ${
              active
                ? 'bg-slate-900 border-indigo-500/50 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                : 'bg-slate-900/50 border-white/5 hover:border-white/15 hover:bg-slate-900/80 text-slate-400'
            }`}
          >
            {/* Top Indicator bar */}
            {active && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            )}

            <div className="flex items-center justify-between mb-2">
              <div
                className={`p-2 rounded-xl ${
                  active ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span
                  className={`px-2 py-0.5 rounded-full font-bold ${
                    percent === 100
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : active
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {countInfo.completed}/{countInfo.total} Done
                </span>
              </div>
            </div>

            <div className="space-y-0.5">
              <h3
                className={`text-xs sm:text-sm font-bold tracking-tight line-clamp-1 ${
                  active ? 'text-white' : 'text-slate-200'
                }`}
              >
                {tab.label}
              </h3>
              <p className="text-[11px] text-slate-400 line-clamp-1">{tab.sublabel}</p>
            </div>

            {/* Micro Progress Bar */}
            <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-500 rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}

