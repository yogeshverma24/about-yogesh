// src/components/today/PersonalView.tsx
'use client';

import React, { useState } from 'react';
import {
  User,
  Heart,
  Wallet,
  Target,
  Droplets,
  Moon,
  Zap,
  TrendingUp,
  Plus,
  Trash2,
  CheckCircle,
  Flame,
  Award,
  DollarSign,
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
  onUpdateMilestone,
}: Props) {
  const [activeTab, setActiveTab] = useState<'info' | 'finance' | 'goals'>('info');

  // Finance modal/form state
  const [showFinanceForm, setShowFinanceForm] = useState(false);
  const [finTitle, setFinTitle] = useState('');
  const [finAmount, setFinAmount] = useState('');
  const [finType, setFinType] = useState<'income' | 'expense' | 'investment' | 'goal'>('expense');
  const [finCategory, setFinCategory] = useState('general');

  const todayStr = new Date().toISOString().split('T')[0];

  // Calculations for financial health
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

  const handleWaterIncrement = () => {
    playChime('click');
    onUpdateProfile({ waterIntakeGlasses: (profile.waterIntakeGlasses || 0) + 1 });
  };

  const handleWaterDecrement = () => {
    playChime('click');
    if (profile.waterIntakeGlasses > 0) {
      onUpdateProfile({ waterIntakeGlasses: profile.waterIntakeGlasses - 1 });
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation for Personal Mode */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'info'
              ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <User className="w-4 h-4 text-purple-400" />
          <span>Personal Info & Routine</span>
        </button>

        <button
          onClick={() => setActiveTab('finance')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'finance'
              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Wallet className="w-4 h-4 text-emerald-400" />
          <span>Financial Plan</span>
        </button>

        <button
          onClick={() => setActiveTab('goals')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'goals'
              ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Target className="w-4 h-4 text-amber-400" />
          <span>Goals & Habits</span>
        </button>
      </div>

      {/* 1. PERSONAL INFO TAB */}
      {activeTab === 'info' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Daily State Card */}
          <div className="md:col-span-2 bg-slate-900/80 border border-white/10 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">{profile.name}</h3>
                <p className="text-xs text-slate-400">{profile.role}</p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold">
                <Flame className="w-4 h-4 text-purple-400" />
                <span>{profile.currentStreak || 14}d Focus Streak</span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1">
                Daily Focus Statement
              </span>
              <p className="text-sm font-medium text-slate-200 italic">
                &ldquo;{profile.dailyFocusStatement}&rdquo;
              </p>
            </div>

            {/* Daily Energy & Health Widgets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {/* Energy Level */}
              <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Energy Level</span>
                </div>
                <div className="flex items-center gap-1">
                  {(['high', 'medium', 'low'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => onUpdateProfile({ energyLevel: level })}
                      className={`px-2.5 py-1 text-xs rounded-lg font-bold uppercase transition-all ${
                        profile.energyLevel === level
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Water Intake */}
              <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Water (Glasses)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-cyan-300">
                    {profile.waterIntakeGlasses || 4} / 8
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleWaterDecrement}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                    >
                      -
                    </button>
                    <button
                      onClick={handleWaterIncrement}
                      className="w-7 h-7 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Sleep Hours */}
              <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-3 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Sleep Last Night</span>
                </div>
                <span className="text-xl font-black text-indigo-300">
                  {profile.sleepHours || 7.5} hrs
                </span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">Optimal recovery</span>
              </div>
            </div>
          </div>

          {/* Daily Routine Checklist */}
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-400" />
              <span>Daily Routine Protocols</span>
            </h4>

            <div className="space-y-2.5">
              <label
                onClick={() => {
                  playChime('click');
                  onUpdateProfile({ morningRoutineCompleted: !profile.morningRoutineCompleted });
                }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/5"
              >
                <input
                  type="checkbox"
                  checked={profile.morningRoutineCompleted}
                  readOnly
                  className="rounded border-slate-700 text-purple-600 focus:ring-0"
                />
                <div>
                  <h5 className="text-xs font-bold text-white">Morning Awakening Routine</h5>
                  <p className="text-[11px] text-slate-400">Hydration, 15m mobility, no screen first 20m</p>
                </div>
              </label>

              <label
                onClick={() => {
                  playChime('click');
                  onUpdateProfile({ nightReviewCompleted: !profile.nightReviewCompleted });
                }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors border border-white/5"
              >
                <input
                  type="checkbox"
                  checked={profile.nightReviewCompleted}
                  readOnly
                  className="rounded border-slate-700 text-purple-600 focus:ring-0"
                />
                <div>
                  <h5 className="text-xs font-bold text-white">Night Protocol & Day Review</h5>
                  <p className="text-[11px] text-slate-400">Review wins, set top 3 priorities for tomorrow</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 2. FINANCIAL PLAN TAB */}
      {activeTab === 'finance' && (
        <div className="space-y-5">
          {/* Top Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-medium">Monthly Inflow</span>
              <h4 className="text-lg sm:text-2xl font-black text-emerald-400 mt-1">
                ₹{totalIncome.toLocaleString('en-IN')}
              </h4>
              <span className="text-[10px] text-slate-500">Agency + Products</span>
            </div>

            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-medium">Monthly Outflow / Burn</span>
              <h4 className="text-lg sm:text-2xl font-black text-rose-400 mt-1">
                ₹{totalExpense.toLocaleString('en-IN')}
              </h4>
              <span className="text-[10px] text-slate-500">Servers, Ads & Living</span>
            </div>

            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-medium">Monthly SIP / Investments</span>
              <h4 className="text-lg sm:text-2xl font-black text-indigo-400 mt-1">
                ₹{totalInvestment.toLocaleString('en-IN')}
              </h4>
              <span className="text-[10px] text-emerald-400">Discipline Index Funds</span>
            </div>

            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4">
              <span className="text-xs text-slate-400 font-medium">Net Monthly Surplus</span>
              <h4 className="text-lg sm:text-2xl font-black text-cyan-400 mt-1">
                ₹{netSavings.toLocaleString('en-IN')}
              </h4>
              <span className="text-[10px] text-cyan-300">Available for reinvestment</span>
            </div>
          </div>

          {/* Emergency Fund & Goal Progress */}
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Liquid Emergency Reserve (6-Month Buffer)</span>
                </h4>
                <p className="text-xs text-slate-400">Target ₹3,00,000 for peace of mind</p>
              </div>
              <span className="text-sm font-mono font-bold text-emerald-300">₹1,80,000 / ₹3,00,000 (60%)</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[60%] rounded-full" />
            </div>
          </div>

          {/* Financial Transactions & Add Record */}
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Current Month Financial Ledger</h4>
              <button
                onClick={() => setShowFinanceForm(!showFinanceForm)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showFinanceForm ? 'Cancel' : 'Add Entry'}</span>
              </button>
            </div>

            {/* Quick Add Form */}
            {showFinanceForm && (
              <form onSubmit={handleAddFinance} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Title (e.g. AWS bill, Client retainers)"
                    value={finTitle}
                    onChange={(e) => setFinTitle(e.target.value)}
                    required
                    className="sm:col-span-2 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="number"
                    placeholder="Amount (₹)"
                    value={finAmount}
                    onChange={(e) => setFinAmount(e.target.value)}
                    required
                    className="px-3 py-2 text-xs rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <select
                    value={finType}
                    onChange={(e: any) => setFinType(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="income">Income (+)</option>
                    <option value="expense">Expense (-)</option>
                    <option value="investment">Investment (SIP)</option>
                    <option value="goal">Goal Target</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                >
                  Save Record
                </button>
              </form>
            )}

            {/* List */}
            <div className="divide-y divide-white/5">
              {finances.map((f) => (
                <div key={f.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <h5 className="font-semibold text-white">{f.title}</h5>
                    <span className="text-[10px] text-slate-400">
                      {f.date} &bull; {f.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono font-bold ${
                        f.type === 'income'
                          ? 'text-emerald-400'
                          : f.type === 'expense'
                          ? 'text-rose-400'
                          : 'text-indigo-400'
                      }`}
                    >
                      {f.type === 'income' ? '+' : f.type === 'expense' ? '-' : ''}₹
                      {f.amount.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => onDeleteFinance(f.id)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. GOALS & HABITS TAB */}
      {activeTab === 'goals' && (
        <div className="space-y-5">
          {/* Daily Habit Streaks */}
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Daily Personal Habit Streaks (Click to check today)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {habits
                .filter((h) => h.mode === 'personal')
                .map((habit) => {
                  const doneToday = habit.completedDates.includes(todayStr);

                  return (
                    <div
                      key={habit.id}
                      onClick={() => onToggleHabit(habit.id, todayStr)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        doneToday
                          ? 'bg-purple-950/30 border-purple-500/40'
                          : 'bg-white/5 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{habit.title}</span>
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            doneToday
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-white/5 text-slate-400'
                          }`}
                        >
                          {doneToday ? 'Done Today' : 'Pending'}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs font-mono text-amber-300">
                        <Flame className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{habit.streak} days streak (Best: {habit.bestStreak}d)</span>
                      </div>
                      {habit.notes && <p className="text-[11px] text-slate-400 mt-1">{habit.notes}</p>}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* 6-Month Personal Milestones */}
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-5 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" />
              <span>Personal 6-Month Vision Milestones</span>
            </h4>

            <div className="space-y-3">
              {milestones
                .filter((m) => m.mode === 'personal')
                .map((m) => (
                  <div key={m.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs sm:text-sm font-bold text-white">{m.title}</h5>
                      <span className="text-xs font-mono text-purple-300">{m.progress}%</span>
                    </div>

                    <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 transition-all duration-500"
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Target: {m.targetDate}</span>
                      <span>Metric: {m.metric}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

