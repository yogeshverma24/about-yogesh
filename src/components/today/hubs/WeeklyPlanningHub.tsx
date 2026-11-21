// src/components/today/hubs/WeeklyPlanningHub.tsx
'use client';

import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Target,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Zap,
  CheckSquare,
  Edit2,
  Save,
} from 'lucide-react';
import { MASTER_WEEKLY_SCHEDULE } from '@/lib/today/scheduleData';

export function WeeklyPlanningHub() {
  const [mustWins, setMustWins] = useState<string[]>([
    'Secure 1 paid milestone sprint contract for Delegatespace (₹1,50,000 target)',
    'Ship Delegatework v1.2.0 with async standup summaries & Teams webhooks',
    'Master Swift 6 Actor isolation patterns & solve 5 LeetCode Graph mediums',
  ]);
  const [editingWins, setEditingWins] = useState(false);
  const [tempWins, setTempWins] = useState<string[]>(mustWins);

  const [retrospectiveNotes, setRetrospectiveNotes] = useState({
    hoursLogged: '38.0',
    targetHours: '39.5',
    majorWins: 'Successfully implemented dual-sync DB caching for monthly AI analytics, verified Saturday 11h dev maintenance cadence.',
    frictionBlocker: 'Midweek context switching between client proposals and coding. Solved by batching all client outreach into Tuesday evenings.',
  });

  const handleSaveWins = () => {
    setMustWins(tempWins);
    setEditingWins(false);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-400" />
              <span>Weekly Retrospective & Next-Week Planning</span>
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Compare this week&apos;s planned commitments against actual execution, and lock in the 3 must-win outcomes for next week.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sky-300 font-bold">
            Target: 39.5h / Week
          </span>
        </div>
      </div>

      {/* 2. THIS WEEK RETROSPECTIVE: PLAN VS ACTUAL */}
      <div className="p-5 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
          <span className="font-mono font-bold text-xs uppercase tracking-wider text-sky-400 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>This Week Execution Retrospective (Plan vs Actual)</span>
          </span>
          <span className="font-mono text-[11px] text-emerald-400 font-bold">
            {retrospectiveNotes.hoursLogged}h / {retrospectiveNotes.targetHours}h Logged (96%)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block">
              🏆 Major Wins & Shipped Work
            </span>
            <p className="text-zinc-200 text-xs leading-relaxed">{retrospectiveNotes.majorWins}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-1.5">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">
              ⚠️ Bottleneck & Friction Identified
            </span>
            <p className="text-zinc-200 text-xs leading-relaxed">{retrospectiveNotes.frictionBlocker}</p>
          </div>
        </div>
      </div>

      {/* 3. NEXT WEEK 3 MUST-WIN OUTCOMES */}
      <div className="p-5 rounded-3xl bg-zinc-950 border border-sky-500/30 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
          <span className="font-mono font-bold text-xs uppercase tracking-wider text-sky-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-sky-400" />
            <span>Next Week: The 3 Non-Negotiable Must-Win Outcomes</span>
          </span>

          <button
            onClick={() => {
              if (editingWins) handleSaveWins();
              else {
                setTempWins([...mustWins]);
                setEditingWins(true);
              }
            }}
            className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-mono font-semibold"
          >
            {editingWins ? <Save className="w-3.5 h-3.5" /> : <Edit2 className="w-3.5 h-3.5" />}
            <span>{editingWins ? 'Save Outcomes' : 'Edit Outcomes'}</span>
          </button>
        </div>

        <div className="space-y-2">
          {mustWins.map((win, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-start gap-3"
            >
              <span className="w-6 h-6 rounded-xl bg-sky-950/80 text-sky-400 border border-sky-500/30 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </span>
              {editingWins ? (
                <input
                  type="text"
                  value={tempWins[idx]}
                  onChange={(e) => {
                    const copy = [...tempWins];
                    copy[idx] = e.target.value;
                    setTempWins(copy);
                  }}
                  className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-sky-400 font-sans"
                />
              ) : (
                <span className="text-zinc-200 text-xs font-medium leading-relaxed pt-0.5">{win}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. MASTER 7-DAY TIME-BLOCKING MATRIX */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-sky-400" />
          <span>Next Week Operating Schedule (40 Hours Structured)</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-2">
          {MASTER_WEEKLY_SCHEDULE.map((day) => (
            <div
              key={day.dayKey}
              className="p-3 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-1.5 text-center flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-mono font-bold text-sky-300 block">{day.shortDay}</span>
                <span className="text-[10px] font-mono text-zinc-500 block">{day.totalHours} Hours</span>
                <h6 className="font-semibold text-white text-[11px] mt-1 line-clamp-2">{day.focusTitle}</h6>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 mt-2 block truncate">
                {day.timeWindow}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

