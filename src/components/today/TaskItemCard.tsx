// src/components/today/TaskItemCard.tsx
'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Trash2,
  Tag,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { TaskItem, ChecklistItem } from '@/lib/today/types';
import { playChime } from '@/lib/today/sound';

interface Props {
  task: TaskItem;
  onToggleComplete: (id: string, currentStatus: string) => void;
  onUpdateSubtasks: (id: string, checklist: ChecklistItem[]) => void;
  onDelete: (id: string) => void;
}

export function TaskItemCard({ task, onToggleComplete, onUpdateSubtasks, onDelete }: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const isCompleted = task.status === 'completed';

  const handleToggle = () => {
    if (!isCompleted) {
      playChime('complete');
    } else {
      playChime('click');
    }
    onToggleComplete(task.id, task.status);
  };

  const handleToggleSubtask = (subId: string) => {
    playChime('click');
    const currentList = task.checklist || [];
    const updated = currentList.map((item) =>
      item.id === subId ? { ...item, done: !item.done } : item
    );
    onUpdateSubtasks(task.id, updated);
  };

  const priorityStyles: Record<string, string> = {
    high: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    low: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  };

  const modeBadge: Record<string, { label: string; color: string }> = {
    personal: { label: 'Personal', color: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
    business: { label: 'Business', color: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
    job: { label: 'Job Prep', color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  };

  const completedSubtasks = (task.checklist || []).filter((c) => c.done).length;
  const totalSubtasks = (task.checklist || []).length;

  return (
    <div
      className={`group relative rounded-2xl border p-4 transition-all duration-200 ${
        isCompleted
          ? 'bg-slate-900/40 border-white/5 opacity-75'
          : 'bg-slate-900/80 border-white/10 hover:border-white/20 hover:shadow-lg'
      }`}
    >
      <div className="flex items-start gap-3.5">
        {/* Toggle Checkbox Button */}
        <button
          onClick={handleToggle}
          className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors flex-shrink-0"
          title={isCompleted ? 'Mark pending' : 'Mark completed'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
          ) : (
            <Circle className="w-5 h-5 text-slate-500 hover:text-emerald-400 hover:scale-110 transition-transform" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {/* Mode Tag */}
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                modeBadge[task.mode]?.color || 'bg-slate-800 text-slate-300'
              }`}
            >
              {modeBadge[task.mode]?.label || task.mode}
            </span>

            {/* Category */}
            <span className="text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md">
              {task.category}
            </span>

            {/* Priority */}
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                priorityStyles[task.priority] || priorityStyles.medium
              }`}
            >
              {task.priority}
            </span>

            {/* Reminder Time */}
            {task.reminderTime && (
              <span className="flex items-center gap-1 text-[11px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                <Clock className="w-3 h-3" />
                <span>{task.reminderTime}</span>
              </span>
            )}

            {/* AI badge if generated */}
            {task.aiGenerated && (
              <span className="flex items-center gap-1 text-[10px] text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                <Sparkles className="w-2.5 h-2.5 text-indigo-400" />
                <span>AI Plan</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h4
            className={`text-sm sm:text-base font-semibold leading-snug tracking-tight ${
              isCompleted ? 'line-through text-slate-500' : 'text-white'
            }`}
          >
            {task.title}
          </h4>

          {/* Description */}
          {task.description && (
            <p className={`text-xs mt-1 leading-relaxed ${isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
              {task.description}
            </p>
          )}

          {/* Subtasks summary or Expand Button */}
          {totalSubtasks > 0 && (
            <div className="mt-2.5 flex items-center gap-3">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 transition-colors"
              >
                <span>
                  Checklist ({completedSubtasks}/{totalSubtasks})
                </span>
                {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          {/* Expanded Checklist Subtasks */}
          {expanded && totalSubtasks > 0 && (
            <div className="mt-3 space-y-1.5 pl-2 border-l-2 border-indigo-500/30">
              {task.checklist!.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => handleToggleSubtask(sub.id)}
                  className="flex items-center gap-2 text-xs cursor-pointer py-1 text-slate-300 hover:text-white group/sub"
                >
                  {sub.done ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-slate-500 group-hover/sub:text-slate-300 flex-shrink-0" />
                  )}
                  <span className={sub.done ? 'line-through text-slate-500' : 'text-slate-300'}>{sub.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
          {task.externalLink && (
            <a
              href={task.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-white/5 transition-colors"
              title={`Open ${task.externalLink}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

