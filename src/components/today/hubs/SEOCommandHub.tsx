// src/components/today/hubs/SEOCommandHub.tsx
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
} from 'lucide-react';
import { SEOKeywordTarget, INITIAL_SEO_TARGETS } from '@/lib/today/hubData';

export function SEOCommandHub() {
  const [keywords, setKeywords] = useState<SEOKeywordTarget[]>(INITIAL_SEO_TARGETS);
  const [activeTab, setActiveTab] = useState<'keywords' | 'work_status' | 'blueprint'>('work_status');

  const completedTasks = [
    { id: 'se-1', title: 'XML Sitemap & Robots.txt Auto-Generation', details: 'Configured automated dynamic sitemap indexing all portfolio and service URLs.', done: true },
    { id: 'se-2', title: 'OpenGraph & Twitter Card Dynamic Previews', details: 'Added rich image metadata tags with social cards for LinkedIn and Twitter sharing.', done: true },
    { id: 'se-3', title: 'Structured FAQ & Organization Schema Markup', details: 'Google Rich Snippet JSON-LD schema injected into key landing pages.', done: true },
    { id: 'se-4', title: 'Fast Mobile Webpack Bundle (< 1.7s Build)', details: 'Minified JS bundles with zero hydration blocking for sub-second mobile page loads.', done: true },
  ];

  const pendingTasks = [
    { id: 'se-5', title: 'Publish 2x High-Intent Comparison Articles', details: 'Target: "Delegatework vs Slack Pricing" and "Async Standups vs Daily Zoom Syncs".', priority: 'High', deadline: 'Thursday 1h SEO Block' },
    { id: 'se-6', title: 'Core Web Vitals LCP Optimization (< 1.2s)', details: 'Optimize hero typography loading fonts with font-display: swap and preconnecting CDNs.', priority: 'Medium', deadline: 'Next Week' },
    { id: 'se-7', title: 'Backlink Outreach to 5 Regional Tech Directories', details: 'Submit Delegatespace and Delegatework to SaaSHub, ProductHunt upcoming, and curated directories.', priority: 'High', deadline: 'Next Sprint' },
  ];

  return (
    <div className="space-y-6 text-xs">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-400" />
              <span>SEO Review & Company Website Optimization Hub</span>
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Track completed SEO infrastructure, Google Search Console keyword rankings, and Thursday 1h optimization backlog.
          </p>
        </div>

        <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('work_status')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'work_status' ? 'bg-sky-400 text-zinc-950 font-bold shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Work Status
          </button>
          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'keywords' ? 'bg-sky-400 text-zinc-950 font-bold shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Keyword Rankings
          </button>
          <button
            onClick={() => setActiveTab('blueprint')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              activeTab === 'blueprint' ? 'bg-sky-400 text-zinc-950 font-bold shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            How-To Execution
          </button>
        </div>
      </div>

      {/* 2. CORE SEO METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Organic Traffic Growth</span>
          <div className="text-xl font-bold font-mono text-emerald-400">+34% MoM</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Keywords in Top 20</span>
          <div className="text-xl font-bold font-mono text-sky-400">{keywords.length} Target Terms</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Core Web Vitals (LCP)</span>
          <div className="text-xl font-bold font-mono text-white">1.3s (Good)</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Thursday Cadence</span>
          <div className="text-xl font-bold font-mono text-amber-300">1.0h SEO Audit</div>
        </div>
      </div>

      {/* TAB 1: WORK STATUS: WHAT IS DONE VS WHAT NEEDS TO BE DONE */}
      {activeTab === 'work_status' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Completed Work */}
            <div className="p-4 rounded-3xl bg-zinc-950 border border-emerald-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                <span className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Work Completed So Far ({completedTasks.length} Milestones)</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  Live in Production
                </span>
              </div>

              <div className="space-y-2">
                {completedTasks.map((t) => (
                  <div key={t.id} className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-white">{t.title}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 pl-5.5">{t.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Backlog */}
            <div className="p-4 rounded-3xl bg-zinc-950 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                <span className="font-mono font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>What Needs To Be Done Next</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                  Action Backlog
                </span>
              </div>

              <div className="space-y-2">
                {pendingTasks.map((t) => (
                  <div key={t.id} className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-white">{t.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950/70 text-amber-300 border border-amber-500/30">
                        {t.priority} Priority
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400">{t.details}</p>
                    <span className="text-[10px] font-mono text-zinc-500 block pt-1">Scheduled: {t.deadline}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KEYWORD RANKINGS */}
      {activeTab === 'keywords' && (
        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-300 font-medium">Search Console High-Intent Keywords</span>
            <span className="font-mono text-zinc-500 text-[11px]">Updated Weekly</span>
          </div>

          <div className="space-y-2">
            {keywords.map((kw) => (
              <div
                key={kw.id}
                className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-sky-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sky-400 text-sm">{kw.currentRank}</span>
                    <span className="font-semibold text-white text-xs">{kw.keyword}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {kw.targetProduct}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 block truncate">{kw.targetUrl}</span>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 font-mono text-[11px]">
                  <span className="text-zinc-400">{kw.monthlyVolume} vol/mo</span>
                  <span className="px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800">
                    {kw.difficulty} KD
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-sky-950/60 text-sky-300 border border-sky-500/30 font-semibold">
                    {kw.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: HOW-TO EXECUTION BLUEPRINT */}
      {activeTab === 'blueprint' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-sky-400 font-bold uppercase">Step 1 • Keyword Selection</span>
              <h5 className="font-semibold text-white">Target High-Intent Problem Terms</h5>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Avoid generic keywords like &quot;collaboration&quot;. Target high-intent queries where developers and founders are looking for a solution right now (e.g. &quot;lightweight Microsoft Teams alternative&quot;).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-sky-400 font-bold uppercase">Step 2 • Technical Content Structure</span>
              <h5 className="font-semibold text-white">Architectural Comparisons & Data</h5>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Include concrete comparisons, diagrams, and code snippets. Google prioritizes pages with original insights over generic AI-generated fluff.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-sky-400 font-bold uppercase">Step 3 • Thursday 1h Audit</span>
              <h5 className="font-semibold text-white">Internal Linking & Console Inspection</h5>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Every Thursday evening: Request indexing on Google Search Console for newly published blogs, inspect search impressions, and link back to product signup pages.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

