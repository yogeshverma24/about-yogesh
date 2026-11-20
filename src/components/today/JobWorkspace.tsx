// src/components/today/JobWorkspace.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Smartphone,
  Mic,
  Terminal,
  CheckCircle2,
  Search,
  Plus,
  ArrowRight,
  Target,
  TrendingUp,
  Clock,
  BookOpen,
} from 'lucide-react';
import {
  TodayDashboardState,
  Timeframe,
  TaskItem,
  ChecklistItem,
  PersonalProfile,
  MilestoneItem,
} from '@/lib/today/types';
import { TaskItemCard } from './TaskItemCard';
import { JobView } from './JobView';

interface Props {
  state: TodayDashboardState;
  currentTimeframe: Timeframe;
  onSelectTimeframe: (tf: Timeframe) => void;
  timeframeCounts: Record<Timeframe, { total: number; completed: number }>;
  onToggleTaskComplete: (id: string, currentStatus: string) => void;
  onUpdateSubtasks: (id: string, checklist: ChecklistItem[]) => void;
  onDeleteTask: (id: string) => void;
  onCreateTask: (task: Partial<TaskItem>) => Promise<void>;
  onUpdateProfile: (updates: Partial<PersonalProfile>) => void;
  onTriggerAI: (topic: string, actionType: string) => void;
}

export function JobWorkspace({
  state,
  currentTimeframe,
  onSelectTimeframe,
  timeframeCounts,
  onToggleTaskComplete,
  onUpdateSubtasks,
  onDeleteTask,
  onCreateTask,
  onUpdateProfile,
  onTriggerAI,
}: Props) {
  const [activeTab, setActiveTab] = useState<'workspace' | 'curriculum'>('workspace');
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickTaskTitle, setQuickTaskTitle] = useState<string>('');

  const tracks = [
    { id: 'all', label: 'All Tracks', badge: 'Full Stack & Mobile' },
    { id: 'dsa', label: 'DSA & LeetCode', badge: 'Blind 75 & Graphs' },
    { id: 'system_design', label: 'System Design', badge: 'HLD & Redis' },
    { id: 'flutter', label: 'Flutter', badge: 'Riverpod 2.0 & Impeller' },
    { id: 'react_native', label: 'React Native', badge: 'Fabric & JSI C++' },
    { id: 'ios', label: 'iOS (Swift 6)', badge: 'Concurrency & Actors' },
    { id: 'communication', label: 'Communication', badge: 'STAR & Fluency' },
  ];

  // Filter Tasks
  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
      if (task.mode !== 'job') return false;
      if (task.timeframe !== currentTimeframe) return false;

      if (selectedTrack !== 'all' && task.category !== selectedTrack) {
        return false;
      }

      if (statusFilter === 'pending' && task.status === 'completed') return false;
      if (statusFilter === 'completed' && task.status !== 'completed') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = task.title.toLowerCase().includes(q);
        const inDesc = task.description?.toLowerCase().includes(q);
        const inCategory = task.category.toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inCategory) return false;
      }

      return true;
    });
  }, [state.tasks, currentTimeframe, selectedTrack, statusFilter, searchQuery]);

  // Counts for Track Pills
  const trackTaskCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    state.tasks
      .filter((t) => t.mode === 'job' && t.timeframe === currentTimeframe)
      .forEach((t) => {
        counts[t.category] = (counts[t.category] || 0) + 1;
      });
    return counts;
  }, [state.tasks, currentTimeframe]);

  // Quick Add
  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTaskTitle.trim()) return;
    const title = quickTaskTitle.trim();
    setQuickTaskTitle('');
    await onCreateTask({
      title,
      mode: 'job',
      timeframe: currentTimeframe,
      priority: 'high',
      category: selectedTrack === 'all' ? 'dsa' : selectedTrack,
    });
  };

  const solvedCount = state.profile.leetCodeSolved || 72;

  const handleIncrementSolved = () => {
    onUpdateProfile({ leetCodeSolved: solvedCount + 1 });
  };

  return (
    <div className="space-y-4">
      {/* 1. EXECUTIVE HEADER & CADENCE DIRECTIVE */}
      <div className="bg-[#120f06]/90 border border-amber-500/25 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/15 pb-3.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                Technical Career & Job Preparation Workspace
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-950/70 text-amber-300 border border-amber-500/30 font-semibold">
                Readiness: 84% Tier-1 Ready
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800">
                {solvedCount}/100 LeetCode Solved
              </span>
            </div>
            <p className="text-xs text-zinc-300">
              Systematic mastery across DSA patterns, Distributed System Design, Mobile Architecture, and STAR Communication
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* View switcher */}
            <div className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setActiveTab('workspace')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'workspace'
                    ? 'bg-amber-400 text-zinc-950 shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Action Stream
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'curriculum'
                    ? 'bg-amber-400 text-zinc-950 shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                7 Competencies Hub
              </button>
            </div>

            <button
              onClick={() =>
                onTriggerAI(
                  selectedTrack === 'all' ? 'dsa' : selectedTrack,
                  'job_prep'
                )
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Generate AI Coach Drill</span>
            </button>
          </div>
        </div>

        {/* 2. WEEKLY TECHNICAL STUDY CADENCE RIBBON */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <span>Weekly Technical Study Cadence (Part of 39.5h Master Schedule)</span>
            </span>
            <span className="text-[11px] font-mono text-amber-400">
              Target: Senior Software Engineer Offer
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Monday Study Block */}
            <div className="p-3 rounded-2xl bg-zinc-950/70 border border-amber-500/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Monday (2.5h Tech Block)</span>
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300">
                  WEEKLY
                </span>
              </div>
              <p className="text-[11px] text-zinc-300">
                1.5h Flutter/SwiftUI & Native Mobile + 1.0h Distributed System Architecture & Caching research.
              </p>
            </div>

            {/* Daily LeetCode Drill */}
            <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-850 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Daily Problem Drill (45m)</span>
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                  DAILY
                </span>
              </div>
              <p className="text-[11px] text-zinc-300">
                Solve 1-2 LeetCode Medium/Hard problems focusing on Graphs, Trees, and Dynamic Programming.
              </p>
            </div>

            {/* Sunday DelegatePrep Sprint */}
            <div className="p-3 rounded-2xl bg-zinc-950/70 border border-amber-500/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sunday Sprint (Week 2 Rotation)</span>
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300">
                  11.0h SPRINT
                </span>
              </div>
              <p className="text-[11px] text-zinc-300">
                DelegatePrep end-to-end user journey development, mock technical interviews, and system design review.
              </p>
            </div>
          </div>
        </div>

        {/* 3. ACTIVE DRILL & READINESS BANNER */}
        <div className="p-3.5 rounded-2xl bg-zinc-950/75 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono font-bold text-amber-300 uppercase tracking-wide">
                Today&apos;s Technical Directive: High-Yield Problem Solving
              </span>
            </div>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              Focus on Topological Sort (Course Schedule II) and Cache-Aside System Design pattern with Redis TTL eviction.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 font-mono text-[11px]">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Solved:</span>
              <strong className="text-amber-300 font-bold">{solvedCount}/100</strong>
              <button
                onClick={handleIncrementSolved}
                className="px-2 py-0.5 rounded bg-amber-500 text-zinc-950 font-bold hover:bg-amber-400 transition-all text-xs"
                title="Mark +1 LeetCode Problem Solved"
              >
                +1 Solved
              </button>
            </div>
          </div>
        </div>

        {/* 4. TRACK SELECTOR PILLS */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Filter By Competency Track</span>
            <span className="text-amber-400 font-bold">84% Readiness</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {tracks.map((t) => {
              const active = selectedTrack === t.id;
              const count =
                t.id === 'all'
                  ? state.tasks.filter((task) => task.mode === 'job' && task.timeframe === currentTimeframe).length
                  : trackTaskCounts[t.id] || 0;

              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrack(t.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-950/40'
                      : 'bg-zinc-950/70 border border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span>{t.label}</span>
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                      active ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-zinc-400 pt-1 border-t border-zinc-850 flex items-center justify-between">
            <span>
              {selectedTrack === 'dsa' && '🧠 DSA Focus: Blind 75 • Graphs & Trees • Dynamic Programming • Two Pointers'}
              {selectedTrack === 'system_design' && '⚙️ System Design Focus: Distributed Caching (Redis) • DB Sharding • Message Queues • Microservices'}
              {selectedTrack === 'flutter' && '📱 Flutter Focus: Riverpod 2.0 Code-Gen • Bloc Architecture • Impeller Engine • Custom Painters'}
              {selectedTrack === 'react_native' && '⚡ React Native Focus: Fabric Renderer • TurboModules C++ JSI • Reanimated 3 • 120fps UI Thread'}
              {selectedTrack === 'ios' && '🍎 iOS Native Focus: Swift 6 Concurrency • Actors • @Sendable • @MainActor • Observation'}
              {selectedTrack === 'communication' && '🎙️ Communication Focus: STAR Method Storytelling • Technical Trade-off Articulation • English Fluency'}
              {selectedTrack === 'all' && '🏆 Target: Tier-1 Senior Software Engineer / Lead Mobile Architect Offer'}
            </span>
            <span className="text-amber-400 font-bold hidden sm:inline">84% Readiness</span>
          </div>
        </div>
      </div>

      {/* 2. BODY CONTENT: WORKSPACE STREAM OR FULL CURRICULUM HUB */}
      {activeTab === 'curriculum' ? (
        <JobView
          milestones={state.milestones}
          selectedCategory={selectedTrack}
          onSelectCategory={setSelectedTrack}
          onTriggerAI={onTriggerAI}
        />
      ) : (
        /* BALANCED 2-COLUMN WORKSPACE: TASKS (LEFT 65%) + EXECUTIVE CONTEXT SIDEBAR (RIGHT 35%) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* LEFT COLUMN: ACTIONABLE TASKS (8 COLS) */}
          <div className="lg:col-span-8 space-y-3">
            {/* Quick Inline Add Form */}
            <form onSubmit={handleQuickAdd} className="relative">
              <input
                type="text"
                placeholder={`+ Add a prep task for ${currentTimeframe === 'today' ? 'Today' : currentTimeframe}... [Press Enter]`}
                value={quickTaskTitle}
                onChange={(e) => setQuickTaskTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/70 border border-amber-500/20 text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-all shadow-inner"
              />
            </form>

            {/* Filter Bar (Status & Search) */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-1 text-xs">
                {(['all', 'pending', 'completed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-lg capitalize text-[11px] font-medium transition-all ${
                      statusFilter === st
                        ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 font-bold'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-7 pr-2.5 py-1 text-xs rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none w-36 sm:w-48"
                />
              </div>
            </div>

            {/* Task Item Cards */}
            {filteredTasks.length === 0 ? (
              <div className="py-12 text-center rounded-2xl border border-dashed border-zinc-850 bg-zinc-900/20 space-y-2">
                <div className="w-8 h-8 mx-auto rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-600">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                </div>
                <h4 className="text-xs font-semibold text-zinc-300">All clear in job prep tasks</h4>
                <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                  Type a task title above and press enter to add it instantly to {selectedTrack === 'all' ? 'DSA or System Design' : selectedTrack}.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredTasks.map((task) => (
                  <TaskItemCard
                    key={task.id}
                    task={task}
                    onToggleComplete={onToggleTaskComplete}
                    onUpdateSubtasks={onUpdateSubtasks}
                    onDelete={onDeleteTask}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: EXECUTIVE CONTEXT SIDEBAR (4 COLS) */}
          <div className="lg:col-span-4 space-y-3.5">
            {/* 1. COMPETENCY READINESS PROGRESS BARS */}
            <div className="p-4 rounded-2xl bg-[#120f06]/90 border border-amber-500/25 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                <span className="text-[11px] font-mono font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>Technical Readiness</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/70 text-amber-300 border border-amber-500/30 font-semibold">
                  84% Overall
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  { title: 'DSA & LeetCode Patterns', progress: 85 },
                  { title: 'Distributed System Design', progress: 78 },
                  { title: 'Mobile Dev (Flutter, RN, iOS)', progress: 92 },
                  { title: 'STAR Behavioral Communication', progress: 80 },
                ].map((comp) => (
                  <div key={comp.title} className="space-y-1 text-xs">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-300">{comp.title}</span>
                      <span className="text-amber-400 font-mono font-semibold">{comp.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-850 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${comp.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. NEXT STUDY MILESTONE */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850 space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                Next Study Milestone
              </span>
              <div className="text-xs text-zinc-200 font-semibold">
                Monday Tech Learning (1.5h Flutter / SwiftUI & Swift 6 Concurrency)
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug">
                Audit Course Schedule II, Shortest Path in Binary Matrix, and Cache-Aside pattern.
              </p>
            </div>

            {/* 3. AI DRILL LAUNCHER */}
            <button
              onClick={() => onTriggerAI(selectedTrack === 'all' ? 'dsa' : selectedTrack, 'job_prep')}
              className="w-full py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-zinc-950" />
              <span>Launch Interactive AI Mock Drill</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

