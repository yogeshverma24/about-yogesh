// src/components/today/PersonalWorkspace.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  User,
  Sparkles,
  Droplets,
  Flame,
  Moon,
  Sun,
  Wallet,
  CheckCircle2,
  Search,
  Plus,
  ArrowRight,
  Target,
  TrendingUp,
  ShieldCheck,
  RotateCw,
} from 'lucide-react';
import {
  TodayDashboardState,
  Timeframe,
  TaskItem,
  ChecklistItem,
  PersonalProfile,
  FinancialRecord,
  HabitItem,
  MilestoneItem,
} from '@/lib/today/types';
import { TaskItemCard } from './TaskItemCard';
import { PersonalView } from './PersonalView';

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
  onToggleHabit: (id: string, date: string) => void;
  onAddFinance: (record: Partial<FinancialRecord>) => void;
  onDeleteFinance: (id: string) => void;
  onUpdateMilestone: (id: string, progress: number) => void;
  onTriggerAI: (topic: string, actionType: string) => void;
}

export function PersonalWorkspace({
  state,
  currentTimeframe,
  onSelectTimeframe,
  timeframeCounts,
  onToggleTaskComplete,
  onUpdateSubtasks,
  onDeleteTask,
  onCreateTask,
  onUpdateProfile,
  onToggleHabit,
  onAddFinance,
  onDeleteFinance,
  onUpdateMilestone,
  onTriggerAI,
}: Props) {
  const [activeTab, setActiveTab] = useState<'workspace' | 'hub'>('workspace');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickTaskTitle, setQuickTaskTitle] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Personal', desc: 'Holistic lifestyle, habits & wealth' },
    { id: 'info', label: 'Daily Routine & Bio', desc: 'Hydration, mobility & night review' },
    { id: 'finance', label: 'Wealth Plan & SIP', desc: '₹50,000/mo SIP & Emergency fund' },
    { id: 'goals', label: 'Health, Gym & Reading', desc: '4x Gym, 8 glasses water, 20p reading' },
  ];

  // Filter Tasks
  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
      if (task.mode !== 'personal') return false;
      if (task.timeframe !== currentTimeframe) return false;

      if (selectedCategory !== 'all' && task.category !== selectedCategory) {
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
  }, [state.tasks, currentTimeframe, selectedCategory, statusFilter, searchQuery]);

  // Counts for Category Pills
  const categoryTaskCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    state.tasks
      .filter((t) => t.mode === 'personal' && t.timeframe === currentTimeframe)
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
      mode: 'personal',
      timeframe: currentTimeframe,
      priority: 'high',
      category: selectedCategory === 'all' ? 'info' : selectedCategory,
    });
  };

  // Wealth Totals
  const totalIncome = state.finances
    .filter((f) => f.type === 'income')
    .reduce((sum, f) => sum + f.amount, 0);
  const totalExpense = state.finances
    .filter((f) => f.type === 'expense')
    .reduce((sum, f) => sum + f.amount, 0);
  const totalInvestment = state.finances
    .filter((f) => f.type === 'investment')
    .reduce((sum, f) => sum + f.amount, 0);
  const netSavings = totalIncome - totalExpense;

  return (
    <div className="space-y-4">
      {/* 1. EXECUTIVE HEADER & PROTOCOL DIRECTIVE */}
      <div className="bg-[#080d0a]/90 border border-emerald-500/20 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/15 pb-3.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-400" />
                Personal Lifestyle & Wealth Workspace
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-950/70 text-emerald-300 border border-emerald-500/30 font-semibold">
                Habit Streak: {state.profile.currentStreak || 14} Days
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800">
                Monthly SIP: ₹50,000
              </span>
            </div>
            <p className="text-xs text-zinc-300">
              Daily bio-rhythm protocols, health habits, reading, and systematic wealth building
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* View switcher */}
            <div className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setActiveTab('workspace')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'workspace'
                    ? 'bg-emerald-400 text-zinc-950 shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Action Stream
              </button>
              <button
                onClick={() => setActiveTab('hub')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'hub'
                    ? 'bg-emerald-400 text-zinc-950 shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Finances & Habits Hub
              </button>
            </div>
          </div>
        </div>

        {/* 2. DAILY PROTOCOL TIMELINE STRIP (MORNING, EVENING, NIGHT) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <span>Daily Protocol Cadence</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400">
              Water: {state.profile.waterIntakeGlasses || 4}/8 Glasses
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* Phase 1: Morning */}
            <div className="p-3 rounded-2xl bg-zinc-950/70 border border-emerald-500/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-emerald-300 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-emerald-400" />
                  <span>07:00 AM Morning</span>
                </span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    state.profile.morningRoutineCompleted
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {state.profile.morningRoutineCompleted ? 'COMPLETED' : 'PENDING'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-300">
                500ml water + electrolytes, 15m mobility stretch, lock in top 3 priorities.
              </p>
            </div>

            {/* Phase 2: Evening Transition */}
            <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-850 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-sky-300 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-sky-400" />
                  <span>06:30 PM Reset</span>
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                  TRANSITION
                </span>
              </div>
              <p className="text-[11px] text-zinc-300">
                Wind down from day job, nutritious dinner, mental clarity reset for 7:30 PM founder block.
              </p>
            </div>

            {/* Phase 3: Night Protocol */}
            <div className="p-3 rounded-2xl bg-zinc-950/70 border border-emerald-500/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-emerald-300 flex items-center gap-1">
                  <Moon className="w-3.5 h-3.5 text-emerald-400" />
                  <span>11:00 PM Night</span>
                </span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                    state.profile.nightReviewCompleted
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {state.profile.nightReviewCompleted ? 'COMPLETED' : 'PENDING'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-300">
                Review day wins, set tomorrow priorities, 20p reading, 7.5h sleep protocol.
              </p>
            </div>
          </div>
        </div>

        {/* 3. ACTIVE REMINDER & WEALTH BANNER */}
        <div className="p-3.5 rounded-2xl bg-zinc-950/75 border border-emerald-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono font-bold text-emerald-300 uppercase tracking-wide">
                Daily Focus: Bio-Routine & Wealth Compounding
              </span>
            </div>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              Maintain high physical energy for full-time work and evening founder sprints: 8 glasses water, clean diet, 4x weekly gym, and automated ₹50k monthly index SIP.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300">
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              <span>Water:</span>
              <button
                onClick={() =>
                  state.profile.waterIntakeGlasses > 0 &&
                  onUpdateProfile({ waterIntakeGlasses: state.profile.waterIntakeGlasses - 1 })
                }
                className="w-5 h-5 rounded bg-zinc-800 text-white font-bold"
              >
                -
              </button>
              <strong className="text-white font-bold">{state.profile.waterIntakeGlasses || 4}/8</strong>
              <button
                onClick={() =>
                  onUpdateProfile({ waterIntakeGlasses: (state.profile.waterIntakeGlasses || 0) + 1 })
                }
                className="w-5 h-5 rounded bg-emerald-500 text-zinc-950 font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* 4. CATEGORY SELECTOR PILLS */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Filter By Personal Dimension</span>
            <span className="text-emerald-400 font-bold">14-Day Consistency Streak</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              const count =
                cat.id === 'all'
                  ? state.tasks.filter((t) => t.mode === 'personal' && t.timeframe === currentTimeframe).length
                  : categoryTaskCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-emerald-400 text-zinc-950 font-bold shadow-md shadow-emerald-950/40'
                      : 'bg-zinc-950/70 border border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span>{cat.label}</span>
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
              {selectedCategory === 'finance' && '💰 Wealth Focus: ₹50,000 / mo Mutual Fund SIP • ₹6,00,000 Liquid Emergency Reserve'}
              {selectedCategory === 'goals' && '🏋️ Health Focus: 4x/week Strength Gym • 20 Pages Data-Intensive Applications • 7.5h Sleep'}
              {selectedCategory === 'info' && '🌅 Protocol Focus: 500ml Hydration & Electrolytes • 15m Mobility • Night Review Protocol'}
              {selectedCategory === 'all' && '🌿 Holistic Mastery: Health, Habits, Wealth Building, and Mindset'}
            </span>
            <span className="text-emerald-400 font-bold hidden sm:inline">Habits & Wealth</span>
          </div>
        </div>
      </div>

      {/* 2. BODY CONTENT: WORKSPACE STREAM OR FULL FINANCIAL HUB */}
      {activeTab === 'hub' ? (
        <PersonalView
          profile={state.profile}
          habits={state.habits}
          finances={state.finances}
          milestones={state.milestones}
          onUpdateProfile={onUpdateProfile}
          onToggleHabit={onToggleHabit}
          onAddFinance={onAddFinance}
          onDeleteFinance={onDeleteFinance}
          onUpdateMilestone={onUpdateMilestone}
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
                placeholder={`+ Add a personal task for ${currentTimeframe === 'today' ? 'Today' : currentTimeframe}... [Press Enter]`}
                value={quickTaskTitle}
                onChange={(e) => setQuickTaskTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/70 border border-emerald-500/20 text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-all shadow-inner"
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
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-xs font-semibold text-zinc-300">All clear in personal tasks</h4>
                <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                  Type a task title above and press enter to add it instantly to {selectedCategory === 'all' ? 'personal routines' : selectedCategory}.
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
            {/* 1. DAILY PROTOCOL CHECKLIST */}
            <div className="p-4 rounded-2xl bg-[#080d0a]/90 border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>Daily Protocol</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-current text-emerald-400" />
                  <span>{state.profile.currentStreak || 14}d streak</span>
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <label
                  onClick={() =>
                    onUpdateProfile({
                      morningRoutineCompleted: !state.profile.morningRoutineCompleted,
                    })
                  }
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-850 cursor-pointer hover:border-emerald-500/40 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={state.profile.morningRoutineCompleted}
                    readOnly
                    className="mt-0.5 rounded border-zinc-700 text-emerald-400 focus:ring-0"
                  />
                  <div>
                    <span className="font-semibold text-zinc-100 block">Morning Protocol</span>
                    <span className="text-[11px] text-zinc-400">500ml water, 15m mobility, review top 3 goals</span>
                  </div>
                </label>

                <label
                  onClick={() =>
                    onUpdateProfile({
                      nightReviewCompleted: !state.profile.nightReviewCompleted,
                    })
                  }
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-850 cursor-pointer hover:border-emerald-500/40 transition-all"
                >
                  <input
                    type="checkbox"
                    checked={state.profile.nightReviewCompleted}
                    readOnly
                    className="mt-0.5 rounded border-zinc-700 text-emerald-400 focus:ring-0"
                  />
                  <div>
                    <span className="font-semibold text-zinc-100 block">Night Review Protocol</span>
                    <span className="text-[11px] text-zinc-400">Review day wins, set tomorrow priorities, 20p reading</span>
                  </div>
                </label>
              </div>
            </div>

            {/* 2. WEALTH & INVESTMENT SNAPSHOT */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Wealth & SIP Status</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850">
                  <span className="text-[10px] font-mono text-zinc-400 block">Monthly SIP</span>
                  <span className="text-sm font-bold text-white font-mono">₹50,000</span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">5th of month</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850">
                  <span className="text-[10px] font-mono text-zinc-400 block">Emergency Target</span>
                  <span className="text-sm font-bold text-white font-mono">₹6,00,000</span>
                  <span className="text-[10px] text-zinc-400 block mt-0.5">6mo living cushion</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850 text-xs space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-zinc-400">Total Recorded Income</span>
                  <span className="text-white font-mono font-semibold">₹{totalIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-zinc-400">Total Recorded Expenses</span>
                  <span className="text-zinc-400 font-mono">₹{totalExpense.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1 border-t border-zinc-800">
                  <span className="text-emerald-400 font-medium">Net Savings / Surplus</span>
                  <span className="text-emerald-300 font-mono font-bold">₹{netSavings.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('hub')}
                className="w-full py-1.5 text-xs text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1 font-medium"
              >
                <span>Open Full Financial Ledger</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

