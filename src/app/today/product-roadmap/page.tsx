// src/app/today/product-roadmap/page.tsx
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
  Check,
  Filter,
} from 'lucide-react';
import { HubPageShell } from '@/components/today/HubPageShell';
import { ProductVersion, RoadmapItem, INITIAL_PRODUCT_VERSIONS } from '@/lib/today/hubData';

export default function ProductRoadmapPage() {
  const [selectedProduct, setSelectedProduct] = useState<'delegatework' | 'fasly' | 'campus' | 'delegatespace'>('delegatework');
  const [versions, setVersions] = useState<ProductVersion[]>(INITIAL_PRODUCT_VERSIONS);
  const [activeVersionId, setActiveVersionId] = useState<string>('ver-dw-1');

  // Form states
  const [showAddVersion, setShowAddVersion] = useState(false);
  const [newVersionNumber, setNewVersionNumber] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('');
  const [newHeadline, setNewHeadline] = useState('');

  React.useEffect(() => {
    if (!showAddVersion) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowAddVersion(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAddVersion]);

  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemType, setNewItemType] = useState<'feature' | 'ui_ux' | 'bugfix' | 'performance'>('ui_ux');
  const [filterType, setFilterType] = useState<string>('all');

  const products = [
    { id: 'delegatework', name: 'Delegatework', badge: 'v1.2 In Dev', domain: 'https://delegatework.in/' },
    { id: 'fasly', name: 'Fasly', badge: 'v2.1 In Dev', domain: 'https://fasly.in/' },
    { id: 'campus', name: 'DelegateCampus', badge: 'v1.4 Ready', domain: 'https://delegatecampus.in/' },
    { id: 'delegatespace', name: 'Delegatespace', badge: 'v2.0 In Dev', domain: 'https://www.delegatespace.com/' },
  ] as const;

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

  const filteredItems = (currentVersion?.items || []).filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const shippedCount = currentVersion?.items.filter((i) => i.status === 'shipped').length || 0;
  const readyCount = currentVersion?.items.filter((i) => i.status === 'ready').length || 0;
  const inProgressCount = currentVersion?.items.filter((i) => i.status === 'in_progress').length || 0;
  const totalItems = currentVersion?.items.length || 0;
  const progressPercent = totalItems > 0 ? Math.round(((shippedCount + readyCount) / totalItems) * 100) : 0;

  return (
    <HubPageShell
      hubId="product-roadmap"
      title="Product Roadmap"
      badge="4 Ventures"
    >
      {/* 1. VENTURE PLATFORM SELECTOR TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {products.map((p) => {
          const isSelected = selectedProduct === p.id;
          return (
            <button
              key={p.id}
              onClick={() => {
                setSelectedProduct(p.id);
                const firstVer = versions.find((v) => v.productId === p.id);
                if (firstVer) setActiveVersionId(firstVer.id);
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-sky-500/10 border-sky-400 shadow-lg'
                  : 'bg-zinc-950/70 border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">{p.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-sky-300">
                  {p.badge}
                </span>
              </div>
              <div className="text-[11px] font-mono text-zinc-500 mt-1 truncate">{p.domain}</div>
            </button>
          );
        })}
      </div>

      {/* 2. VERSION RELEASE CONTROL BANNER */}
      <div className="p-5 rounded-3xl bg-zinc-950/90 border border-sky-500/20 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-850 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Active Version Release: {currentVersion?.versionNumber}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-200 border border-sky-500/30 uppercase">
                {currentVersion?.status}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">{currentVersion?.headline}</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400">
              Target Release: <strong className="text-white">{currentVersion?.targetReleaseDate}</strong>
            </span>
            <button
              onClick={() => setShowAddVersion(!showAddVersion)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-xs font-semibold transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Version</span>
            </button>
          </div>
        </div>

        {/* New Version Form (Collapsible) */}
        {showAddVersion && (
          <form onSubmit={handleAddVersion} className="p-4 rounded-2xl bg-zinc-900/80 border border-sky-500/30 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Version Number *</label>
                <input
                  type="text"
                  placeholder="e.g. v1.3.0"
                  value={newVersionNumber}
                  onChange={(e) => setNewVersionNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Target Release Date *</label>
                <input
                  type="date"
                  value={newTargetDate}
                  onChange={(e) => setNewTargetDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">Version Headline / Goal *</label>
                <input
                  type="text"
                  placeholder="e.g. Offline Sync & Mobile UI Overhaul"
                  value={newHeadline}
                  onChange={(e) => setNewHeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddVersion(false)}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 text-xs hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-sky-400 text-zinc-950 text-xs font-bold hover:bg-sky-300"
              >
                Lock In Version
              </button>
            </div>
          </form>
        )}

        {/* Version Switcher Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {productVersions.map((v) => {
            const isActive = v.id === currentVersion?.id;
            return (
              <button
                key={v.id}
                onClick={() => setActiveVersionId(v.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sky-400 text-zinc-950 font-bold shadow-md shadow-sky-950/40'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <span>{v.versionNumber}</span>
                <span className="text-[10px] opacity-80">({v.items.length})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. RELEASE READINESS & BACKLOG MANAGEMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Backlog Items & Quick Add (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Quick Add Form */}
          <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-2 bg-zinc-950/80 p-3 rounded-2xl border border-zinc-800">
            <input
              type="text"
              placeholder={`+ Add an improvement or polish item for ${currentVersion?.versionNumber}...`}
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-xs focus:outline-none focus:border-sky-400"
            />

            <select
              value={newItemType}
              onChange={(e) => setNewItemType(e.target.value as RoadmapItem['type'])}
              className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono focus:outline-none"
            >
              <option value="ui_ux">UI/UX</option>
              <option value="feature">Feature</option>
              <option value="bugfix">Bugfix</option>
              <option value="performance">Perf</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-400 text-zinc-950 text-xs font-bold hover:bg-sky-300 transition-colors"
            >
              Add Item
            </button>
          </form>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-1.5 text-xs no-scrollbar overflow-x-auto">
            {[
              { id: 'all', label: 'All' },
              { id: 'ui_ux', label: 'UI/UX' },
              { id: 'feature', label: 'Features' },
              { id: 'bugfix', label: 'Bugs' },
              { id: 'performance', label: 'Perf' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilterType(t.id)}
                className={`px-3 py-1 rounded-lg font-mono text-[11px] transition-all ${
                  filterType === t.id
                    ? 'bg-zinc-800 text-sky-400 font-bold border border-sky-500/30'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Items List */}
          <div className="space-y-2">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-zinc-850 bg-zinc-900/20 text-xs text-zinc-500">
                No items in this category for {currentVersion?.versionNumber}. Add one above!
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-850 hover:border-zinc-750 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleItemStatus(item.id)}
                      className="shrink-0"
                    >
                      {item.status === 'shipped' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : item.status === 'ready' ? (
                        <Check className="w-4 h-4 text-sky-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-zinc-600 hover:text-sky-400" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.2 rounded ${
                            item.type === 'ui_ux'
                              ? 'bg-purple-500/20 text-purple-300'
                              : item.type === 'feature'
                              ? 'bg-sky-500/20 text-sky-300'
                              : item.type === 'bugfix'
                              ? 'bg-rose-500/20 text-rose-300'
                              : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {item.type}
                        </span>
                        <h4
                          className={`text-xs ${
                            item.status === 'shipped'
                              ? 'line-through text-zinc-500'
                              : 'text-zinc-200 font-medium'
                          }`}
                        >
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleItemStatus(item.id)}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-sky-500/30 uppercase shrink-0"
                  >
                    {item.status}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Release Velocity & Changelog Summary (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-3xl bg-zinc-950/90 border border-sky-500/20 space-y-3">
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              {currentVersion?.versionNumber} Release Progress
            </span>

            <div className="space-y-1">
              <div className="flex items-baseline justify-between text-xs font-mono">
                <span className="text-zinc-400">Readiness Score</span>
                <span className="text-sky-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-zinc-850 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-sky-400 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-850 text-center font-mono">
              <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="block text-sm font-bold text-emerald-400">{shippedCount}</span>
                <span className="text-[10px] text-zinc-500">Shipped</span>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="block text-sm font-bold text-sky-400">{readyCount}</span>
                <span className="text-[10px] text-zinc-500">Ready</span>
              </div>
              <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="block text-sm font-bold text-amber-400">{inProgressCount}</span>
                <span className="text-[10px] text-zinc-500">In Dev</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-zinc-950/80 border border-zinc-850 space-y-2">
            <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-3.5 h-3.5 text-sky-400" />
              Target Release Deliverables
            </span>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Every Sunday 11h sprint locks code changes into a version tag. Once readiness reaches 100%, automated regression suite triggers release deployment.
            </p>
          </div>
        </div>
      </div>
    </HubPageShell>
  );
}

