// src/app/today/learning/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Mic,
  MessageSquare,
  TrendingUp,
  Plus,
  Star,
  Clock,
  Sparkles,
  CheckCircle2,
  BookOpen,
  DollarSign,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Target,
  Award,
  Copy,
  Check,
} from 'lucide-react';
import { HubPageShell } from '@/components/today/HubPageShell';
import { PracticeSessionLog, INITIAL_PRACTICE_SESSIONS } from '@/lib/today/hubData';

export default function LearningMasteryPage() {
  const [activeTrack, setActiveTrack] = useState<'communication' | 'sales'>('communication');
  const [sessions, setSessions] = useState<PracticeSessionLog[]>(INITIAL_PRACTICE_SESSIONS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New session form state
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState('25');
  const [newScore, setNewScore] = useState('8.5');
  const [newTakeaway, setNewTakeaway] = useState('');
  const [newFramework, setNewFramework] = useState('STAR Technique');

  const filteredSessions = sessions.filter((s) => s.track === activeTrack);

  const totalMinutes = filteredSessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const avgScore = filteredSessions.length > 0
    ? (filteredSessions.reduce((acc, s) => acc + s.score, 0) / filteredSessions.length).toFixed(1)
    : '8.0';

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newLog: PracticeSessionLog = {
      id: `ps-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      track: activeTrack,
      title: newTitle.trim(),
      durationMinutes: parseInt(newDuration, 10) || 20,
      score: parseFloat(newScore) || 8.0,
      keyTakeaway: newTakeaway.trim() || 'Consistent deliberate practice on articulation and crisp delivery.',
      frameworkUsed: newFramework,
    };

    setSessions([newLog, ...sessions]);
    setNewTitle('');
    setNewTakeaway('');
    setShowAddModal(false);
  };

  const commQuestions = [
    { id: 'cq-1', q: 'Tell me about a time you resolved a high-severity production outage under intense time pressure.', category: 'Crisis Management' },
    { id: 'cq-2', q: 'Explain the architectural trade-offs between Redis Cache-Aside vs Write-Through to a non-technical stakeholder.', category: 'Trade-Off Articulation' },
    { id: 'cq-3', q: 'How do you handle disagreement with another senior engineer on database sharding or microservice boundaries?', category: 'Conflict Resolution' },
    { id: 'cq-4', q: 'Describe how you optimized a slow mobile application to achieve 60fps and sub-1s load time.', category: 'Performance Deep Dive' },
    { id: 'cq-5', q: 'How do you prioritize technical debt vs fast-shipping client feature requests?', category: 'Engineering Leadership' },
    { id: 'cq-6', q: 'Walk me through how Swift 6 Actors prevent data races at compile time compared to manual locks.', category: 'Native Systems' },
  ];

  return (
    <HubPageShell
      hubId="learning"
      title="Communication & Sales Mastery Hub"
      badge="Deliberate Practice Lab"
      description="The dedicated learning and deliberate practice center for Yogesh Verma: practice senior technical storytelling (STAR/PREP/BLUF), drill engineering interview questions, and master consultative client sales pitches."
    >
      {/* 1. DUAL-TRACK MODE SWITCHER HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950/90 p-1.5 rounded-2xl border border-zinc-800">
        <div className="flex items-center gap-1.5 no-scrollbar overflow-x-auto">
          <button
            onClick={() => setActiveTrack('communication')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTrack === 'communication'
                ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-zinc-950 font-bold shadow-md shadow-orange-950/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Communication</span>
          </button>

          <button
            onClick={() => setActiveTrack('sales')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTrack === 'sales'
                ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-zinc-950 font-bold shadow-md shadow-emerald-950/40'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Sales Pitch</span>
          </button>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Log Drill</span>
        </button>
      </div>

      {/* 2. DELIBERATE PRACTICE SCORECARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-orange-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Deliberate Practice Time</span>
            <Clock className="w-4 h-4 text-orange-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">{totalMinutes} Mins</div>
          <div className="mt-1 text-[11px] text-zinc-400">Target: 30 Mins / Day Drills</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-orange-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Average Fluency Score</span>
            <Star className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-amber-400 font-mono">{avgScore} / 10</div>
          <div className="mt-1 text-[11px] text-emerald-400">Crisp, Structured & Confident</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-orange-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Drills Logged</span>
            <Target className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-white font-mono">{filteredSessions.length} Sessions</div>
          <div className="mt-1 text-[11px] text-zinc-400">Track: {activeTrack}</div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950/80 border border-orange-500/20 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Primary Mental Model</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 text-base font-bold text-purple-300 font-mono truncate">
            {activeTrack === 'communication' ? 'STAR + PREP/BLUF' : 'SPIN Selling + Value'}
          </div>
          <div className="mt-1 text-[11px] text-zinc-400">Executive Articulation</div>
        </div>
      </div>

      {/* 3. TRACK A: COMMUNICATION MASTERY */}
      {activeTrack === 'communication' && (
        <div className="space-y-6">
          {/* STAR Framework Blueprint */}
          <div className="p-5 sm:p-6 rounded-3xl bg-zinc-950/90 border border-amber-500/25 space-y-4 shadow-xl">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>STAR Behavioral & Technical Storytelling Formula</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-1">
                <span className="font-mono font-bold text-amber-400">S — Situation (15%)</span>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  Set the technical context concisely: &ldquo;At AeroSync, our real-time GPS telemetry was dropping 18% of packets during tunnel transitions.&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-1">
                <span className="font-mono font-bold text-sky-400">T — Task (15%)</span>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  What was your exact personal ownership: &ldquo;I owned the end-to-end redesign of the offline SQLite queue and reconnection protocol.&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-1">
                <span className="font-mono font-bold text-emerald-400">A — Action (50%)</span>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  The deep technical engineering decisions: &ldquo;I replaced naive polling with exponential backoff, isolated DB writes to an Actor thread, and batched updates.&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-1">
                <span className="font-mono font-bold text-purple-400">R — Result (20%)</span>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  Quantifiable impact: &ldquo;Zero data loss across 12,000 drivers, battery consumption reduced by 22%, and crash rates dropped to 0.02%.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Drill Bank (50 Questions Pool) */}
          <div className="p-5 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-3.5">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2.5">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Mic className="w-4 h-4 text-amber-400" />
                <span>Senior / Staff Engineering Mock Drill Bank</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400">
                Practice 1 Drill Out Loud Daily
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commQuestions.map((q) => (
                <div key={q.id} className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                    {q.category}
                  </span>
                  <p className="text-xs font-medium text-white leading-snug pt-1">{q.q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. TRACK B: SALES & CLIENT PITCH MASTERY */}
      {activeTrack === 'sales' && (
        <div className="space-y-6">
          {/* SPIN Selling Framework */}
          <div className="p-5 sm:p-6 rounded-3xl bg-zinc-950/90 border border-emerald-500/25 space-y-4 shadow-xl">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Value-First Consultative Discovery Framework (SPIN)</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-1">
                <span className="font-mono font-bold text-emerald-400">S — Situation</span>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  &ldquo;What is your current mobile stack and deployment pipeline? How many active users are encountering the issue?&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-1">
                <span className="font-mono font-bold text-sky-400">P — Problem</span>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  &ldquo;Where are your developers spending the most hours? Is state management debt stalling feature releases?&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-1">
                <span className="font-mono font-bold text-amber-400">I — Implication</span>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  &ldquo;If this release is delayed by another 4 weeks, what does that do to user churn and your next fundraising deck?&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-850 space-y-1">
                <span className="font-mono font-bold text-purple-400">N — Need-Payoff</span>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  &ldquo;If we deliver a rock-solid, zero-crash architecture in a 3-week milestone, how does that accelerate your roadmap?&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PRACTICE SESSION LOG HISTORY */}
      <div className="p-5 rounded-3xl bg-zinc-950/90 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Deliberate Practice History & Reflection Log</span>
          </span>
          <span className="text-xs font-mono text-zinc-400">
            {filteredSessions.length} Drills Recorded
          </span>
        </div>

        <div className="space-y-3">
          {filteredSessions.map((s) => (
            <div
              key={s.id}
              className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-850 hover:border-zinc-750 transition-all space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">{s.title}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-zinc-800 text-zinc-300">
                    {s.frameworkUsed}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-amber-400 font-bold">★ {s.score}/10 Score</span>
                  <span className="text-zinc-500">{s.durationMinutes} Mins</span>
                  <span className="text-zinc-500">{s.date}</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-300 leading-relaxed bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-850">
                <strong className="text-zinc-400 font-mono">Takeaway:</strong> {s.keyTakeaway}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. ADD PRACTICE DRILL MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-amber-500/30 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Mic className="w-4 h-4 text-amber-400" />
                <span>Log Deliberate Practice Drill ({activeTrack})</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-xs text-zinc-500 hover:text-zinc-300"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleAddSession} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Drill Topic / Question Practiced *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Explaining Redis Write-Through vs Cache-Aside"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Self Score (1-10)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="10"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">Framework</label>
                  <select
                    value={newFramework}
                    onChange={(e) => setNewFramework(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-amber-400 font-mono"
                  >
                    <option value="STAR Technique">STAR Technique</option>
                    <option value="PREP / BLUF">PREP / BLUF</option>
                    <option value="SPIN Selling">SPIN Selling</option>
                    <option value="System Trade-Off">System Trade-Off</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Key Takeaway / Improvement Area</label>
                <textarea
                  rows={2}
                  placeholder="What went well? Where was hesitation or filler words? What will you refine tomorrow?"
                  value={newTakeaway}
                  onChange={(e) => setNewTakeaway(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-400 text-zinc-950 font-bold hover:bg-amber-300"
                >
                  Save Practice Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </HubPageShell>
  );
}

