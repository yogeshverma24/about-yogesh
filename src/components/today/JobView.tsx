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
  CheckCircle2,
  Clock,
  BookOpen,
  GraduationCap,
  TrendingUp,
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
    { id: 'all', label: 'All Prep Track', icon: Code2, badge: 'Full Stack & Mobile' },
    { id: 'dsa', label: 'DSA & LeetCode', icon: Code2, badge: 'Blind 75 & Graphs' },
    { id: 'system_design', label: 'System Design', icon: Cpu, badge: 'HLD & LLD Caching' },
    { id: 'flutter', label: 'Flutter', icon: Terminal, badge: 'Riverpod 2.0 & Impeller' },
    { id: 'react_native', label: 'React Native', icon: Layers, badge: 'Fabric & JSI C++' },
    { id: 'ios', label: 'iOS (Swift 6)', icon: Smartphone, badge: 'Concurrency & Actors' },
    { id: 'communication', label: 'Communication', icon: Mic, badge: 'STAR & English Fluency' },
  ];

  const competencyDetails: Record<
    string,
    {
      title: string;
      readiness: number;
      curriculum: string[];
      interviewFocus: string;
      timeAllocation: string;
    }
  > = {
    all: {
      title: 'Senior Software Engineer & Lead Mobile Architect Track',
      readiness: 84,
      curriculum: [
        'DSA: LeetCode Medium/Hard Graphs, Trees, Two Pointers, and Dynamic Programming',
        'System Design: Distributed caching (Redis Cluster), database sharding, and API Gateway',
        'Mobile: Cross-platform production architecture (Flutter, React Native) and Native iOS (Swift 6)',
        'Communication: Behavioral excellence using STAR method and technical trade-off articulation',
      ],
      interviewFocus: 'Tier-1 Tech Companies, High-Growth Scale-ups & US/Remote Senior Engineering Roles',
      timeAllocation: 'Monday (1.5h Technical Learning) + Daily (45m DSA Drill) + Sunday (Week 2 Sprint)',
    },
    dsa: {
      title: 'Data Structures & Algorithms (LeetCode Patterns)',
      readiness: 85,
      curriculum: [
        'Topological Sort & Kahn’s Algorithm for dependency resolution (Course Schedule I/II)',
        'Tree traversals: BFS level-order, DFS lowest common ancestor, diameter & boundary',
        'Dynamic Programming: Memoization & tabulation on 1D/2D grids and knapsack patterns',
        'Two pointers & Sliding Window: Longest substring without repeating characters, 3Sum',
      ],
      interviewFocus: 'Optimal Time/Space complexity analysis, clean code syntax, and edge-case testing',
      timeAllocation: 'Daily 45m problem solve + Weekend problem reviews',
    },
    system_design: {
      title: 'High-Level (HLD) & Low-Level (LLD) Distributed Architecture',
      readiness: 78,
      curriculum: [
        'Distributed Caching: Cache-Aside vs Write-Through, Thundering Herd prevention',
        'Database Sharding & Replication: Consistent hashing, read replicas, and ACID tradeoffs',
        'Rate Limiting & API Gateways: Token Bucket, Leaky Bucket algorithms, JWT authentication',
        'Microservices Async Message Queues: Kafka / RabbitMQ event-driven streaming',
      ],
      interviewFocus: 'Back-of-the-envelope calculations, fault tolerance, and single point of failure mitigation',
      timeAllocation: 'Monday 1.0h Architecture Research + Saturday System Design deep dives',
    },
    flutter: {
      title: 'Flutter Architecture & Production Framework Depth',
      readiness: 90,
      curriculum: [
        'State Management: Riverpod 2.0 with code generation (@riverpod) and Bloc architecture',
        'Rendering Engine: Impeller migration, Skia comparison, and eliminating UI jank/frame drops',
        'Platform Channels: Native MethodChannel & EventChannel bindings with Swift and Kotlin',
        'Custom Painters: Custom RenderObjects, performance optimization, and memory profiling',
      ],
      interviewFocus: 'Building fluid 60/120fps enterprise mobile applications with clean separation of concerns',
      timeAllocation: 'Part of Monday 1.5h Tech Learning block + Product sprints',
    },
    react_native: {
      title: 'React Native New Architecture & Performance Engineering',
      readiness: 88,
      curriculum: [
        'Fabric Renderer: Direct C++ JSI (JavaScript Interface) invocations bypassing JSON bridge',
        'TurboModules: Lazy-loaded native modules written in modern C++ and Objective-C/Swift',
        'Reanimated 3 & Gesture Handler: Running animations strictly on UI thread at 120fps',
        'Hermes Engine: Bytecode pre-compilation, garbage collection profiling, and memory leaks',
      ],
      interviewFocus: 'Architecting high-scale cross-platform mobile apps matching 100% native responsiveness',
      timeAllocation: 'Weekend sprint integration + Delegatework mobile enhancements',
    },
    ios: {
      title: 'Native iOS Engineering with Swift 6 Concurrency',
      readiness: 86,
      curriculum: [
        'Swift 6 Concurrency: Data race safety, Actors, TaskGroups, @Sendable, and @MainActor',
        'SwiftUI Lifecycle: View builder mechanics, Observation framework (@Observable), and Combine',
        'Memory Profiling: ARC, retain cycles, Instruments time profiler, and Memory graph debugger',
        'Modern Architecture: Clean MVVM with Coordinator pattern and Dependency Injection',
      ],
      interviewFocus: 'Deep native iOS architecture knowledge expected in Senior / Staff iOS interviews',
      timeAllocation: 'Monday 1.5h Swift 6 study + Native app modules',
    },
    communication: {
      title: 'Senior Engineer Behavioral & STAR Communication Mastery',
      readiness: 80,
      curriculum: [
        'STAR Method: Situation, Task, Action, Result structured storytelling for technical wins',
        'Trade-off Articulation: Explaining why Solution A was picked over Solution B with data',
        'Conflict & Leadership: Handling disagreements on technical direction and mentoring juniors',
        'English Executive Fluency: Crisp, concise, professional spoken communication',
      ],
      interviewFocus: 'Passing Hiring Manager and Bar Raiser rounds at top-tier software companies',
      timeAllocation: '15m daily evening speaking drills + Weekly review',
    },
  };

  const activeComp = competencyDetails[selectedCategory] || competencyDetails.all;

  return (
    <div className="bg-[#120f06]/85 border border-amber-500/25 rounded-3xl p-5 sm:p-6 space-y-5 animate-in fade-in duration-300">
      {/* 1. HEADER & AI DRILL TRIGGER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-3.5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              Technical Career & Job Preparation Hub
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-950/50 text-amber-300 border border-amber-500/30 font-semibold">
              Overall Readiness: {activeComp.readiness}%
            </span>
          </div>
          <p className="text-xs text-zinc-300">
            Systematic technical mastery across DSA, System Design, Mobile (Flutter, RN, iOS), and Communication
          </p>
        </div>

        <button
          onClick={() =>
            onTriggerAI(
              selectedCategory === 'all' ? 'dsa' : selectedCategory,
              'job_prep'
            )
          }
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md shadow-amber-950/40 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate AI Interview Drill</span>
        </button>
      </div>

      {/* 2. COMPETENCY PILL NAVIGATOR */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
          Select Technical Competency Track
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
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
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  active
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-zinc-950/60 border-zinc-850 hover:border-amber-500/40 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      active ? 'bg-amber-400' : 'bg-zinc-700'
                    }`}
                  />
                </div>
                <h5 className="text-xs font-bold text-zinc-100 truncate">{c.label}</h5>
                <p className="text-[9px] text-zinc-500 font-mono truncate mt-0.5">{c.badge}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE COMPETENCY DRILL & CURRICULUM */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-850 pb-2.5">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-white font-mono">{activeComp.title}</h4>
            <p className="text-xs text-amber-300 font-medium">
              Target Scope: {activeComp.interviewFocus}
            </p>
          </div>

          <div className="text-right text-xs font-mono">
            <span className="text-amber-400 font-bold">{activeComp.readiness}% Readiness</span>
            <span className="block text-[11px] text-zinc-500">{activeComp.timeAllocation}</span>
          </div>
        </div>

        {/* Curriculum Checkpoints */}
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
            Core Technical Knowledge & Interview Expectations
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {activeComp.curriculum.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. WEEKLY TIME-BLOCKING FOR JOB PREP */}
      <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-850 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
            Weekly Technical Study Protocol
          </span>
          <span className="text-[10px] font-mono text-amber-400">Integrated into 40h Schedule</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
            <div className="font-mono text-[11px] text-amber-400 font-bold">Monday Block (1.5h)</div>
            <div className="text-zinc-200 font-semibold">Flutter & SwiftUI Architecture</div>
            <p className="text-[11px] text-zinc-400">Deep study of concurrency, actors, and state management.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
            <div className="font-mono text-[11px] text-amber-400 font-bold">Daily Routine (45m)</div>
            <div className="text-zinc-200 font-semibold">LeetCode Blind 75 Drill</div>
            <p className="text-[11px] text-zinc-400">Solve 1 Medium/Hard problem with out-loud STAR explanation.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
            <div className="font-mono text-[11px] text-amber-400 font-bold">Sunday Rotation (Week 2)</div>
            <div className="text-zinc-200 font-semibold">DelegatePrep 11h Sprint</div>
            <p className="text-[11px] text-zinc-400">Full-day deep product sprint building interview prep simulations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
