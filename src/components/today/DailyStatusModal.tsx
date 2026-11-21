// src/components/today/DailyStatusModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Star,
  Save,
  Briefcase,
  GraduationCap,
  User,
  Sparkles,
  Zap,
} from 'lucide-react';
import { DailyLogItem } from '@/lib/today/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaveLog: (log: Partial<DailyLogItem>) => Promise<void>;
  existingLog?: DailyLogItem | null;
}

export function DailyStatusModal({
  isOpen,
  onClose,
  onSaveLog,
  existingLog,
}: Props) {
  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState<string>(todayStr);
  const [personalSummary, setPersonalSummary] = useState<string>('');
  const [businessSummary, setBusinessSummary] = useState<string>('');
  const [jobSummary, setJobSummary] = useState<string>('');
  const [plannedNext, setPlannedNext] = useState<string>('');
  const [personalHours, setPersonalHours] = useState<string>('1.5');
  const [businessHours, setBusinessHours] = useState<string>('3.5');
  const [jobHours, setJobHours] = useState<string>('1.0');
  const [productivityScore, setProductivityScore] = useState<number>(8);
  const [keyTakeaway, setKeyTakeaway] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (existingLog) {
      setDate(existingLog.date || todayStr);
      setPersonalSummary(existingLog.personalSummary || '');
      setBusinessSummary(existingLog.businessSummary || '');
      setJobSummary(existingLog.jobSummary || '');
      setPlannedNext(existingLog.plannedNext || '');
      setPersonalHours(String(existingLog.hoursWorked?.personal ?? '1.5'));
      setBusinessHours(String(existingLog.hoursWorked?.business ?? '3.5'));
      setJobHours(String(existingLog.hoursWorked?.job ?? '1.0'));
      setProductivityScore(existingLog.productivityScore ?? 8);
      setKeyTakeaway(existingLog.keyTakeaway || '');
    } else {
      setDate(todayStr);
      setPersonalSummary('');
      setBusinessSummary('');
      setJobSummary('');
      setPlannedNext('');
      setPersonalHours('1.5');
      setBusinessHours('3.5');
      setJobHours('1.0');
      setProductivityScore(8);
      setKeyTakeaway('');
    }
  }, [existingLog, isOpen, todayStr]);

  if (!isOpen) return null;

  const totalCalculatedHours =
    (parseFloat(personalHours) || 0) +
    (parseFloat(businessHours) || 0) +
    (parseFloat(jobHours) || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSaveLog({
        id: existingLog?.id,
        date,
        personalSummary: personalSummary.trim(),
        businessSummary: businessSummary.trim(),
        jobSummary: jobSummary.trim(),
        plannedNext: plannedNext.trim(),
        hoursWorked: {
          personal: parseFloat(personalHours) || 0,
          business: parseFloat(businessHours) || 0,
          job: parseFloat(jobHours) || 0,
          total: totalCalculatedHours,
        },
        productivityScore,
        keyTakeaway: keyTakeaway.trim(),
      });
      onClose();
    } catch (err) {
      console.error('Failed to save daily log:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#080a12]/95 border border-white/[0.08] rounded-3xl p-5 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,0.9)] space-y-5 max-h-[92vh] overflow-y-auto">
        {/* 1. MINIMAL HEADER */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center text-sky-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono tracking-tight">
                {existingLog ? 'Edit Daily Status' : 'Log Daily Task Status'}
              </h3>
              <p className="text-[11px] text-zinc-400">
                Record today&apos;s output across Business, Job Prep, and Personal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Minimal Date Input */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
              />
            </div>

            <button
              onClick={onClose}
              className="w-7 h-7 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Productivity Rating Ribbon (Clean Interactive Pills) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-2xl bg-zinc-900/40 border border-white/[0.04]">
            <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5 pl-1">
              <Star className="w-3.5 h-3.5 text-amber-400" />
              <span>Productivity Score:</span>
            </span>

            {/* Rating Buttons 1 to 10 */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => {
                const active = productivityScore === score;
                return (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setProductivityScore(score)}
                    className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                      active
                        ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-950/40 scale-105'
                        : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800/80'
                    }`}
                  >
                    {score}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Pillars (Clean, Spaced, Hours Directly Integrated) */}
          <div className="space-y-3.5">
            {/* Pillar 1: Business */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/30 border border-sky-500/20 space-y-2 hover:border-sky-500/35 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span className="text-xs font-semibold text-sky-300 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                    <span>Business & Ventures</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono">
                  <span className="text-zinc-400 text-[11px]">Hours:</span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    value={businessHours}
                    onChange={(e) => setBusinessHours(e.target.value)}
                    className="w-10 bg-transparent text-right font-bold text-sky-300 focus:outline-none"
                  />
                  <span className="text-zinc-500 text-[10px]">h</span>
                </div>
              </div>

              <textarea
                rows={2}
                placeholder="What did you ship today? (Delegatework SEO, LinkedIn post, client milestone...)"
                value={businessSummary}
                onChange={(e) => setBusinessSummary(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-sky-500/50 transition-all resize-y min-h-[56px]"
              />
            </div>

            {/* Pillar 2: Job Prep */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/30 border border-amber-500/20 space-y-2 hover:border-amber-500/35 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Job Prep & Technical Track</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono">
                  <span className="text-zinc-400 text-[11px]">Hours:</span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    value={jobHours}
                    onChange={(e) => setJobHours(e.target.value)}
                    className="w-10 bg-transparent text-right font-bold text-amber-300 focus:outline-none"
                  />
                  <span className="text-zinc-500 text-[10px]">h</span>
                </div>
              </div>

              <textarea
                rows={2}
                placeholder="What did you study or solve? (LeetCode Course Schedule, Redis caching, Swift 6...)"
                value={jobSummary}
                onChange={(e) => setJobSummary(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 transition-all resize-y min-h-[56px]"
              />
            </div>

            {/* Pillar 3: Personal */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/30 border border-emerald-500/20 space-y-2 hover:border-emerald-500/35 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Personal & Health</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono">
                  <span className="text-zinc-400 text-[11px]">Hours:</span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    value={personalHours}
                    onChange={(e) => setPersonalHours(e.target.value)}
                    className="w-10 bg-transparent text-right font-bold text-emerald-300 focus:outline-none"
                  />
                  <span className="text-zinc-500 text-[10px]">h</span>
                </div>
              </div>

              <textarea
                rows={2}
                placeholder="Routines, gym workout, hydration, 20p reading, or wealth checks..."
                value={personalSummary}
                onChange={(e) => setPersonalSummary(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 transition-all resize-y min-h-[56px]"
              />
            </div>
          </div>

          {/* Minimal Bottom Bar: Tomorrow Priority & Key Reflection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Tomorrow&apos;s Focus
              </span>
              <input
                type="text"
                placeholder="e.g. Friday Campus user growth sprint"
                value={plannedNext}
                onChange={(e) => setPlannedNext(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-zinc-600 focus:outline-none font-sans"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Key Reflection
              </span>
              <input
                type="text"
                placeholder="e.g. Deep evening block with zero distraction"
                value={keyTakeaway}
                onChange={(e) => setKeyTakeaway(e.target.value)}
                className="w-full bg-transparent text-xs text-white placeholder-zinc-600 focus:outline-none font-sans"
              />
            </div>
          </div>

          {/* Actions Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            {/* Total Hours Badge */}
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Total Logged:</span>
              <strong className="text-sky-300 font-bold">{totalCalculatedHours.toFixed(1)}h</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-sky-400 hover:bg-sky-300 text-zinc-950 shadow-md shadow-sky-950/40 transition-all active:scale-95 disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saving ? 'Saving...' : existingLog ? 'Update Status' : 'Save Status'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
