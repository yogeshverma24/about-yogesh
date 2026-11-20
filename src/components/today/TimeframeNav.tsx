// src/components/today/TimeframeNav.tsx
'use client';

import React from 'react';
import { Timeframe } from '@/lib/today/types';
import { Sun, CalendarDays, CalendarRange, Compass, CheckCircle2 } from 'lucide-react';

interface Props {
  currentTimeframe: Timeframe;
  onSelectTimeframe: (tf: Timeframe) => void;
  counts: Record<Timeframe, { total: number; completed: number }>;
}

export function TimeframeNav({ currentTimeframe, onSelectTimeframe, counts }: Props) {
  const tabs: Array<{
    id: Timeframe;
    title: string;
    sublabel: string;
    icon: React.ElementType;
  }> = [
    {
      id: 'today',
      title: 'Aaj Kya Hai (Today)',
      sublabel: 'Daily Execution & Routine',
      icon: Sun,
    },
    {
      id: 'week',
      title: 'Is Week Mein',
      sublabel: 'Weekly Sprint Goals',
      icon: CalendarDays,
    },
    {
      id: 'month',
      title: 'Is Month Mein',
      sublabel: 'Monthly Deliverables & SEO',
      icon: CalendarRange,
    },
    {
      id: 'six_months',
      title: '6 Month Vision',
      sublabel: 'Career & Product Roadmap',
      icon: Compass,
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 my-4">
      {tabs.map((tab) => {
        const active = currentTimeframe === tab.id;
        const Icon = tab.icon;
        const countInfo = counts[tab.id] || { total: 0, completed: 0 };
        const percent = countInfo.total > 0 ? Math.round((countInfo.completed / countInfo.total) * 100) : 0;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTimeframe(tab.id)}
            className={`group relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 overflow-hidden ${
              active
                ? 'bg-[#0f1713] border-emerald-500/40 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/20'
                : 'bg-zinc-900/40 border-zinc-800/70 hover:border-zinc-700/80 hover:bg-zinc-900/70'
            }`}
          >
            {/* Top Indicator bar */}
            {active && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-400" />
            )}

            <div className="flex items-center justify-between mb-2.5">
              <div
                className={`p-2 rounded-xl transition-colors ${
                  active
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-zinc-800/60 text-zinc-400 group-hover:text-zinc-200'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span
                  className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                    percent === 100
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : active
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/20'
                      : 'bg-zinc-800/60 text-zinc-400'
                  }`}
                >
                  {countInfo.completed}/{countInfo.total} Done
                </span>
              </div>
            </div>

            <div className="space-y-0.5">
              <h3
                className={`text-xs sm:text-sm font-bold tracking-tight line-clamp-1 ${
                  active ? 'text-zinc-100' : 'text-zinc-300 group-hover:text-zinc-100'
                }`}
              >
                {tab.title}
              </h3>
              <p className="text-[11px] text-zinc-400 line-clamp-1">{tab.sublabel}</p>
            </div>

            {/* Clean Emerald Progress bar */}
            <div className="mt-3 w-full h-1 bg-zinc-800/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
