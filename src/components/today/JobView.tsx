// src/components/today/JobView.tsx
'use client';

import React from 'react';
import {
  GraduationCap,
  Code2,
  Cpu,
  Layers,
  Smartphone,
  Mic,
  Sparkles,
  Target,
  Terminal,
  Award,
} from 'lucide-react';
import { MilestoneItem } from '@/lib/today/types';
import { playChime } from '@/lib/today/sound';

interface Props {
  milestones: MilestoneItem[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onTriggerAI: (topic: string, actionType: string) => void;
}

export function JobView({
  milestones,
  selectedCategory,
  onSelectCategory,
  onTriggerAI,
}: Props) {
  const jobCategories = [
    { id: 'all', label: 'All Prep', icon: GraduationCap },
    { id: 'dsa', label: 'DSA & LeetCode', icon: Code2 },
    { id: 'system_design', label: 'System Design', icon: Cpu },
    { id: 'ios', label: 'iOS (Swift 6)', icon: Smartphone },
    { id: 'react_native', label: 'React Native', icon: Layers },
    { id: 'flutter', label: 'Flutter', icon: Terminal },
    { id: 'communication', label: 'Communication', icon: Mic },
  ];

  return (
    <div className="space-y-6">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {jobCategories.map((c) => {
          const active = selectedCategory === c.id;
          const Icon = c.icon;

          return (
            <button
              key={c.id}
              onClick={() => {
                playChime('click');
                onSelectCategory(c.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                active
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-emerald-400" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* AI Interview Prep Copilot */}
      <div className="bg-zinc-900/50 border border-emerald-500/20 rounded-3xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Technical Interview Coach (Gemini)</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Instant mock questions, architectural deep dives & behavioral drills
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            onClick={() => onTriggerAI('dsa', 'job_prep')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/80 text-left transition-all group hover:border-emerald-500/30"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-zinc-200">DSA Problem Drill</h5>
              <p className="text-[10px] text-zinc-400">Graphs, DP & LeetCode</p>
            </div>
          </button>

          <button
            onClick={() => onTriggerAI('system_design', 'job_prep')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/80 text-left transition-all group hover:border-emerald-500/30"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-zinc-200">System Design Drill</h5>
              <p className="text-[10px] text-zinc-400">HLD, Caching & DB Sharding</p>
            </div>
          </button>

          <button
            onClick={() => onTriggerAI('ios', 'job_prep')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/80 text-left transition-all group hover:border-emerald-500/30"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-zinc-200">iOS & Mobile Lead</h5>
              <p className="text-[10px] text-zinc-400">Swift 6, Flutter & RN</p>
            </div>
          </button>

          <button
            onClick={() => onTriggerAI('communication', 'job_prep')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/80 text-left transition-all group hover:border-emerald-500/30"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-zinc-200">Communication STAR</h5>
              <p className="text-[10px] text-zinc-400">Fluency & behavioral drills</p>
            </div>
          </button>
        </div>
      </div>

      {/* 3 Core Competency Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Technical (DSA & System Design) */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>1. DSA & System Design</span>
            </h4>
            <span className="text-[11px] font-mono text-emerald-300 font-bold">72/100 Solved</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between">
              <span className="text-zinc-300">Blind 75 & LeetCode DP</span>
              <span className="text-emerald-400 font-semibold">Active Track</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between">
              <span className="text-zinc-300">Graphs (Topological Sort / Dijkstra)</span>
              <span className="text-zinc-400">This Week</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between">
              <span className="text-zinc-300">HLD: Distributed Caching & Redis</span>
              <span className="text-emerald-400 font-semibold">Tonight</span>
            </div>
          </div>
        </div>

        {/* Pillar 2: Cross-Platform & Native Development */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>2. Mobile Engineering</span>
            </h4>
            <span className="text-[11px] font-mono text-emerald-300 font-bold">Senior Level</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between">
              <span className="text-zinc-300">iOS (Swift 6 & Actors)</span>
              <span className="text-emerald-400 font-semibold">In-Depth</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between">
              <span className="text-zinc-300">React Native (New Arch Fabric)</span>
              <span className="text-zinc-400">Mastered</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between">
              <span className="text-zinc-300">Flutter (Riverpod 2 & Impeller)</span>
              <span className="text-emerald-400 font-semibold">Production Ready</span>
            </div>
          </div>
        </div>

        {/* Pillar 3: Communication & Executive Presence */}
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
              <Mic className="w-4 h-4 text-emerald-400" />
              <span>3. Communication & STAR</span>
            </h4>
            <span className="text-[11px] font-mono text-emerald-300 font-bold">Daily Drill</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between">
              <span className="text-zinc-300">20-min English Articulation</span>
              <span className="text-emerald-400 font-semibold">Daily</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between">
              <span className="text-zinc-300">Technical Trade-off STAR Story</span>
              <span className="text-zinc-400">Prepared</span>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-center justify-between">
              <span className="text-zinc-300">Mock Interview Simulation</span>
              <span className="text-emerald-400 font-semibold">Weekend</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Month Career Vision Milestone */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Job & Career 6-Month Target</span>
        </h4>

        <div className="space-y-3">
          {milestones
            .filter((m) => m.mode === 'job')
            .map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs sm:text-sm font-semibold text-zinc-200">{m.title}</h5>
                  <span className="text-xs font-mono font-semibold text-emerald-400">{m.progress}%</span>
                </div>

                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${m.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Target: {m.targetDate}</span>
                  <span>Metric: {m.metric}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
