// src/components/today/TimeframeNav.tsx
'use client';

import React from 'react';
import { Timeframe, DashboardMode } from '@/lib/today/types';
import { modeThemes } from '@/lib/today/theme';
import { Sun, CalendarDays, CalendarRange, Compass } from 'lucide-react';

interface Props {
  currentTimeframe: Timeframe;
  onSelectTimeframe: (tf: Timeframe) => void;
  counts: Record<Timeframe, { total: number; completed: number }>;
  currentMode: DashboardMode;
}

export function TimeframeNav({ currentTimeframe, onSelectTimeframe, counts, currentMode }: Props) {
  const theme = modeThemes[currentMode];

  const tabs: Array<{
    id: Timeframe;
    title: string;
    sublabel: string;
    icon: React.ElementType;
  }> = [
    {
      id: 'today',
      title: 'Today',
      sublabel: 'Daily Execution',
      icon: Sun,
    },
    {
      id: 'week',
      title: 'Week',
      sublabel: 'Sprint Goals',
      icon: CalendarDays,
    },
    {
      id: 'month',
      title: 'Month',
      sublabel: 'Deliverables & SEO',
      icon: CalendarRange,
    },
    {
      id: 'six_months',
      title: 'Vision',
      sublabel: 'Long-term Roadmap',
      icon: Compass,
    },
  ];

  return (
    <div className="w-full flex items-center justify-between gap-1.5 sm:gap-2 p-1.5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl">
      {tabs.map((tab) => {
        const active = currentTimeframe === tab.id;
        const Icon = tab.icon;
        const countInfo = counts[tab.id] || { total: 0, completed: 0 };

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTimeframe(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl transition-all duration-200 ${
              active
                ? `${theme.activePill}`
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold tracking-tight whitespace-nowrap">
              {tab.title}
            </span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                active
                  ? 'bg-black/25 text-zinc-950 font-bold'
                  : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              {countInfo.completed}/{countInfo.total}
            </span>
          </button>
        );
      })}
    </div>
  );
}
