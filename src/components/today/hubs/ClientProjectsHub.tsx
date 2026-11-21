// src/components/today/hubs/ClientProjectsHub.tsx
'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Target,
  Clock,
  Plus,
  CheckCircle2,
  Circle,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  FileText,
  DollarSign,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ClientProject, INITIAL_CLIENT_PROJECTS } from '@/lib/today/hubData';

export function ClientProjectsHub() {
  const [projects, setProjects] = useState<ClientProject[]>(INITIAL_CLIENT_PROJECTS);
  const [activePlaybookTab, setActivePlaybookTab] = useState<'scripts' | 'pipeline' | 'sprint'>('pipeline');
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedClient, setExpandedClient] = useState<string | null>('cp-1');

  // New Client Form State
  const [newClientName, setNewClientName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newBudget, setNewBudget] = useState('₹1,50,000 Milestone');
  const [newChannel, setNewChannel] = useState('LinkedIn Outreach');

  const handleToggleDeliverable = (projectId: string, deliverableId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updated = p.deliverables.map((d) =>
          d.id === deliverableId ? { ...d, done: !d.done } : d
        );
        const doneCount = updated.filter((d) => d.done).length;
        const progress = Math.round((doneCount / (updated.length || 1)) * 100);
        return { ...p, deliverables: updated, progressPercent: progress };
      })
    );
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim() || !newProjectTitle.trim()) return;

    const newProject: ClientProject = {
      id: `cp-${Date.now()}`,
      clientName: newClientName.trim(),
      companyName: newCompany.trim() || 'Confidential Client',
      projectTitle: newProjectTitle.trim(),
      budget: newBudget.trim(),
      stage: 'discovery',
      targetDeadline: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      progressPercent: 10,
      channel: newChannel,
      nextDeliverable: 'Conduct discovery call & deliver scope proposal',
      notes: 'Added via Client Projects Workspace.',
      deliverables: [
        { id: `d-${Date.now()}-1`, title: 'Define technical scope & architectural diagram', done: false },
        { id: `d-${Date.now()}-2`, title: 'Milestone 1 Core MVP Delivery', done: false },
      ],
    };

    setProjects([newProject, ...projects]);
    setNewClientName('');
    setNewCompany('');
    setNewProjectTitle('');
    setShowAddForm(false);
    setExpandedClient(newProject.id);
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER & SUB-NAVIGATION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-sky-400" />
              <span>Client Projects Sprint & Pipeline Command</span>
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Systematic client acquisition, active sprint milestones, and Saturday 4h delivery execution for Delegatespace.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActivePlaybookTab('pipeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePlaybookTab === 'pipeline'
                  ? 'bg-sky-400 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Active Pipeline
            </button>
            <button
              onClick={() => setActivePlaybookTab('sprint')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePlaybookTab === 'sprint'
                  ? 'bg-sky-400 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Saturday 4h Sprint
            </button>
            <button
              onClick={() => setActivePlaybookTab('scripts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePlaybookTab === 'scripts'
                  ? 'bg-sky-400 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Acquisition Scripts
            </button>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-sky-400 hover:bg-sky-300 text-zinc-950 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Add Client</span>
          </button>
        </div>
      </div>

      {/* ADD CLIENT MODAL / INLINE FORM */}
      {showAddForm && (
        <form onSubmit={handleAddClient} className="p-4 rounded-2xl bg-zinc-900/80 border border-sky-500/30 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wide">
              Add New Client Project / Contract
            </span>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-zinc-500 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Client Contact Name</label>
              <input
                type="text"
                placeholder="e.g. Vikram Sharma"
                value={newClientName}
                onChange={(e) => setNewClientName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Company / Venture Name</label>
              <input
                type="text"
                placeholder="e.g. NexaPay Technologies"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-sky-400"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Project Deliverable Title</label>
              <input
                type="text"
                placeholder="e.g. Cross-Platform iOS & Android Mobile MVP with Supabase Backend"
                value={newProjectTitle}
                onChange={(e) => setNewProjectTitle(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Budget / Contract Rate</label>
              <input
                type="text"
                placeholder="e.g. ₹1,50,000 Milestone"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-sky-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Acquisition Source</label>
              <select
                value={newChannel}
                onChange={(e) => setNewChannel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-sky-400 cursor-pointer"
              >
                <option value="LinkedIn Outreach">LinkedIn Outreach</option>
                <option value="Direct Referral">Direct Referral</option>
                <option value="Inbound Website Demo">Inbound Website Demo</option>
                <option value="Upwork / Contract">Upwork / Contract</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-sky-400 hover:bg-sky-300 text-zinc-950 font-bold text-xs shadow-md transition-all"
          >
            Create Client Pipeline Entry
          </button>
        </form>
      )}

      {/* TAB 1: ACTIVE CLIENT PIPELINE */}
      {activePlaybookTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500">Active Sprint Contracts</span>
              <div className="text-xl font-bold font-mono text-white">
                {projects.filter((p) => p.stage === 'sprint').length} <span className="text-xs text-zinc-500">in execution</span>
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500">Pipeline Value</span>
              <div className="text-xl font-bold font-mono text-emerald-400">₹3,00,000+</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500">Saturday Sprint Commitment</span>
              <div className="text-xl font-bold font-mono text-sky-400">4.0 Hours</div>
            </div>
          </div>

          {/* Client Projects List */}
          <div className="space-y-3">
            {projects.map((project) => {
              const isExpanded = expandedClient === project.id;
              const stageColors: Record<string, string> = {
                lead: 'bg-zinc-800 text-zinc-300 border-zinc-700',
                discovery: 'bg-indigo-950/50 text-indigo-300 border-indigo-500/30',
                proposal: 'bg-amber-950/50 text-amber-300 border-amber-500/30',
                sprint: 'bg-sky-950/50 text-sky-300 border-sky-500/40',
                review: 'bg-purple-950/50 text-purple-300 border-purple-500/30',
                delivered: 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30',
              };

              return (
                <div
                  key={project.id}
                  className="rounded-2xl bg-zinc-950/70 border border-zinc-800 hover:border-zinc-700 transition-all overflow-hidden"
                >
                  <div
                    onClick={() => setExpandedClient(isExpanded ? null : project.id)}
                    className="p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-900/40 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-white">{project.clientName}</span>
                        <span className="text-xs text-zinc-400 font-mono">({project.companyName})</span>
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border font-semibold ${stageColors[project.stage] || stageColors.sprint}`}>
                          {project.stage}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                          {project.channel}
                        </span>
                      </div>
                      <h4 className="text-xs text-zinc-300 font-medium">{project.projectTitle}</h4>
                    </div>

                    <div className="flex items-center gap-4 self-start sm:self-auto shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-emerald-400">{project.budget}</div>
                        <div className="text-[10px] font-mono text-zinc-500">Due {project.targetDeadline}</div>
                      </div>
                      <div className="w-16 sm:w-24 space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                          <span>{project.progressPercent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-400 rounded-full transition-all duration-300"
                            style={{ width: `${project.progressPercent}%` }}
                          />
                        </div>
                      </div>
                      <button className="text-zinc-500 hover:text-white p-1">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-4 pt-1 border-t border-zinc-850 bg-zinc-900/20 space-y-3 text-xs animate-in fade-in">
                      {/* Next Deliverable highlight */}
                      <div className="p-2.5 rounded-xl bg-sky-950/30 border border-sky-500/20 flex items-start gap-2">
                        <Target className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider block">
                            Next Saturday Milestone Action
                          </span>
                          <span className="text-zinc-200">{project.nextDeliverable}</span>
                        </div>
                      </div>

                      {/* Deliverables Checklist */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                          Contract Deliverables Checklist
                        </span>
                        {project.deliverables.map((del) => (
                          <div
                            key={del.id}
                            onClick={() => handleToggleDeliverable(project.id, del.id)}
                            className="flex items-center gap-2 p-2 rounded-xl bg-zinc-950/60 border border-zinc-800 cursor-pointer hover:border-zinc-700 transition-all"
                          >
                            {del.done ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-zinc-600 shrink-0" />
                            )}
                            <span className={del.done ? 'line-through text-zinc-500' : 'text-zinc-300'}>
                              {del.title}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Notes */}
                      {project.notes && (
                        <p className="text-[11px] text-zinc-400 italic pt-1 border-t border-zinc-800/60">
                          📌 Notes: {project.notes}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SATURDAY 4-HOUR SPRINT BLUEPRINT */}
      {activePlaybookTab === 'sprint' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-sky-500/20 space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Saturday 4-Hour Client Execution Rhythm (10:00 AM – 02:00 PM)</span>
            </h3>
            <p className="text-xs text-zinc-300">
              Never spread client work haphazardly across weekdays. Batch paid execution strictly into Saturday morning so Monday-Friday evenings remain focused on your products and career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-sky-400 font-bold px-2 py-0.5 rounded bg-sky-950/60 border border-sky-500/30 inline-block">
                Hour 1 • 10:00 - 11:00 AM
              </span>
              <h5 className="font-semibold text-white">Milestone Scoping & Branch Setup</h5>
              <p className="text-[11px] text-zinc-400 leading-snug">
                Review client tickets, pull latest git main, set up staging feature branch, and test existing contracts.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-sky-400 font-bold px-2 py-0.5 rounded bg-sky-950/60 border border-sky-500/30 inline-block">
                Hour 2 • 11:00 AM - 12:00 PM
              </span>
              <h5 className="font-semibold text-white">Deep Feature Coding</h5>
              <p className="text-[11px] text-zinc-400 leading-snug">
                Zero distraction coding: Implement the primary business logic, database mutations, and UI components.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-sky-400 font-bold px-2 py-0.5 rounded bg-sky-950/60 border border-sky-500/30 inline-block">
                Hour 3 • 12:00 - 01:00 PM
              </span>
              <h5 className="font-semibold text-white">Integration & Edge Case QA</h5>
              <p className="text-[11px] text-zinc-400 leading-snug">
                Test offline failure modes, validate API responses, and run regression tests against staging database.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-sky-400 font-bold px-2 py-0.5 rounded bg-sky-950/60 border border-sky-500/30 inline-block">
                Hour 4 • 01:00 - 02:00 PM
              </span>
              <h5 className="font-semibold text-white">Deploy & Client Demo Video</h5>
              <p className="text-[11px] text-zinc-400 leading-snug">
                Deploy build to staging server/TestFlight, record 2-minute Loom/walkthrough video for client, and send milestone invoice.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLIENT ACQUISITION PLAYBOOK & SCRIPTS */}
      {activePlaybookTab === 'scripts' && (
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Script 1 */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                <span className="font-mono font-bold text-sky-400 text-xs flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>LinkedIn Founder Outreach (Consultative)</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500">Cold Connection</span>
              </div>
              <p className="text-[11px] text-zinc-300 italic bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 leading-relaxed font-mono">
                &quot;Hi [Founder Name], saw [Company]’s latest milestone in [Industry]. I noticed your mobile app / web interface is growing fast. We run Delegatespace, an engineering studio specializing in high-performance Flutter, Swift, and Next.js applications. Recently helped a similar team cut app crash rate by 80% while accelerating sprint releases. Would love to send over a 2-min breakdown of 2 quick optimization wins for [Company]—no pitch, just architectural observations. Let me know if that makes sense!&quot;
              </p>
            </div>

            {/* Script 2 */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
                <span className="font-mono font-bold text-emerald-400 text-xs flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Sprint Proposal & Milestone Structure</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500">Contract Closing</span>
              </div>
              <p className="text-[11px] text-zinc-300 italic bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 leading-relaxed font-mono">
                &quot;Instead of open-ended hourly billing, Delegatespace operates on Fixed-Price Weekly Sprints:
                <br />• Milestone 1: Core Architecture & Database Sync (50% upfront)
                <br />• Milestone 2: Production Staging Verification & Regression Check (25%)
                <br />• Milestone 3: Live Production Deployment & 14-day warranty (25%)
                <br />This guarantees delivery deadlines without budget surprises.&quot;
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

