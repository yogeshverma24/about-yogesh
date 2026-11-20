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
  FounderChecklistItem,
} from '@/lib/today/types';
import { modeThemes } from '@/lib/today/theme';
import { TodayNavbar } from '@/components/today/TodayNavbar';
import { TimeframeNav } from '@/components/today/TimeframeNav';
import { OverviewDashboard } from '@/components/today/OverviewDashboard';
import { BusinessWorkspace } from '@/components/today/BusinessWorkspace';
import { PersonalWorkspace } from '@/components/today/PersonalWorkspace';
import { JobWorkspace } from '@/components/today/JobWorkspace';
import { AICopilotModal } from '@/components/today/AICopilotModal';
import { TaskModal } from '@/components/today/TaskModal';
import { FocusTimerModal } from '@/components/today/FocusTimerModal';
import { LockScreen } from '@/components/today/LockScreen';

export default function TodayPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [state, setState] = useState<TodayDashboardState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Active view filters
  const [currentMode, setCurrentMode] = useState<DashboardMode>('overview');
  const [currentTimeframe, setCurrentTimeframe] = useState<Timeframe>('today');

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

  // 2. Task Actions
  const handleToggleTaskComplete = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    setState((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        tasks: prev.tasks.map((t) =>
          t.id === id
            ? {
                ...t,
                status: newStatus,
                completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
              }
            : t
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

  // Update Founder Schedule & Checklist
  const handleUpdateSchedule = async (updates: {
    founderChecklist?: FounderChecklistItem[];
    activeRotationWeek?: number;
    weeklyHoursLogged?: number;
  }) => {
    setState((prev) => (prev ? { ...prev, ...updates } : prev));
    try {
      await fetch('/api/today/schedule', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
    } catch (err) {
      console.error('Failed to update schedule:', err);
    }
  };

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

  // Show Lock Screen if not authenticated
  if (isAuthenticated === false) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  // Loading Skeleton
  if (loading || !state) {
    return (
      <div
        className={`min-h-screen ${theme.bgCanvas} text-zinc-100 flex flex-col items-center justify-center gap-3 transition-colors duration-500`}
      >
        <div
          className={`w-7 h-7 rounded-full border-2 ${theme.textPrimary} border-t-transparent animate-spin`}
        />
        <p className="text-xs font-mono text-zinc-400 animate-pulse">
          Opening /today OS...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${theme.bgCanvas} text-zinc-100 flex flex-col font-sans transition-colors duration-500`}
    >
      {/* 1. TOP NAVBAR */}
      <TodayNavbar
        currentMode={currentMode}
        onSelectMode={(mode) => {
          setCurrentMode(mode);
        }}
        onOpenTaskModal={() => setShowTaskModal(true)}
        onOpenAIModal={() => {
          setAiTopic('');
          setAiAction('');
          setShowAIModal(true);
        }}
        onOpenTimerModal={() => setShowTimerModal(true)}
      />

      {/* 2. MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 space-y-4">
        {currentMode === 'overview' && (
          <OverviewDashboard
            state={state}
            onSelectMode={(mode) => setCurrentMode(mode)}
            onToggleTaskComplete={handleToggleTaskComplete}
            onUpdateSubtasks={handleUpdateSubtasks}
            onTriggerAI={handleTriggerAI}
            onUpdateProfile={handleUpdateProfile}
            onOpenTaskModal={() => setShowTaskModal(true)}
            onUpdateSchedule={handleUpdateSchedule}
          />
        )}

        {currentMode === 'personal' && (
          <>
            <TimeframeNav
              currentTimeframe={currentTimeframe}
              onSelectTimeframe={setCurrentTimeframe}
              counts={timeframeCounts}
              currentMode={currentMode}
            />
            <PersonalWorkspace
              state={state}
              currentTimeframe={currentTimeframe}
              onSelectTimeframe={setCurrentTimeframe}
              timeframeCounts={timeframeCounts}
              onToggleTaskComplete={handleToggleTaskComplete}
              onUpdateSubtasks={handleUpdateSubtasks}
              onDeleteTask={handleDeleteTask}
              onCreateTask={handleCreateTask}
              onUpdateProfile={handleUpdateProfile}
              onToggleHabit={handleToggleHabit}
              onAddFinance={handleAddFinance}
              onDeleteFinance={handleDeleteFinance}
              onUpdateMilestone={handleUpdateMilestone}
              onTriggerAI={handleTriggerAI}
            />
          </>
        )}

        {currentMode === 'business' && (
          <>
            <TimeframeNav
              currentTimeframe={currentTimeframe}
              onSelectTimeframe={setCurrentTimeframe}
              counts={timeframeCounts}
              currentMode={currentMode}
            />
            <BusinessWorkspace
              state={state}
              currentTimeframe={currentTimeframe}
              onSelectTimeframe={setCurrentTimeframe}
              timeframeCounts={timeframeCounts}
              onToggleTaskComplete={handleToggleTaskComplete}
              onUpdateSubtasks={handleUpdateSubtasks}
              onDeleteTask={handleDeleteTask}
              onCreateTask={handleCreateTask}
              onTriggerAI={handleTriggerAI}
              onUpdateSchedule={handleUpdateSchedule}
            />
          </>
        )}

        {currentMode === 'job' && (
          <>
            <TimeframeNav
              currentTimeframe={currentTimeframe}
              onSelectTimeframe={setCurrentTimeframe}
              counts={timeframeCounts}
              currentMode={currentMode}
            />
            <JobWorkspace
              state={state}
              currentTimeframe={currentTimeframe}
              onSelectTimeframe={setCurrentTimeframe}
              timeframeCounts={timeframeCounts}
              onToggleTaskComplete={handleToggleTaskComplete}
              onUpdateSubtasks={handleUpdateSubtasks}
              onDeleteTask={handleDeleteTask}
              onCreateTask={handleCreateTask}
              onUpdateProfile={handleUpdateProfile}
              onTriggerAI={handleTriggerAI}
            />
          </>
        )}
      </main>

      {/* 3. MODALS */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSave={handleCreateTask}
        initialMode={currentMode === 'overview' ? 'business' : currentMode}
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
