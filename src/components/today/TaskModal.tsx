// src/components/today/TaskModal.tsx
'use client';

import React, { useState } from 'react';
import { X, Plus, Trash2, Clock, Link as LinkIcon, Sparkles } from 'lucide-react';
import { TaskItem, DashboardMode, Timeframe, TaskPriority } from '@/lib/today/types';
import { playChime } from '@/lib/today/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<TaskItem>) => void;
  initialMode: DashboardMode;
  initialTimeframe: Timeframe;
}

export function TaskModal({ isOpen, onClose, onSave, initialMode, initialTimeframe }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState<DashboardMode>(initialMode);
  const [category, setCategory] = useState('general');
  const [timeframe, setTimeframe] = useState<Timeframe>(initialTimeframe);
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [reminderTime, setReminderTime] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [newSubtask, setNewSubtask] = useState('');

  if (!isOpen) return null;

  const categoriesByMode: Record<DashboardMode, Array<{ id: string; label: string }>> = {
    personal: [
      { id: 'info', label: 'Personal Routine & Bio' },
      { id: 'finance', label: 'Financial Plan & Wealth' },
      { id: 'goals', label: 'Health & Personal Goals' },
    ],
    business: [
      { id: 'delegatework', label: 'Delegatework (Teams App)' },
      { id: 'fasly', label: 'Fasly (Kisan App)' },
      { id: 'campus', label: 'Campus (Student Community)' },
      { id: 'delegatespace', label: 'Delegatespace (Company Agency)' },
    ],
    job: [
      { id: 'dsa', label: 'DSA & Algorithms' },
      { id: 'system_design', label: 'System Design (HLD/LLD)' },
      { id: 'ios', label: 'iOS (Swift 6 & SwiftUI)' },
      { id: 'react_native', label: 'React Native' },
      { id: 'flutter', label: 'Flutter' },
      { id: 'communication', label: 'Communication & STAR' },
    ],
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setSubtasks([...subtasks, newSubtask.trim()]);
      setNewSubtask('');
    }
  };

  const handleRemoveSubtask = (idx: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    playChime('success');
    onSave({
      title: title.trim(),
      description: description.trim(),
      mode,
      category: category === 'general' ? categoriesByMode[mode][0]?.id || 'general' : category,
      timeframe,
      priority,
      reminderTime: reminderTime.trim() || undefined,
      externalLink: externalLink.trim() || undefined,
      checklist: subtasks.map((st, i) => ({
        id: `sub-${Date.now()}-${i}`,
        text: st,
        done: false,
      })),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/60">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>Create New High-Impact Task</span>
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Mode Selector */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Target Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['personal', 'business', 'job'] as const).map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setCategory(categoriesByMode[m][0]?.id || 'general');
                  }}
                  className={`py-2 px-3 text-xs font-bold rounded-xl capitalize transition-all ${
                    mode === m
                      ? m === 'personal'
                        ? 'bg-purple-600 text-white'
                        : m === 'business'
                        ? 'bg-blue-600 text-white'
                        : 'bg-emerald-600 text-white'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
            >
              {categoriesByMode[mode].map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Timeframe */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Timeframe Horizon
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'today', label: 'Aaj (Today)' },
                { id: 'week', label: 'This Week' },
                { id: 'month', label: 'This Month' },
                { id: 'six_months', label: '6 Months' },
              ].map((tf) => (
                <button
                  type="button"
                  key={tf.id}
                  onClick={() => setTimeframe(tf.id as Timeframe)}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-all ${
                    timeframe === tf.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Task Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Delegatework SEO audit, Solve 2 Graph questions..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Description / Notes (Optional)
            </label>
            <textarea
              placeholder="Key notes, requirements, or links..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-2 text-xs rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Priority & Reminder Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e: any) => setPriority(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Reminder Time
              </label>
              <input
                type="text"
                placeholder="e.g. 11:30 AM"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* External Link */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              External URL (e.g. https://delegatework.in/)
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Checklist Subtasks */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Checklist Subtasks ({subtasks.length})
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                placeholder="Add subtask step..."
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSubtask();
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
              >
                Add
              </button>
            </div>

            <div className="space-y-1">
              {subtasks.map((st, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 text-xs text-slate-300"
                >
                  <span>{st}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(i)}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98]"
            >
              Add To Roadmap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

