// src/components/today/TaskModal.tsx
'use client';

import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
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
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0d1410]/90">
          <h3 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2">
            <span>New Task or Sprint Item</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Mode Selector */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 block mb-1.5">
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
                  className={`py-2 px-3 text-xs font-semibold rounded-xl capitalize transition-all ${
                    mode === m
                      ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {m === 'job' ? 'Job Prep' : m}
                </button>
              ))}
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 block mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500"
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
            <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 block mb-1.5">
              Timeframe Horizon
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'today', label: 'Today (Aaj)' },
                { id: 'week', label: 'This Week' },
                { id: 'month', label: 'This Month' },
                { id: 'six_months', label: '6 Months' },
              ].map((tf) => (
                <button
                  type="button"
                  key={tf.id}
                  onClick={() => setTimeframe(tf.id as Timeframe)}
                  className={`py-1.5 px-2 text-xs font-medium rounded-lg transition-all ${
                    timeframe === tf.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 block mb-1.5">
              Task Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Delegatework SEO audit, Solve 2 Graph questions..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 block mb-1.5">
              Description / Notes (Optional)
            </label>
            <textarea
              placeholder="Key notes, context, or requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Priority & Reminder Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 block mb-1.5">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e: any) => setPriority(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 block mb-1.5">
                Reminder Time
              </label>
              <input
                type="text"
                placeholder="e.g. 11:30 AM"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* External Link */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 block mb-1.5">
              External URL (e.g. https://delegatework.in/)
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Checklist Subtasks */}
          <div>
            <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 block mb-1.5">
              Checklist Steps ({subtasks.length})
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
                className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold"
              >
                Add
              </button>
            </div>

            <div className="space-y-1">
              {subtasks.map((st, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/60 text-xs text-zinc-300 border border-zinc-800/60"
                >
                  <span>{st}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSubtask(i)}
                    className="text-zinc-600 hover:text-rose-400"
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
              className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-sm shadow-md shadow-emerald-500/15 transition-all active:scale-[0.98]"
            >
              Add To Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
