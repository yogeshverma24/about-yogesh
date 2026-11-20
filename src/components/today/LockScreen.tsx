// src/components/today/LockScreen.tsx
'use client';

import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowRight, KeyRound, Sparkles } from 'lucide-react';
import { playChime } from '@/lib/today/sound';

interface Props {
  onUnlock: (token: string) => void;
}

export function LockScreen({ onUnlock }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (inputPass: string) => {
    setError('');
    setLoading(true);
    playChime('click');

    try {
      const res = await fetch('/api/today/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: inputPass }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.token) {
        playChime('success');
        onUnlock(data.token);
      } else {
        setError(data.error || 'Invalid master password');
        playChime('alert');
      }
    } catch {
      setError('Connection failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    handleLogin(password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl">
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl text-center space-y-6">
        {/* Glow backdrop */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Yogesh Verma /today OS
          </h2>
          <p className="text-xs text-slate-400">
            Secure Personal &middot; Business &middot; Job Preparation Headquarters
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="password"
              placeholder="Enter Master Password / PIN"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 text-center text-sm font-mono tracking-widest focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Unlock Workspace'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-white/5 space-y-2">
          <p className="text-[11px] text-slate-500">
            Default Master Pass: <code className="text-slate-300 font-mono">yogesh2026</code>
          </p>

          <button
            type="button"
            onClick={() => handleLogin('yogesh2026')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
          >
            Quick 1-Click Master Unlock
          </button>
        </div>
      </div>
    </div>
  );
}

