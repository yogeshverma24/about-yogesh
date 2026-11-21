// src/app/today/clients/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  CheckSquare,
  BookOpen,
  DollarSign,
  TrendingUp,
  Clock,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Circle,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Send,
  MessageSquare,
  FileText,
  Shield,
  Layers,
  Sparkles,
  Calendar,
  AlertCircle,
  Tag,
  Copy,
  Check,
} from 'lucide-react';
import { HubPageShell } from '@/components/today/HubPageShell';
import { ClientProject, INITIAL_CLIENT_PROJECTS } from '@/lib/today/hubData';

interface ClientTask {
  id: string;
  clientId: string;
  clientName: string;
  companyName: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  dueDate: string;
  deliverableTag: string;
}

interface PlaybookScript {
  id: string;
  title: string;
  category: 'outreach' | 'discovery' | 'proposal' | 'objection';
  tag: string;
  description: string;
  script: string;
}

const INITIAL_CLIENT_TASKS: ClientTask[] = [
  {
    id: 'ct-1',
    clientId: 'cp-1',
    clientName: 'Rahul Mehta',
    companyName: 'AeroSync Logistics',
    title: 'Background location telemetry service with battery optimization',
    priority: 'high',
    status: 'in_progress',
    dueDate: '2026-11-28',
    deliverableTag: 'Core Engine',
  },
  {
    id: 'ct-2',
    clientId: 'cp-1',
    clientName: 'Rahul Mehta',
    companyName: 'AeroSync Logistics',
    title: 'Offline SQLite sync queue for remote driver locations',
    priority: 'high',
    status: 'done',
    dueDate: '2026-11-25',
    deliverableTag: 'Database',
  },
  {
    id: 'ct-3',
    clientId: 'cp-1',
    clientName: 'Rahul Mehta',
    companyName: 'AeroSync Logistics',
    title: 'Build and distribute staging APK via Firebase App Distribution',
    priority: 'medium',
    status: 'todo',
    dueDate: '2026-11-28',
    deliverableTag: 'Release',
  },
  {
    id: 'ct-4',
    clientId: 'cp-2',
    clientName: 'Siddharth Roy',
    companyName: 'KitePay Financial',
    title: 'Architectural audit report of React Native component tree',
    priority: 'high',
    status: 'done',
    dueDate: '2026-11-24',
    deliverableTag: 'Audit Report',
  },
  {
    id: 'ct-5',
    clientId: 'cp-2',
    clientName: 'Siddharth Roy',
    companyName: 'KitePay Financial',
    title: 'Draft 3-week milestone scope & contract terms for 50% advance',
    priority: 'high',
    status: 'in_progress',
    dueDate: '2026-11-26',
    deliverableTag: 'Proposal',
  },
  {
    id: 'ct-6',
    clientId: 'cp-3',
    clientName: 'Elena Rostova',
    companyName: 'OmniDesk Nordic',
    title: 'Record custom 5-minute video walkthrough of standup integration for CTO',
    priority: 'medium',
    status: 'todo',
    dueDate: '2026-11-27',
    deliverableTag: 'Sales Demo',
  },
];

const PLAYBOOK_SCRIPTS: PlaybookScript[] = [
  {
    id: 'ps-1',
    title: 'LinkedIn Cold Outreach to Tech Founders / CTOs',
    category: 'outreach',
    tag: 'Cold Inbound / Outbound',
    description: 'High-converting consultative message focusing on architecture bottlenecks rather than generic development sales.',
    script: `Hi [Founder Name],

Saw your recent update on scaling [Company Name]'s mobile product. Most teams hit significant performance bottlenecks when scaling React Native / Flutter apps past 50k users (particularly frame drops, state bloat, and bridge delays).

I specialize in high-performance cross-platform mobile architectures (Flutter & native iOS/Swift 6), having engineered zero-latency systems and scalable async backends.

Are you experiencing any performance or architectural debt right now that is slowing down your mobile release velocity? Would love to share a quick 3-minute video breakdown of how we solve this.`,
  },
  {
    id: 'ps-2',
    title: 'Inbound Response Template (Speed-to-Lead < 15 Mins)',
    category: 'outreach',
    tag: 'Inbound Conversion',
    description: 'Immediate response when a prospective client fills out the portfolio contact form or reaches out directly.',
    script: `Hi [Prospect Name],

Thanks for reaching out regarding [Project Name / Brief]!

I reviewed your notes on [specific requirement, e.g. cross-platform app / async workflows]. This is directly aligned with our core delivery stack at Delegatespace Studio.

To ensure we engineer the exact right solution without unnecessary overhead:
1. What is your hard target launch date for the initial MVP / milestone?
2. Do you have existing Figma designs and API specifications, or will we architect from scratch?

I have an opening this Thursday at 4:30 PM IST for a 20-minute technical discovery call. Does that time work, or would Friday morning suit you better?`,
  },
  {
    id: 'ps-3',
    title: 'SPIN Discovery Call Framework for Technical Founders',
    category: 'discovery',
    tag: 'Qualification Checklist',
    description: 'The 4-stage consultative discovery formula: Situation, Problem, Implication, Need-Payoff.',
    script: `1. SITUATION: "Walk me through your current architecture and team setup. How are you handling mobile deployments today?"
2. PROBLEM: "Where is the biggest bottleneck right now? Is it crash rates, delayed sprints, or lack of senior architectural leadership?"
3. IMPLICATION: "If this milestone slips by another month, how does that impact your customer retention or next funding milestone?"
4. NEED-PAYOFF: "If we deliver an optimized, production-ready build with 99.9% crash-free sessions in 3 weeks, what does that unlock for your team?"`,
  },
  {
    id: 'ps-4',
    title: 'Winning Milestone Proposal & Retainer Structure',
    category: 'proposal',
    tag: 'Pricing & Terms',
    description: 'Standard 50/25/25 payment structure and monthly fractional retainer terms.',
    script: `MILESTONE TERMS & PAYMENT SCHEDULE:
• Phase 1 (50% Advance Upon Kickoff): Architecture Blueprint, Database Schema, Core UI Engine.
• Phase 2 (25% Staging Release): Feature-complete staging APK / TestFlight build for review.
• Phase 3 (25% Production Sign-Off): Production deployment, documentation, and IP handover.

MONTHLY ARCHITECTURE RETAINER OPTION:
• ₹2,00,000 / month (or $2,500 USD/mo) for dedicated 15 hours/week senior architecture, code reviews, and critical bug triage.`,
  },
  {
    id: 'ps-5',
    title: 'Handling "Your Price is Higher Than Freelancers"',
    category: 'objection',
    tag: 'Objection Handling',
    description: 'Reframe from hourly commodity work to senior architectural reliability and zero rewrites.',
    script: `I completely understand budget considerations.

You can definitely find freelancers on Upwork for 30% less. However, 70% of the clients who come to Delegatespace Studio come to us *after* a low-cost freelancer delivered unmaintainable code that had to be scrapped and rewritten from scratch.

When you partner with me, you are getting Senior Lead Architecture, robust offline caching, clean state management, and 100% on-time delivery. You avoid months of technical debt and paying twice.`,
  },
];

export default function ClientsPage() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'directory' | 'tasks' | 'playbook'>('pipeline');
  const [projects, setProjects] = useState<ClientProject[]>(INITIAL_CLIENT_PROJECTS);
  const [tasks, setTasks] = useState<ClientTask[]>(INITIAL_CLIENT_TASKS);
  const [selectedClientId, setSelectedClientId] = useState<string>('cp-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quick Deal Form Modal
  const [showAddDealModal, setShowAddDealModal] = useState<boolean>(false);
  const [newDeal, setNewDeal] = useState({
    clientName: '',
    companyName: '',
    projectTitle: '',
    budget: '',
    stage: 'lead' as ClientProject['stage'],
    targetDeadline: '',
    notes: '',
  });

  // Quick Task Form
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('high');

  const STAGES: Array<{ id: ClientProject['stage']; label: string; badge: string; color: string }> = [
    { id: 'lead', label: '1. Inbound & Leads', badge: 'New', color: 'border-zinc-700 bg-zinc-900/60 text-zinc-300' },
    { id: 'discovery', label: '2. Discovery & Demo', badge: 'Active', color: 'border-blue-500/30 bg-blue-500/10 text-blue-300' },
    { id: 'proposal', label: '3. Proposal & Scope', badge: 'Sent', color: 'border-amber-500/30 bg-amber-500/10 text-amber-300' },
    { id: 'sprint', label: '4. Active Sprint', badge: 'Delivery', color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' },
    { id: 'review', label: '5. Client QA / Demo', badge: 'Review', color: 'border-purple-500/30 bg-purple-500/10 text-purple-300' },
    { id: 'delivered', label: '6. Retainer / Delivered', badge: 'Closed', color: 'border-sky-500/30 bg-sky-500/10 text-sky-300' },
  ];

  const handleCopyScript = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleMoveStage = (projectId: string, newStage: ClientProject['stage']) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, stage: newStage } : p))
    );
  };

  const handleToggleDeliverable = (projectId: string, delivId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updated = p.deliverables.map((d) =>
          d.id === delivId ? { ...d, done: !d.done } : d
        );
        const doneCount = updated.filter((d) => d.done).length;
        const progressPercent = Math.round((doneCount / (updated.length || 1)) * 100);
        return { ...p, deliverables: updated, progressPercent };
      })
    );
  };

  const handleToggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const nextStatus: ClientTask['status'] =
          t.status === 'todo'
            ? 'in_progress'
            : t.status === 'in_progress'
            ? 'review'
            : t.status === 'review'
            ? 'done'
            : 'todo';
        return { ...t, status: nextStatus };
      })
    );
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeal.clientName || !newDeal.companyName) return;
    const project: ClientProject = {
      id: `cp-${Date.now()}`,
      clientName: newDeal.clientName,
      companyName: newDeal.companyName,
      projectTitle: newDeal.projectTitle || 'Custom Architecture & Engineering Sprint',
      budget: newDeal.budget || '₹1,50,000 Milestone',
      stage: newDeal.stage,
      targetDeadline: newDeal.targetDeadline || '2026-12-15',
      progressPercent: newDeal.stage === 'sprint' ? 25 : 0,
      channel: 'Direct Outreach',
      nextDeliverable: 'Schedule discovery call and finalize technical scope',
      notes: newDeal.notes || 'Inbound client through portfolio & network.',
      deliverables: [
        { id: `d-${Date.now()}-1`, title: 'Discovery call & requirements alignment', done: false },
        { id: `d-${Date.now()}-2`, title: 'Milestone scope document & contract sign-off', done: false },
        { id: `d-${Date.now()}-3`, title: 'Initial technical delivery sprint', done: false },
      ],
    };

    setProjects([project, ...projects]);
    setShowAddDealModal(false);
    setNewDeal({
      clientName: '',
      companyName: '',
      projectTitle: '',
      budget: '',
      stage: 'lead',
      targetDeadline: '',
      notes: '',
    });
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const client = projects.find((p) => p.id === selectedClientId) || projects[0];
    const newTask: ClientTask = {
      id: `ct-${Date.now()}`,
      clientId: client?.id || 'general',
      clientName: client?.clientName || 'General Client',
      companyName: client?.companyName || 'Delegatespace Studio',
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
      status: 'todo',
      dueDate: '2026-11-28',
      deliverableTag: 'Sprint Milestone',
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const selectedClient = projects.find((p) => p.id === selectedClientId) || projects[0];

  return (
    <HubPageShell
      hubId="clients"
      title="Client Projects CRM, Delivery & Sales Playbook"
      badge="Full CRM + Task Management + Playbook"
      description="The end-to-end founder operating system for Delegatespace Studio: manage leads, deal pipelines, client deliverables, Saturday 4-hour execution blocks, and consultative outreach scripts."
    >
      {/* 1. TOP CRM KPI METRICS STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-emerald-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Active Sprint Value</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">₹3,00,000+</div>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>2 Active Contract Sprints Underway</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-sky-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Pipeline Value (All Deals)</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">₹5,20,000</div>
          <div className="mt-1 text-[11px] text-zinc-400">
            3 Active Deals • 82% Historical Win Rate
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-amber-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Saturday Execution Block</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">4.0 Hours</div>
          <div className="mt-1 text-[11px] text-amber-300">
            11:00 AM – 03:00 PM Uninterrupted Sprint
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-purple-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Deliverables Shipped</span>
            <CheckSquare className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">
            {tasks.filter((t) => t.status === 'done').length}/{tasks.length} Done
          </div>
          <div className="mt-1 text-[11px] text-zinc-400">
            {tasks.filter((t) => t.status === 'in_progress').length} In Progress • Ready for QA
          </div>
        </div>
      </div>

      {/* 2. 4-PILLAR WORKSPACE NAV TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950/90 p-1.5 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'pipeline'
                ? 'bg-emerald-400 text-zinc-950 font-bold shadow-md shadow-emerald-950/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>CRM Pipeline & Deals</span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'directory'
                ? 'bg-emerald-400 text-zinc-950 font-bold shadow-md shadow-emerald-950/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Client Management & Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'tasks'
                ? 'bg-emerald-400 text-zinc-950 font-bold shadow-md shadow-emerald-950/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Tasks & Saturday 4h Sprint</span>
          </button>

          <button
            onClick={() => setActiveTab('playbook')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'playbook'
                ? 'bg-emerald-400 text-zinc-950 font-bold shadow-md shadow-emerald-950/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Knowledge Base & Playbook</span>
          </button>
        </div>

        <button
          onClick={() => setShowAddDealModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-semibold transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Client / Deal</span>
        </button>
      </div>

      {/* 3. TAB 1: CRM PIPELINE & DEALS BOARD (KANBAN) */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Drag or move deals across stages as client conversations progress.</span>
            <span className="font-mono text-emerald-400">{projects.length} Total Projects Tracked</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {STAGES.map((st) => {
              const stageProjects = projects.filter((p) => p.stage === st.id);

              return (
                <div
                  key={st.id}
                  className="rounded-2xl bg-zinc-950/70 border border-zinc-850 p-3.5 space-y-3 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                    <span className="text-xs font-mono font-bold text-zinc-200">
                      {st.label}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${st.color}`}>
                      {stageProjects.length} Deals
                    </span>
                  </div>

                  <div className="space-y-2.5 flex-1 min-h-[140px]">
                    {stageProjects.length === 0 ? (
                      <div className="h-full flex items-center justify-center p-6 border border-dashed border-zinc-850 rounded-xl text-center text-[11px] text-zinc-500">
                        No deals in this stage
                      </div>
                    ) : (
                      stageProjects.map((p) => (
                        <div
                          key={p.id}
                          className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-emerald-500/40 transition-all space-y-2 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="text-xs font-bold text-white leading-tight">
                                {p.companyName}
                              </h4>
                              <p className="text-[11px] text-zinc-400">{p.clientName}</p>
                            </div>
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                              {p.budget}
                            </span>
                          </div>

                          <p className="text-[11px] text-zinc-300 leading-snug line-clamp-2">
                            {p.projectTitle}
                          </p>

                          {/* Progress */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                              <span>Milestone Progress</span>
                              <span>{p.progressPercent}%</span>
                            </div>
                            <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
                              <div
                                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                                style={{ width: `${p.progressPercent}%` }}
                              />
                            </div>
                          </div>

                          {/* Next Action & Move Stage Dropdown */}
                          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                            <span className="text-[10px] text-zinc-400 truncate max-w-[140px]" title={p.nextDeliverable}>
                              Next: {p.nextDeliverable}
                            </span>

                            <select
                              value={p.stage}
                              onChange={(e) => handleMoveStage(p.id, e.target.value as ClientProject['stage'])}
                              className="text-[10px] font-mono bg-zinc-950 border border-zinc-700 text-zinc-300 rounded px-1.5 py-0.5 focus:outline-none"
                            >
                              <option value="lead">Lead</option>
                              <option value="discovery">Discovery</option>
                              <option value="proposal">Proposal</option>
                              <option value="sprint">Sprint</option>
                              <option value="review">Review</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. TAB 2: CLIENT DIRECTORY & DETAILED MANAGEMENT */}
      {activeTab === 'directory' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Client Selector List (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-zinc-300">
                Active Client Accounts ({projects.length})
              </span>
            </div>

            <div className="space-y-2">
              {projects.map((p) => {
                const isSelected = p.id === selectedClient.id;

                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedClientId(p.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500/40 shadow-lg'
                        : 'bg-zinc-950/70 border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{p.companyName}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {p.stage}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">{p.clientName}</div>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-emerald-400 font-semibold">{p.budget}</span>
                      <span className="text-zinc-500">{p.targetDeadline}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deep-Dive Spec & Activity Drawer (8 Cols) */}
          <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-850 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{selectedClient.companyName}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 uppercase font-semibold">
                    {selectedClient.stage}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Primary Contact: <strong className="text-zinc-200">{selectedClient.clientName}</strong> • Inbound Channel: {selectedClient.channel}
                </p>
              </div>

              <div className="text-right font-mono">
                <span className="text-sm font-bold text-emerald-400">{selectedClient.budget}</span>
                <span className="block text-[11px] text-zinc-500">Target: {selectedClient.targetDeadline}</span>
              </div>
            </div>

            {/* Scope Summary */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                Project Title & Core Scope
              </span>
              <p className="text-xs text-zinc-200 bg-zinc-900/60 p-3 rounded-xl border border-zinc-850 leading-relaxed">
                {selectedClient.projectTitle}
              </p>
            </div>

            {/* Deliverables Checklist with Interactive Toggles */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold">
                  Milestone Deliverables ({selectedClient.deliverables.filter((d) => d.done).length}/{selectedClient.deliverables.length})
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {selectedClient.progressPercent}% Completed
                </span>
              </div>

              <div className="space-y-2">
                {selectedClient.deliverables.map((deliv) => (
                  <label
                    key={deliv.id}
                    onClick={() => handleToggleDeliverable(selectedClient.id, deliv.id)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-850 hover:border-emerald-500/30 text-xs cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={deliv.done}
                      readOnly
                      className="mt-0.5 rounded border-zinc-700 text-emerald-500 focus:ring-0"
                    />
                    <span className={`text-xs leading-relaxed ${deliv.done ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                      {deliv.title}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Architecture Notes & Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-850 space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Client Notes & Context</span>
                <p className="text-[11px] text-zinc-300 leading-snug">{selectedClient.notes}</p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-850 space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Next Strategic Milestone</span>
                <p className="text-[11px] text-emerald-300 font-medium leading-snug">
                  {selectedClient.nextDeliverable}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: TASKS & SATURDAY 4H SPRINT BOARD */}
      {activeTab === 'tasks' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT: CLIENT TASKS LIST (8 COLS) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Quick Task Add Form */}
            <form onSubmit={handleCreateTask} className="flex gap-2">
              <input
                type="text"
                placeholder={`+ Add a client deliverable task for ${selectedClient.companyName}... [Press Enter]`}
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-zinc-950/80 border border-emerald-500/20 text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-400 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-2xl bg-emerald-500 text-zinc-950 text-xs font-bold hover:bg-emerald-400 transition-colors"
              >
                Add Task
              </button>
            </form>

            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-850 hover:border-zinc-700 transition-all flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => handleToggleTaskStatus(task.id)}
                      className="mt-0.5"
                    >
                      {task.status === 'done' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-zinc-600 hover:text-emerald-400" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white">{task.companyName}</span>
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                          {task.deliverableTag}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                            task.priority === 'high'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <p
                        className={`text-xs ${
                          task.status === 'done' ? 'line-through text-zinc-500' : 'text-zinc-200'
                        }`}
                      >
                        {task.title}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <button
                      onClick={() => handleToggleTaskStatus(task.id)}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-emerald-500/30"
                    >
                      Status: {task.status}
                    </button>
                    <span className="block text-[10px] font-mono text-zinc-500 mt-1">Due: {task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: SATURDAY 4-HOUR EXECUTION RHYTHM (4 COLS) */}
          <div className="lg:col-span-4 p-5 rounded-3xl bg-[#08120c]/90 border border-emerald-500/25 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Saturday 4h Client Sprint
                </span>
                <span className="block text-[11px] text-zinc-400">11:00 AM – 03:00 PM (Zero Distraction)</span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold">
                4.0 Hours
              </span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-850 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-emerald-400">Hour 1 (11:00 – 12:00)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-850 text-zinc-300">1.0h</span>
                </div>
                <h5 className="text-xs font-semibold text-white">Client Triage & Feedback Review</h5>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Review GitHub PR comments, client Slack messages, and prioritize bug fixes and blockers.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-850 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-emerald-400">Hours 2–3 (12:00 – 02:00)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-850 text-zinc-300">2.0h</span>
                </div>
                <h5 className="text-xs font-semibold text-white">Core Engineering & Milestone Build</h5>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Uninterrupted deep code execution on the primary contracted milestone (offline queue, socket telemetry).
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-850 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-emerald-400">Hour 4 (02:00 – 03:00)</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-850 text-zinc-300">1.0h</span>
                </div>
                <h5 className="text-xs font-semibold text-white">Staging Deploy & Status Walkthrough</h5>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  Push build to TestFlight / Firebase staging and email the client a 2-minute Loom/walkthrough summary.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 4: KNOWLEDGE BASE & SALES PLAYBOOK */}
      {activeTab === 'playbook' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Production-tested sales scripts, discovery call frameworks, and objection handling for technical founders.</span>
            <span className="font-mono text-emerald-400">{PLAYBOOK_SCRIPTS.length} Playbooks Ready</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {PLAYBOOK_SCRIPTS.map((ps) => {
              const isCopied = copiedId === ps.id;

              return (
                <div
                  key={ps.id}
                  className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-850 hover:border-emerald-500/30 transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-semibold">
                        {ps.tag}
                      </span>
                      <button
                        onClick={() => handleCopyScript(ps.id, ps.script)}
                        className="flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Script</span>
                          </>
                        )}
                      </button>
                    </div>

                    <h4 className="text-sm font-bold text-white">{ps.title}</h4>
                    <p className="text-xs text-zinc-400 leading-snug">{ps.description}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-850/80 text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                    {ps.script}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. QUICK MODAL FOR ADDING A NEW CLIENT / DEAL */}
      {showAddDealModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-emerald-500/30 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                <span>Add New Client Deal to CRM</span>
              </h3>
              <button
                onClick={() => setShowAddDealModal(false)}
                className="text-xs text-zinc-500 hover:text-zinc-300"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Company / Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Health Technologies"
                  value={newDeal.companyName}
                  onChange={(e) => setNewDeal({ ...newDeal, companyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={newDeal.clientName}
                  onChange={(e) => setNewDeal({ ...newDeal, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Deal Budget *</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹1,50,000 Milestone"
                    value={newDeal.budget}
                    onChange={(e) => setNewDeal({ ...newDeal, budget: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Stage</label>
                  <select
                    value={newDeal.stage}
                    onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value as ClientProject['stage'] })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-400 font-mono"
                  >
                    <option value="lead">1. Inbound & Lead</option>
                    <option value="discovery">2. Discovery & Demo</option>
                    <option value="proposal">3. Proposal & Scope</option>
                    <option value="sprint">4. Active Sprint</option>
                    <option value="review">5. Client QA</option>
                    <option value="delivered">6. Retainer / Delivered</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Target Deadline</label>
                <input
                  type="date"
                  value={newDeal.targetDeadline}
                  onChange={(e) => setNewDeal({ ...newDeal, targetDeadline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Scope & Key Notes</label>
                <textarea
                  rows={2}
                  placeholder="Summary of engineering requirements, technology stack, and timeline..."
                  value={newDeal.notes}
                  onChange={(e) => setNewDeal({ ...newDeal, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDealModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400"
                >
                  Save Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </HubPageShell>
  );
}

