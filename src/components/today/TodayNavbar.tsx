// src/components/today/TodayNavbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Plus,
  Timer,
  Lock,
  Volume2,
  VolumeX,
  ArrowUpRight,
  User,
  Briefcase,
  GraduationCap,
  Calendar,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { DashboardMode } from '@/lib/today/types';
import { playChime } from '@/lib/today/sound';

interface Props {
  currentMode: DashboardMode;
  onSelectMode: (mode: DashboardMode) => void;
  onOpenTaskModal: () => void;
  onOpenAIModal: () => void;
  onOpenTimerModal: () => void;
  onLock: () => void;
  streak: number;
}

export function TodayNavbar({
  currentMode,
  onSelectMode,
  onOpenTaskModal,
  onOpenAIModal,
  onOpenTimerModal,
  onLock,
  streak,
}: Props) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleModeChange = (mode: DashboardMode) => {
    if (soundEnabled) playChime('click');
    onSelectMode(mode);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#090d0b]/85 border-b border-emerald-500/10 px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Brand, Clock, Streak */}
        <div className="flex items-center justify-between md:justify-start gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="text-[11px] font-mono tracking-tight px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-400 border border-emerald-500/20 transition-all flex items-center gap-1 active:scale-95"
              title="Return to portfolio"
            >
              <span>Portfolio</span>
              <ArrowUpRight className="w-3 h-3 text-emerald-400" />
            </Link>

            <div className="flex items-center gap-2 pl-1 border-l border-emerald-500/15">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-zinc-100 flex items-center gap-1.5">
                <span>/today</span>
                <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Workspace
                </span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-zinc-900/80 border border-zinc-800/80 px-2.5 sm:px-3 py-1 rounded-lg shadow-sm">
            <Calendar className="w-3 h-3 text-emerald-400" />
            <span className="text-[11px] text-zinc-300">{currentDate}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-[11px] font-semibold text-emerald-400 tracking-wider">{currentTime}</span>
          </div>

          {streak > 0 && (
            <div
              className="hidden lg:flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-300 bg-emerald-950/30 border border-emerald-500/20 px-2.5 py-1 rounded-lg"
              title={`${streak} Days Streak`}
            >
              <Flame className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span>{streak}d streak</span>
            </div>
          )}
        </div>

        {/* Center: 3 Modes Segmented Control */}
        <div className="flex items-center justify-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800/80 shadow-inner">
          {/* Mode 1: Personal */}
          <button
            onClick={() => handleModeChange('personal')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all duration-200 ${
              currentMode === 'personal'
                ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Personal</span>
          </button>

          {/* Mode 2: Business */}
          <button
            onClick={() => handleModeChange('business')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all duration-200 ${
              currentMode === 'business'
                ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Business</span>
          </button>

          {/* Mode 3: Job Prep */}
          <button
            onClick={() => handleModeChange('job')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all duration-200 ${
              currentMode === 'job'
                ? 'bg-emerald-500 text-zinc-950 font-bold shadow-md shadow-emerald-500/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Job Prep</span>
          </button>
        </div>

        {/* Right: AI Assistant, Focus Timer, New Task, Sound & Lock */}
        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
          {/* AI Copilot */}
          <button
            onClick={() => {
              if (soundEnabled) playChime('click');
              onOpenAIModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 transition-all shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Gemini AI</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Focus Timer */}
          <button
            onClick={() => {
              if (soundEnabled) playChime('click');
              onOpenTimerModal();
            }}
            className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-emerald-400 border border-zinc-800 transition-colors"
            title="Focus Timer (Pomodoro)"
          >
            <Timer className="w-4 h-4" />
          </button>

          {/* Add Task */}
          <button
            onClick={() => {
              if (soundEnabled) playChime('click');
              onOpenTaskModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-zinc-950 bg-emerald-400 hover:bg-emerald-300 shadow-md shadow-emerald-500/15 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 text-zinc-950" />
            <span>Add Task</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
            title={soundEnabled ? 'Mute Sounds' : 'Enable Audio Chimes'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-zinc-600" />}
          </button>

          {/* Lock */}
          <button
            onClick={onLock}
            className="p-2 rounded-lg bg-zinc-900/80 hover:bg-rose-500/10 text-zinc-400 hover:text-rose-400 border border-zinc-800 transition-colors"
            title="Lock Dashboard"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
