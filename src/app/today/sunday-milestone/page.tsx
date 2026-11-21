// src/app/today/sunday-milestone/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Compass,
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
  Check,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { HubPageShell } from '@/components/today/HubPageShell';
import { CURRENT_SUNDAY_SPEC, SundaySprintSpec } from '@/lib/today/hubData';

export default function SundayMilestonePage() {
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
  const progressPercent = Math.round((completedCriteria / totalCriteria) * 100);

  return (
    <HubPageShell
      hubId="sunday-milestone"
      title="Development Review & Sunday Milestone Lock"
      badge="Sunday 11h Deep Product Sprint"
      description="The cornerstone of Yogesh Verma's weekly shipping engine: 11 uninterrupted hours on Sunday dedicated to locking, architecting, building, and deploying the core product milestone."
    >
      {/* 1. TOP SPRINT KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-amber-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Sprint Time Window</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">11.0 Hours</div>
          <div className="mt-1 text-[11px] text-amber-300">09:00 AM – 10:00 PM Full-Day Sprint</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-amber-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Target Venture</span>
            <Layers className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 text-xl font-bold text-sky-300 font-mono truncate">Delegatework</div>
          <div className="mt-1 text-[11px] text-zinc-400">Week 1 Primary Rotation</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-amber-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>DoD Acceptance Criteria</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400 font-mono">
            {completedCriteria}/{totalCriteria} ({progressPercent}%)
          </div>
          <div className="mt-1 text-[11px] text-zinc-400">Definition of Done Verified</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-amber-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Milestone Release Target</span>
            <Cpu className="w-4 h-4 text-violet-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">v1.2.0 Tag</div>
          <div className="mt-1 text-[11px] text-emerald-400">Production Deploy at 21:00</div>
        </div>
      </div>

      {/* 2. LOCKED PRIMARY FEATURE SPEC BANNER */}
      <div className="p-5 sm:p-6 rounded-3xl bg-zinc-950/90 border border-amber-500/30 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-850 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Locked Sunday Feature Milestone
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-white bg-amber-500/20 px-3 py-1 rounded-xl border border-amber-500/30">
            {spec.productName}
          </span>
        </div>

        <div className="space-y-1.5">
          <h2 className="text-lg sm:text-xl font-bold text-white font-mono">{spec.featureTitle}</h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-4xl">
            {spec.featureObjective}
          </p>
        </div>
      </div>

      {/* 3. HOUR-BY-HOUR 11-HOUR TIMELINE & ARCHITECTURE SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: 11-Hour Timeline Schedule (7 Cols) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Sunday 11-Hour Precision Timeline</span>
            </span>
            <span className="text-[11px] font-mono text-zinc-500">6 Blocks • 11.0h Total</span>
          </div>

          <div className="space-y-2.5">
            {spec.timelineSchedule.map((block, idx) => (
              <div
                key={block.timeWindow}
                className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850 hover:border-amber-500/30 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-xs border border-amber-500/20">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs font-bold text-white">{block.title}</h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-amber-300 border border-zinc-800">
                    {block.hours}h
                  </span>
                </div>

                <div className="pl-8 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                  <span className="text-zinc-400">{block.timeWindow}</span>
                  <span className="font-mono text-emerald-400 font-semibold">{block.output}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Technical Architecture Flow & DoD Acceptance Criteria (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Architecture Flow */}
          <div className="p-5 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-3">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>Technical Architecture Flow</span>
            </span>

            <div className="space-y-2">
              {spec.architectureFlow.map((step) => (
                <div key={step.step} className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-950 text-sky-300">
                      Step {step.step}
                    </span>
                    <span>{step.name}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug">{step.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Definition of Done (Acceptance Criteria) */}
          <div className="p-5 rounded-3xl bg-zinc-950/90 border border-emerald-500/20 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Definition of Done (DoD)</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {completedCriteria}/{totalCriteria}
              </span>
            </div>

            <div className="space-y-2">
              {spec.acceptanceCriteria.map((ac) => (
                <label
                  key={ac.id}
                  onClick={() => handleToggleAcceptance(ac.id)}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850 hover:border-emerald-500/30 text-xs cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={ac.done}
                    readOnly
                    className="mt-0.5 rounded border-zinc-700 text-emerald-500 focus:ring-0"
                  />
                  <span
                    className={`text-xs leading-relaxed ${
                      ac.done ? 'line-through text-zinc-500' : 'text-zinc-200'
                    }`}
                  >
                    {ac.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HubPageShell>
  );
}

