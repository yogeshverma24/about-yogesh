// src/components/today/PersonalView.tsx
'use client';

import React, { useState } from 'react';
import {
  User,
  Wallet,
  Target,
  Droplets,
  Moon,
  Zap,
  Plus,
  Trash2,
  CheckCircle,
  Flame,
  Award,
} from 'lucide-react';
import { PersonalProfile, FinancialRecord, HabitItem, MilestoneItem } from '@/lib/today/types';
import { playChime } from '@/lib/today/sound';

interface Props {
  profile: PersonalProfile;
  habits: HabitItem[];
  finances: FinancialRecord[];
  milestones: MilestoneItem[];
  onUpdateProfile: (updates: Partial<PersonalProfile>) => void;
  onToggleHabit: (id: string, date: string) => void;
  onAddFinance: (record: Partial<FinancialRecord>) => void;
  onDeleteFinance: (id: string) => void;
  onUpdateMilestone: (id: string, progress: number) => void;
}

export function PersonalView({
  profile,
  habits,
  finances,
  milestones,
  onUpdateProfile,
  onToggleHabit,
  onAddFinance,
  onDeleteFinance,
}: Props) {
  const [activeTab, setActiveTab] = useState<'routine' | 'finance' | 'habits'>('routine');
  const [showFinanceForm, setShowFinanceForm] = useState(false);
  const [finTitle, setFinTitle] = useState('');
  const [finAmount, setFinAmount] = useState('');
  const [finType, setFinType] = useState<'income' | 'expense' | 'investment' | 'goal'>('expense');
  const [finCategory, setFinCategory] = useState('general');

  const todayStr = new Date().toISOString().split('T')[0];

  const totalIncome = finances
    .filter((f) => f.type === 'income')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalExpense = finances
    .filter((f) => f.type === 'expense')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalInvestment = finances
    .filter((f) => f.type === 'investment')
    .reduce((sum, f) => sum + f.amount, 0);

  const netSavings = totalIncome - totalExpense;

  const handleAddFinance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finTitle || !finAmount) return;
    playChime('success');
    onAddFinance({
      title: finTitle,
      amount: parseFloat(finAmount),
      type: finType,
      category: finCategory,
      date: todayStr,
      month: todayStr.substring(0, 7),
    });
    setFinTitle('');
    setFinAmount('');
    setShowFinanceForm(false);
  };

  return (
    <div className="bg-[#0a120e]/70 border border-emerald-500/20 rounded-3xl p-4 sm:p-5 space-y-4">
      {/* Sub-tabs */}
      <div className="flex items-center justify-between border-b border-emerald-500/15 pb-3">
        <div className="flex items-center gap-1.5 bg-zinc-950/60 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveTab('routine')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'routine'
                ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Routine & Bio
          </button>
          <button
            onClick={() => setActiveTab('finance')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'finance'
                ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Finances
          </button>
          <button
            onClick={() => setActiveTab('habits')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'habits'
                ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Habits
          </button>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>{profile.currentStreak || 14}d streak</span>
        </div>
      </div>

      {/* 1. ROUTINE & HEALTH */}
      {activeTab === 'routine' && (
        <div className="space-y-3.5">
          {/* Daily Protocol Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <label
              onClick={() => {
                playChime('click');
                onUpdateProfile({ morningRoutineCompleted: !profile.morningRoutineCompleted });
              }}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850 cursor-pointer hover:border-emerald-500/30 transition-all"
            >
              <input
                type="checkbox"
                checked={profile.morningRoutineCompleted}
                readOnly
                className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
              />
              <div className="min-w-0">
                <span className="text-xs font-semibold text-zinc-200 block truncate">Morning Routine</span>
                <span className="text-[10px] text-zinc-400 truncate block">Hydration & 15m mobility</span>
              </div>
            </label>

            <label
              onClick={() => {
                playChime('click');
                onUpdateProfile({ nightReviewCompleted: !profile.nightReviewCompleted });
              }}
              className="flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850 cursor-pointer hover:border-emerald-500/30 transition-all"
            >
              <input
                type="checkbox"
                checked={profile.nightReviewCompleted}
                readOnly
                className="rounded border-zinc-700 text-emerald-500 focus:ring-0"
              />
              <div className="min-w-0">
                <span className="text-xs font-semibold text-zinc-200 block truncate">Night Protocol</span>
                <span className="text-[10px] text-zinc-400 truncate block">Review & prioritize tomorrow</span>
              </div>
            </label>
          </div>

          {/* Health Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Water */}
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-400 flex items-center justify-center gap-1 mb-1">
                <Droplets className="w-3 h-3 text-emerald-400" />
                <span>Water</span>
              </span>
              <div className="flex items-center justify-center gap-1.5">
                <button
                  onClick={() => profile.waterIntakeGlasses > 0 && onUpdateProfile({ waterIntakeGlasses: profile.waterIntakeGlasses - 1 })}
                  className="w-5 h-5 rounded bg-zinc-800 text-white text-xs font-bold"
                >
                  -
                </button>
                <span className="text-sm font-bold font-mono text-zinc-100">{profile.waterIntakeGlasses || 4}/8</span>
                <button
                  onClick={() => onUpdateProfile({ waterIntakeGlasses: (profile.waterIntakeGlasses || 0) + 1 })}
                  className="w-5 h-5 rounded bg-emerald-500 text-zinc-950 text-xs font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Energy */}
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-400 flex items-center justify-center gap-1 mb-1">
                <Zap className="w-3 h-3 text-emerald-400" />
                <span>Energy</span>
              </span>
              <span className="text-xs font-bold uppercase text-emerald-300 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                {profile.energyLevel || 'High'}
              </span>
            </div>

            {/* Sleep */}
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-400 flex items-center justify-center gap-1 mb-1">
                <Moon className="w-3 h-3 text-emerald-400" />
                <span>Sleep</span>
              </span>
              <span className="text-xs font-bold font-mono text-zinc-200">
                {profile.sleepHours || 7.5} hrs
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. FINANCES */}
      {activeTab === 'finance' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-400">Monthly Inflow</span>
              <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                ₹{totalIncome.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-400">Monthly Burn</span>
              <div className="text-sm font-bold font-mono text-zinc-300 mt-0.5">
                ₹{totalExpense.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-400">Monthly SIP Target</span>
              <div className="text-sm font-bold font-mono text-emerald-300 mt-0.5">
                ₹{totalInvestment.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-400">Net Surplus</span>
              <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                ₹{netSavings.toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          {/* Emergency Fund progress */}
          <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-zinc-300 font-medium">Emergency Reserve Fund</span>
              <span className="font-mono text-emerald-400 font-bold">₹1.8L / ₹3.0L</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-850 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 w-[60%]" />
            </div>
          </div>
        </div>
      )}

      {/* 3. HABITS */}
      {activeTab === 'habits' && (
        <div className="space-y-2">
          {habits
            .filter((h) => h.mode === 'personal')
            .slice(0, 3)
            .map((h) => {
              const doneToday = h.completedDates.includes(todayStr);

              return (
                <div
                  key={h.id}
                  onClick={() => onToggleHabit(h.id, todayStr)}
                  className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                    doneToday
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                      : 'bg-zinc-950/60 border-zinc-850 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <span className="truncate pr-2 font-medium">{h.title}</span>
                  <div className="flex items-center gap-1.5 flex-shrink-0 font-mono text-[11px]">
                    <Flame className="w-3 h-3 text-emerald-400 fill-current" />
                    <span>{h.streak}d</span>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
