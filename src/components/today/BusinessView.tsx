// src/components/today/BusinessView.tsx
'use client';

import React from 'react';
import {
  Sparkles,
  Share2,
  Search,
  Globe,
  Users,
  Briefcase,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
  MessageSquare,
  Compass,
} from 'lucide-react';
import { MilestoneItem, HabitItem } from '@/lib/today/types';
import { playChime } from '@/lib/today/sound';
import { MASTER_WEEKLY_SCHEDULE, PRODUCT_ROTATION_WEEKS } from '@/lib/today/scheduleData';

interface Props {
  milestones: MilestoneItem[];
  habits: HabitItem[];
  onTriggerAI: (product: string, actionType: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  activeRotationWeek?: number;
}

export function BusinessView({
  onTriggerAI,
  selectedCategory,
  onSelectCategory,
  activeRotationWeek = 1,
}: Props) {
  const products = [
    {
      id: 'all',
      name: 'All Ecosystem',
      desc: 'All 4 Ventures & Agency',
      tag: 'Ecosystem',
      channels: 'Consolidated founder execution across products, sales, and client delivery.',
      badge: '4 Ventures',
    },
    {
      id: 'delegatework',
      name: 'Delegatework',
      desc: 'Modern Teams & Async Workflows',
      tag: 'delegatework.in',
      channels: 'LinkedIn Marketing • Website Blogs • SEO Priority • B2B Inbound Demos',
      badge: 'Teams & SEO',
      responsibilities: [
        'LinkedIn thought leadership: async standups eliminating Zoom meeting fatigue',
        'Website SEO priority: rank #1 for modern lightweight team collaboration tool',
        'Website blog posting: publish workflow guides and compare vs Slack/Teams',
        'Conduct product demonstrations and qualify B2B engineering prospects',
      ],
    },
    {
      id: 'fasly',
      name: 'Fasly',
      desc: 'Agriculture & Farmer Advisory Mobile App',
      tag: 'fasly.in',
      channels: 'Crop Advisory Blogs • Farmer Facebook Groups • SEO • In-App Diagnosis',
      badge: 'Farmer App',
      responsibilities: [
        'Weekly agricultural advisory: seasonal crop protection, fertilizer schedules & irrigation',
        'Website SEO & blogs: high-intent guides on crop disease detection & yield boosting',
        'Facebook marketing: post digestible infographics in regional farmer communities',
        'User feedback loop: triage farmer scanner bug reports and improve offline model',
      ],
    },
    {
      id: 'campus',
      name: 'Campus',
      desc: 'College Student Community & Job Board',
      tag: 'delegatecampus.in',
      channels: 'In-App Community • Tech Job Postings • Instagram Reels • Career Blogs',
      badge: 'Students & Jobs',
      responsibilities: [
        'In-app posting & polls: engage 10k+ student developers on tech interview challenges',
        'Job board curation: post verified software engineering internships and fresher jobs',
        'Instagram marketing: relatable developer memes, career roadmaps, and story teasers',
        'Website blog posting: technical resume guides, portfolio reviews, and DSA prep tips',
      ],
    },
    {
      id: 'delegatespace',
      name: 'Delegatespace',
      desc: 'Parent Studio & High-Ticket Client Agency',
      tag: 'delegatespace.com',
      channels: 'Client Sales (Tue) • Sprint Delivery (Wed/Sat) • Scoping & Proposals',
      badge: 'Parent Agency',
      responsibilities: [
        'Tuesday sales outreach: qualify prospects needing mobile apps, SaaS, and backends',
        'Wednesday & Saturday client delivery: execute high-ticket contract deliverables',
        'Proposals & scoping: draft milestone contracts and manage contractor deliverables',
        'Studio case studies: document completed client apps to power inbound sales conversion',
      ],
    },
  ];

  const activeProduct = products.find((p) => p.id === selectedCategory) || products[0];

  // Today's Day-of-Week index (Sunday = 0, Monday = 1, etc.)
  const rawDay = new Date().getDay();
  const dayIdx = rawDay === 0 ? 6 : rawDay - 1;
  const todaySchedule = MASTER_WEEKLY_SCHEDULE[dayIdx] || MASTER_WEEKLY_SCHEDULE[0];

  const rotation = PRODUCT_ROTATION_WEEKS.find((r) => r.weekNumber === activeRotationWeek) || PRODUCT_ROTATION_WEEKS[0];

  return (
    <div className="bg-[#080e1c]/80 border border-sky-500/25 rounded-3xl p-5 sm:p-6 space-y-5 animate-in fade-in duration-300">
      {/* 1. HEADER & AI GROWTH TRIGGER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-500/20 pb-3.5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              Business Ecosystem Operating Hub
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sky-950/50 text-sky-300 border border-sky-500/30 font-semibold">
              4 Active Ventures
            </span>
          </div>
          <p className="text-xs text-zinc-300">
            Dedicated time-blocking, marketing channels, and revenue delivery across Yogesh Verma&apos;s ecosystem
          </p>
        </div>

        <button
          onClick={() =>
            onTriggerAI(
              selectedCategory === 'all' ? 'delegatework' : selectedCategory,
              'business_content'
            )
          }
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-zinc-950 shadow-md shadow-sky-950/40 transition-all active:scale-95 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate AI Growth Blueprint</span>
        </button>
      </div>

      {/* 2. TODAY'S BUSINESS OPERATING SCHEDULE BANNER */}
      <div className="p-4 rounded-2xl bg-zinc-950/70 border border-sky-500/20 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-300">
              Today&apos;s Business Focus ({todaySchedule.dayName} • {todaySchedule.totalHours}h)
            </h4>
          </div>
          <span className="text-xs font-mono text-zinc-400">{todaySchedule.timeWindow}</span>
        </div>

        <div className="text-xs text-zinc-200 font-semibold">
          {todaySchedule.focusTitle}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
          {todaySchedule.blocks.map((b, idx) => (
            <div
              key={b.id}
              className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-sky-400 font-bold">
                  Block {idx + 1}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  {b.hours}h
                </span>
              </div>
              <div className="font-semibold text-zinc-100">{b.title}</div>
              <p className="text-[11px] text-zinc-400 line-clamp-2">{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. PRODUCT SELECTOR TABS */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
          Select Product / Venture Focus
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {products.map((p) => {
            const active = selectedCategory === p.id;

            return (
              <div
                key={p.id}
                onClick={() => {
                  playChime('click');
                  onSelectCategory(p.id);
                }}
                className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                  active
                    ? 'bg-sky-950/60 border-sky-400 text-sky-200 shadow-md shadow-sky-950/50 ring-1 ring-sky-500/30'
                    : 'bg-zinc-950/60 border-zinc-850 hover:border-sky-500/40 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-sky-400 font-bold">{p.badge}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-sky-400' : 'bg-zinc-700'}`}
                  />
                </div>
                <h5 className="text-xs font-bold text-zinc-100 truncate">{p.name}</h5>
                <p className="text-[10px] text-zinc-400 truncate mt-0.5">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. ACTIVE PRODUCT EXECUTION DEEP-DIVE */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-850 pb-2.5">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-white font-mono">{activeProduct.name}</h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20">
                {activeProduct.tag}
              </span>
            </div>
            <p className="text-xs text-sky-300 font-medium">{activeProduct.desc}</p>
          </div>

          <div className="text-[11px] font-mono text-zinc-400">
            Channels: <strong className="text-zinc-200">{activeProduct.channels}</strong>
          </div>
        </div>

        {/* Product Responsibilities & Execution Cadence */}
        {activeProduct.responsibilities && (
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
              Core Operating Responsibilities & Growth Targets
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {activeProduct.responsibilities.map((resp, rIdx) => (
                <div
                  key={rIdx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">{resp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. 6-DAY BUSINESS OPERATING CADENCE & SUNDAY ROTATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Cadence Pills (8 Cols) */}
        <div className="lg:col-span-8 p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-850 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
              Weekly Business Cadence (39.5h Founder Target)
            </span>
            <span className="text-[10px] font-mono text-sky-400">Mon - Sun</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="p-2 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="block font-mono text-sky-400 font-bold">Tue (3.5h)</span>
              <span className="text-zinc-300">Sales & Client Acquisition</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="block font-mono text-sky-400 font-bold">Wed (3.5h)</span>
              <span className="text-zinc-300">Client Delivery & Operations</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="block font-mono text-sky-400 font-bold">Thu (3.5h)</span>
              <span className="text-zinc-300">DelegateSpace & DelegateWork</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="block font-mono text-sky-400 font-bold">Fri (3.5h)</span>
              <span className="text-zinc-300">Campus & Fasly Growth</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="block font-mono text-amber-400 font-bold">Sat (11.0h)</span>
              <span className="text-zinc-300">Development & Maintenance</span>
            </div>
            <div className="p-2 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="block font-mono text-amber-400 font-bold">Sun (11.0h)</span>
              <span className="text-zinc-300">Deep Product Sprint</span>
            </div>
          </div>
        </div>

        {/* Active Sunday Rotation (4 Cols) */}
        <div className="lg:col-span-4 p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-850 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-semibold">
                Sunday Sprint Rotation
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                Week {rotation.weekNumber}
              </span>
            </div>
            <div className="text-xs font-bold text-white font-mono">{rotation.primaryFocus}</div>
            <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{rotation.description}</p>
          </div>

          <div className="pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-500 flex justify-between">
            <span>Secondary: {rotation.secondaryFocus}</span>
            <span>6h Core Sprint</span>
          </div>
        </div>
      </div>
    </div>
  );
}
