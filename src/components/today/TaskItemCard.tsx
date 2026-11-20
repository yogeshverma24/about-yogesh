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
  Sparkles,
} from 'lucide-react';
import { TaskItem, ChecklistItem } from '@/lib/today/types';
import { modeThemes } from '@/lib/today/theme';
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
  const theme = modeThemes[task.mode];

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

  const completedSubtasks = (task.checklist || []).filter((c) => c.done).length;
  const totalSubtasks = (task.checklist || []).length;

  return (
    <div
      className={`group relative rounded-2xl border p-3.5 sm:p-4 transition-all duration-200 ${
        isCompleted
          ? 'bg-zinc-950/40 border-zinc-900 opacity-60'
          : `bg-zinc-900/50 border-zinc-800/80 hover:${theme.borderActive} hover:bg-zinc-900/80 hover:shadow-md`
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Toggle Checkbox Button */}
        <button
          onClick={handleToggle}
          className="mt-0.5 text-zinc-500 hover:text-white transition-colors flex-shrink-0"
          title={isCompleted ? 'Mark pending' : 'Mark completed'}
        >
          {isCompleted ? (
            <CheckCircle2 className={`w-5 h-5 ${theme.textPrimary} fill-current/20`} />
          ) : (
            <Circle className={`w-5 h-5 text-zinc-600 group-hover:${theme.textPrimary} transition-colors`} />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            {/* Category */}
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 bg-zinc-800/70 border border-zinc-700/60 px-2 py-0.5 rounded-md">
              {task.category}
            </span>

            {/* Priority */}
            <span
              className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border ${
                task.priority === 'high'
                  ? 'text-rose-400 bg-rose-950/40 border-rose-500/30'
                  : 'text-zinc-400 bg-zinc-900 border-zinc-800'
              }`}
            >
              {task.priority}
            </span>

            {/* Reminder Time */}
            {task.reminderTime && (
              <span className={`flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md ${theme.badge}`}>
                <Clock className="w-3 h-3" />
                <span>{task.reminderTime}</span>
              </span>
            )}

            {/* AI badge if generated */}
            {task.aiGenerated && (
              <span className={`flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded ${theme.badge}`}>
                <Sparkles className="w-2.5 h-2.5" />
                <span>AI</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h4
            className={`text-sm sm:text-base font-semibold leading-snug tracking-tight ${
              isCompleted ? 'line-through text-zinc-500' : 'text-zinc-100 group-hover:text-white'
            }`}
          >
            {task.title}
          </h4>

          {/* Description */}
          {task.description && (
            <p className={`text-xs mt-1 leading-relaxed ${isCompleted ? 'text-zinc-600' : 'text-zinc-400'}`}>
              {task.description}
            </p>
          )}

          {/* Subtasks summary or Expand Button */}
          {totalSubtasks > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 px-2.5 py-1 rounded-lg border border-zinc-700/50 transition-colors"
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
            <div className="mt-2.5 space-y-1.5 pl-3 border-l-2 border-zinc-700">
              {task.checklist!.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => handleToggleSubtask(sub.id)}
                  className="flex items-center gap-2 text-xs cursor-pointer py-0.5 text-zinc-300 hover:text-white group/sub"
                >
                  {sub.done ? (
                    <CheckCircle2 className={`w-3.5 h-3.5 ${theme.textPrimary} flex-shrink-0`} />
                  ) : (
                    <Circle className="w-3.5 h-3.5 text-zinc-600 group-hover/sub:text-zinc-400 flex-shrink-0" />
                  )}
                  <span className={sub.done ? 'line-through text-zinc-500' : 'text-zinc-300'}>{sub.text}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-zinc-400 bg-zinc-800/40 border border-zinc-800 px-2 py-0.5 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
          {task.externalLink && (
            <a
              href={task.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-1.5 rounded-lg text-zinc-400 hover:${theme.textPrimary} hover:bg-zinc-800 transition-colors`}
              title={`Open ${task.externalLink}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 rounded-lg text-zinc-600 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
