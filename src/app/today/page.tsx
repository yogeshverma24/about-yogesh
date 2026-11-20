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
import { TodayNavbar } from '@/components/today/TodayNavbar';
import { TimeframeNav } from '@/components/today/TimeframeNav';
import { TaskItemCard } from '@/components/today/TaskItemCard';
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
  Sparkles,
  Bell,
  Clock,
  Layers,
  CheckCircle,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { playChime } from '@/lib/today/sound';

export default function TodayPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [state, setState] = useState<TodayDashboardState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Active view filters
  const [currentMode, setCurrentMode] = useState<DashboardMode>('personal');
  const [currentTimeframe, setCurrentTimeframe] = useState<Timeframe>('today');
  const [businessCategory, setBusinessCategory] = useState<string>('all');
  const [jobCategory, setJobCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Modals
  const [showTaskModal, setShowTaskModal] = useState<boolean>(false);
  const [showAIModal, setShowAIModal] = useState<boolean>(false);
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false);

  // AI prompt helper state
  const [aiTopic, setAiTopic] = useState<string>('');
  const [aiAction, setAiAction] = useState<string>('');

  // 1. Check Authentication on Mount
  useEffect(() => {
    const savedToken = typeof window !== 'undefined' ? localStorage.getItem('today_token') : null;
    if (savedToken) {
      setIsAuthenticated(true);
      fetchDashboardState();
    } else {
      // Auto-check session cookie via verify endpoint
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
    // Optimistic UI update
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

  // 3. Habit Actions
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

  // 5. Milestone Actions
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

  // 6. Profile Actions
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
      // Mode match
      if (task.mode !== currentMode) return false;

      // Timeframe match
      if (task.timeframe !== currentTimeframe) return false;

      // Category match
      if (currentMode === 'business' && businessCategory !== 'all') {
        if (task.category !== businessCategory) return false;
      }
      if (currentMode === 'job' && jobCategory !== 'all') {
        if (task.category !== jobCategory) return false;
      }

      // Status filter
      if (statusFilter === 'pending' && task.status === 'completed') return false;
      if (statusFilter === 'completed' && task.status !== 'completed') return false;

      // Search match
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
      .filter((t) => t.mode === currentMode)
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

  // Show Lock Screen if not authenticated
  if (isAuthenticated === false) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  // Loading Skeleton
  if (loading || !state) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
        <p className="text-xs font-mono text-slate-400 animate-pulse">
          Loading Yogesh Verma /today OS...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* 1. TOP EXECUTIVE NAVBAR */}
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
        onLock={handleLock}
        streak={state.profile.currentStreak || 14}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* 2. TIMEFRAME HORIZONS SWITCHER */}
        <TimeframeNav
          currentTimeframe={currentTimeframe}
          onSelectTimeframe={(tf) => {
            playChime('click');
            setCurrentTimeframe(tf);
          }}
          counts={timeframeCounts}
        />

        {/* 3. UPCOMING REMINDERS BANNER (IF ANY) */}
        {upcomingReminders.length > 0 && currentTimeframe === 'today' && (
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 shadow-sm animate-fade-in">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400 animate-bounce" />
              <span className="font-bold">Scheduled Reminders Today:</span>
              <span className="text-amber-200">
                {upcomingReminders
                  .slice(0, 2)
                  .map((r) => `${r.title} (${r.reminderTime})`)
                  .join(' • ')}
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold bg-amber-500/20 px-2 py-0.5 rounded-md">
              {upcomingReminders.length} Active
            </span>
          </div>
        )}

        {/* 4. MODE SPECIFIC VIEWS */}
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

        {/* 5. TASKS SECTION (FILTERED BY TIMEFRAME & MODE) */}
        <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
          {/* Section Header & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                <span>
                  {currentTimeframe === 'today'
                    ? '⚡ Aaj Ke Tasks & Schedule'
                    : currentTimeframe === 'week'
                    ? '📅 Is Week Ke Sprints & Goals'
                    : currentTimeframe === 'month'
                    ? '🗓️ Is Month Ke Deliverables'
                    : '🔭 6 Month Long-Term Vision'}
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-300">
                  {filteredTasks.length}
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentMode === 'personal'
                  ? 'Personal Health, Finance & Routine execution'
                  : currentMode === 'business'
                  ? 'Fasly, Campus, Delegatework, & Delegatespace deliverables'
                  : 'DSA, System Design, Mobile (Flutter/RN/iOS), & Communication mastery'}
              </p>
            </div>

            {/* Search & Status Filters */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-36 sm:w-44"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Done</option>
              </select>

              <button
                onClick={() => setShowTaskModal(true)}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add Task</span>
              </button>
            </div>
          </div>

          {/* Tasks List */}
          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">No tasks found for this view</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Everything looks clear or no tasks match your current filter. Add a new task or generate one with Gemini AI!
              </p>
              <button
                onClick={() => setShowTaskModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-950 hover:bg-slate-200"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Task</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
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
      </main>

      {/* 6. MODALS */}
      {/* Task Creation Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSave={handleCreateTask}
        initialMode={currentMode}
        initialTimeframe={currentTimeframe}
      />

      {/* AI Copilot Modal */}
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

      {/* Focus Timer Modal */}
      <FocusTimerModal
        isOpen={showTimerModal}
        onClose={() => setShowTimerModal(false)}
      />
    </div>
  );
}

