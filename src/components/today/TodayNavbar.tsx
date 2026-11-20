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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-white/10 px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Brand, Clock, Streak */}
        <div className="flex items-center justify-between md:justify-start gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors flex items-center gap-1"
              title="Return to public portfolio"
            >
              <span>Portfolio</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                <span>/today</span>
                <span className="text-xs font-mono font-medium text-slate-400 hidden sm:inline">OS</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg shadow-inner">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>{currentDate}</span>
            <span className="text-slate-600">|</span>
            <span className="font-bold text-white tracking-wider">{currentTime}</span>
          </div>

          {streak > 0 && (
            <div
              className="hidden lg:flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full"
              title={`${streak} Days Productive Streak`}
            >
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{streak}d streak</span>
            </div>
          )}
        </div>

        {/* Center: 3 Modes Switcher */}
        <div className="flex items-center justify-center bg-slate-900/90 p-1 rounded-xl border border-white/10 shadow-lg">
          {/* Mode 1: Personal */}
          <button
            onClick={() => handleModeChange('personal')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              currentMode === 'personal'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>1. Personal</span>
          </button>

          {/* Mode 2: Business */}
          <button
            onClick={() => handleModeChange('business')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              currentMode === 'business'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>2. Business</span>
          </button>

          {/* Mode 3: Job Prep */}
          <button
            onClick={() => handleModeChange('job')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              currentMode === 'job'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>3. Job Prep</span>
          </button>
        </div>

        {/* Right: AI Copilot, Timer, New Task, Lock */}
        <div className="flex items-center justify-end gap-2">
          {/* AI Copilot */}
          <button
            onClick={() => {
              if (soundEnabled) playChime('click');
              onOpenAIModal();
            }}
            className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-md shadow-indigo-600/25 border border-indigo-400/30 transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" />
            <span className="hidden sm:inline">Gemini AI</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Focus Timer */}
          <button
            onClick={() => {
              if (soundEnabled) playChime('click');
              onOpenTimerModal();
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            title="Focus Timer (Pomodoro)"
          >
            <Timer className="w-4 h-4 text-emerald-400" />
          </button>

          {/* New Task */}
          <button
            onClick={() => {
              if (soundEnabled) playChime('click');
              onOpenTaskModal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 bg-white hover:bg-slate-200 shadow transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
            title={soundEnabled ? 'Mute Sounds' : 'Enable Audio Chimes'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Lock / Security */}
          <button
            onClick={onLock}
            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 border border-white/10 transition-colors"
            title="Lock Dashboard"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

