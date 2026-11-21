// src/components/today/BusinessWorkspace.tsx
'use client';

import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  Sparkles,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  CheckCircle2,
  CheckSquare,
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  Layers,
  Globe,
  Share2,
  Users,
  Compass,
  RotateCw,
  ExternalLink,
} from 'lucide-react';
import {
  TodayDashboardState,
  Timeframe,
  TaskItem,
  ChecklistItem,
  FounderChecklistItem,
} from '@/lib/today/types';
import { TaskItemCard } from './TaskItemCard';
import { BusinessView } from './BusinessView';
import { MASTER_WEEKLY_SCHEDULE, PRODUCT_ROTATION_WEEKS } from '@/lib/today/scheduleData';
import { OperatingHubId } from '@/lib/today/hubData';

interface Props {
  state: TodayDashboardState;
  currentTimeframe: Timeframe;
  onSelectTimeframe: (tf: Timeframe) => void;
  timeframeCounts: Record<Timeframe, { total: number; completed: number }>;
  onToggleTaskComplete: (id: string, currentStatus: string) => void;
  onUpdateSubtasks: (id: string, checklist: ChecklistItem[]) => void;
  onDeleteTask: (id: string) => void;
  onCreateTask: (task: Partial<TaskItem>) => Promise<void>;
  onTriggerAI: (product: string, actionType: string) => void;
  onUpdateSchedule: (updates: {
    founderChecklist?: FounderChecklistItem[];
    activeRotationWeek?: number;
    weeklyHoursLogged?: number;
  }) => void;
  onOpenHub?: (hubId: OperatingHubId) => void;
}

export function BusinessWorkspace({
  state,
  currentTimeframe,
  onSelectTimeframe,
  timeframeCounts,
  onToggleTaskComplete,
  onUpdateSubtasks,
  onDeleteTask,
  onCreateTask,
  onTriggerAI,
  onUpdateSchedule,
  onOpenHub,
}: Props) {
  // Navigation & Filter State
  const [activeTab, setActiveTab] = useState<'workspace' | 'strategy'>('workspace');
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickTaskTitle, setQuickTaskTitle] = useState<string>('');

  // Day of week index (0 = Monday, ..., 6 = Sunday)
  const actualTodayIndex = useMemo(() => {
    const raw = new Date().getDay();
    return raw === 0 ? 6 : raw - 1;
  }, []);

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(actualTodayIndex);
  const activeDaySchedule = MASTER_WEEKLY_SCHEDULE[selectedDayIndex] || MASTER_WEEKLY_SCHEDULE[0];
  const isActualToday = selectedDayIndex === actualTodayIndex;

  // Active Rotation Week
  const activeRotationWeek = state.activeRotationWeek || 1;
  const currentRotation =
    PRODUCT_ROTATION_WEEKS.find((w) => w.weekNumber === activeRotationWeek) ||
    PRODUCT_ROTATION_WEEKS[0];

  // 4 Ventures definition
  const ventures = [
    {
      id: 'all',
      name: 'All',
      tag: '4 Ventures',
      badge: 'Consolidated',
      channels: 'Consolidated founder execution across products, sales, and client delivery.',
      focusHint: 'Overseeing Delegatework, Fasly, Campus, and Delegatespace Studio',
    },
    {
      id: 'delegatework',
      name: 'Delegatework',
      tag: 'Teams Platform',
      badge: 'SEO Priority',
      channels: 'LinkedIn Marketing • Website Blogs • SEO Priority • B2B Inbound Demos',
      focusHint: 'Rank #1 for async collaboration. Eliminate Zoom fatigue.',
    },
    {
      id: 'fasly',
      name: 'Fasly',
      tag: 'Agri Advisory App',
      badge: 'Farmer App',
      channels: 'Crop Advisory Blogs • Farmer Facebook Groups • SEO • In-App Diagnosis',
      focusHint: 'Weekly agricultural advisory & regional farmer engagement.',
    },
    {
      id: 'campus',
      name: 'Campus',
      tag: 'Student Community',
      badge: 'Students & Jobs',
      channels: 'In-App Community • Tech Job Postings • Instagram Reels • Career Blogs',
      focusHint: 'Engage 10k+ student developers with jobs & tech discussions.',
    },
    {
      id: 'delegatespace',
      name: 'Delegatespace',
      tag: 'Parent Studio & Agency',
      badge: 'Client Revenue',
      channels: 'Client Sales (Tue) • Sprint Delivery (Wed/Sat) • Scoping & Proposals',
      focusHint: 'High-ticket software contracts & client sprint execution.',
    },
  ];

  // Filter Tasks by Mode, Timeframe, and Selected Schedule Day (when viewing Today)
  const filteredTasks = useMemo(() => {
    return state.tasks.filter((task) => {
      if (task.mode !== 'business') return false;
      if (task.timeframe !== currentTimeframe) return false;

      // Filter by the selected day in Operating Cadence (e.g. Saturday)
      if (currentTimeframe === 'today') {
        const targetDay = activeDaySchedule.dayKey;
        if (task.dayKey) {
          if (task.dayKey !== targetDay) return false;
        } else {
          // Backward compatibility for tasks without dayKey:
          if (
            task.id === 'b-dw1' ||
            task.id === 'b-dw2' ||
            task.title.toLowerCase().includes('linkedin') ||
            task.title.toLowerCase().includes('seo priority')
          ) {
            if (targetDay !== 'thursday') return false;
          } else if (
            task.id === 'b-fa1' ||
            task.id === 'b-ca1' ||
            task.title.toLowerCase().includes('agricultural advisory') ||
            task.title.toLowerCase().includes('tech job')
          ) {
            if (targetDay !== 'friday') return false;
          } else if (
            task.id === 'b-ds1' ||
            task.title.toLowerCase().includes('agency project delivery')
          ) {
            if (targetDay !== 'wednesday') return false;
          } else if (
            task.title.toLowerCase().includes('client projects sprint') ||
            task.title.toLowerCase().includes('existing products') ||
            task.title.toLowerCase().includes('release readiness') ||
            task.title.toLowerCase().includes('development review')
          ) {
            if (targetDay !== 'saturday') return false;
          } else {
            if (targetDay !== 'monday') return false;
          }
        }
      }

      if (selectedProduct !== 'all' && task.category !== selectedProduct) {
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
  }, [state.tasks, currentTimeframe, activeDaySchedule.dayKey, selectedProduct, statusFilter, searchQuery]);

  // Counts for Product Pills (consistent with selected day)
  const productTaskCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    state.tasks
      .filter((t) => {
        if (t.mode !== 'business' || t.timeframe !== currentTimeframe) return false;
        if (currentTimeframe === 'today') {
          const targetDay = activeDaySchedule.dayKey;
          if (t.dayKey) {
            if (t.dayKey !== targetDay) return false;
          } else {
            if (
              t.id === 'b-dw1' ||
              t.id === 'b-dw2' ||
              t.title.toLowerCase().includes('linkedin') ||
              t.title.toLowerCase().includes('seo priority')
            ) {
              if (targetDay !== 'thursday') return false;
            } else if (
              t.id === 'b-fa1' ||
              t.id === 'b-ca1' ||
              t.title.toLowerCase().includes('agricultural advisory') ||
              t.title.toLowerCase().includes('tech job')
            ) {
              if (targetDay !== 'friday') return false;
            } else if (
              t.id === 'b-ds1' ||
              t.title.toLowerCase().includes('agency project delivery')
            ) {
              if (targetDay !== 'wednesday') return false;
            } else if (
              t.title.toLowerCase().includes('client projects sprint') ||
              t.title.toLowerCase().includes('existing products') ||
              t.title.toLowerCase().includes('release readiness')
            ) {
              if (targetDay !== 'saturday') return false;
            } else if (targetDay !== 'monday') {
              return false;
            }
          }
        }
        return true;
      })
      .forEach((t) => {
        counts[t.category] = (counts[t.category] || 0) + 1;
      });
    return counts;
  }, [state.tasks, currentTimeframe, activeDaySchedule.dayKey]);

  // Quick Inline Add
  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTaskTitle.trim()) return;
    const title = quickTaskTitle.trim();
    setQuickTaskTitle('');
    await onCreateTask({
      title,
      mode: 'business',
      timeframe: currentTimeframe,
      priority: 'high',
      category: selectedProduct === 'all' ? 'delegatework' : selectedProduct,
      dayKey: activeDaySchedule.dayKey,
    });
  };

  // Toggle Founder Checklist Item
  const handleToggleChecklist = (id: string) => {
    const currentList = state.founderChecklist || [];
    const updated = currentList.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    );
    onUpdateSchedule({ founderChecklist: updated });
  };

  const checklistCompleted = (state.founderChecklist || []).filter((i) => i.done).length;
  const checklistTotal = (state.founderChecklist || []).length;

  return (
    <div className="space-y-4">
      {/* 1. EXECUTIVE HEADER & CADENCE DIRECTIVE */}
      <div className="bg-[#070d19]/90 border border-sky-500/20 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4">
        {/* Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-500/15 pb-3.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-sky-400" />
                Business Ecosystem Workspace
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sky-950/70 text-sky-300 border border-sky-500/30 font-semibold">
                39.5h Founder Target (Weekdays 3.5h • Weekends 11h)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800">
                Week {activeRotationWeek}: {currentRotation.primaryFocus}
              </span>
            </div>
            <p className="text-xs text-zinc-300">
              Clear time-blocking, marketing channels, and revenue execution across Yogesh Verma&apos;s 4 ventures
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* View switcher: Action Workspace vs Deep Strategy Hub */}
            <div className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setActiveTab('workspace')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'workspace'
                    ? 'bg-sky-400 text-zinc-950 shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Action Stream
              </button>
              <button
                onClick={() => setActiveTab('strategy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'strategy'
                    ? 'bg-sky-400 text-zinc-950 shadow-sm font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Strategy
              </button>
            </div>

            {onOpenHub && (
              <button
                onClick={() => onOpenHub('client_sprint')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-indigo-300 transition-all active:scale-95 shadow-sm"
                title="Open Workspaces"
              >
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Workspaces</span>
              </button>
            )}

            <button
              onClick={() =>
                onTriggerAI(
                  selectedProduct === 'all' ? 'delegatework' : selectedProduct,
                  'business_content'
                )
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline">AI Growth Blueprint</span>
            </button>
          </div>
        </div>

        {/* 2. INTERACTIVE 7-DAY BUSINESS SCHEDULE RIBBON */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <span>Operating Cadence (Click Day to Inspect Schedule)</span>
            </span>

            {!isActualToday && (
              <button
                onClick={() => setSelectedDayIndex(actualTodayIndex)}
                className="flex items-center gap-1 text-[11px] font-mono text-sky-300 hover:text-sky-200 underline underline-offset-2"
              >
                <RotateCw className="w-3 h-3" />
                <span>Return to Today ({MASTER_WEEKLY_SCHEDULE[actualTodayIndex].shortDay})</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {MASTER_WEEKLY_SCHEDULE.map((day, idx) => {
              const isSelected = selectedDayIndex === idx;
              const isCurrent = idx === actualTodayIndex;

              return (
                <button
                  key={day.dayKey}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-sky-950/80 border-sky-400 text-white shadow-md shadow-sky-950/50 ring-1 ring-sky-500/40'
                      : 'bg-zinc-950/60 border-zinc-850 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-sky-300">{day.shortDay}</span>
                    <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-zinc-900 text-zinc-400">
                      {day.totalHours}h
                    </span>
                  </div>

                  <div className="text-[10px] font-medium truncate mt-1 text-zinc-200">
                    {day.dayKey === 'monday' && 'Planning'}
                    {day.dayKey === 'tuesday' && 'Sales & Leads'}
                    {day.dayKey === 'wednesday' && 'Delivery'}
                    {day.dayKey === 'thursday' && 'SEO & Demos'}
                    {day.dayKey === 'friday' && 'Campus & Fasly'}
                    {day.dayKey === 'saturday' && 'Dev Maintenance'}
                    {day.dayKey === 'sunday' && 'Product Sprint'}
                  </div>

                  {isCurrent && (
                    <div className="flex items-center gap-1 mt-1 text-[9px] font-mono text-sky-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                      <span>Today</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. ACTIVE SCHEDULE DIRECTIVE & REMINDER BANNER */}
        <div className="p-3.5 rounded-2xl bg-zinc-950/75 border border-sky-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
              <span className="font-mono font-bold text-sky-300 uppercase tracking-wide">
                {activeDaySchedule.dayName} Focus: {activeDaySchedule.focusTitle}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-200 border border-sky-500/30">
                {activeDaySchedule.totalHours} Hours ({activeDaySchedule.timeWindow})
              </span>
            </div>
            <p className="text-zinc-300 text-[11px] leading-relaxed">
              {selectedDayIndex === 0 && 'Conduct Flutter/SwiftUI study, audit product backlogs, and lock in the 3 must-win outcomes for this week.'}
              {selectedDayIndex === 1 && 'Sales & client acquisition priority: Qualify prospects, run consultative cold outreach, follow up on proposals.'}
              {selectedDayIndex === 2 && 'Client delivery & operations: Execute paid contract milestones, polish Delegatespace case studies, align contractor work.'}
              {selectedDayIndex === 3 && 'Delegatework & SEO priority: Review SEO keywords, publish blog on lightweight collaboration, run B2B product demos.'}
              {selectedDayIndex === 4 && 'Campus & Fasly user growth: Curate tech job board, post seasonal crop advisory in farmer Facebook groups, review analytics.'}
              {selectedDayIndex === 5 && '11h Saturday Dev Maintenance: 4h client delivery, 4h existing product upgrades, 2h regression tests, 1h Sunday milestone lock.'}
              {selectedDayIndex === 6 && `11h Sunday Deep Product Sprint: 6h primary sprint on ${currentRotation.primaryFocus}, 2h secondary on ${currentRotation.secondaryFocus}, 1h QA, 1h planning.`}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-mono text-[11px]">
            <span className="px-2.5 py-1 rounded-xl bg-sky-950/60 border border-sky-500/30 text-sky-300 font-semibold">
              Status: Active Operating Block
            </span>
          </div>
        </div>

        {/* 4. VENTURE & CHANNEL SELECTOR PILLS */}
        <div className="space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>Filter By Venture & Channel Focus</span>
            <button
              onClick={() => onOpenHub?.('seo_command')}
              className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 hover:underline cursor-pointer transition-colors"
            >
              <span>SEO is Highest Priority for Delegatework</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {ventures.map((v) => {
              const active = selectedProduct === v.id;
              const count =
                v.id === 'all'
                  ? Object.values(productTaskCounts).reduce((a, b) => a + b, 0)
                  : productTaskCounts[v.id] || 0;

              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedProduct(v.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-sky-400 text-zinc-950 font-bold shadow-md shadow-sky-950/40'
                      : 'bg-zinc-950/70 border border-zinc-850 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span>{v.name}</span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${active ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-300'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Product Channel Reminder */}
          <div className="text-[11px] font-mono text-zinc-400 pt-1 border-t border-zinc-850 flex items-center justify-between">
            <span>
              {selectedProduct === 'delegatework' && '💼 Delegatework Channels: LinkedIn Marketing • Website Blog Posting • SEO Priority • B2B Inbound Demos'}
              {selectedProduct === 'fasly' && '🌾 Fasly Channels: Crop Advisory Blogs • Farmer Facebook Groups • SEO • In-App Diagnosis'}
              {selectedProduct === 'campus' && '🎓 Campus Channels: In-App Community • Verified Job Board • Instagram Reels • Tech Blogs'}
              {selectedProduct === 'delegatespace' && '🏢 Delegatespace Channels: Client Sales (Tue) • Milestone Delivery (Wed/Sat) • Scope & Proposals'}
              {selectedProduct === 'all' && '🌐 4 Ventures: Delegatework, Fasly, Campus, Delegatespace Studio'}
            </span>
            <span className="text-sky-400 font-bold hidden sm:inline">Execution Priority</span>
          </div>
        </div>
      </div>

      {/* 2. BODY CONTENT: WORKSPACE STREAM OR FULL STRATEGY VIEW */}
      {activeTab === 'strategy' ? (
        <BusinessView
          milestones={state.milestones}
          habits={state.habits}
          selectedCategory={selectedProduct}
          onSelectCategory={setSelectedProduct}
          onTriggerAI={onTriggerAI}
          activeRotationWeek={activeRotationWeek}
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
                placeholder={`+ Add a business task for ${currentTimeframe === 'today' ? 'Today' : currentTimeframe}... [Press Enter]`}
                value={quickTaskTitle}
                onChange={(e) => setQuickTaskTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-zinc-900/70 border border-sky-500/20 text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-sky-400 transition-all shadow-inner"
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
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                </div>
                <h4 className="text-xs font-semibold text-zinc-300">
                  No tasks scheduled for {currentTimeframe === 'today' ? activeDaySchedule.dayName : currentTimeframe} in {selectedProduct === 'all' ? 'the ecosystem' : selectedProduct}
                </h4>
                <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                  Type a task title above and press enter to add it instantly for {currentTimeframe === 'today' ? activeDaySchedule.dayName : 'this timeframe'}.
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
                    onOpenHub={onOpenHub}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: EXECUTIVE CONTEXT SIDEBAR (4 COLS) */}
          <div className="lg:col-span-4 space-y-3.5">
            {/* 1. SCHEDULED TIME BLOCKS FOR SELECTED DAY */}
            <div className="p-4 rounded-2xl bg-[#070d19]/90 border border-sky-500/20 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                <span className="text-[11px] font-mono font-semibold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeDaySchedule.dayName} Time Blocks</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">
                  {activeDaySchedule.totalHours}h
                </span>
              </div>

              <div className="space-y-2">
                {activeDaySchedule.blocks.map((b, idx) => {
                  let targetHub: OperatingHubId = 'client_sprint';
                  if (activeDaySchedule.dayKey === 'saturday') {
                    if (idx === 0) targetHub = 'client_sprint';
                    else if (idx === 1) targetHub = 'product_roadmap';
                    else if (idx === 2) targetHub = 'testing_qa';
                    else if (idx === 3) targetHub = 'sunday_sprint';
                  } else if (activeDaySchedule.dayKey === 'sunday') {
                    targetHub = 'sunday_sprint';
                  } else if (activeDaySchedule.dayKey === 'thursday') {
                    targetHub = 'seo_command';
                  } else if (activeDaySchedule.dayKey === 'tuesday') {
                    targetHub = 'learning_hub';
                  } else if (activeDaySchedule.dayKey === 'monday') {
                    targetHub = 'weekly_planning';
                  } else if (activeDaySchedule.dayKey === 'wednesday') {
                    targetHub = 'client_sprint';
                  }

                  return (
                    <div
                      key={b.id}
                      onClick={() => onOpenHub?.(targetHub)}
                      className="p-2.5 rounded-xl bg-zinc-950/70 border border-zinc-850 text-xs space-y-1 hover:border-sky-500/50 hover:bg-sky-950/20 transition-all cursor-pointer group"
                      title="Click to open dedicated workspace view"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-sky-400 font-bold flex items-center gap-1">
                          <span>Block {idx + 1}</span>
                          <span className="text-zinc-500 group-hover:text-sky-300 transition-colors font-normal">
                            • Open View ↗
                          </span>
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-850 text-zinc-300">
                          {b.hours}h
                        </span>
                      </div>
                      <h6 className="font-semibold text-zinc-100 group-hover:text-sky-200 transition-colors">
                        {b.title}
                      </h6>
                      <p className="text-[11px] text-zinc-400 leading-snug">{b.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. SUNDAY PRODUCT ROTATION (4-WEEK SPRINT CYCLE) */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850 space-y-2.5">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                <button
                  onClick={() => onOpenHub?.('sunday_sprint')}
                  className="text-[11px] font-mono font-semibold text-amber-400 uppercase tracking-wider hover:underline flex items-center gap-1"
                >
                  <span>Sunday Product Sprint</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  Week {activeRotationWeek} of 4
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-bold text-white font-mono">{currentRotation.primaryFocus}</div>
                <p className="text-[11px] text-zinc-400 leading-snug">{currentRotation.description}</p>
              </div>

              {/* 4 Rotation Week Buttons */}
              <div className="grid grid-cols-4 gap-1 pt-1 border-t border-zinc-850">
                {PRODUCT_ROTATION_WEEKS.map((w) => (
                  <button
                    key={w.weekNumber}
                    onClick={() => onUpdateSchedule({ activeRotationWeek: w.weekNumber })}
                    className={`p-1 text-center rounded-lg text-[10px] font-mono transition-all ${
                      w.weekNumber === activeRotationWeek
                        ? 'bg-amber-400 text-zinc-950 font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white'
                    }`}
                  >
                    W{w.weekNumber}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. FOUNDER WEEKLY REVIEW CHECKLIST (8 ITEMS) */}
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850 space-y-2.5">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                <button
                  onClick={() => onOpenHub?.('weekly_planning')}
                  className="text-[11px] font-mono font-semibold text-sky-400 uppercase tracking-wider hover:underline flex items-center gap-1"
                >
                  <span>Founder Review Checklist</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {checklistCompleted}/{checklistTotal} Done
                </span>
              </div>

              <div className="space-y-1.5">
                {(state.founderChecklist || []).map((item) => (
                  <label
                    key={item.id}
                    onClick={() => handleToggleChecklist(item.id)}
                    className="flex items-start gap-2 p-2 rounded-xl bg-zinc-900/60 border border-zinc-850 text-xs cursor-pointer hover:border-sky-500/30 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={item.done}
                      readOnly
                      className="mt-0.5 rounded border-zinc-700 text-sky-400 focus:ring-0"
                    />
                    <span
                      className={`text-[11px] leading-snug ${
                        item.done ? 'line-through text-zinc-500' : 'text-zinc-300'
                      }`}
                    >
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

