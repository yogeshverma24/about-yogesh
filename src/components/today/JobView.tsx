// src/components/today/JobView.tsx
'use client';

import React from 'react';
import {
  Code2,
  Cpu,
  Layers,
  Smartphone,
  Mic,
  Sparkles,
  Terminal,
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
  selectedCategory,
  onSelectCategory,
  onTriggerAI,
}: Props) {
  const jobCategories = [
    { id: 'all', label: 'All Prep', icon: Code2 },
    { id: 'dsa', label: 'DSA & LeetCode', icon: Code2 },
    { id: 'system_design', label: 'System Design', icon: Cpu },
    { id: 'ios', label: 'iOS (Swift 6)', icon: Smartphone },
    { id: 'react_native', label: 'React Native', icon: Layers },
    { id: 'flutter', label: 'Flutter', icon: Terminal },
    { id: 'communication', label: 'Communication', icon: Mic },
  ];

  return (
    <div className="bg-[#120f06]/75 border border-amber-500/25 rounded-3xl p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-500/20 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            Job Mastery
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-950/50 text-amber-300 border border-amber-500/30 font-semibold">
            72/100 Solved
          </span>
        </div>

        <button
          onClick={() => onTriggerAI(selectedCategory === 'all' ? 'dsa' : selectedCategory, 'job_prep')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-all active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>AI Coach Drill</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                active
                  ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-900/30'
                  : 'bg-zinc-950/60 text-zinc-400 hover:text-amber-300 border border-zinc-850 hover:border-amber-500/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Competency Snapshot */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850">
          <span className="text-[10px] text-zinc-500 block mb-0.5 font-mono">DSA Blind 75</span>
          <span className="font-semibold text-zinc-200">Graphs & Trees</span>
        </div>

        <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850">
          <span className="text-[10px] text-zinc-500 block mb-0.5 font-mono">HLD System Design</span>
          <span className="font-semibold text-zinc-200">Distributed Cache</span>
        </div>

        <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850">
          <span className="text-[10px] text-zinc-500 block mb-0.5 font-mono">Communication</span>
          <span className="font-semibold text-zinc-200">STAR Method 20m</span>
        </div>
      </div>
    </div>
  );
}
