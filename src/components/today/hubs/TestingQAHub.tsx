// src/components/today/hubs/TestingQAHub.tsx
'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Terminal,
  Smartphone,
  Server,
  Activity,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { RegressionTestItem, INITIAL_REGRESSION_SUITE } from '@/lib/today/hubData';

export function TestingQAHub() {
  const [testItems, setTestItems] = useState<RegressionTestItem[]>(INITIAL_REGRESSION_SUITE);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const passedCount = testItems.filter((t) => t.status === 'passed').length;
  const totalCount = testItems.length;
  const passRate = Math.round((passedCount / totalCount) * 100);

  const toggleTestStatus = (id: string) => {
    setTestItems((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next: Record<string, 'passed' | 'failed' | 'pending'> = {
          passed: 'failed',
          failed: 'pending',
          pending: 'passed',
        };
        return { ...t, status: next[t.status] || 'passed' };
      })
    );
  };

  const filtered = filterCategory === 'all'
    ? testItems
    : testItems.filter((t) => t.category === filterCategory);

  return (
    <div className="space-y-6 text-xs">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Testing, Regression Suite & Release Readiness</span>
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Saturday 2-hour quality gate: End-to-end regression validation, mobile artifact verification & production go/no-go signoff.
          </p>
        </div>

        {/* Release Status Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center gap-2 font-mono">
            <span className="text-zinc-500">Go/No-Go:</span>
            <span className={`font-bold ${passRate >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {passRate >= 80 ? '🟢 RELEASE READY' : '🟡 QA IN PROGRESS'} ({passRate}%)
            </span>
          </div>
        </div>
      </div>

      {/* 2. QUALITY METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Passing Tests</span>
          <div className="text-xl font-bold font-mono text-emerald-400">
            {passedCount} / {totalCount}
          </div>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Saturday QA Block</span>
          <div className="text-xl font-bold font-mono text-sky-400">2.0 Hours</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Automated Webpack Build</span>
          <div className="text-xl font-bold font-mono text-white">1.6s Compile</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Active Test Platforms</span>
          <div className="text-xl font-bold font-mono text-amber-300">Web, iOS, Android</div>
        </div>
      </div>

      {/* 3. SATURDAY 2-HOUR REGRESSION PROTOCOL */}
      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-amber-500/20 space-y-3">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Saturday 2-Hour Regression Rhythm (06:30 PM – 08:30 PM)</span>
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 font-bold">Block A (40 min)</span>
            <h6 className="font-semibold text-white">Automated Suite & Build Test</h6>
            <p className="text-[11px] text-zinc-400">Run `npm run build`, linting, API contract verification & zero console error check.</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 font-bold">Block B (50 min)</span>
            <h6 className="font-semibold text-white">Mobile Viewport & Touch Scenarios</h6>
            <p className="text-[11px] text-zinc-400">Test on real iPhone (Safari) and Android (Chrome): keyboard modals, gestures, dark mode contrast.</p>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-850 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 font-bold">Block C (30 min)</span>
            <h6 className="font-semibold text-white">Staging Signoff & Artifact Lock</h6>
            <p className="text-[11px] text-zinc-400">Tag release branch, verify environment variables, push production Docker/Vercel artifacts.</p>
          </div>
        </div>
      </div>

      {/* 4. REGRESSION SUITE LIST */}
      <div className="space-y-3">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['all', 'auth', 'core_workflows', 'mobile_responsive', 'performance'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl capitalize font-mono text-xs transition-all ${
                filterCategory === cat
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Tests List */}
        <div className="space-y-2">
          {filtered.map((item) => {
            const isPassed = item.status === 'passed';
            const isFailed = item.status === 'failed';

            return (
              <div
                key={item.id}
                onClick={() => toggleTestStatus(item.id)}
                className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 flex items-start justify-between gap-3 cursor-pointer transition-all"
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <button className="mt-0.5 shrink-0">
                    {isPassed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    {isFailed && <XCircle className="w-4 h-4 text-rose-400" />}
                    {item.status === 'pending' && <Clock className="w-4 h-4 text-amber-400" />}
                  </button>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-200">{item.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 uppercase">
                        {item.category.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-snug">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 font-mono text-[10px]">
                  <span
                    className={`px-2 py-0.5 rounded-md border font-semibold uppercase ${
                      isPassed
                        ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30'
                        : isFailed
                        ? 'bg-rose-950/50 text-rose-300 border-rose-500/30'
                        : 'bg-amber-950/50 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-zinc-600 hidden sm:inline">(Toggle)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

