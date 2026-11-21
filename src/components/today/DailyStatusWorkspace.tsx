// src/components/today/DailyStatusWorkspace.tsx
'use client';

import React, { useMemo } from 'react';
import {
  BookOpen,
  Plus,
  Calendar,
  Clock,
  Star,
  Sparkles,
  Database,
  ArrowLeft,
  Briefcase,
  GraduationCap,
  User,
  Activity,
  Flame,
} from 'lucide-react';
import { TodayDashboardState, DashboardMode, DailyLogItem } from '@/lib/today/types';
import { DailyStatusAndAnalytics } from './DailyStatusAndAnalytics';

interface Props {
  state: TodayDashboardState;
  onSelectMode: (mode: DashboardMode) => void;
  onOpenLogModal: (log?: DailyLogItem) => void;
  onDeleteLog: (id: string) => Promise<void>;
  onTriggerAI: (topicOrProduct: string, actionType: string) => void;
}

export function DailyStatusWorkspace({
  state,
  onSelectMode,
  onOpenLogModal,
  onDeleteLog,
  onTriggerAI,
}: Props) {
  const dailyLogs = state.dailyLogs || [];

  // Summary analytics computed from logs
  const stats = useMemo(() => {
    const totalLogs = dailyLogs.length;
    let totalHours = 0;
    let businessHours = 0;
    let jobHours = 0;
    let personalHours = 0;
    let totalScore = 0;

    dailyLogs.forEach((l) => {
      totalHours += l.hoursWorked?.total || 0;
      businessHours += l.hoursWorked?.business || 0;
      jobHours += l.hoursWorked?.job || 0;
      personalHours += l.hoursWorked?.personal || 0;
      totalScore += l.productivityScore || 8;
    });

    const avgScore = totalLogs > 0 ? (totalScore / totalLogs).toFixed(1) : '8.0';

    return {
      totalLogs,
      totalHours: totalHours.toFixed(1),
      businessHours: businessHours.toFixed(1),
      jobHours: jobHours.toFixed(1),
      personalHours: personalHours.toFixed(1),
      avgScore,
    };
  }, [dailyLogs]);

  const todayStr = new Date().toISOString().split('T')[0];
  const hasLoggedToday = dailyLogs.some((l) => l.date === todayStr);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. EXECUTIVE WORKSPACE HEADER */}
      <div className="p-6 rounded-3xl bg-zinc-900/50 border border-sky-500/20 backdrop-blur-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectMode('overview')}
                className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-all mr-1"
                title="Back to Overview"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>Executive Section • Daily Status & Retrospectives</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Database className="w-3 h-3 text-emerald-400" />
                <span>Dual-Sync DB</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white">
              Daily Task Status & Monthly Intelligence
            </h1>
            <p className="text-xs text-zinc-400 max-w-3xl leading-relaxed">
              Record daily accomplishments across Business, Job Prep, and Personal. Review your
              40-hour founder commitment with AI monthly retrospectives cached directly in your database.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0">
            <button
              onClick={() => onOpenLogModal()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-400 hover:bg-sky-300 text-zinc-950 transition-all shadow-md shadow-sky-950/40 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{hasLoggedToday ? 'Update Today\'s Status' : 'Log Today\'s Status'}</span>
            </button>
          </div>
        </div>

        {/* 2. SUMMARY KPI METRICS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/[0.06]">
          {/* Total Days */}
          <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-sky-400" />
              <span>Days Recorded</span>
            </span>
            <div className="text-lg font-bold font-mono text-white">
              {stats.totalLogs} <span className="text-xs font-normal text-zinc-500">entries</span>
            </div>
          </div>

          {/* Total Hours */}
          <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-indigo-400" />
              <span>Total Hours Logged</span>
            </span>
            <div className="text-lg font-bold font-mono text-white">
              {stats.totalHours}h
            </div>
          </div>

          {/* Productivity Score */}
          <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400" />
              <span>Avg Productivity</span>
            </span>
            <div className="text-lg font-bold font-mono text-amber-300">
              {stats.avgScore} <span className="text-xs font-normal text-zinc-500">/ 10</span>
            </div>
          </div>

          {/* Hours Split */}
          <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>Pillar Split</span>
            </span>
            <div className="text-[11px] font-mono text-zinc-300 flex items-center gap-2 pt-0.5">
              <span className="text-sky-300">B: {stats.businessHours}h</span>
              <span className="text-amber-300">J: {stats.jobHours}h</span>
              <span className="text-emerald-300">P: {stats.personalHours}h</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FULL DAILY STATUS JOURNAL & AI MONTHLY PERFORMANCE ANALYTICS */}
      <DailyStatusAndAnalytics
        dailyLogs={dailyLogs}
        monthlyReports={state.monthlyReports || []}
        onOpenLogModal={onOpenLogModal}
        onDeleteLog={onDeleteLog}
        onTriggerAI={onTriggerAI}
      />
    </div>
  );
}

