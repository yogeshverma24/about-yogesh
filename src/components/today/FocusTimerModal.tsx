// src/components/today/FocusTimerModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Timer } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl p-6 text-center space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-widest">Focus Sprint</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-850"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
          <button
            onClick={() => selectMode('pomodoro')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              mode === 'pomodoro' ? 'bg-emerald-500 text-zinc-950 font-bold shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            25m Sprint
          </button>
          <button
            onClick={() => selectMode('deepwork')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              mode === 'deepwork' ? 'bg-emerald-500 text-zinc-950 font-bold shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            50m Deep
          </button>
          <button
            onClick={() => selectMode('break')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              mode === 'break' ? 'bg-emerald-500 text-zinc-950 font-bold shadow' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            5m Rest
          </button>
        </div>

        {/* Countdown Display */}
        <div className="relative w-44 h-44 mx-auto flex flex-col items-center justify-center rounded-full border-2 border-emerald-500/20 bg-zinc-900/60 shadow-inner">
          <span className="text-4xl font-mono font-bold text-zinc-100 tracking-widest">
            {formattedTime}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400/80 mt-1">
            {isActive ? 'In Deep Flow' : 'Paused'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={resetTimer}
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTimer}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 ${
              isActive
                ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                : 'bg-emerald-400 hover:bg-emerald-300 text-zinc-950 shadow-emerald-500/20'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-zinc-950" />}
            <span>{isActive ? 'Pause' : 'Start Focus'}</span>
          </button>
        </div>

        <p className="text-[11px] text-zinc-500 italic">
          &ldquo;Focus on the next action. High velocity, zero distractions.&rdquo;
        </p>
      </div>
    </div>
  );
}
