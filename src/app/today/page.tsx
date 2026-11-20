// src/app/today/page.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  TodayDashboardState,
  DashboardMode,
  Timeframe,
  TaskItem,
  ChecklistItem,
  FinancialRecord,
  PersonalProfile,
} from '@/lib/today/types';
import { modeThemes } from '@/lib/today/theme';
import { TodayNavbar } from '@/components/today/TodayNavbar';
import { TimeframeNav } from '@/components/today/TimeframeNav';
import { TaskItemCard } from '@/components/today/TaskItemCard';
import { OverviewDashboard } from '@/components/today/OverviewDashboard';
import { PersonalView } from '@/components/today/PersonalView';
import { BusinessView } from '@/components/today/BusinessView';
import { JobView } from '@/components/today/JobView';
import { AICopilotModal } from '@/components/today/AICopilotModal';
import { TaskModal } from '@/components/today/TaskModal';
import { FocusTimerModal } from '@/components/today/FocusTimerModal';
import { LockScreen } from '@/components/today/LockScreen';
import {
  Search,
  Plus,
  Bell,
  CheckCircle2,
  CheckSquare,
  BarChart2,
  Flame,
  Droplets,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { playChime } from '@/lib/today/sound';

export default function TodayPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [state, setState] = useState<TodayDashboardState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Active view filters
  const [currentMode, setCurrentMode] = useState<DashboardMode>('overview');
  const [currentTimeframe, setCurrentTimeframe] = useState<Timeframe>('today');
  const [viewTab, setViewTab] = useState<'tasks' | 'insights'>('tasks');
  const [businessCategory, setBusinessCategory] = useState<string>('all');
  const [jobCategory, setJobCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Quick inline task creation
  const [quickTaskTitle, setQuickTaskTitle] = useState<string>('');

  // Modals
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [showAIModal, setShowAIModal] = useState<boolean>(false);
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false);

  // AI prompt helper state
  const [aiTopic, setAiTopic] = useState<string>('');
  const [aiAction, setAiAction] = useState<string>('');

  const theme = modeThemes[currentMode];

  // 1. Check Authentication on Mount
  useEffect(() => {
    const savedToken = typeof window !== 'undefined' ? localStorage.getItem('today_token') : null;
    if (savedToken) {
      setIsAuthenticated(true);
      fetchDashboardState();
    } else {
      fetch('/api/today/auth/verify')
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated) {
            setIsAuthenticated(true);
            fetchDashboardState();
          } else {
            setIsAuthenticated(false);
            setLoading(false);
          }
        })
        .catch(() => {
          setIsAuthenticated(false);
          setLoading(false);
        });
    }
  }, []);

  const fetchDashboardState = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/today/state');
      const data = await res.json();
      if (data.success && data.state) {
        setState(data.state);
      }
    } catch (err) {
      console.error('Failed to load state:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = (token: string) => {
    localStorage.setItem('today_token', token);
    setIsAuthenticated(true);
    fetchDashboardState();
  };

  const handleLock = () => {
    localStorage.removeItem('today_token');
    setIsAuthenticated(false);
  };

  // 2. Task Actions
  const handleToggleTaskComplete = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.id === id ? { ...t, status: newStatus, completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined } : t
        ),
      };
    });

    try {
      await fetch(`/api/today/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          completedAt: newStatus === 'completed' ? new Date().toISOString() : null,
        }),
      });
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const handleUpdateSubtasks = async (id: string, checklist: ChecklistItem[]) => {
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        tasks: prev.tasks.map((t) => (t.id === id ? { ...t, checklist } : t)),
      };
    });

    try {
      await fetch(`/api/today/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checklist }),
      });
    } catch (err) {
      console.error('Error updating subtasks:', err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    playChime('click');
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        tasks: prev.tasks.filter((t) => t.id !== id),
      };
    });

    try {
      await fetch(`/api/today/tasks/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleCreateTask = async (taskData: Partial<TaskItem>) => {
    try {
      const res = await fetch('/api/today/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      const data = await res.json();
      if (data.success && data.task) {
        setState((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            tasks: [data.task, ...prev.tasks],
          };
        });
      }
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTaskTitle.trim()) return;

    playChime('success');
    const title = quickTaskTitle.trim();
    setQuickTaskTitle('');

    await handleCreateTask({
      title,
      mode: currentMode,
      timeframe: currentTimeframe,
      priority: 'medium',
      category: currentMode === 'business' ? (businessCategory === 'all' ? 'delegatework' : businessCategory) : currentMode === 'job' ? (jobCategory === 'all' ? 'dsa' : jobCategory) : 'info',
    });
  };

  // 3. Habit & Health Actions
  const handleToggleHabit = async (id: string, date: string) => {
    try {
      const res = await fetch('/api/today/habits', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, date }),
      });
      const data = await res.json();
      if (data.success && data.habit) {
        setState((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            habits: prev.habits.map((h) => (h.id === id ? data.habit : h)),
          };
        });
      }
    } catch (err) {
      console.error('Error toggling habit:', err);
    }
  };

  const handleUpdateProfile = async (updates: Partial<PersonalProfile>) => {
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        profile: { ...prev.profile, ...updates },
      };
    });

    try {
      await fetch('/api/today/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  // 4. Finance Actions
  const handleAddFinance = async (record: Partial<FinancialRecord>) => {
    try {
      const res = await fetch('/api/today/finances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      const data = await res.json();
      if (data.success && data.finance) {
        setState((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            finances: [data.finance, ...prev.finances],
          };
        });
      }
    } catch (err) {
      console.error('Error adding finance:', err);
    }
  };

  const handleDeleteFinance = async (id: string) => {
    playChime('click');
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        finances: prev.finances.filter((f) => f.id !== id),
      };
    });
    try {
      await fetch(`/api/today/finances?id=${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Error deleting finance:', err);
    }
  };

  const handleUpdateMilestone = async (id: string, progress: number) => {
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        milestones: prev.milestones.map((m) => (m.id === id ? { ...m, progress } : m)),
      };
    });

    try {
      await fetch('/api/today/milestones', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, progress }),
      });
    } catch (err) {
      console.error('Error updating milestone:', err);
    }
  };

  // Trigger AI with Context
  const handleTriggerAI = (topicOrProduct: string, actionType: string) => {
    setAiTopic(topicOrProduct);
    setAiAction(actionType);
    setShowAIModal(true);
  };

  // Filter Tasks by Mode, Timeframe, Category, Status, Search
  const filteredTasks = useMemo(() => {
    if (!state) return [];
    return state.tasks.filter((task) => {
      if (task.mode !== currentMode) return false;
      if (task.timeframe !== currentTimeframe) return false;

      if (currentMode === 'business' && businessCategory !== 'all') {
        if (task.category !== businessCategory) return false;
      }
      if (currentMode === 'job' && jobCategory !== 'all') {
        if (task.category !== jobCategory) return false;
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
  }, [state, currentMode, currentTimeframe, businessCategory, jobCategory, statusFilter, searchQuery]);

  // Calculate Timeframe Counts across Current Mode
  const timeframeCounts = useMemo(() => {
    const counts: Record<Timeframe, { total: number; completed: number }> = {
      today: { total: 0, completed: 0 },
      week: { total: 0, completed: 0 },
      month: { total: 0, completed: 0 },
      six_months: { total: 0, completed: 0 },
    };

    if (!state) return counts;

    state.tasks
      .filter((t) => currentMode === 'overview' || t.mode === currentMode)
      .forEach((t) => {
        if (counts[t.timeframe]) {
          counts[t.timeframe].total += 1;
          if (t.status === 'completed') {
            counts[t.timeframe].completed += 1;
          }
        }
      });

    return counts;
  }, [state, currentMode]);

  // Urgent / Upcoming Reminders for Today
  const upcomingReminders = useMemo(() => {
    if (!state) return [];
    return state.tasks.filter(
      (t) => t.timeframe === 'today' && t.status !== 'completed' && t.reminderTime
    );
  }, [state]);

  // Today string
  const todayStr = new Date().toISOString().split('T')[0];

  // Show Lock Screen if not authenticated
  if (isAuthenticated === false) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  // Loading Skeleton
  if (loading || !state) {
    return (
      <div className={`min-h-screen ${theme.bgCanvas} text-zinc-100 flex flex-col items-center justify-center gap-3 transition-colors duration-500`}>
        <div className={`w-7 h-7 rounded-full border-2 ${theme.textPrimary} border-t-transparent animate-spin`} />
        <p className="text-xs font-mono text-zinc-400 animate-pulse">
          Opening /today OS...
        </p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.bgCanvas} text-zinc-100 flex flex-col font-sans transition-colors duration-500`}>
      {/* 1. TOP NAVBAR */}
      <TodayNavbar
        currentMode={currentMode}
        onSelectMode={(mode) => {
          setCurrentMode(mode);
          setBusinessCategory('all');
          setJobCategory('all');
        }}
        onOpenTaskModal={() => setShowTaskModal(true)}
        onOpenAIModal={() => {
          setAiTopic('');
          setAiAction('');
          setShowAIModal(true);
        }}
        onOpenTimerModal={() => setShowTimerModal(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 space-y-4">
        {currentMode === 'overview' ? (
          <OverviewDashboard
            state={state}
            onSelectMode={(mode) => {
              playChime('click');
              setCurrentMode(mode);
            }}
            onToggleTaskComplete={handleToggleTaskComplete}
            onUpdateSubtasks={handleUpdateSubtasks}
            onTriggerAI={handleTriggerAI}
            onUpdateProfile={handleUpdateProfile}
            onOpenTaskModal={() => setShowTaskModal(true)}
          />
        ) : (
          <>
            {/* 2. TOP COMPACT TIMEFRAME HORIZONS */}
            <TimeframeNav
              currentTimeframe={currentTimeframe}
              onSelectTimeframe={(tf) => {
                playChime('click');
                setCurrentTimeframe(tf);
              }}
              counts={timeframeCounts}
              currentMode={currentMode}
            />

        {/* 3. SUB-HEADER: VIEW SWITCHER (TASKS VS INSIGHTS HUB) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playChime('click');
                setViewTab('tasks');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewTab === 'tasks'
                  ? `${theme.activePill}`
                  : 'text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Tasks & Action Items</span>
              <span className="text-[10px] opacity-75 font-mono">({filteredTasks.length})</span>
            </button>

            <button
              onClick={() => {
                playChime('click');
                setViewTab('insights');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewTab === 'insights'
                  ? `${theme.activePill}`
                  : 'text-zinc-400 hover:text-white bg-zinc-900/60 border border-zinc-800'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>
                {currentMode === 'personal'
                  ? 'Financial & Routine Hub'
                  : currentMode === 'business'
                  ? 'Products & Marketing Hub'
                  : 'Competencies & Interview Hub'}
              </span>
            </button>
          </div>

          {/* Active Reminder Pill */}
          {upcomingReminders.length > 0 && currentTimeframe === 'today' && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-xl text-xs ${theme.badge}`}>
              <Bell className="w-3 h-3 animate-pulse" />
              <span className="font-medium text-zinc-200 truncate max-w-[260px]">
                {upcomingReminders[0]?.title} ({upcomingReminders[0]?.reminderTime})
              </span>
            </div>
          )}
        </div>

        {/* 4. MAIN VIEW CONTENT */}
        {viewTab === 'tasks' ? (
          /* BALANCED 2-COLUMN LAYOUT: TASKS (LEFT 65%) + CONTEXT SIDEBAR (RIGHT 35%) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* LEFT STREAM: TASKS (8 COLS) */}
            <div className="lg:col-span-8 space-y-3">
              {/* Quick Inline Add Input */}
              <form onSubmit={handleQuickAdd} className="relative">
                <input
                  type="text"
                  placeholder={`+ Add a task to ${theme.name} for ${currentTimeframe === 'today' ? 'Today' : currentTimeframe}... [Press Enter]`}
                  value={quickTaskTitle}
                  onChange={(e) => setQuickTaskTitle(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-2xl bg-zinc-900/60 border ${theme.borderSubtle} text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:${theme.borderActive} transition-all`}
                />
              </form>

              {/* Filter Bar */}
              <div className="flex items-center justify-between gap-2 px-1">
                <div className="flex items-center gap-1 text-xs">
                  {(['all', 'pending', 'completed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg capitalize text-[11px] font-medium transition-all ${
                        statusFilter === st
                          ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
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
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-7 pr-2.5 py-1 text-xs rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none w-32 sm:w-40"
                  />
                </div>
              </div>

              {/* Task Cards */}
              {filteredTasks.length === 0 ? (
                <div className="py-12 text-center rounded-2xl border border-dashed border-zinc-850 bg-zinc-900/20 space-y-2">
                  <div className="w-8 h-8 mx-auto rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-600">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-300">All clear for this view</h4>
                  <p className="text-[11px] text-zinc-500 max-w-xs mx-auto">
                    Type a task title above and press enter to add it instantly.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredTasks.map((task) => (
                    <TaskItemCard
                      key={task.id}
                      task={task}
                      onToggleComplete={handleToggleTaskComplete}
                      onUpdateSubtasks={handleUpdateSubtasks}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR: EXECUTIVE CONTEXT WIDGET (4 COLS) */}
            <div className="lg:col-span-4 space-y-3">
              {/* Personal Context Widget */}
              {currentMode === 'personal' && (
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-emerald-500/15 space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                      Daily Routine
                    </span>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-300">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                      <span>{state.profile.currentStreak || 14}d</span>
                    </div>
                  </div>

                  {/* Routine Checkboxes */}
                  <div className="space-y-1.5 text-xs">
                    <label
                      onClick={() => {
                        playChime('click');
                        handleUpdateProfile({ morningRoutineCompleted: !state.profile.morningRoutineCompleted });
                      }}
                      className="flex items-center gap-2 p-2 rounded-xl bg-zinc-950/60 border border-zinc-850 cursor-pointer hover:border-emerald-500/30 transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={state.profile.morningRoutineCompleted}
                        readOnly
                        className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
                      />
                      <span className="text-zinc-200 text-xs">Morning Awakening Routine</span>
                    </label>

                    <label
                      onClick={() => {
                        playChime('click');
                        handleUpdateProfile({ nightReviewCompleted: !state.profile.nightReviewCompleted });
                      }}
                      className="flex items-center gap-2 p-2 rounded-xl bg-zinc-950/60 border border-zinc-850 cursor-pointer hover:border-emerald-500/30 transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={state.profile.nightReviewCompleted}
                        readOnly
                        className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
                      />
                      <span className="text-zinc-200 text-xs">Night Day Review Protocol</span>
                    </label>
                  </div>

                  {/* Water counter */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/60 border border-zinc-850 text-xs">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <Droplets className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Water Intake</span>
                    </span>
                    <div className="flex items-center gap-1.5 font-mono">
                      <button
                        onClick={() => state.profile.waterIntakeGlasses > 0 && handleUpdateProfile({ waterIntakeGlasses: state.profile.waterIntakeGlasses - 1 })}
                        className="w-5 h-5 rounded bg-zinc-800 text-white font-bold"
                      >
                        -
                      </button>
                      <span className="font-bold text-zinc-100">{state.profile.waterIntakeGlasses || 4}/8</span>
                      <button
                        onClick={() => handleUpdateProfile({ waterIntakeGlasses: (state.profile.waterIntakeGlasses || 0) + 1 })}
                        className="w-5 h-5 rounded bg-emerald-500 text-zinc-950 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setViewTab('insights')}
                    className="w-full py-1.5 text-xs text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1 font-medium"
                  >
                    <span>View Financial Plan & Ledger</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Business Context Widget */}
              {currentMode === 'business' && (
                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-sky-500/15 space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-[11px] font-mono font-semibold text-sky-400 uppercase tracking-wider">
                      Ecosystem Products
                    </span>
                    <button
                      onClick={() => handleTriggerAI('delegatework', 'business_content')}
                      className="text-[10px] font-medium text-sky-300 hover:text-white flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-sky-400" />
                      <span>AI Growth</span>
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    {[
                      { name: 'Delegatework', link: 'https://delegatework.in/', tag: 'Teams & SEO' },
                      { name: 'Fasly', link: 'https://fasly.in/', tag: 'Agriculture' },
                      { name: 'Campus', link: 'https://delegatecampus.in/', tag: 'Student Jobs' },
                      { name: 'Delegatespace', link: 'https://www.delegatespace.com/', tag: 'Parent Studio' },
                    ].map((p) => (
                      <div
                        key={p.name}
                        className="flex items-center justify-between p-2 rounded-xl bg-zinc-950/60 border border-zinc-850 text-xs"
                      >
                        <div>
                          <span className="font-semibold text-zinc-200 block">{p.name}</span>
                          <span className="text-[10px] text-zinc-500">{p.tag}</span>
                        </div>
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded text-zinc-500 hover:text-sky-400 hover:bg-zinc-800 transition-colors"
                          title={`Open ${p.link}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setViewTab('insights')}
                    className="w-full py-1.5 text-xs text-sky-400 hover:text-sky-300 flex items-center justify-center gap-1 font-medium"
                  >
                    <span>View Marketing Strategy & Hub</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              {/* Job Prep Context Widget */}
              {currentMode === 'job' && (
                <div className="p-4 rounded-2xl bg-[#120f06]/75 border border-amber-500/25 space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                    <span className="text-[11px] font-mono font-semibold text-amber-400 uppercase tracking-wider">
                      Technical Track
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/50 text-amber-300 border border-amber-500/30 font-semibold">
                      72/100 Solved
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="p-2 rounded-xl bg-zinc-950/60 border border-zinc-850 flex items-center justify-between">
                      <span className="text-zinc-300">DSA Blind 75</span>
                      <span className="text-amber-400 font-semibold font-mono">Graphs / DP</span>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-950/60 border border-zinc-850 flex items-center justify-between">
                      <span className="text-zinc-300">HLD System Design</span>
                      <span className="text-amber-400 font-semibold font-mono">Distributed Cache</span>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-950/60 border border-zinc-850 flex items-center justify-between">
                      <span className="text-zinc-300">Communication STAR</span>
                      <span className="text-amber-400 font-semibold font-mono">20m Daily Drill</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTriggerAI('dsa', 'job_prep')}
                    className="w-full py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Generate AI Coach Drill</span>
                  </button>

                  <button
                    onClick={() => setViewTab('insights')}
                    className="w-full py-1 text-xs text-amber-400 hover:text-amber-300 flex items-center justify-center gap-1 font-medium"
                  >
                    <span>View All 6 Competency Pillars</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* DEDICATED FULL-WIDTH HUB VIEW (WHEN SWITCHED TO INSIGHTS) */
          <div>
            {currentMode === 'personal' && (
              <PersonalView
                profile={state.profile}
                habits={state.habits}
                finances={state.finances}
                milestones={state.milestones}
                onUpdateProfile={handleUpdateProfile}
                onToggleHabit={handleToggleHabit}
                onAddFinance={handleAddFinance}
                onDeleteFinance={handleDeleteFinance}
                onUpdateMilestone={handleUpdateMilestone}
              />
            )}

            {currentMode === 'business' && (
              <BusinessView
                milestones={state.milestones}
                habits={state.habits}
                selectedCategory={businessCategory}
                onSelectCategory={setBusinessCategory}
                onTriggerAI={handleTriggerAI}
              />
            )}

            {currentMode === 'job' && (
              <JobView
                milestones={state.milestones}
                selectedCategory={jobCategory}
                onSelectCategory={setJobCategory}
                onTriggerAI={handleTriggerAI}
              />
            )}
          </div>
        )}
          </>
        )}
      </main>

      {/* 5. MODALS */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSave={handleCreateTask}
        initialMode={currentMode}
        initialTimeframe={currentTimeframe}
      />

      <AICopilotModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        onAddTaskFromAI={(title, desc, mode) => {
          handleCreateTask({
            title,
            description: desc,
            mode,
            timeframe: currentTimeframe,
            priority: 'high',
            aiGenerated: true,
          });
        }}
        initialTopic={aiTopic}
        initialAction={aiAction}
      />

      <FocusTimerModal
        isOpen={showTimerModal}
        onClose={() => setShowTimerModal(false)}
      />
    </div>
  );
}
