// src/app/today/seo-command/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Globe,
  Search,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  Zap,
  BarChart2,
  FileText,
  ShieldCheck,
  Tag,
  Plus,
} from 'lucide-react';
import { HubPageShell } from '@/components/today/HubPageShell';
import { SEOKeywordTarget, INITIAL_SEO_TARGETS } from '@/lib/today/hubData';

export default function SEOCommandPage() {
  const [keywords, setKeywords] = useState<SEOKeywordTarget[]>(INITIAL_SEO_TARGETS);
  const [activeTab, setActiveTab] = useState<'work_status' | 'keywords' | 'blueprint'>('work_status');

  const completedTasks = [
    { id: 'se-1', title: 'XML Sitemap & Robots.txt Auto-Generation', details: 'Configured automated dynamic sitemap indexing all portfolio, today, and services routes.', done: true },
    { id: 'se-2', title: 'OpenGraph & Twitter Card Dynamic Previews', details: 'Added rich image metadata tags with social cards for LinkedIn and Twitter sharing.', done: true },
    { id: 'se-3', title: 'Structured FAQ & Organization Schema Markup', details: 'Google Rich Snippet JSON-LD schema injected into key landing pages.', done: true },
    { id: 'se-4', title: 'Fast Mobile Webpack Bundle (< 1.8s Build)', details: 'Minified JS bundles with zero hydration blocking for sub-second mobile page loads.', done: true },
  ];

  const pendingTasks = [
    { id: 'se-5', title: 'Publish 2x High-Intent Comparison Articles', details: 'Target: "Best lightweight Microsoft Teams alternative" and "Async standups for dev teams".', priority: 'High', deadline: 'Thursday 1h SEO Block' },
    { id: 'se-6', title: 'Core Web Vitals LCP Optimization (< 1.2s)', details: 'Optimize hero typography loading fonts with font-display: swap and preconnecting CDNs.', priority: 'Medium', deadline: 'Next Week' },
    { id: 'se-7', title: 'Backlink Outreach to 5 Regional Tech Directories', details: 'Submit Delegatespace and Delegatework to SaaSHub, ProductHunt upcoming, and curated directories.', priority: 'High', deadline: 'Next Sprint' },
  ];

  return (
    <HubPageShell
      hubId="seo-command"
      title="SEO Review & Company Website Optimization Hub"
      badge="Search Engine Command Center"
      description="Track technical SEO infrastructure, Google Search Console keyword rank positions, Core Web Vitals optimization, and Thursday 1-hour growth execution backlog."
    >
      {/* 1. TOP SEO PERFORMANCE METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-cyan-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Core Web Vitals Performance</span>
            <BarChart2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-emerald-400 font-mono">98 / 100</div>
          <div className="mt-1 text-[11px] text-zinc-400">LCP 1.1s • CLS 0.00 • FID 12ms</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-cyan-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Keywords Tracked</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">{keywords.length} High-Intent</div>
          <div className="mt-1 text-[11px] text-sky-300">Targeting Google Page 1</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-cyan-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Thursday SEO Block</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">1.0 Hour</div>
          <div className="mt-1 text-[11px] text-zinc-400">Part of 39.5h Master Cadence</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-cyan-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Technical SEO Tasks</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {completedTasks.length}/{completedTasks.length + pendingTasks.length} Complete
          </div>
          <div className="mt-1 text-[11px] text-emerald-400">Schema & Metadata Live</div>
        </div>
      </div>

      {/* 2. SUB-VIEW SWITCHER */}
      <div className="flex items-center gap-2 bg-zinc-950/90 p-1.5 rounded-2xl border border-zinc-800 w-fit">
        <button
          onClick={() => setActiveTab('work_status')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'work_status'
              ? 'bg-cyan-400 text-zinc-950 font-bold shadow-md shadow-cyan-950/40'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          SEO Work Status & Backlog
        </button>
        <button
          onClick={() => setActiveTab('keywords')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'keywords'
              ? 'bg-cyan-400 text-zinc-950 font-bold shadow-md shadow-cyan-950/40'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          Keyword Rank Tracker (GSC)
        </button>
        <button
          onClick={() => setActiveTab('blueprint')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'blueprint'
              ? 'bg-cyan-400 text-zinc-950 font-bold shadow-md shadow-cyan-950/40'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          How-To Execution Blueprint
        </button>
      </div>

      {/* 3. VIEW 1: WORK STATUS (COMPLETED VS PENDING) */}
      {activeTab === 'work_status' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          {/* Completed Infrastructure */}
          <div className="p-5 rounded-3xl bg-zinc-950/90 border border-emerald-500/20 space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Work Completed ({completedTasks.length} Live Systems)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300">
                100% Verified
              </span>
            </div>

            <div className="space-y-2.5">
              {completedTasks.map((t) => (
                <div key={t.id} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{t.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 pl-5.5 leading-snug">{t.details}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pending SEO Backlog */}
          <div className="p-5 rounded-3xl bg-zinc-950/90 border border-amber-500/20 space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Pending Optimization Backlog ({pendingTasks.length} High-ROI)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300">
                Active Sprint
              </span>
            </div>

            <div className="space-y-2.5">
              {pendingTasks.map((t) => (
                <div key={t.id} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{t.title}</h4>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">
                      {t.priority}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug">{t.details}</p>
                  <div className="text-[10px] font-mono text-amber-300 pt-1 border-t border-zinc-850/60">
                    Target Execution: {t.deadline}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. VIEW 2: KEYWORD RANK TRACKER */}
      {activeTab === 'keywords' && (
        <div className="p-5 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-850 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Google Search Console Keyword Target Matrix</span>
              </h3>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                High-intent commercial and informational queries targeting organic customer acquisition.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] uppercase">
                  <th className="py-2.5 px-3">Target Search Query</th>
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3">SERP Rank</th>
                  <th className="py-2.5 px-3">Monthly Vol</th>
                  <th className="py-2.5 px-3">Difficulty</th>
                  <th className="py-2.5 px-3">Landing URL</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-850/80">
                {keywords.map((kw) => (
                  <tr key={kw.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3 px-3 font-bold text-white">{kw.keyword}</td>
                    <td className="py-3 px-3 text-cyan-300">{kw.targetProduct}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-bold text-white">
                        {kw.currentRank}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-zinc-400">{kw.monthlyVolume}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          kw.difficulty === 'Low'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : kw.difficulty === 'Medium'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-rose-500/20 text-rose-300'
                        }`}
                      >
                        {kw.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-zinc-400 truncate max-w-[150px]">{kw.targetUrl}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] border border-cyan-500/30 font-semibold">
                        {kw.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. VIEW 3: EXECUTION BLUEPRINT */}
      {activeTab === 'blueprint' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-zinc-950/80 border border-zinc-850 space-y-2.5">
            <span className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs border border-cyan-500/20">
              01
            </span>
            <h4 className="text-sm font-bold text-white">Technical Foundation & Core Web Vitals</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Achieve 95+ Mobile Lighthouse scores. Ensure all font weights are loaded asynchronously, pre-compress SVG assets, and eliminate render-blocking CSS scripts.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-zinc-950/80 border border-zinc-850 space-y-2.5">
            <span className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs border border-cyan-500/20">
              02
            </span>
            <h4 className="text-sm font-bold text-white">High-Intent Programmatic & Content Hubs</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Publish structured comparison articles targeting &ldquo;[Competitor] Alternative&rdquo; and &ldquo;Best Async Standup App&rdquo; queries to intercept buyers with high purchase intent.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-zinc-950/80 border border-zinc-850 space-y-2.5">
            <span className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs border border-cyan-500/20">
              03
            </span>
            <h4 className="text-sm font-bold text-white">Backlink Velocity & Curated Directory Submissions</h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Submit to SaaSHub, AlternativeTo, GitHub Awesome Lists, and ProductHunt. Build domain authority from DR 10 to DR 35+ within 90 days.
            </p>
          </div>
        </div>
      )}
    </HubPageShell>
  );
}

