// src/components/today/hubs/ProductRoadmapHub.tsx
'use client';

import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
  Tag,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  FileCode,
} from 'lucide-react';
import { ProductVersion, RoadmapItem, INITIAL_PRODUCT_VERSIONS } from '@/lib/today/hubData';

export function ProductRoadmapHub() {
  const [selectedProduct, setSelectedProduct] = useState<'delegatework' | 'fasly' | 'campus' | 'delegatespace'>('delegatework');
  const [versions, setVersions] = useState<ProductVersion[]>(INITIAL_PRODUCT_VERSIONS);
  const [activeVersionId, setActiveVersionId] = useState<string>('ver-dw-1');

  // Form states
  const [showAddVersion, setShowAddVersion] = useState(false);
  const [newVersionNumber, setNewVersionNumber] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('');
  const [newHeadline, setNewHeadline] = useState('');

  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemType, setNewItemType] = useState<'feature' | 'ui_ux' | 'bugfix' | 'performance'>('ui_ux');

  // Filter versions for currently selected product
  const productVersions = versions.filter((v) => v.productId === selectedProduct);
  const currentVersion =
    productVersions.find((v) => v.id === activeVersionId) || productVersions[0] || versions[0];

  const handleAddVersion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVersionNumber.trim() || !newHeadline.trim()) return;

    const newVer: ProductVersion = {
      id: `ver-${selectedProduct}-${Date.now()}`,
      productId: selectedProduct,
      productName: selectedProduct === 'delegatework' ? 'Delegatework' : selectedProduct === 'fasly' ? 'Fasly' : selectedProduct === 'campus' ? 'DelegateCampus' : 'Delegatespace',
      versionNumber: newVersionNumber.trim(),
      status: 'planned',
      targetReleaseDate: newTargetDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      headline: newHeadline.trim(),
      items: [],
    };

    setVersions([...versions, newVer]);
    setActiveVersionId(newVer.id);
    setNewVersionNumber('');
    setNewHeadline('');
    setNewTargetDate('');
    setShowAddVersion(false);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim() || !currentVersion) return;

    const newItem: RoadmapItem = {
      id: `item-${Date.now()}`,
      title: newItemTitle.trim(),
      type: newItemType,
      status: 'planned',
    };

    setVersions((prev) =>
      prev.map((v) => {
        if (v.id !== currentVersion.id) return v;
        return { ...v, items: [...v.items, newItem] };
      })
    );

    setNewItemTitle('');
  };

  const handleToggleItemStatus = (itemId: string) => {
    setVersions((prev) =>
      prev.map((v) => {
        if (v.id !== currentVersion.id) return v;
        const updated = v.items.map((it) => {
          if (it.id !== itemId) return it;
          const nextStatus: Record<string, 'planned' | 'in_progress' | 'ready' | 'shipped'> = {
            planned: 'in_progress',
            in_progress: 'ready',
            ready: 'shipped',
            shipped: 'planned',
          };
          return { ...it, status: nextStatus[it.status] || 'planned' };
        });
        return { ...v, items: updated };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>Product Roadmap & Version Release Command</span>
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Track exact version increments, planned UI/UX improvements, and deployment target dates across all 4 products.
          </p>
        </div>

        <button
          onClick={() => setShowAddVersion(!showAddVersion)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-zinc-950 shadow-sm active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Version Release</span>
        </button>
      </div>

      {/* 2. PRODUCT SELECTOR TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-zinc-850">
        {[
          { id: 'delegatework', name: 'Delegatework (Teams Platform)', badge: 'B2B Async' },
          { id: 'fasly', name: 'Fasly (Agriculture App)', badge: 'Kisan Advisory' },
          { id: 'campus', name: 'Campus (Student Community)', badge: 'Jobs & Tech' },
          { id: 'delegatespace', name: 'Delegatespace (Studio Portfolio)', badge: 'Agency Revenue' },
        ].map((p) => {
          const active = selectedProduct === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProduct(p.id as any);
                const first = versions.find((v) => v.productId === p.id);
                if (first) setActiveVersionId(first.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                active
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <span>{p.name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-950 text-zinc-400 border border-zinc-800">
                {p.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* NEW VERSION MODAL / FORM */}
      {showAddVersion && (
        <form onSubmit={handleAddVersion} className="p-4 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 space-y-3 animate-in fade-in text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <span className="font-mono font-bold text-emerald-400 uppercase tracking-wide">
              Plan New Version for {selectedProduct.toUpperCase()}
            </span>
            <button type="button" onClick={() => setShowAddVersion(false)} className="text-zinc-500 hover:text-white">
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Version Number</label>
              <input
                type="text"
                placeholder="e.g. v1.4.0"
                value={newVersionNumber}
                onChange={(e) => setNewVersionNumber(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Target Release Date</label>
              <input
                type="date"
                value={newTargetDate}
                onChange={(e) => setNewTargetDate(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-emerald-400 cursor-pointer"
              />
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 font-mono block mb-1">Primary Release Headline</label>
              <input
                type="text"
                placeholder="e.g. Offline Sync & AI Meeting Digests"
                value={newHeadline}
                onChange={(e) => setNewHeadline(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-xs shadow-md transition-all"
          >
            Create Version Milestone
          </button>
        </form>
      )}

      {/* 3. VERSION ROADMAP CARDS & SELECTED VERSION DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: AVAILABLE VERSIONS FOR PRODUCT (4 COLS) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block pl-1">
            Release Pipeline ({productVersions.length} Versions)
          </span>

          {productVersions.map((ver) => {
            const isSelected = currentVersion?.id === ver.id;
            const statusBadge: Record<string, string> = {
              live: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
              in_development: 'bg-sky-950/60 text-sky-300 border-sky-500/30',
              qa: 'bg-amber-950/60 text-amber-300 border-amber-500/30',
              planned: 'bg-zinc-800 text-zinc-400 border-zinc-700',
            };

            return (
              <div
                key={ver.id}
                onClick={() => setActiveVersionId(ver.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-zinc-900 border-emerald-400 shadow-md ring-1 ring-emerald-500/30'
                    : 'bg-zinc-950/70 border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-sm text-white">{ver.versionNumber}</span>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border font-semibold ${statusBadge[ver.status] || statusBadge.planned}`}>
                    {ver.status.replace('_', ' ')}
                  </span>
                </div>
                <h5 className="text-xs text-zinc-300 font-medium line-clamp-2">{ver.headline}</h5>
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-2 pt-2 border-t border-zinc-850">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-zinc-400" />
                    <span>Target: {ver.targetReleaseDate}</span>
                  </span>
                  <span>{ver.items.length} items</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: ITEMS IN CURRENT VERSION (8 COLS) */}
        {currentVersion && (
          <div className="lg:col-span-8 space-y-4 p-5 rounded-3xl bg-zinc-950/80 border border-zinc-800">
            {/* Version Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-850 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold font-mono text-white">{currentVersion.versionNumber}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-300 border border-emerald-500/30">
                    Release Date: {currentVersion.targetReleaseDate}
                  </span>
                </div>
                <h4 className="text-xs text-zinc-300 mt-0.5 font-medium">{currentVersion.headline}</h4>
              </div>

              <div className="text-[11px] font-mono text-zinc-400">
                <span>Shipped: </span>
                <strong className="text-emerald-400">
                  {currentVersion.items.filter((i) => i.status === 'ready' || i.status === 'shipped').length} / {currentVersion.items.length}
                </strong>
              </div>
            </div>

            {/* Quick Add Item to Version */}
            <form onSubmit={handleAddItem} className="flex gap-2">
              <input
                type="text"
                placeholder={`+ Add improvement, UI/UX polish or fix for ${currentVersion.versionNumber}...`}
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-400"
              />
              <select
                value={newItemType}
                onChange={(e) => setNewItemType(e.target.value as any)}
                className="px-2.5 py-1.5 text-xs rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 focus:outline-none cursor-pointer"
              >
                <option value="ui_ux">UI/UX Polish</option>
                <option value="feature">New Feature</option>
                <option value="bugfix">Bug Fix</option>
                <option value="performance">Performance</option>
              </select>
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold text-xs shadow-sm transition-all"
              >
                Add
              </button>
            </form>

            {/* Items List */}
            <div className="space-y-2 pt-1">
              {currentVersion.items.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 text-xs">
                  No improvements logged for this version yet. Type an item title above and click Add.
                </div>
              ) : (
                currentVersion.items.map((item) => {
                  const typeColors: Record<string, string> = {
                    ui_ux: 'bg-purple-950/40 text-purple-300 border-purple-500/30',
                    feature: 'bg-sky-950/40 text-sky-300 border-sky-500/30',
                    bugfix: 'bg-rose-950/40 text-rose-300 border-rose-500/30',
                    performance: 'bg-amber-950/40 text-amber-300 border-amber-500/30',
                  };

                  const statusColors: Record<string, string> = {
                    planned: 'text-zinc-500 border-zinc-800 bg-zinc-900',
                    in_progress: 'text-sky-300 border-sky-500/30 bg-sky-950/50',
                    ready: 'text-emerald-300 border-emerald-500/30 bg-emerald-950/50',
                    shipped: 'text-emerald-400 border-emerald-500/40 bg-emerald-950',
                  };

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleToggleItemStatus(item.id)}
                      className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 flex items-center justify-between gap-3 text-xs cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border shrink-0 ${typeColors[item.type]}`}>
                          {item.type.replace('_', '/')}
                        </span>
                        <span className={`font-medium truncate ${item.status === 'shipped' ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                          {item.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-[10px] font-mono capitalize px-2 py-0.5 rounded-md border font-semibold ${statusColors[item.status]}`}>
                          {item.status.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-zinc-600 hidden sm:inline">(Click to advance)</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

