// src/components/today/LockScreen.tsx
'use client';

import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080c0a]/95 backdrop-blur-2xl">
      <div className="relative w-full max-w-sm bg-zinc-950 border border-emerald-500/20 rounded-3xl p-8 shadow-2xl text-center space-y-6">
        {/* Glow backdrop */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-950/40">
          <Lock className="w-6 h-6" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
            Yogesh Verma /today
          </h2>
          <p className="text-xs text-zinc-400">
            Personal &middot; Business &middot; Job Prep OS
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
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
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 text-center text-xs font-mono tracking-widest focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/15 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Verifying...' : 'Unlock Workspace'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-zinc-850 space-y-2">
          <p className="text-[11px] text-zinc-500">
            Master Pass: <code className="text-emerald-400 font-mono">yogesh2026</code>
          </p>

          <button
            type="button"
            onClick={() => handleLogin('yogesh2026')}
            className="text-xs font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
          >
            Quick 1-Click Master Unlock
          </button>
        </div>
      </div>
    </div>
  );
}
