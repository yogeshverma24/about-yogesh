// src/components/today/FocusTimerModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Timer, Zap, Flame } from 'lucide-react';
import { playChime } from '@/lib/today/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function FocusTimerModal({ isOpen, onClose }: Props) {
  const [secondsLeft, setSecondsLeft] = useState<number>(25 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [mode, setMode] = useState<'pomodoro' | 'deepwork' | 'break'>('pomodoro');

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      setIsActive(false);
      playChime('alert');
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  if (!isOpen) return null;

  const selectMode = (m: 'pomodoro' | 'deepwork' | 'break') => {
    setIsActive(false);
    setMode(m);
    if (m === 'pomodoro') setSecondsLeft(25 * 60);
    if (m === 'deepwork') setSecondsLeft(50 * 60);
    if (m === 'break') setSecondsLeft(5 * 60);
  };

  const toggleTimer = () => {
    playChime('click');
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    playChime('click');
    setIsActive(false);
    if (mode === 'pomodoro') setSecondsLeft(25 * 60);
    if (mode === 'deepwork') setSecondsLeft(50 * 60);
    if (mode === 'break') setSecondsLeft(5 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalTime = mode === 'pomodoro' ? 25 * 60 : mode === 'deepwork' ? 50 * 60 : 5 * 60;
  const progressPercent = ((totalTime - secondsLeft) / totalTime) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl shadow-2xl p-6 text-center space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Deep Focus Mode</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-white/5">
          <button
            onClick={() => selectMode('pomodoro')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              mode === 'pomodoro' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            25m Sprint
          </button>
          <button
            onClick={() => selectMode('deepwork')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              mode === 'deepwork' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            50m Deep
          </button>
          <button
            onClick={() => selectMode('break')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
              mode === 'break' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            5m Rest
          </button>
        </div>

        {/* Countdown Display */}
        <div className="relative w-48 h-48 mx-auto flex flex-col items-center justify-center rounded-full border-4 border-white/5 bg-slate-950/80 shadow-inner">
          <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-widest">
            {formattedTime}
          </span>
          <span className="text-[10px] font-mono uppercase text-slate-500 mt-1">
            {isActive ? 'In Deep Flow' : 'Paused'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={resetTimer}
            className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm shadow-lg transition-all active:scale-95 ${
              isActive
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/30'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-slate-950" />}
            <span>{isActive ? 'Pause Flow' : 'Start Focus'}</span>
          </button>
        </div>

        <p className="text-[11px] text-slate-500 italic">
          &ldquo;Focus on one task. No tabs, no distractions. Flow compound results.&rdquo;
        </p>
      </div>
    </div>
  );
}

