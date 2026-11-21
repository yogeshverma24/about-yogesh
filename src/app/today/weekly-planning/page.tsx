// src/app/today/weekly-planning/page.tsx
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
  Award,
  Layers,
} from 'lucide-react';
import { HubPageShell } from '@/components/today/HubPageShell';
import { MASTER_WEEKLY_SCHEDULE } from '@/lib/today/scheduleData';

export default function WeeklyPlanningPage() {
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
    <HubPageShell
      hubId="weekly-planning"
      title="Weekly Planning, Retrospective & Metrics Review"
      badge="40h Founder Operating System"
      description="Reflect on weekly hours logged vs the 39.5h target, review core deliverables shipped, and lock in the 3 non-negotiable must-win outcomes for the upcoming 7-day operating cadence."
    >
      {/* 1. TOP METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-rose-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Weekly Execution</span>
            <TrendingUp className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {retrospectiveNotes.hoursLogged}h / {retrospectiveNotes.targetHours}h
          </div>
          <div className="mt-1 text-[11px] text-emerald-400">96.2% Founder Target Achieved</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-rose-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Weekday Cadence</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">17.5h (5 × 3.5h)</div>
          <div className="mt-1 text-[11px] text-zinc-400">Evenings 06:00 PM – 10:30 PM</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-rose-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Weekend Deep Sprints</span>
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">22.0h (2 × 11.0h)</div>
          <div className="mt-1 text-[11px] text-zinc-400">Saturday Dev + Sunday Sprint</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-rose-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Must-Win Velocity</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">3 Goals Locked</div>
          <div className="mt-1 text-[11px] text-purple-300">Non-Negotiable Execution</div>
        </div>
      </div>

      {/* 2. THIS WEEK RETROSPECTIVE (PLAN VS ACTUAL) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
          <span className="font-mono font-bold text-xs uppercase tracking-wider text-rose-400 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>This Week Execution Retrospective (Plan vs Actual)</span>
          </span>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            {retrospectiveNotes.hoursLogged} Hours Verified Logged
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-1.5">
            <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold">
              🏆 Key Wins & Major Milestones Delivered
            </span>
            <p className="text-xs text-zinc-200 leading-relaxed">{retrospectiveNotes.majorWins}</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-1.5">
            <span className="text-[11px] font-mono uppercase text-amber-400 font-bold">
              ⚡ Friction, Blockers & System Adjustments
            </span>
            <p className="text-xs text-zinc-200 leading-relaxed">{retrospectiveNotes.frictionBlocker}</p>
          </div>
        </div>
      </div>

      {/* 3. 3 NON-NEGOTIABLE MUST-WIN OUTCOMES FOR NEXT WEEK */}
      <div className="p-5 sm:p-6 rounded-3xl bg-zinc-950/90 border border-rose-500/25 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-400" />
              <span>Next Week: 3 Non-Negotiable Must-Win Outcomes</span>
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              If only these 3 outcomes are accomplished by next Sunday, the week is a 10/10 success.
            </p>
          </div>

          <button
            onClick={() => (editingWins ? handleSaveWins() : setEditingWins(true))}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 transition-colors"
          >
            {editingWins ? (
              <>
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Save Outcomes</span>
              </>
            ) : (
              <>
                <Edit2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>Edit 3 Must-Wins</span>
              </>
            )}
          </button>
        </div>

        <div className="space-y-2.5">
          {mustWins.map((win, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 flex items-center gap-3"
            >
              <span className="w-7 h-7 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-mono font-bold text-xs border border-rose-500/20 shrink-0">
                0{idx + 1}
              </span>

              {editingWins ? (
                <input
                  type="text"
                  value={tempWins[idx]}
                  onChange={(e) => {
                    const updated = [...tempWins];
                    updated[idx] = e.target.value;
                    setTempWins(updated);
                  }}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-750 text-white text-xs focus:outline-none focus:border-rose-400"
                />
              ) : (
                <span className="text-xs font-semibold text-zinc-100 leading-snug">{win}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. MASTER 7-DAY OPERATING CADENCE GRID */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-rose-400" />
            <span>Master 7-Day 39.5-Hour Allocation Map</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-500">100% Time-Blocked</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
          {MASTER_WEEKLY_SCHEDULE.map((day) => (
            <div
              key={day.dayKey}
              className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-850 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-white">{day.dayName}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-850 text-rose-300">
                    {day.totalHours}h
                  </span>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 mt-0.5">{day.tag}</div>
                <p className="text-[11px] text-zinc-300 leading-snug mt-1.5 line-clamp-2">{day.focusTitle}</p>
              </div>

              <div className="pt-2 border-t border-zinc-850/80 text-[10px] font-mono text-zinc-500">
                {day.timeWindow}
              </div>
            </div>
          ))}
        </div>
      </div>
    </HubPageShell>
  );
}

