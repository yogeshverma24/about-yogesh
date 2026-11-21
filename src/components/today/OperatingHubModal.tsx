// src/components/today/OperatingHubModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Briefcase,
  Layers,
  ShieldCheck,
  Target,
  Calendar,
  Globe,
  Mic,
  DollarSign,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { OperatingHubId } from '@/lib/today/hubData';
import { ClientProjectsHub } from './hubs/ClientProjectsHub';
import { ProductRoadmapHub } from './hubs/ProductRoadmapHub';
import { TestingQAHub } from './hubs/TestingQAHub';
import { SundayMilestoneHub } from './hubs/SundayMilestoneHub';
import { WeeklyPlanningHub } from './hubs/WeeklyPlanningHub';
import { SEOCommandHub } from './hubs/SEOCommandHub';
import { SalesCommunicationHub } from './hubs/SalesCommunicationHub';

interface Props {
  isOpen: boolean;
  initialHubId?: OperatingHubId;
  onClose: () => void;
}

export function OperatingHubModal({ isOpen, initialHubId = 'client_sprint', onClose }: Props) {
  const [activeHub, setActiveHub] = useState<OperatingHubId>(initialHubId);

  useEffect(() => {
    if (initialHubId) {
      setActiveHub(initialHubId);
    }
  }, [initialHubId, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hubTabs: Array<{ id: OperatingHubId; label: string; icon: React.ElementType; badge?: string }> = [
    { id: 'client_sprint', label: 'Client Projects', icon: Briefcase, badge: 'Saturday 4h' },
    { id: 'product_roadmap', label: 'Product Roadmap', icon: Layers, badge: 'Versions' },
    { id: 'testing_qa', label: 'Testing & QA', icon: ShieldCheck, badge: 'Saturday 2h' },
    { id: 'sunday_sprint', label: 'Sunday Milestone', icon: Target, badge: 'Sunday 11h' },
    { id: 'weekly_planning', label: 'Weekly Planning', icon: Calendar, badge: '40h Schedule' },
    { id: 'seo_command', label: 'SEO & Website', icon: Globe, badge: 'Thursday 1h' },
    { id: 'learning_hub', label: 'Communication & Sales', icon: Mic, badge: 'Learning' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-6xl max-h-[95vh] bg-[#080a12]/95 border border-zinc-800 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden">
        {/* MODAL TOP BAR: TITLE & CLOSE */}
        <div className="px-5 py-3.5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/80">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
              Executive Operating Workspaces & Deep Views
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
            title="Close Workspace (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 7 HUBS HORIZONTAL SELECTOR TAB BAR */}
        <div className="px-5 py-2.5 border-b border-zinc-850 bg-zinc-950/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {hubTabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeHub === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveHub(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  active
                    ? 'bg-sky-400 text-zinc-950 font-bold shadow-md shadow-sky-950/40'
                    : 'bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-zinc-950' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                      active ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-950 text-zinc-500 border border-zinc-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* SCROLLABLE BODY VIEW */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeHub === 'client_sprint' && <ClientProjectsHub />}
          {activeHub === 'product_roadmap' && <ProductRoadmapHub />}
          {activeHub === 'testing_qa' && <TestingQAHub />}
          {activeHub === 'sunday_sprint' && <SundayMilestoneHub />}
          {activeHub === 'weekly_planning' && <WeeklyPlanningHub />}
          {activeHub === 'seo_command' && <SEOCommandHub />}
          {activeHub === 'learning_hub' && <SalesCommunicationHub />}
        </div>
      </div>
    </div>
  );
}

