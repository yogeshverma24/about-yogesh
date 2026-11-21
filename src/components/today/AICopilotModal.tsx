// src/components/today/AICopilotModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, X, Send, Bot, Copy, Check } from 'lucide-react';
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
}: Props) {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickPrompts = [
    {
      label: '⚡ Optimize My Schedule Today',
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
      label: '🎓 Campus: 3 Internship Drops & Poll',
      action: 'business_content',
      product: 'campus',
    },
    {
      label: '🧠 DSA: Graph / DP LeetCode Drill',
      action: 'job_prep',
      topic: 'dsa',
    },
    {
      label: '📐 System Design: Distributed Caching',
      action: 'job_prep',
      topic: 'system_design',
    },
    {
      label: '🎙 Communication: STAR Behavioral Drill',
      action: 'job_prep',
      topic: 'communication',
    },
    {
      label: '📊 Review Today Progress & Wins',
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
    } catch {
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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-copilot-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#0d1410]/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 id="ai-copilot-title" className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2">
                <span>AI Assistant</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Ready
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Customized for Yogesh&apos;s products, job prep & personal roadmap
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Quick preset pills */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400/90 block mb-2">
              Instant Strategic Actions
            </span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.action, q.product, q.topic)}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-900/80 hover:bg-emerald-950/40 text-zinc-300 hover:text-emerald-300 border border-zinc-800 hover:border-emerald-500/30 transition-all active:scale-95 disabled:opacity-50"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Output Display */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-zinc-400">
              <div className="w-7 h-7 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
              <p className="text-xs font-mono text-emerald-400/80 animate-pulse">Gemini AI is analyzing & generating...</p>
            </div>
          )}

          {!loading && response && (
            <div className="relative p-5 rounded-2xl bg-zinc-900/60 border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Bot className="w-4 h-4" />
                  <span>Intelligence Response</span>
                </span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-emerald-300 bg-zinc-800/80 hover:bg-zinc-800 px-2.5 py-1 rounded-lg border border-zinc-700/60 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-xs sm:text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans">
                {response}
              </div>
            </div>
          )}
        </div>

        {/* Footer Input */}
        <div className="p-4 border-t border-zinc-800 bg-[#0c120f]/90">
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
              className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
