// src/components/today/AICopilotModal.tsx
'use client';

import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, Copy, Check, Plus, RefreshCw } from 'lucide-react';
import { playChime } from '@/lib/today/sound';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddTaskFromAI: (title: string, desc: string, mode: 'personal' | 'business' | 'job') => void;
  initialTopic?: string;
  initialAction?: string;
}

export function AICopilotModal({
  isOpen,
  onClose,
  onAddTaskFromAI,
  initialTopic,
  initialAction,
}: Props) {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickPrompts = [
    {
      label: '⚡ Optimize My Schedule for Today',
      action: 'schedule',
    },
    {
      label: '💼 Delegatework: LinkedIn Post & SEO',
      action: 'business_content',
      product: 'delegatework',
    },
    {
      label: '🌾 Fasly: Farmer Facebook Advisory Post',
      action: 'business_content',
      product: 'fasly',
    },
    {
      label: '🎓 Campus: 3 Internship Drops & Community Poll',
      action: 'business_content',
      product: 'campus',
    },
    {
      label: '🧠 DSA: Graph / DP LeetCode Pattern Drill',
      action: 'job_prep',
      topic: 'dsa',
    },
    {
      label: '📐 System Design: Distributed Caching Architecture',
      action: 'job_prep',
      topic: 'system_design',
    },
    {
      label: '🎙 Communication: Behavioral STAR Interview Scenario',
      action: 'job_prep',
      topic: 'communication',
    },
    {
      label: '📊 Review Today Progress & Next Steps',
      action: 'daily_review',
    },
  ];

  const handleSend = async (actionParam?: string, productParam?: string, topicParam?: string, customText?: string) => {
    setLoading(true);
    setResponse('');
    playChime('click');

    try {
      const res = await fetch('/api/today/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionParam || 'custom',
          prompt: customText || prompt,
          product: productParam,
          topic: topicParam,
        }),
      });

      const data = await res.json();
      if (data.success && data.result) {
        setResponse(data.result);
        playChime('success');
      } else {
        setResponse(data.error || 'Failed to process AI request.');
      }
    } catch (err: any) {
      setResponse('Connection failed. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    playChime('click');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-indigo-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Gemini Executive AI Copilot</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Online
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Strategic assistant tailored to Yogesh&apos;s products, job prep & personal goals
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Quick preset pills */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Instant Strategic Actions
            </span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.action, q.product, q.topic)}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-all active:scale-95 disabled:opacity-50"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Output Display */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
              <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
              <p className="text-xs font-mono animate-pulse">Gemini AI is analyzing your goals & synthesizing...</p>
            </div>
          )}

          {!loading && response && (
            <div className="relative p-5 rounded-2xl bg-slate-950/80 border border-indigo-500/20 space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-mono text-indigo-400 font-bold flex items-center gap-1.5">
                  <Bot className="w-4 h-4" />
                  <span>Gemini Intelligence Result</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                {response}
              </div>
            </div>
          )}
        </div>

        {/* Footer Input */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (prompt.trim()) handleSend('custom', undefined, undefined, prompt);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything: 'Suggest 3 high-converting SEO keywords for Delegatework', 'DSA Graph pattern'..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

