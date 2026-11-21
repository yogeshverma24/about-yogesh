// src/components/today/TodayNavbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Plus,
  Timer,
  LayoutDashboard,
  User,
  Briefcase,
  GraduationCap,
  BookOpen,
  Layers,
} from 'lucide-react';
import { DashboardMode } from '@/lib/today/types';
import { modeThemes } from '@/lib/today/theme';
import { OperatingHubId } from '@/lib/today/hubData';

interface Props {
  currentMode: DashboardMode;
  onSelectMode: (mode: DashboardMode) => void;
  onOpenTaskModal: () => void;
  onOpenAIModal: () => void;
  onOpenTimerModal: () => void;
  onOpenLogModal?: () => void;
  onOpenHub?: (hubId: OperatingHubId) => void;
}

export function TodayNavbar({
  currentMode,
  onSelectMode,
  onOpenTaskModal,
  onOpenAIModal,
  onOpenTimerModal,
  onOpenLogModal,
  onOpenHub,
}: Props) {
  const theme = modeThemes[currentMode];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-zinc-950/70 border-b border-white/[0.06] px-4 sm:px-8 py-3 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Clean Minimal Logo */}
        <div className="flex items-center gap-2.5">
          <span className={`w-2 h-2 rounded-full ${theme.indicator}`} />
          <span className="font-mono text-sm font-bold tracking-tight text-zinc-100">
            /today
          </span>
        </div>

        {/* Center: 4 Modes Segmented Control */}
        <div className="flex items-center justify-center bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/80 shadow-inner">
          {/* Mode 0: Executive Overview (Royal Iris / Indigo) */}
          <button
            onClick={() => onSelectMode('overview')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs tracking-tight transition-all duration-200 ${
              currentMode === 'overview'
                ? 'bg-indigo-500 text-zinc-950 font-bold shadow-md shadow-indigo-950/40'
                : 'text-zinc-400 hover:text-indigo-400 hover:bg-white/[0.03]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          {/* Mode 1: Personal (Soft Emerald) */}
          <button
            onClick={() => onSelectMode('personal')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs tracking-tight transition-all duration-200 ${
              currentMode === 'personal'
                ? 'bg-[#10b981] text-zinc-950 font-bold shadow-md shadow-emerald-950/40'
                : 'text-zinc-400 hover:text-emerald-400 hover:bg-white/[0.03]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Personal</span>
          </button>

          {/* Mode 2: Business (Ice Sky Blue) */}
          <button
            onClick={() => onSelectMode('business')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs tracking-tight transition-all duration-200 ${
              currentMode === 'business'
                ? 'bg-[#38bdf8] text-zinc-950 font-bold shadow-md shadow-sky-950/40'
                : 'text-zinc-400 hover:text-sky-400 hover:bg-white/[0.03]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Business</span>
          </button>

          {/* Mode 3: Job Prep (Rich Golden Amber) */}
          <button
            onClick={() => onSelectMode('job')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs tracking-tight transition-all duration-200 ${
              currentMode === 'job'
                ? 'bg-amber-500 text-zinc-950 font-bold shadow-md shadow-amber-900/30'
                : 'text-zinc-400 hover:text-amber-400 hover:bg-white/[0.03]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Job Prep</span>
          </button>
        </div>

        {/* Right: Daily Status, AI Copilot, Timer, New Task (+) */}
        <div className="flex items-center justify-end gap-2 sm:gap-2.5">
          {/* Daily Status Section Button (Same position, opens full section) */}
          <button
            onClick={() => {
              if (currentMode !== 'status') {
                onSelectMode('status');
              } else if (onOpenLogModal) {
                onOpenLogModal();
              }
            }}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 shadow-sm ${
              currentMode === 'status'
                ? 'bg-sky-400 text-zinc-950 font-bold border-sky-400 shadow-md shadow-sky-950/40'
                : 'bg-zinc-900/90 hover:bg-zinc-800/90 text-zinc-300 hover:text-white border-zinc-800'
            }`}
            title={currentMode === 'status' ? 'Log Daily Status' : 'Open Daily Status Section'}
          >
            <BookOpen
              className={`w-3.5 h-3.5 ${
                currentMode === 'status' ? 'text-zinc-950' : 'text-sky-400'
              }`}
            />
            <span className="hidden md:inline">Daily Status</span>
          </button>

          {/* Workspaces Hub Launcher */}
          <Link
            href="/today/clients"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition-all active:scale-95 shadow-sm cursor-pointer"
            title="Open Operating Workspaces (7 Standalone Pages)"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden lg:inline">Workspaces (7)</span>
          </Link>

          {/* AI Copilot */}
          <button
            onClick={onOpenAIModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium ${theme.badge} hover:brightness-110 transition-all shadow-sm active:scale-95`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${theme.textPrimary}`} />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          {/* Focus Timer */}
          <button
            onClick={onOpenTimerModal}
            className="w-8 h-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors flex items-center justify-center active:scale-95"
            title="Focus Timer"
          >
            <Timer className="w-4 h-4" />
          </button>

          {/* New Task (ONLY + ICON) */}
          <button
            onClick={onOpenTaskModal}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-95 ${theme.buttonPrimary}`}
            title="Create New Task"
          >
            <Plus className="w-4 h-4 text-zinc-950 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </header>
  );
}
