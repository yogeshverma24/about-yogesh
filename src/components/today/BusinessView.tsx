// src/components/today/BusinessView.tsx
'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  ExternalLink,
  Sparkles,
  Share2,
  TrendingUp,
  Search,
  Globe,
  Users,
  CheckSquare,
  Building,
  Target,
  FileText,
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
      name: 'All Business',
      desc: 'Complete Delegatespace Ecosystem',
      link: 'https://www.delegatespace.com/',
      badge: 'Overview',
      color: 'slate',
    },
    {
      id: 'delegatework',
      name: 'Delegatework',
      desc: 'Teams-like Collaboration Platform',
      link: 'https://delegatework.in/',
      badge: 'SEO & LinkedIn Focused',
      color: 'blue',
      focus: ['LinkedIn Marketing', 'Website Blogs', 'Critical SEO Optimization'],
    },
    {
      id: 'fasly',
      name: 'Fasly',
      desc: 'Kisan & Farmer Agriculture App',
      link: 'https://fasly.in/',
      badge: 'Farmer Community',
      color: 'amber',
      focus: ['Blogs Posting', 'Website Blog Posting', 'SEO', 'Facebook Post Marketing'],
    },
    {
      id: 'campus',
      name: 'Campus',
      desc: 'Student Community & Jobs Platform',
      link: 'https://delegatecampus.in/',
      badge: 'Gen-Z & Students',
      color: 'purple',
      focus: ['In-app Posting', 'Job Posting & Blogs', 'Website Blogs', 'SEO', 'Instagram Marketing'],
    },
    {
      id: 'delegatespace',
      name: 'Delegatespace',
      desc: 'Software Development Agency & Studio',
      link: 'https://www.delegatespace.com/',
      badge: 'Parent Company',
      color: 'cyan',
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
                  ? 'bg-blue-950/40 border-blue-500/60 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30'
                  : 'bg-slate-900/60 border-white/5 hover:border-white/15 hover:bg-slate-900/90'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    active ? 'bg-blue-500/20 text-blue-300' : 'bg-white/5 text-slate-400'
                  }`}
                >
                  {p.badge}
                </span>

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-slate-400 hover:text-blue-400 p-1 rounded-md hover:bg-white/5 transition-colors"
                  title={`Open ${p.link}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <h4 className="text-sm font-bold text-white tracking-tight">{p.name}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Quick AI Generators for Business Mode */}
      <div className="bg-gradient-to-r from-blue-950/50 via-indigo-950/40 to-slate-900/80 border border-blue-500/20 rounded-3xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>AI Growth & Content Engine (Powered by Gemini)</span>
            </h3>
            <p className="text-xs text-slate-400">
              One-click instant marketing copies, blogs, social posts & SEO strategies
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Delegatework LinkedIn & SEO */}
          <button
            onClick={() => onTriggerAI('delegatework', 'business_content')}
            className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
          >
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Delegatework Marketing</h5>
              <p className="text-[10px] text-slate-400">LinkedIn post & SEO keywords</p>
            </div>
          </button>

          {/* Fasly Kisan Farmer Post */}
          <button
            onClick={() => onTriggerAI('fasly', 'business_content')}
            className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
          >
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Fasly Kisan Advisory</h5>
              <p className="text-[10px] text-slate-400">FB post & agri blog ideas</p>
            </div>
          </button>

          {/* Campus Student App */}
          <button
            onClick={() => onTriggerAI('campus', 'business_content')}
            className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
          >
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Campus Community</h5>
              <p className="text-[10px] text-slate-400">Job alerts & Insta reel script</p>
            </div>
          </button>

          {/* Delegatework SEO Audit */}
          <button
            onClick={() => onTriggerAI('delegatework', 'business_content')}
            className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
          >
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">Critical SEO Planner</h5>
              <p className="text-[10px] text-slate-400">Backlinks & schema audit</p>
            </div>
          </button>
        </div>
      </div>

      {/* Weekly Marketing Cadence Blueprint */}
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <CalendarDaysIcon className="w-4 h-4 text-blue-400" />
          <span>7-Day Recurring Marketing & SEO Playbook</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase">Mon &bull; Fasly</span>
            <h5 className="font-semibold text-white">Kisan Blog & SEO Update</h5>
            <p className="text-[11px] text-slate-400">Post seasonal crop care guide on fasly.in</p>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-blue-400 uppercase">Tue &bull; Delegatework</span>
            <h5 className="font-semibold text-white">LinkedIn Thought Leadership</h5>
            <p className="text-[11px] text-slate-400">Async standups vs Zoom fatigue article</p>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-purple-400 uppercase">Wed &bull; Campus</span>
            <h5 className="font-semibold text-white">3 Job Drops & In-App Poll</h5>
            <p className="text-[11px] text-slate-400">Publish intern roles on delegatecampus.in</p>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase">Thu &bull; Delegatework</span>
            <h5 className="font-semibold text-white">High-Intent SEO Blog</h5>
            <p className="text-[11px] text-slate-400">Delegatework vs MS Teams comparison</p>
          </div>
        </div>
      </div>

      {/* Business Milestones */}
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-5 space-y-3">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-400" />
          <span>Business & Ecosystem Milestones</span>
        </h4>

        <div className="space-y-3">
          {milestones
            .filter((m) => m.mode === 'business')
            .map((m) => (
              <div key={m.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs sm:text-sm font-bold text-white">{m.title}</h5>
                  <span className="text-xs font-mono text-blue-300">{m.progress}%</span>
                </div>

                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${m.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
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

function CalendarDaysIcon(props: any) {
  return <Briefcase {...props} />;
}

