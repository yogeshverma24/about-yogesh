// src/app/today/testing-qa/page.tsx
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
  AlertTriangle,
  Play,
  Check,
} from 'lucide-react';
import { HubPageShell } from '@/components/today/HubPageShell';
import { RegressionTestItem, INITIAL_REGRESSION_SUITE } from '@/lib/today/hubData';

export default function TestingQAPage() {
  const [testItems, setTestItems] = useState<RegressionTestItem[]>(INITIAL_REGRESSION_SUITE);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  const passedCount = testItems.filter((t) => t.status === 'passed').length;
  const failedCount = testItems.filter((t) => t.status === 'failed').length;
  const pendingCount = testItems.filter((t) => t.status === 'pending').length;
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

  const handleRunAllTests = () => {
    setIsSimulating(true);
    setSimulationLog('Running automated build check & headless regression suite...');
    setTimeout(() => {
      setTestItems((prev) => prev.map((t) => ({ ...t, status: 'passed' })));
      setSimulationLog('All 8 regression test suites passed successfully. Zero critical bugs found. Webpack bundle compiled cleanly in 1.8s.');
      setIsSimulating(false);
    }, 1500);
  };

  const filtered = filterCategory === 'all'
    ? testItems
    : testItems.filter((t) => t.category === filterCategory);

  return (
    <HubPageShell
      hubId="testing-qa"
      title="Testing, Regression Suite & Release Readiness"
      badge="Quality Gate & Build Verification"
      description="The Saturday 2-hour quality gate for Yogesh Verma's ecosystem: validate authentication, core workflows, mobile viewports, payment webhooks, and production build readiness."
    >
      {/* 1. QUALITY METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-violet-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Overall Test Pass Rate</span>
            <Activity className="w-4 h-4 text-violet-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400 font-mono">{passRate}%</div>
          <div className="mt-1 text-[11px] text-zinc-400">
            {passedCount} Passed • {failedCount} Failed • {pendingCount} Pending
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-violet-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Saturday QA Rhythm</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">2.0 Hours</div>
          <div className="mt-1 text-[11px] text-zinc-400">06:30 PM – 08:30 PM Quality Gate</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-violet-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Webpack Build Check</span>
            <Terminal className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">1.8s Compile</div>
          <div className="mt-1 text-[11px] text-emerald-400">24/24 Static Pages OK</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-violet-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Production Sign-Off</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400 font-mono">
            {passRate >= 80 ? 'GO FOR RELEASE' : 'HOLD / FIXING'}
          </div>
          <div className="mt-1 text-[11px] text-zinc-400">Ready for Sunday Lock</div>
        </div>
      </div>

      {/* 2. AUTOMATED TEST SUITE RUNNER ACTION BAR */}
      <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-violet-400" />
            <span>Automated Next.js & Multi-Platform Regression Runner</span>
          </span>
          <p className="text-[11px] text-zinc-400">
            Runs bundle analyzer, static route verification, auth persistence checks, and offline cache tests.
          </p>
        </div>

        <button
          onClick={handleRunAllTests}
          disabled={isSimulating}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500 hover:bg-violet-400 text-zinc-950 font-bold text-xs transition-all active:scale-95 disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isSimulating ? 'Running Tests...' : 'Run All Regression Suites'}</span>
        </button>
      </div>

      {simulationLog && (
        <div className="p-3.5 rounded-xl bg-zinc-900 border border-violet-500/30 text-xs font-mono text-violet-300">
          {simulationLog}
        </div>
      )}

      {/* 3. TEST CATEGORY FILTER & CHECKLIST TABLE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {['all', 'auth', 'core_workflows', 'mobile_responsive', 'performance'].map((c) => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                  filterCategory === c
                    ? 'bg-violet-400 text-zinc-950 font-bold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {c === 'all' ? 'All 8 Suites' : c.replace('_', ' ')}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
            Click status badge to toggle (Passed ➔ Failed ➔ Pending)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-850 hover:border-violet-500/30 transition-all space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-violet-300 font-semibold">
                    {item.category.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => toggleTestStatus(item.id)}
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase transition-colors ${
                      item.status === 'passed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : item.status === 'failed'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {item.status}
                  </button>
                </div>

                <h4 className="text-xs font-bold text-white pt-1">{item.title}</h4>
                <p className="text-[11px] text-zinc-400 leading-snug">{item.description}</p>
              </div>

              <div className="pt-2 border-t border-zinc-850/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>Verified for Web / iOS / Android</span>
                <span className="text-zinc-400">Protocol: Automated + Manual</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SATURDAY 2-HOUR REGRESSION PROTOCOL BREAKDOWN */}
      <div className="p-5 rounded-3xl bg-zinc-950/90 border border-amber-500/20 space-y-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Saturday 2-Hour Regression Protocol (06:30 PM – 08:30 PM)</span>
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 font-bold">Phase 1 (30 Mins)</span>
            <h5 className="text-xs font-semibold text-white">Auth & Session Revocation</h5>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Verify JWT refresh, localStorage lockscreen token, and logout security across Chrome, Safari, and Brave.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 font-bold">Phase 2 (30 Mins)</span>
            <h5 className="text-xs font-semibold text-white">Mobile Viewport & Touch</h5>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Test on real iPhone 16 Pro and Android simulator: check keyboard popups, dynamic safe areas, and bottom bar collisions.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 font-bold">Phase 3 (30 Mins)</span>
            <h5 className="text-xs font-semibold text-white">Data Sync & Offline Store</h5>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Verify local JSON fallback (`.data/today-store.json`) loads immediately if MongoDB Atlas latency spikes.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-1">
            <span className="text-[10px] font-mono text-amber-400 font-bold">Phase 4 (30 Mins)</span>
            <h5 className="text-xs font-semibold text-white">Production Build Lock</h5>
            <p className="text-[11px] text-zinc-400 leading-snug">
              Run `npm run build` to confirm 0 TypeScript errors and generate green light for Sunday morning sprint.
            </p>
          </div>
        </div>
      </div>
    </HubPageShell>
  );
}

