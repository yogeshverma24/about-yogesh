// src/components/today/DailyStatusAndAnalytics.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Star,
  User,
  Briefcase,
  GraduationCap,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  Database,
  RotateCw,
  Award,
  AlertCircle,
  Zap,
} from 'lucide-react';
import { DailyLogItem, MonthlyAnalyticsReport } from '@/lib/today/types';

interface Props {
  dailyLogs: DailyLogItem[];
  monthlyReports?: MonthlyAnalyticsReport[];
  onOpenLogModal: (log?: DailyLogItem) => void;
  onDeleteLog: (id: string) => Promise<void>;
  onTriggerAI: (topic: string, actionType: string) => void;
}

export function DailyStatusAndAnalytics({
  dailyLogs,
  monthlyReports = [],
  onOpenLogModal,
  onDeleteLog,
  onTriggerAI,
}: Props) {
  const currentMonthStr = new Date().toISOString().substring(0, 7);

  // Sub-tab: 'logs' (Daily Journal) vs 'analytics' (Monthly Performance Analytics)
  const [activeTab, setActiveTab] = useState<'logs' | 'analytics'>('logs');

  // Month selection for analytics
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthStr);
  const [analyticsReport, setAnalyticsReport] = useState<MonthlyAnalyticsReport | null>(null);
  const [isFromCache, setIsFromCache] = useState<boolean>(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Available months list (last 6 months)
  const availableMonths = React.useMemo(() => {
    const list: { key: string; label: string }[] = [];
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toISOString().substring(0, 7);
      const label = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      list.push({ key, label });
    }
    return list;
  }, []);

  // Fetch or check cached report when selectedMonth changes
  useEffect(() => {
    fetchReportForMonth(selectedMonth, false);
  }, [selectedMonth]);

  const fetchReportForMonth = async (month: string, forceRegenerate = false) => {
    setLoadingAnalytics(true);
    setErrorMsg(null);
    try {
      if (!forceRegenerate) {
        const existingLocal = monthlyReports.find((r) => r.month === month);
        if (existingLocal) {
          setAnalyticsReport(existingLocal);
          setIsFromCache(true);
          setLoadingAnalytics(false);
          return;
        }

        const res = await fetch(`/api/today/analytics?month=${month}`);
        const data = await res.json();
        if (data.success && data.report) {
          setAnalyticsReport(data.report);
          setIsFromCache(data.fromCache);
          setLoadingAnalytics(false);
          return;
        }
      }

      if (forceRegenerate) {
        const res = await fetch('/api/today/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ month, forceRegenerate: true }),
        });
        const data = await res.json();
        if (data.success && data.report) {
          setAnalyticsReport(data.report);
          setIsFromCache(false);
        } else {
          setErrorMsg(data.error || 'Failed to generate report');
        }
      } else {
        setAnalyticsReport(null);
        setIsFromCache(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error communicating with backend');
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const handleGenerateAnalytics = () => {
    fetchReportForMonth(selectedMonth, true);
  };

  return (
    <div className="bg-[#080a12]/90 border border-white/[0.08] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
      {/* 1. MINIMAL EXECUTIVE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-3.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-sky-400" />
              Daily Journal & Monthly Analytics
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800">
              Database Cached
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Log your daily execution across the 3 pillars and review monthly performance intelligence
          </p>
        </div>

        {/* Sub-tab navigation */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'logs'
                  ? 'bg-sky-400 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Daily Logs</span>
              <span className="text-[10px] font-mono opacity-80">({dailyLogs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-sky-400 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Monthly Analytics</span>
            </button>
          </div>

          {activeTab === 'logs' && (
            <button
              onClick={() => onOpenLogModal()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-400 hover:bg-sky-300 text-zinc-950 shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Today</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. TAB 1: DAILY STATUS LOGS */}
      {activeTab === 'logs' && (
        <div className="space-y-3">
          {dailyLogs.length === 0 ? (
            <div className="py-10 text-center rounded-2xl border border-dashed border-zinc-850 bg-zinc-900/20 space-y-2">
              <Calendar className="w-8 h-8 mx-auto text-zinc-600" />
              <h4 className="text-xs font-semibold text-zinc-300">No daily logs recorded yet</h4>
              <p className="text-[11px] text-zinc-500 max-w-sm mx-auto">
                Click &quot;Log Today&quot; to write down what you accomplished today across Personal, Business, and Job Prep.
              </p>
              <button
                onClick={() => onOpenLogModal()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-400 text-zinc-950 mt-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Today&apos;s Status</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {dailyLogs.map((log) => {
                const totalH = log.hoursWorked?.total || 0;
                const pH = log.hoursWorked?.personal || 0;
                const bH = log.hoursWorked?.business || 0;
                const jH = log.hoursWorked?.job || 0;

                const dateObj = new Date(log.date + 'T00:00:00');
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                });

                return (
                  <div
                    key={log.id}
                    className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-all space-y-3"
                  >
                    {/* Top Row */}
                    <div className="flex items-center justify-between gap-2 border-b border-zinc-800/70 pb-2.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-sky-400" />
                          <span>{formattedDate}</span>
                        </span>

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-950/50 text-amber-300 border border-amber-500/25 font-semibold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current text-amber-400" />
                          <span>Score: {log.productivityScore || 8}/10</span>
                        </span>

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800">
                          Total: {totalH.toFixed(1)}h
                        </span>
                      </div>

                      {/* Hours pills + Actions */}
                      <div className="flex items-center gap-2">
                        <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono">
                          <span className="px-1.5 py-0.5 rounded bg-sky-950/50 text-sky-300 border border-sky-500/20">
                            B: {bH}h
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-950/50 text-amber-300 border border-amber-500/20">
                            J: {jH}h
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-950/50 text-emerald-300 border border-emerald-500/20">
                            P: {pH}h
                          </span>
                        </div>

                        <button
                          onClick={() => onOpenLogModal(log)}
                          className="w-6 h-6 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
                          title="Edit Log"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onDeleteLog(log.id)}
                          className="w-6 h-6 rounded-lg bg-zinc-900 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 flex items-center justify-center transition-all"
                          title="Delete Log"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Content Columns: Business, Job, Personal */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      {/* Business */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-sky-400 font-bold flex items-center gap-1.5">
                          <Briefcase className="w-3 h-3" />
                          <span>Business ({bH}h)</span>
                        </span>
                        <p className="text-[11px] text-zinc-300 leading-snug">
                          {log.businessSummary || 'No updates logged.'}
                        </p>
                      </div>

                      {/* Job Prep */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-amber-400 font-bold flex items-center gap-1.5">
                          <GraduationCap className="w-3 h-3" />
                          <span>Job Prep ({jH}h)</span>
                        </span>
                        <p className="text-[11px] text-zinc-300 leading-snug">
                          {log.jobSummary || 'No updates logged.'}
                        </p>
                      </div>

                      {/* Personal */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                          <User className="w-3 h-3" />
                          <span>Personal ({pH}h)</span>
                        </span>
                        <p className="text-[11px] text-zinc-300 leading-snug">
                          {log.personalSummary || 'No updates logged.'}
                        </p>
                      </div>
                    </div>

                    {/* Takeaway / Reflection */}
                    {(log.keyTakeaway || log.plannedNext) && (
                      <div className="text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        {log.keyTakeaway && (
                          <div className="italic text-zinc-300">
                            💡 &quot;{log.keyTakeaway}&quot;
                          </div>
                        )}
                        {log.plannedNext && (
                          <div className="text-zinc-400 font-mono text-[10px]">
                            Next: {log.plannedNext}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3. TAB 2: MONTHLY AI PERFORMANCE ANALYTICS (CACHED IN DB) */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          {/* Month Selector Bar & Database Cache Indicator */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-400 font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-400" />
                <span>Select Month:</span>
              </span>

              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono text-white focus:outline-none focus:border-sky-400 font-semibold cursor-pointer"
              >
                {availableMonths.map((m) => (
                  <option key={m.key} value={m.key}>
                    {m.label} ({m.key})
                  </option>
                ))}
              </select>
            </div>

            {/* Cache Status Badge & Regenerate Button */}
            <div className="flex items-center gap-2">
              {analyticsReport && (
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex items-center gap-1 font-semibold ${
                    isFromCache
                      ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30'
                      : 'bg-sky-950/50 text-sky-300 border-sky-500/30'
                  }`}
                >
                  <Database className="w-3 h-3 text-emerald-400" />
                  <span>{isFromCache ? 'Loaded from Database (Cached)' : 'Freshly Generated & Saved to DB'}</span>
                </span>
              )}

              <button
                onClick={handleGenerateAnalytics}
                disabled={loadingAnalytics}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-zinc-950 shadow-sm transition-all disabled:opacity-50"
              >
                {loadingAnalytics ? (
                  <>
                    <RotateCw className="w-3 h-3 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" />
                    <span>{analyticsReport ? 'Regenerate with AI' : 'Generate Monthly Analytics'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Loading state */}
          {loadingAnalytics && (
            <div className="py-12 text-center rounded-2xl border border-zinc-800 bg-zinc-950/40 space-y-3">
              <div className="w-7 h-7 mx-auto rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
              <p className="text-xs font-mono text-zinc-300 animate-pulse">
                Synthesizing execution data and founder cadence for {selectedMonth} with Gemini AI...
              </p>
              <p className="text-[11px] text-zinc-500">
                The synthesized analytics will be automatically cached in the database for instant retrieval.
              </p>
            </div>
          )}

          {/* Report Display */}
          {!loadingAnalytics && analyticsReport && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* 1. TOP STATS ROW */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-amber-500/25 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Productivity Index</span>
                  <div className="text-xl font-bold font-mono text-amber-400 flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-amber-400" />
                    <span>{analyticsReport.productivityScore}%</span>
                  </div>
                  <span className="text-[10px] text-zinc-500">Monthly Weighted Score</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-sky-500/25 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Total Hours Logged</span>
                  <div className="text-xl font-bold font-mono text-sky-300">
                    {analyticsReport.totalHoursLogged.toFixed(1)}h
                  </div>
                  <span className="text-[10px] text-zinc-500">Across 3 Pillars</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-emerald-500/25 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Tracked Active Days</span>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {analyticsReport.totalDaysLogged} Days
                  </div>
                  <span className="text-[10px] text-zinc-500">Daily Log Entries</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block uppercase">Completed Tasks</span>
                  <div className="text-xl font-bold font-mono text-white">
                    {analyticsReport.tasksCompletedCount} Tasks
                  </div>
                  <span className="text-[10px] text-zinc-500">Milestones Reached</span>
                </div>
              </div>

              {/* 2. EXECUTIVE SUMMARY */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-sky-500/20 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>Executive Monthly Synthesis</span>
                </span>
                <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                  {analyticsReport.executiveSummary}
                </p>

                {/* Hours breakdown bar */}
                <div className="pt-2 border-t border-zinc-850 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                    <span className="text-sky-400 font-bold">Business: {analyticsReport.hoursBreakdown.business}h</span>
                    <span className="text-amber-400 font-bold">Job Prep: {analyticsReport.hoursBreakdown.job}h</span>
                    <span className="text-emerald-400 font-bold">Personal: {analyticsReport.hoursBreakdown.personal}h</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-900 rounded-full flex overflow-hidden">
                    <div
                      className="bg-sky-400 h-full"
                      style={{
                        width: `${
                          analyticsReport.totalHoursLogged > 0
                            ? (analyticsReport.hoursBreakdown.business / analyticsReport.totalHoursLogged) * 100
                            : 45
                        }%`,
                      }}
                      title="Business"
                    />
                    <div
                      className="bg-amber-400 h-full"
                      style={{
                        width: `${
                          analyticsReport.totalHoursLogged > 0
                            ? (analyticsReport.hoursBreakdown.job / analyticsReport.totalHoursLogged) * 100
                            : 30
                        }%`,
                      }}
                      title="Job Prep"
                    />
                    <div
                      className="bg-emerald-500 h-full"
                      style={{
                        width: `${
                          analyticsReport.totalHoursLogged > 0
                            ? (analyticsReport.hoursBreakdown.personal / analyticsReport.totalHoursLogged) * 100
                            : 25
                        }%`,
                      }}
                      title="Personal"
                    />
                  </div>
                </div>
              </div>

              {/* 3. KEY WINS & AREAS TO IMPROVE */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-zinc-950/70 border border-emerald-500/20 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Key Wins & Milestones Achieved</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {analyticsReport.keyWins.map((win, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span>{win}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/70 border border-amber-500/20 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Bottlenecks & Areas to Tighten</span>
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {analyticsReport.areasToImprove.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400 font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4. FOUNDER RECOMMENDATIONS FOR NEXT MONTH */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-sky-500/20 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Founder Strategic Directives for Next Month</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {analyticsReport.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-1"
                    >
                      <span className="text-[10px] font-mono text-sky-400 font-bold block">Directive {idx + 1}</span>
                      <p className="leading-snug">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. 3-PILLAR BREAKDOWN */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-sky-500/15 space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-sky-400 font-bold block">4 Business Ventures</span>
                  <p className="text-[11px] text-zinc-300 leading-snug">{analyticsReport.modeBreakdown.business}</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-amber-500/15 space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-amber-400 font-bold block">Job Prep & Tech Track</span>
                  <p className="text-[11px] text-zinc-300 leading-snug">{analyticsReport.modeBreakdown.job}</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/60 border border-emerald-500/15 space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block">Personal & Health</span>
                  <p className="text-[11px] text-zinc-300 leading-snug">{analyticsReport.modeBreakdown.personal}</p>
                </div>
              </div>
            </div>
          )}

          {/* Empty state when no report exists yet */}
          {!loadingAnalytics && !analyticsReport && (
            <div className="py-12 text-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-sky-400" />
              <h4 className="text-xs font-semibold text-zinc-300">
                No saved analytics report for {selectedMonth}
              </h4>
              <p className="text-[11px] text-zinc-500 max-w-sm mx-auto">
                Generate an AI productivity report based on this month&apos;s daily logs and completed tasks. Once generated, it is permanently saved in the database for instant retrieval.
              </p>
              <button
                onClick={handleGenerateAnalytics}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-400 text-zinc-950 mt-2 shadow-md shadow-sky-950/40"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Monthly AI Analytics</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
