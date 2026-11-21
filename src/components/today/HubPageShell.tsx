// src/components/today/HubPageShell.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  Briefcase,
  Layers,
  ShieldCheck,
  Compass,
  Calendar,
  TrendingUp,
  Mic,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { LockScreen } from '@/components/today/LockScreen';

interface HubPageShellProps {
  hubId:
    | 'clients'
    | 'product-roadmap'
    | 'testing-qa'
    | 'sunday-milestone'
    | 'weekly-planning'
    | 'seo-command'
    | 'learning';
  title: string;
  badge?: string;
  description?: string;
  children: React.ReactNode;
}

const HUB_LINKS = [
  {
    id: 'clients',
    href: '/today/clients',
    label: 'Clients',
    icon: Briefcase,
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    activeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-400',
  },
  {
    id: 'product-roadmap',
    href: '/today/product-roadmap',
    label: 'Roadmap',
    icon: Layers,
    color: 'text-sky-400',
    border: 'border-sky-500/30',
    activeBg: 'bg-sky-500/10 text-sky-300 border-sky-400',
  },
  {
    id: 'testing-qa',
    href: '/today/testing-qa',
    label: 'QA & Tests',
    icon: ShieldCheck,
    color: 'text-violet-400',
    border: 'border-violet-500/30',
    activeBg: 'bg-violet-500/10 text-violet-300 border-violet-400',
  },
  {
    id: 'sunday-milestone',
    href: '/today/sunday-milestone',
    label: 'Sunday Sprint',
    icon: Compass,
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    activeBg: 'bg-amber-500/10 text-amber-300 border-amber-400',
  },
  {
    id: 'weekly-planning',
    href: '/today/weekly-planning',
    label: 'Weekly Plan',
    icon: Calendar,
    color: 'text-rose-400',
    border: 'border-rose-500/30',
    activeBg: 'bg-rose-500/10 text-rose-300 border-rose-400',
  },
  {
    id: 'seo-command',
    href: '/today/seo-command',
    label: 'SEO',
    icon: TrendingUp,
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    activeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-400',
  },
  {
    id: 'learning',
    href: '/today/learning',
    label: 'Comms & Sales',
    icon: Mic,
    color: 'text-orange-400',
    border: 'border-orange-500/30',
    activeBg: 'bg-orange-500/10 text-orange-300 border-orange-400',
  },
];

export function HubPageShell({
  hubId,
  title,
  badge,
  description,
  children,
}: HubPageShellProps) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = typeof window !== 'undefined' ? localStorage.getItem('today_token') : null;
    if (savedToken) {
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      fetch('/api/today/auth/verify')
        .then((res) => res.json())
        .then((data) => {
          setIsAuthenticated(data.authenticated === true);
          setLoading(false);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setLoading(false);
        });
    }
  }, []);

  const handleUnlock = (token: string) => {
    localStorage.setItem('today_token', token);
    setIsAuthenticated(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono text-zinc-400 animate-pulse">Loading Workspace...</p>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col font-sans">
      {/* 1. TOP EXECUTIVE NAVBAR */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-zinc-950/85 border-b border-white/[0.08] px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Left: Back Link & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <Link
              href="/today"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-all active:scale-95 shadow-sm group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Dashboard /today</span>
            </Link>

            <span className="text-zinc-600">/</span>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-tight text-white">
                {title}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                {badge}
              </span>
            </div>
          </div>

          {/* Right: Quick Stats & 40h System Pill */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono text-zinc-400">
              <Clock className="w-3 h-3 text-indigo-400" />
              <span>Founder Operating System: 39.5h Cadence</span>
            </div>

            <Link
              href="/today"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 hover:text-white text-[11px] font-semibold transition-colors"
            >
              <span>Main Workspace</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 2. SUB-NAV: 7 DEDICATED WORKSPACE TABS */}
        <div className="max-w-7xl mx-auto mt-3 overflow-x-auto pb-1 pt-1 border-t border-zinc-850/70 no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
            {HUB_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = link.id === hubId || pathname === link.href;

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? `${link.activeBg} font-bold shadow-md`
                      : 'bg-zinc-900/50 hover:bg-zinc-850/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-current' : link.color}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* 3. MAIN PAGE CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 space-y-4">
        {/* Page Content */}
        {children}
      </main>
    </div>
  );
}

