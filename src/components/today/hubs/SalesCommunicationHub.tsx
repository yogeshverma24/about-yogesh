// src/components/today/hubs/SalesCommunicationHub.tsx
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
} from 'lucide-react';
import { PracticeSessionLog, INITIAL_PRACTICE_SESSIONS } from '@/lib/today/hubData';

export function SalesCommunicationHub() {
  const [activeTrack, setActiveTrack] = useState<'communication' | 'sales'>('communication');
  const [sessions, setSessions] = useState<PracticeSessionLog[]>(INITIAL_PRACTICE_SESSIONS);
  const [showAddModal, setShowAddModal] = useState(false);

  // New session form state
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState('20');
  const [newScore, setNewScore] = useState('8.5');
  const [newTakeaway, setNewTakeaway] = useState('');
  const [newFramework, setNewFramework] = useState('STAR Technique');

  const filteredSessions = sessions.filter((s) => s.track === activeTrack);

  const totalMinutes = filteredSessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const avgScore = filteredSessions.length > 0
    ? (filteredSessions.reduce((acc, s) => acc + s.score, 0) / filteredSessions.length).toFixed(1)
    : '8.0';

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
      keyTakeaway: newTakeaway.trim() || 'Consistent deliberate practice on articulation and clarity.',
      frameworkUsed: newFramework,
    };

    setSessions([newLog, ...sessions]);
    setNewTitle('');
    setNewTakeaway('');
    setShowAddModal(false);
  };

  const commQuestions = [
    'Tell me about a time you resolved a high-severity production outage under time pressure.',
    'Explain the architectural trade-offs between Redis Cache-Aside vs Write-Through to a non-technical stakeholder.',
    'How do you handle disagreement with another senior engineer on system architecture?',
    'Describe how you optimized a slow mobile application to achieve 60fps and sub-1s load time.',
    'How do you prioritize tech debt vs fast-shipping client feature requests?',
  ];

  const salesObjections = [
    {
      objection: '“Your price of ₹1,50,000 per milestone seems higher than individual freelancers.”',
      handling: 'Anchor on certainty and velocity: “Freelancers bill hourly without skin in the game. Delegatespace delivers fixed-price milestones with guaranteed code quality, automated regression testing, and zero management overhead.”',
    },
    {
      objection: '“We are thinking of hiring an in-house developer instead.”',
      handling: 'Highlight opportunity cost: “A full-time hire takes 60–90 days to source, interview, and onboard plus overheads. We can kick off Milestone 1 this Saturday and have production-ready code in your hands by next week.”',
    },
    {
      objection: '“Can you do a free prototype or trial sprint first?”',
      handling: 'Offer consultative scoping instead: “We don’t do uncommitted spec work, but we will conduct a 45-minute architectural audit and map your technical roadmap for free. Once you see the clarity, you can greenlight Milestone 1 with 100% confidence.”',
    },
  ];

  return (
    <div className="space-y-6 text-xs">
      {/* 1. HEADER & DUAL TRACK SWITCHER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2">
              {activeTrack === 'communication' ? (
                <Mic className="w-5 h-5 text-amber-400" />
              ) : (
                <DollarSign className="w-5 h-5 text-emerald-400" />
              )}
              <span>Founder Growth: Communication & Sales Mastery</span>
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Deliberate practice lab: Track your articulation fluency, STAR technique drills, and high-ticket client pitch conversion.
          </p>
        </div>

        {/* Master Track Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => {
                setActiveTrack('communication');
                setNewFramework('STAR Technique');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                activeTrack === 'communication'
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Communication</span>
            </button>
            <button
              onClick={() => {
                setActiveTrack('sales');
                setNewFramework('Consultative Value Pitch');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
                activeTrack === 'sales'
                  ? 'bg-emerald-400 text-zinc-950 font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Sales & Pitching</span>
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold shadow-sm active:scale-95 transition-all ${
              activeTrack === 'communication'
                ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950'
                : 'bg-emerald-400 hover:bg-emerald-300 text-zinc-950'
            }`}
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Log Practice</span>
          </button>
        </div>
      </div>

      {/* ADD PRACTICE SESSION MODAL / FORM */}
      {showAddModal && (
        <form onSubmit={handleAddSession} className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-700 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="font-mono font-bold text-white uppercase tracking-wide">
              Log {activeTrack === 'communication' ? 'Communication Drill' : 'Sales Pitch Practice'}
            </span>
            <button type="button" onClick={() => setShowAddModal(false)} className="text-zinc-500 hover:text-white">
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Drill Title / Topic</label>
              <input
                type="text"
                placeholder={activeTrack === 'communication' ? 'e.g. STAR Story: Handling production bug in Flutter' : 'e.g. Pitching delegatespace milestone contract to fintech CTO'}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Duration (Minutes)</label>
              <input
                type="number"
                min="5"
                max="120"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Fluency / Confidence (1-10)</label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="10"
                value={newScore}
                onChange={(e) => setNewScore(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Framework Applied</label>
              <input
                type="text"
                value={newFramework}
                onChange={(e) => setNewFramework(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Key Improvement / Takeaway</label>
              <input
                type="text"
                placeholder="What went well? What was rushed or needs polish next time?"
                value={newTakeaway}
                onChange={(e) => setNewTakeaway(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-white text-zinc-950 font-bold shadow-md hover:bg-zinc-200 transition-all"
          >
            Save Deliberate Practice Log
          </button>
        </form>
      )}

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Practice Drills Completed</span>
          <div className="text-xl font-bold font-mono text-white">{filteredSessions.length} sessions</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Total Practice Time</span>
          <div className="text-xl font-bold font-mono text-sky-400">{totalMinutes} Minutes</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Average Fluency Score</span>
          <div className="text-xl font-bold font-mono text-amber-400">{avgScore} / 10</div>
        </div>
        <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-500">Learning Track</span>
          <div className="text-xl font-bold font-mono text-emerald-400 capitalize">{activeTrack}</div>
        </div>
      </div>

      {/* 3. CORE FRAMEWORK BLUEPRINT */}
      {activeTrack === 'communication' ? (
        <div className="p-4 rounded-3xl bg-zinc-950 border border-amber-500/25 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
            <span className="font-mono font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Core Communication Framework: The STAR Method</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Aim for under 2 minutes per story</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold block">S • Situation (30s)</span>
              <p className="text-[11px] text-zinc-300">Set context concisely: Company, team size, constraints, and the problem faced.</p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold block">T • Task (20s)</span>
              <p className="text-[11px] text-zinc-300">Your specific personal ownership: What did YOU need to solve or architect?</p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold block">A • Action (50s)</span>
              <p className="text-[11px] text-zinc-300">Deep technical steps: Algorithms chosen, trade-offs evaluated, how you led execution.</p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold block">R • Result (20s)</span>
              <p className="text-[11px] text-zinc-300">Hard numbers: 80% latency drop, 0 outages, ₹X revenue enabled, or positive feedback.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-3xl bg-zinc-950 border border-emerald-500/25 space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
            <span className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              <span>Core Sales Framework: Consultative Value-First Discovery</span>
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Diagnosis before Prescription</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">1. Problem Diagnosis</span>
              <p className="text-[11px] text-zinc-300">Ask: “What is breaking in your current release cycle that prompted this search?”</p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">2. Quantify Business Cost</span>
              <p className="text-[11px] text-zinc-300">Translate bugs to revenue: “How much is mobile app latency costing you in lost users each week?”</p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">3. Prescribe Fixed Milestone</span>
              <p className="text-[11px] text-zinc-300">“We will execute Milestone 1 this Saturday for ₹1,20,000 to completely resolve the caching layer.”</p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">4. Secure Advance & Kickoff</span>
              <p className="text-[11px] text-zinc-300">Send contract with 50% upfront milestone lock. Never start without committed deposit.</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. PRACTICE DRILLS BANK / OBJECTION PLAYBOOK */}
      {activeTrack === 'communication' ? (
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Senior/Staff Engineer Behavioral & System Design Drill Bank</span>
          </span>

          <div className="space-y-2">
            {commQuestions.map((q, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 flex items-start gap-3 transition-all"
              >
                <span className="font-mono text-amber-400 font-bold text-xs shrink-0 mt-0.5">#{idx + 1}</span>
                <span className="text-zinc-200 text-xs font-medium leading-relaxed">{q}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Client Sales Objection Handling Playbook</span>
          </span>

          <div className="space-y-2.5">
            {salesObjections.map((obj, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-850 space-y-1.5">
                <span className="text-emerald-400 font-semibold text-xs block">{obj.objection}</span>
                <p className="text-[11px] text-zinc-300 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80 leading-relaxed font-mono">
                  💡 Response: {obj.handling}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PRACTICE SESSION HISTORY LOG */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-sky-400" />
            <span>Deliberate Practice History ({filteredSessions.length} Logs)</span>
          </span>
          <span className="text-[11px] font-mono text-zinc-500">Track Improvement Over Time</span>
        </div>

        <div className="space-y-2">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-850 hover:border-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {session.date}
                  </span>
                  <span className="font-semibold text-white text-xs">{session.title}</span>
                  <span className="text-[10px] font-mono text-sky-400">({session.frameworkUsed})</span>
                </div>
                <p className="text-[11px] text-zinc-400 italic">💡 &quot;{session.keyTakeaway}&quot;</p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 font-mono text-xs">
                <span className="text-zinc-500">{session.durationMinutes} min</span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-950/60 text-amber-300 border border-amber-500/30 font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{session.score}/10</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

