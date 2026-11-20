// src/components/today/BusinessView.tsx
'use client';

import React from 'react';
import {
  Briefcase,
  ExternalLink,
  Sparkles,
  Share2,
  TrendingUp,
  Search,
  Globe,
  Users,
  Target,
} from 'lucide-react';
import { MilestoneItem, HabitItem } from '@/lib/today/types';
import { playChime } from '@/lib/today/sound';

interface Props {
  milestones: MilestoneItem[];
  habits: HabitItem[];
  onTriggerAI: (product: string, actionType: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export function BusinessView({
  milestones,
  habits,
  onTriggerAI,
  selectedCategory,
  onSelectCategory,
}: Props) {
  const products = [
    {
      id: 'all',
      name: 'All Ecosystem',
      desc: 'Delegatespace & Products',
      link: 'https://www.delegatespace.com/',
      badge: 'All',
    },
    {
      id: 'delegatework',
      name: 'Delegatework',
      desc: 'Teams-like Collaboration Platform',
      link: 'https://delegatework.in/',
      badge: 'SEO & LinkedIn',
      focus: ['LinkedIn Marketing', 'Website Blogs', 'Critical SEO Optimization'],
    },
    {
      id: 'fasly',
      name: 'Fasly',
      desc: 'Kisan & Agriculture App',
      link: 'https://fasly.in/',
      badge: 'Farmer App',
      focus: ['Blogs Posting', 'Website Blog Posting', 'SEO', 'Facebook Post Marketing'],
    },
    {
      id: 'campus',
      name: 'Campus',
      desc: 'Student Community & Job Board',
      link: 'https://delegatecampus.in/',
      badge: 'Students & Jobs',
      focus: ['In-app Posting', 'Job Posting & Blogs', 'Website Blogs', 'SEO', 'Instagram Marketing'],
    },
    {
      id: 'delegatespace',
      name: 'Delegatespace',
      desc: 'Software Agency & Tech Studio',
      link: 'https://www.delegatespace.com/',
      badge: 'Parent Studio',
      focus: ['Client Projects', 'Product Engineering', 'Agency Pipeline'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Product Switcher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {products.map((p) => {
          const active = selectedCategory === p.id;

          return (
            <div
              key={p.id}
              onClick={() => {
                playChime('click');
                onSelectCategory(p.id);
              }}
              className={`cursor-pointer p-4 rounded-2xl border transition-all text-left relative overflow-hidden ${
                active
                  ? 'bg-[#0f1914] border-emerald-500/40 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/20'
                  : 'bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-800/60 text-zinc-400'
                  }`}
                >
                  {p.badge}
                </span>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-zinc-500 hover:text-emerald-400 p-1 rounded-md hover:bg-zinc-800 transition-colors"
                  title={`Open ${p.link}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <h4 className="text-sm font-semibold text-zinc-100 tracking-tight">{p.name}</h4>
              <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Quick AI Generators for Business Mode */}
      <div className="bg-zinc-900/50 border border-emerald-500/20 rounded-3xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Growth & Content Engine (Gemini)</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Instant marketing copy, blogs, farmer advisory posts & SEO strategy
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Delegatework LinkedIn & SEO */}
          <button
            onClick={() => onTriggerAI('delegatework', 'business_content')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/80 text-left transition-all group hover:border-emerald-500/30"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-zinc-200">Delegatework Marketing</h5>
              <p className="text-[10px] text-zinc-400">LinkedIn & SEO strategy</p>
            </div>
          </button>

          {/* Fasly Kisan Farmer Post */}
          <button
            onClick={() => onTriggerAI('fasly', 'business_content')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/80 text-left transition-all group hover:border-emerald-500/30"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-zinc-200">Fasly Kisan Advisory</h5>
              <p className="text-[10px] text-zinc-400">Farmer FB post & blog</p>
            </div>
          </button>

          {/* Campus Student App */}
          <button
            onClick={() => onTriggerAI('campus', 'business_content')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/80 text-left transition-all group hover:border-emerald-500/30"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-zinc-200">Campus Community</h5>
              <p className="text-[10px] text-zinc-400">Job alerts & Insta reel</p>
            </div>
          </button>

          {/* Delegatework SEO Audit */}
          <button
            onClick={() => onTriggerAI('delegatework', 'business_content')}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-950/60 hover:bg-zinc-950 border border-zinc-800/80 text-left transition-all group hover:border-emerald-500/30"
          >
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-zinc-200">Critical SEO Planner</h5>
              <p className="text-[10px] text-zinc-400">Backlinks & schema audit</p>
            </div>
          </button>
        </div>
      </div>

      {/* Weekly Marketing Cadence Blueprint */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <span>7-Day Recurring Marketing & SEO Playbook</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
            <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase">Mon &bull; Fasly</span>
            <h5 className="font-semibold text-zinc-200">Kisan Blog & SEO Update</h5>
            <p className="text-[11px] text-zinc-400">Seasonal crop care guide on fasly.in</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
            <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase">Tue &bull; Delegatework</span>
            <h5 className="font-semibold text-zinc-200">LinkedIn Thought Leadership</h5>
            <p className="text-[11px] text-zinc-400">Async standups vs meeting fatigue</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
            <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase">Wed &bull; Campus</span>
            <h5 className="font-semibold text-zinc-200">3 Job Drops & In-App Poll</h5>
            <p className="text-[11px] text-zinc-400">Tech openings on delegatecampus.in</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 space-y-1">
            <span className="text-[10px] font-mono font-semibold text-emerald-400 uppercase">Thu &bull; Delegatework</span>
            <h5 className="font-semibold text-zinc-200">High-Intent SEO Blog</h5>
            <p className="text-[11px] text-zinc-400">Delegatework vs Teams comparison</p>
          </div>
        </div>
      </div>

      {/* Business Milestones */}
      <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-400" />
          <span>Business & Ecosystem Milestones</span>
        </h4>

        <div className="space-y-3">
          {milestones
            .filter((m) => m.mode === 'business')
            .map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs sm:text-sm font-semibold text-zinc-200">{m.title}</h5>
                  <span className="text-xs font-mono font-semibold text-emerald-400">{m.progress}%</span>
                </div>

                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${m.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                  <span>Target: {m.targetDate}</span>
                  <span>Metric: {m.metric}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
