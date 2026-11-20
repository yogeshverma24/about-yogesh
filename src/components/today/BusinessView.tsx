// src/components/today/BusinessView.tsx
'use client';

import React from 'react';
import {
  ExternalLink,
  Sparkles,
  Share2,
  Search,
  Globe,
  Users,
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
  onTriggerAI,
  selectedCategory,
  onSelectCategory,
}: Props) {
  const products = [
    {
      id: 'all',
      name: 'All Products',
      desc: 'Delegatespace Studio',
      link: 'https://www.delegatespace.com/',
      badge: 'All',
    },
    {
      id: 'delegatework',
      name: 'Delegatework',
      desc: 'Teams Platform (SEO & LinkedIn)',
      link: 'https://delegatework.in/',
      badge: 'SEO & Teams',
    },
    {
      id: 'fasly',
      name: 'Fasly',
      desc: 'Agriculture & Farmer App',
      link: 'https://fasly.in/',
      badge: 'Farmer App',
    },
    {
      id: 'campus',
      name: 'Campus',
      desc: 'Student Community & Jobs',
      link: 'https://delegatecampus.in/',
      badge: 'Students & Jobs',
    },
    {
      id: 'delegatespace',
      name: 'Delegatespace',
      desc: 'Client Agency & Software Studio',
      link: 'https://www.delegatespace.com/',
      badge: 'Parent Agency',
    },
  ];

  return (
    <div className="bg-[#080e1c]/70 border border-blue-500/20 rounded-3xl p-4 sm:p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-blue-500/15 pb-2.5">
        <h4 className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
          Ecosystem Hub
        </h4>
        <button
          onClick={() => onTriggerAI(selectedCategory === 'all' ? 'delegatework' : selectedCategory, 'business_content')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 transition-all active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>AI Growth Blueprint</span>
        </button>
      </div>

      {/* Product Selection List */}
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
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                active
                  ? 'bg-blue-950/50 border-blue-500/50 text-blue-300 shadow-sm'
                  : 'bg-zinc-950/60 border-zinc-850 hover:border-blue-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-blue-400 font-semibold">{p.badge}</span>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-zinc-500 hover:text-blue-400"
                    title={`Open ${p.link}`}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <h5 className="text-xs font-semibold text-zinc-100 truncate">{p.name}</h5>
              <p className="text-[10px] text-zinc-400 truncate">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* 7-Day Marketing Cadence Quick Bar */}
      <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-850 text-xs">
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5">
          Marketing Cadence Focus
        </span>
        <div className="flex items-center justify-between text-[11px] gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-500/20">
            Mon: Fasly Agri Blog
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-500/20">
            Tue: Delegatework LinkedIn
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-500/20">
            Wed: Campus 3 Jobs
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-500/20">
            Thu: Delegatework SEO
          </span>
        </div>
      </div>
    </div>
  );
}
