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
  CheckCircle2,
  Terminal,
  BookOpen,
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
    { id: 'all', label: 'All Prep', icon: GraduationCap, color: 'emerald' },
    { id: 'dsa', label: 'DSA & LeetCode', icon: Code2, color: 'amber' },
    { id: 'system_design', label: 'System Design', icon: Cpu, color: 'blue' },
    { id: 'ios', label: 'iOS (Swift 6)', icon: Smartphone, color: 'rose' },
    { id: 'react_native', label: 'React Native', icon: Layers, color: 'cyan' },
    { id: 'flutter', label: 'Flutter', icon: Terminal, color: 'indigo' },
    { id: 'communication', label: 'Communication', icon: Mic, color: 'purple' },
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
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                active
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5 hover:border-white/15'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* AI Interview Prep Copilot */}
      <div className="bg-gradient-to-r from-emerald-950/50 via-teal-950/40 to-slate-900/80 border border-emerald-500/20 rounded-3xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>AI Technical Interview Coach (Gemini Powered)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Instant mock questions, architectural deep dives & behavioral drills
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <button
            onClick={() => onTriggerAI('dsa', 'job_prep')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
          >
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">DSA Problem Drill</h5>
              <p className="text-[10px] text-slate-400">Graphs, DP & LeetCode patterns</p>
            </div>
          </button>

          <button
            onClick={() => onTriggerAI('system_design', 'job_prep')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
          >
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">System Design Drill</h5>
              <p className="text-[10px] text-slate-400">HLD, Caching & DB Sharding</p>
            </div>
          </button>

          <button
            onClick={() => onTriggerAI('ios', 'job_prep')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
          >
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 group-hover:scale-110 transition-transform">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">iOS & Mobile Lead</h5>
              <p className="text-[10px] text-slate-400">Swift 6, Flutter & React Native</p>
            </div>
          </button>

          <button
            onClick={() => onTriggerAI('communication', 'job_prep')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
          >
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Communication STAR</h5>
              <p className="text-[10px] text-slate-400">Fluency & behavioral scenarios</p>
            </div>
          </button>
        </div>
      </div>

      {/* 3 Core Competency Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pillar 1: Technical (DSA & System Design) */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>1. DSA & System Design</span>
            </h4>
            <span className="text-[11px] font-mono text-amber-300 font-bold">72/100 Solved</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300">Blind 75 & LeetCode DP</span>
              <span className="text-emerald-400 font-bold">Active Track</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300">Graphs (Topological Sort / Dijkstra)</span>
              <span className="text-amber-400 font-bold">This Week</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300">HLD: Distributed Caching & Redis</span>
              <span className="text-blue-400 font-bold">Tonight</span>
            </div>
          </div>
        </div>

        {/* Pillar 2: Cross-Platform & Native Development */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <span>2. Mobile Engineering</span>
            </h4>
            <span className="text-[11px] font-mono text-cyan-300 font-bold">Senior Level</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300">iOS (Swift 6 & Actors)</span>
              <span className="text-rose-400 font-bold">In-Depth</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300">React Native (New Arch Fabric)</span>
              <span className="text-cyan-400 font-bold">Mastered</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300">Flutter (Riverpod 2 & Impeller)</span>
              <span className="text-indigo-400 font-bold">Production Ready</span>
            </div>
          </div>
        </div>

        {/* Pillar 3: Communication & Executive Presence */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Mic className="w-4 h-4 text-purple-400" />
              <span>3. Communication & STAR</span>
            </h4>
            <span className="text-[11px] font-mono text-purple-300 font-bold">Daily Drill</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300">20-min English Articulation</span>
              <span className="text-purple-400 font-bold">Daily</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300">Technical Trade-off STAR Story</span>
              <span className="text-emerald-400 font-bold">Prepared</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <span className="text-slate-300">Mock Interview Simulation</span>
              <span className="text-amber-400 font-bold">Saturday</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6-Month Career Vision Milestone */}
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>Job & Career 6-Month Target</span>
        </h4>

        <div className="space-y-3">
          {milestones
            .filter((m) => m.mode === 'job')
            .map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs sm:text-sm font-bold text-white">{m.title}</h5>
                  <span className="text-xs font-mono text-emerald-300">{m.progress}%</span>
                </div>

                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${m.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
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

