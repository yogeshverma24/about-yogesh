// src/components/today/OverviewDashboard.tsx
'use client';

import React, { useMemo } from 'react';
import {
  TodayDashboardState,
  DashboardMode,
  TaskItem,
  TaskStatus,
  ChecklistItem,
  PersonalProfile,
} from '@/lib/today/types';
import {
  Sparkles,
  Flame,
  CheckCircle2,
  Circle,
  Clock,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Zap,
  TrendingUp,
  Activity,
  Layers,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  User,
  CheckSquare,
  BarChart2,
  Calendar,
} from 'lucide-react';
import { playChime } from '@/lib/today/sound';

interface Props {
  state: TodayDashboardState;
  onSelectMode: (mode: DashboardMode) => void;
  onToggleTaskComplete: (taskId: string, currentStatus: TaskStatus) => void;
  onUpdateSubtasks: (taskId: string, subtasks: ChecklistItem[]) => void;
  onTriggerAI: (topicOrProduct: string, actionType: string) => void;
  onUpdateProfile: (updates: Partial<PersonalProfile>) => void;
  onOpenTaskModal: () => void;
}

export function OverviewDashboard({
  state,
  onSelectMode,
  onToggleTaskComplete,
  onUpdateSubtasks,
  onTriggerAI,
  onUpdateProfile,
  onOpenTaskModal,
}: Props) {
  // 1. Time-aware Greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // 2. Metrics across Modes
  const metrics = useMemo(() => {
    const all = state.tasks || [];
    const total = all.length;
    const completed = all.filter((t) => t.status === 'completed').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const todayTasks = all.filter((t) => t.timeframe === 'today');
    const todayTotal = todayTasks.length;
    const todayCompleted = todayTasks.filter((t) => t.status === 'completed').length;
    const todayRate = todayTotal > 0 ? Math.round((todayCompleted / todayTotal) * 100) : 0;

    // Per mode
    const personalTasks = all.filter((t) => t.mode === 'personal');
    const personalDone = personalTasks.filter((t) => t.status === 'completed').length;
    const personalRate = personalTasks.length > 0 ? Math.round((personalDone / personalTasks.length) * 100) : 0;

    const businessTasks = all.filter((t) => t.mode === 'business');
    const businessDone = businessTasks.filter((t) => t.status === 'completed').length;
    const businessRate = businessTasks.length > 0 ? Math.round((businessDone / businessTasks.length) * 100) : 0;

    const jobTasks = all.filter((t) => t.mode === 'job');
    const jobDone = jobTasks.filter((t) => t.status === 'completed').length;
    const jobRate = jobTasks.length > 0 ? Math.round((jobDone / jobTasks.length) * 100) : 0;

    // Timeframe Distribution
    const weekCount = all.filter((t) => t.timeframe === 'week').length;
    const monthCount = all.filter((t) => t.timeframe === 'month').length;
    const sixMonthsCount = all.filter((t) => t.timeframe === 'six_months').length;

    // Composite momentum score (0 - 100)
    const habitScore = state.profile.morningRoutineCompleted ? 95 : 85;
    const compositeScore = Math.min(
      100,
      Math.round(completionRate * 0.4 + habitScore * 0.35 + 85 * 0.25)
    );

    return {
      total,
      completed,
      completionRate,
      todayTasks,
      todayTotal,
      todayCompleted,
      todayRate,
      personalTasks,
      personalDone,
      personalRate,
      businessTasks,
      businessDone,
      businessRate,
      jobTasks,
      jobDone,
      jobRate,
      weekCount,
      monthCount,
      sixMonthsCount,
      compositeScore,
    };
  }, [state.tasks, state.profile]);

  // 3. Weekly Activity Curve Data (Mon to Sun)
  const weeklyData = [
    { day: 'Mon', count: 6, score: 75 },
    { day: 'Tue', count: 8, score: 88 },
    { day: 'Wed', count: 7, score: 80 },
    { day: 'Thu', count: 9, score: 92 },
    { day: 'Fri', count: Math.max(metrics.todayCompleted, 7), score: metrics.todayRate || 85 },
    { day: 'Sat', count: 5, score: 65 },
    { day: 'Sun', count: 6, score: 70 },
  ];

  // SVG Chart Dimensions for the 7-day sparkline
  const chartWidth = 500;
  const chartHeight = 120;
  const paddingX = 35;
  const paddingY = 20;

  const points = weeklyData.map((d, i) => {
    const x = paddingX + (i / (weeklyData.length - 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (d.score / 100) * (chartHeight - paddingY * 2);
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, p, i, arr) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = arr[i - 1];
    const cx1 = prev.x + (p.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (p.x - prev.x) / 2;
    const cy2 = p.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - 8} L ${points[0].x} ${chartHeight - 8} Z`;

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* 1. EXECUTIVE BANNER & HIGH-LEVEL BRIEFING */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 via-[#0e0e1e] to-zinc-900 border border-indigo-500/20 p-5 sm:p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-widest font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Executive Overview
              </span>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>{state.profile.currentStreak || 14}-Day Streak</span>
              </div>
              <span className="text-[11px] text-zinc-400">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {greeting}, {state.profile.name || 'Yogesh'}.
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              &ldquo;{state.profile.dailyFocusStatement}&rdquo;
            </p>
          </div>

          {/* Quick AI Executive Briefing */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                playChime('click');
                onTriggerAI('overall', 'daily_review');
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-500 hover:bg-indigo-400 text-zinc-950 shadow-md shadow-indigo-950/40 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Executive Briefing</span>
            </button>

            <button
              onClick={onOpenTaskModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-850 hover:bg-zinc-800 text-zinc-200 border border-zinc-750 transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Quick Action</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. TOP 4 EXECUTIVE KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* KPI 1: Overall Execution Rate */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-indigo-500/15 hover:border-indigo-500/30 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400">
              Total Velocity
            </span>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold text-white tracking-tight">
                {metrics.completionRate}%
              </span>
              <span className="text-xs text-zinc-400 ml-1.5 font-mono">
                ({metrics.completed}/{metrics.total} Done)
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              +{metrics.todayCompleted} today
            </span>
          </div>
          <div className="mt-3 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${metrics.completionRate}%` }}
            />
          </div>
        </div>

        {/* KPI 2: Personal & Wealth Mastery */}
        <div
          onClick={() => onSelectMode('personal')}
          className="p-4 rounded-2xl bg-zinc-900/60 border border-emerald-500/15 hover:border-emerald-500/35 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <User className="w-3 h-3" />
              Personal & Wealth
            </span>
            <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">
                ₹50,000
              </span>
              <span className="text-xs text-emerald-400 font-mono">/ mo SIP</span>
            </div>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                {state.profile.morningRoutineCompleted ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Circle className="w-3 h-3 text-zinc-500" />
                )}
                Morning Routine
              </span>
              <span>•</span>
              <span>{state.profile.waterIntakeGlasses}/8 Glasses</span>
            </div>
          </div>
          <div className="mt-3 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${metrics.personalRate}%` }}
            />
          </div>
        </div>

        {/* KPI 3: Business Ventures Health */}
        <div
          onClick={() => onSelectMode('business')}
          className="p-4 rounded-2xl bg-zinc-900/60 border border-sky-500/15 hover:border-sky-500/35 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              Business Ecosystem
            </span>
            <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">
                4 Ventures
              </span>
              <span className="text-xs text-sky-400 font-mono">
                {metrics.businessRate}% Active
              </span>
            </div>
            <div className="mt-1 text-[11px] text-zinc-400 truncate">
              Delegatework • Fasly • Campus • Studio
            </div>
          </div>
          <div className="mt-3 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-sky-400 rounded-full transition-all duration-500"
              style={{ width: `${metrics.businessRate}%` }}
            />
          </div>
        </div>

        {/* KPI 4: Technical Job Preparation */}
        <div
          onClick={() => onSelectMode('job')}
          className="p-4 rounded-2xl bg-zinc-900/60 border border-amber-500/15 hover:border-amber-500/35 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              Job Preparation
            </span>
            <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white tracking-tight">
                84%
              </span>
              <span className="text-xs text-amber-400 font-mono">Senior SWE</span>
            </div>
            <div className="mt-1 text-[11px] text-zinc-400">
              DSA • System Design • Mobile • STAR
            </div>
          </div>
          <div className="mt-3 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${metrics.jobRate}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. CLASSIC ANALYTICS & VISUAL GRAPHS (2-COLUMN GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* GRAPH 1: CROSS-PILLAR EXECUTION VELOCITY (7 COLS) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
                Cross-Pillar Execution Velocity
              </h3>
              <p className="text-[11px] text-zinc-500">
                Completed vs pending deliverables across Personal, Business, and Job Prep
              </p>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300">
              Active Sprint
            </span>
          </div>

          {/* Classic Multi-Column SVG / Bar Visualization */}
          <div className="pt-2 pb-1 space-y-3.5">
            {/* Pillar 1: Personal */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="font-medium text-zinc-200">Personal & Lifestyle</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold">{metrics.personalRate}%</span>
                  <span className="text-zinc-500">
                    ({metrics.personalDone}/{metrics.personalTasks.length} tasks)
                  </span>
                </div>
              </div>
              <div className="h-3 w-full bg-zinc-850 rounded-full overflow-hidden p-0.5 flex">
                <div
                  className="h-full bg-emerald-400 rounded-full transition-all duration-500 shadow-sm shadow-emerald-500/30"
                  style={{ width: `${metrics.personalRate}%` }}
                />
              </div>
            </div>

            {/* Pillar 2: Business */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span className="font-medium text-zinc-200">Business Ecosystem</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-sky-400 font-bold">{metrics.businessRate}%</span>
                  <span className="text-zinc-500">
                    ({metrics.businessDone}/{metrics.businessTasks.length} tasks)
                  </span>
                </div>
              </div>
              <div className="h-3 w-full bg-zinc-850 rounded-full overflow-hidden p-0.5 flex">
                <div
                  className="h-full bg-sky-400 rounded-full transition-all duration-500 shadow-sm shadow-sky-500/30"
                  style={{ width: `${metrics.businessRate}%` }}
                />
              </div>
            </div>

            {/* Pillar 3: Job Prep */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="font-medium text-zinc-200">Job Preparation & Depth</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="text-amber-400 font-bold">{metrics.jobRate}%</span>
                  <span className="text-zinc-500">
                    ({metrics.jobDone}/{metrics.jobTasks.length} tasks)
                  </span>
                </div>
              </div>
              <div className="h-3 w-full bg-zinc-850 rounded-full overflow-hidden p-0.5 flex">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500 shadow-sm shadow-amber-500/30"
                  style={{ width: `${metrics.jobRate}%` }}
                />
              </div>
            </div>
          </div>

          {/* Time Horizon Segment Distribution */}
          <div className="pt-2 border-t border-zinc-800/80">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
              <span>Timeframe Horizon Distribution</span>
              <span className="text-zinc-500">Total: {metrics.total} items</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="text-xs font-bold text-white font-mono">{metrics.todayTotal}</div>
                <div className="text-[10px] text-zinc-400">Today</div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="text-xs font-bold text-white font-mono">{metrics.weekCount}</div>
                <div className="text-[10px] text-zinc-400">This Week</div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="text-xs font-bold text-white font-mono">{metrics.monthCount}</div>
                <div className="text-[10px] text-zinc-400">This Month</div>
              </div>
              <div className="p-2 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
                <div className="text-xs font-bold text-white font-mono">{metrics.sixMonthsCount}</div>
                <div className="text-[10px] text-zinc-400">6 Months</div>
              </div>
            </div>
          </div>
        </div>

        {/* GRAPH 2: 7-DAY CONSISTENCY & FOCUS CURVE (5 COLS) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                7-Day Momentum Wave
              </h3>
              <span className="text-[11px] font-mono text-emerald-400">
                {state.profile.currentStreak || 14}d Streak
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Daily habit execution and output flow
            </p>
          </div>

          {/* SVG Smooth Flow Sparkline */}
          <div className="py-2">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-28 overflow-visible"
            >
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line
                x1={paddingX}
                y1={chartHeight - paddingY}
                x2={chartWidth - paddingX}
                y2={chartHeight - paddingY}
                stroke="#27272a"
                strokeWidth="1"
              />
              <line
                x1={paddingX}
                y1={paddingY}
                x2={chartWidth - paddingX}
                y2={paddingY}
                stroke="#27272a"
                strokeDasharray="2 3"
                strokeWidth="1"
              />

              {/* Gradient Area */}
              <path d={areaD} fill="url(#curveGradient)" />

              {/* Curve Stroke */}
              <path
                d={pathD}
                fill="none"
                stroke="#818cf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {points.map((p, i) => (
                <g key={i}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="4"
                    className="fill-zinc-950 stroke-indigo-400 stroke-2"
                  />
                  <text
                    x={p.x}
                    y={chartHeight - 4}
                    textAnchor="middle"
                    className="text-[10px] font-mono fill-zinc-500"
                  >
                    {p.day}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Peak Focus Energy</span>
            <span className="font-mono font-semibold text-emerald-400 capitalize">
              {state.profile.energyLevel || 'High'} Velocity
            </span>
          </div>
        </div>
      </div>

      {/* 4. MULTI-PILLAR DEEP-DIVE CARDS (3 COLUMNS) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* PILLAR 1: PERSONAL MASTERY */}
        <div className="p-5 rounded-2xl bg-zinc-900/50 border border-emerald-500/20 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Personal & Wealth
                </h4>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                {metrics.personalDone}/{metrics.personalTasks.length} Done
              </span>
            </div>

            {/* Financial Ledger Mini-Card */}
            <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-850 space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                Monthly Net Wealth Engine
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold text-white font-mono">₹1,80,000 / mo</span>
                <span className="text-[11px] text-emerald-400 font-mono font-semibold">
                  35% Savings
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 pt-1 border-t border-zinc-800/50 flex justify-between">
                <span>Index SIP: ₹50,000</span>
                <span>Living: ₹45,000</span>
              </div>
            </div>

            {/* Habit Streak Badges */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                Active Habit Streaks
              </div>
              <div className="flex flex-wrap gap-1.5">
                {state.habits.slice(0, 4).map((h) => (
                  <span
                    key={h.id}
                    className="px-2 py-1 rounded-lg text-[10px] font-mono bg-emerald-950/40 text-emerald-300 border border-emerald-500/25 flex items-center gap-1"
                  >
                    <Flame className="w-3 h-3 fill-current text-emerald-400" />
                    {h.title}: {h.streak}d
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectMode('personal')}
            className="w-full mt-2 py-2 px-3 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Open Personal Execution Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PILLAR 2: BUSINESS ECOSYSTEM */}
        <div className="p-5 rounded-2xl bg-zinc-900/50 border border-sky-500/20 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                  Business Ecosystem
                </h4>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                4 Ventures
              </span>
            </div>

            {/* 4 Products Matrix */}
            <div className="space-y-2">
              {[
                {
                  name: 'Delegatework',
                  focus: 'Teams App • SEO & LinkedIn',
                  url: 'https://delegatework.in/',
                },
                {
                  name: 'Fasly',
                  focus: 'Agriculture App • Advisory & Facebook',
                  url: 'https://fasly.in/',
                },
                {
                  name: 'Campus',
                  focus: 'Student Community • Jobs & Instagram',
                  url: 'https://delegatecampus.in/',
                },
                {
                  name: 'Delegatespace',
                  focus: 'Parent Studio • Client Engineering',
                  url: 'https://www.delegatespace.com/',
                },
              ].map((p) => (
                <div
                  key={p.name}
                  className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-850 flex items-center justify-between text-xs"
                >
                  <div className="truncate mr-2">
                    <span className="font-semibold text-zinc-200">{p.name}</span>
                    <span className="block text-[10px] text-zinc-400 truncate">{p.focus}</span>
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-md text-zinc-400 hover:text-sky-300 hover:bg-sky-500/10 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectMode('business')}
            className="w-full mt-2 py-2 px-3 rounded-xl text-xs font-semibold bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Open Business Marketing Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PILLAR 3: JOB PREPARATION */}
        <div className="p-5 rounded-2xl bg-zinc-900/50 border border-amber-500/20 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  Job Preparation
                </h4>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Tier-1 Senior Level
              </span>
            </div>

            {/* Competency Readiness Bars */}
            <div className="space-y-2.5">
              {[
                { title: 'DSA & LeetCode Patterns', progress: 85, metric: 'Blind 75 & Graphs' },
                { title: 'System Design (HLD/LLD)', progress: 78, metric: 'Distributed Caching' },
                { title: 'Mobile Dev (Flutter, RN, iOS)', progress: 92, metric: 'Production Depth' },
                { title: 'Communication & STAR', progress: 80, metric: 'Fluency & Articulation' },
              ].map((c) => (
                <div key={c.title} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-zinc-300 font-medium">{c.title}</span>
                    <span className="text-amber-400 font-mono font-semibold">{c.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-850 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onSelectMode('job')}
            className="w-full mt-2 py-2 px-3 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Open Job Preparation Hub</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 5. TODAY'S MULTI-MODE ACTION STREAM */}
      <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3.5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
              Today&apos;s Multi-Pillar Action Stream
            </h3>
            <p className="text-[11px] text-zinc-500">
              High-priority tasks scheduled for today across Personal, Business, and Job Prep
            </p>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            {metrics.todayCompleted} / {metrics.todayTotal} Completed
          </span>
        </div>

        {/* Task Cards */}
        {metrics.todayTasks.length === 0 ? (
          <div className="py-8 text-center text-zinc-500 text-xs">
            No active tasks scheduled for today. Click Quick Action above to add one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {metrics.todayTasks.map((task) => {
              const isCompleted = task.status === 'completed';
              const modeBadge =
                task.mode === 'personal'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : task.mode === 'business'
                  ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20';

              return (
                <div
                  key={task.id}
                  className={`p-3 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    isCompleted
                      ? 'bg-zinc-950/40 border-zinc-850 opacity-60'
                      : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <button
                      onClick={() => onToggleTaskComplete(task.id, task.status)}
                      className="mt-0.5 flex-shrink-0 text-zinc-400 hover:text-white transition-colors"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-zinc-500 hover:text-zinc-300" />
                      )}
                    </button>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-semibold border ${modeBadge}`}
                        >
                          {task.mode === 'job' ? 'Job Prep' : task.mode}
                        </span>
                        {task.priority === 'high' && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            High Priority
                          </span>
                        )}
                        {task.reminderTime && (
                          <span className="text-[10px] text-zinc-400 flex items-center gap-0.5 font-mono">
                            <Clock className="w-2.5 h-2.5" />
                            {task.reminderTime}
                          </span>
                        )}
                      </div>

                      <h4
                        className={`text-xs font-medium leading-snug truncate ${
                          isCompleted ? 'line-through text-zinc-500' : 'text-zinc-100'
                        }`}
                      >
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-[11px] text-zinc-400 line-clamp-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {task.externalLink && (
                    <a
                      href={task.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-zinc-500 hover:text-white transition-colors flex-shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. STRATEGIC 6-MONTH MILESTONES OVERVIEW */}
      <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-3.5">
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5">
          <div className="space-y-0.5">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              6-Month Strategic Milestones
            </h3>
            <p className="text-[11px] text-zinc-500">
              Long-term horizons across personal wealth, business scale, and engineering leadership
            </p>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">Target: 2027</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {state.milestones
            .filter((m) => m.timeframe === 'six_months')
            .slice(0, 3)
            .map((m) => {
              const borderTheme =
                m.mode === 'personal'
                  ? 'border-emerald-500/20'
                  : m.mode === 'business'
                  ? 'border-sky-500/20'
                  : 'border-amber-500/20';
              const textTheme =
                m.mode === 'personal'
                  ? 'text-emerald-400'
                  : m.mode === 'business'
                  ? 'text-sky-400'
                  : 'text-amber-400';
              const barTheme =
                m.mode === 'personal'
                  ? 'bg-emerald-400'
                  : m.mode === 'business'
                  ? 'bg-sky-400'
                  : 'bg-amber-400';

              return (
                <div
                  key={m.id}
                  className={`p-3.5 rounded-xl bg-zinc-950/70 border ${borderTheme} space-y-2`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-zinc-200 line-clamp-1">
                      {m.title}
                    </span>
                    <span className={`text-xs font-mono font-bold ${textTheme}`}>
                      {m.progress}%
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">{m.metric}</div>
                  <div className="h-1.5 w-full bg-zinc-850 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${barTheme} rounded-full transition-all duration-500`}
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

