// src/components/today/hubs/SundayMilestoneHub.tsx
'use client';

import React, { useState } from 'react';
import {
  Target,
  Clock,
  Sparkles,
  CheckCircle2,
  Circle,
  FileCode,
  Layers,
  ArrowRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { CURRENT_SUNDAY_SPEC, SundaySprintSpec } from '@/lib/today/hubData';

export function SundayMilestoneHub() {
  const [spec, setSpec] = useState<SundaySprintSpec>(CURRENT_SUNDAY_SPEC);

  const handleToggleAcceptance = (id: string) => {
    setSpec((prev) => ({
      ...prev,
      acceptanceCriteria: prev.acceptanceCriteria.map((ac) =>
        ac.id === id ? { ...ac, done: !ac.done } : ac
      ),
    }));
  };

  const completedCriteria = spec.acceptanceCriteria.filter((ac) => ac.done).length;
  const totalCriteria = spec.acceptanceCriteria.length;

  return (
    <div className="space-y-6 text-xs">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-400" />
              <span>Development Review & Sunday Milestone Lock</span>
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Sunday 11h primary product sprint: Feature specification, architecture flow, hour-by-hour timeline, and definition of done.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto font-mono">
          <span className="text-[10px] uppercase px-2.5 py-1 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 font-bold">
            Week {spec.rotationWeek} Rotation
          </span>
          <span className="text-[10px] uppercase px-2.5 py-1 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 font-semibold">
            11 Hours Allocated
          </span>
        </div>
      </div>

      {/* 2. ACTIVE MILESTONE FEATURE LOCK CARD */}
      <div className="p-5 rounded-3xl bg-zinc-950/90 border border-indigo-500/30 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
            Locked Primary Feature Sprint
          </span>
          <span className="text-xs font-mono font-bold text-white bg-indigo-950/80 px-2.5 py-1 rounded-lg border border-indigo-500/40">
            {spec.productName}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white font-mono">{spec.featureTitle}</h3>
        <p className="text-zinc-300 leading-relaxed text-xs">{spec.featureObjective}</p>
      </div>

      {/* 3. HOUR-BY-HOUR SUNDAY 11-HOUR TIMELINE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Sunday 11-Hour Precision Timeline</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-500">6 Blocks • 11.0 Total Hours</span>
        </div>

        <div className="space-y-2">
          {spec.timelineSchedule.map((block, idx) => (
            <div
              key={block.timeWindow}
              className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-lg bg-indigo-950/70 text-indigo-400 flex items-center justify-center font-mono font-bold text-[10px] border border-indigo-500/30">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-white text-xs">{block.title}</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug pl-7">
                  Deliverable: <span className="text-zinc-300">{block.output}</span>
                </p>
              </div>

              <div className="shrink-0 pl-7 sm:pl-0">
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-xl bg-zinc-900 text-indigo-300 border border-zinc-800 font-semibold whitespace-nowrap">
                  {block.timeWindow}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. ARCHITECTURE & HOW IT WORKS FLOW */}
      <div className="space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-sky-400" />
          <span>Technical Architecture Flow & Component Breakdown</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {spec.architectureFlow.map((step) => (
            <div key={step.step} className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-sky-400 font-bold px-2 py-0.5 rounded bg-sky-950/60 border border-sky-500/30">
                  Step {step.step}
                </span>
              </div>
              <h5 className="font-semibold text-white">{step.name}</h5>
              <p className="text-[11px] text-zinc-400 leading-snug">{step.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ACCEPTANCE CRITERIA / DEFINITION OF DONE */}
      <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Definition of Done & Acceptance Criteria</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-400">
            {completedCriteria} / {totalCriteria} Verified
          </span>
        </div>

        <div className="space-y-1.5">
          {spec.acceptanceCriteria.map((ac) => (
            <div
              key={ac.id}
              onClick={() => handleToggleAcceptance(ac.id)}
              className="flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900/50 border border-zinc-850 cursor-pointer hover:border-zinc-700 transition-all"
            >
              {ac.done ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-zinc-600 shrink-0" />
              )}
              <span className={`text-xs ${ac.done ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                {ac.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

