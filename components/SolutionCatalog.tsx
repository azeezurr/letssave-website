'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Search, X } from 'lucide-react';
import { categories, features, type FeatureCategory } from '@/lib/catalog';
import { cn } from '@/lib/utils';
import { PrototypeTab } from './InteractivePrototype';
import { FeatureIcon } from './marketing/feature-icons';

interface SolutionCatalogProps {
  onOpenPrototypeTab: (tabId: PrototypeTab) => void;
}

export default function SolutionCatalog({ onOpenPrototypeTab }: SolutionCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FeatureCategory | 'all'>('all');

  const filteredFeatures = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return features.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = !q || [item.title, item.summary, item.badge, ...item.tags, ...item.outcomes].join(' ').toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="features" className="border-b border-slate-200 bg-slate-50/60 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
            Explore all capabilities
          </div>
          <h2 className="font-heading text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Comprehensive enterprise solutions
          </h2>
          <p className="text-base font-normal text-slate-600 sm:text-lg">
            {features.length} capabilities across the vault, archive, cases, workflows, governance, and secure viewing.
          </p>
        </div>

        <div className="mx-auto mb-10 max-w-4xl rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xs sm:p-5">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search features (archiving, paperless, WORM, SLA, watermark, BPM)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-xs font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-700 focus:bg-white focus:ring-2 focus:ring-teal-100 sm:text-sm"
            />
            {searchQuery && (
              <button type="button" aria-label="Clear search" onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            )}
          </div>
          <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'shrink-0 whitespace-nowrap rounded-xl px-3.5 py-2 font-heading text-xs font-bold transition-all',
                    isSelected ? 'bg-teal-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-900'
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between px-1 text-xs text-slate-500">
          <span>Showing <strong>{filteredFeatures.length}</strong> enterprise capabilities</span>
          {searchQuery && (
            <button type="button" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="font-bold text-teal-800 hover:underline">
              Reset filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFeatures.map((item) => (
            <div key={item.slug} className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 transition-all hover:border-teal-400 hover:shadow-lg sm:p-7">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{item.categoryLabel}</span>
                  <span className="rounded-full border border-teal-100 bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase text-teal-800">{item.badge}</span>
                </div>
                <div className="mb-3 flex items-start gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 shadow-2xs transition-all group-hover:bg-teal-700 group-hover:text-white">
                    <FeatureIcon name={item.icon} />
                  </div>
                  <h3 className="font-heading text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-teal-800 sm:text-lg">{item.title}</h3>
                </div>
                <p className="mb-4 text-xs font-normal leading-relaxed text-slate-600 sm:text-sm">{item.summary}</p>
                <div className="space-y-1.5 border-b border-slate-100 pb-4">
                  {item.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-teal-600" aria-hidden="true" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex gap-2 pt-4">
                <Link href={`/solutions/${item.slug}`} className="flex flex-1 items-center justify-center rounded-xl bg-slate-900 py-2.5 text-center font-heading text-xs font-bold text-white transition-all hover:bg-teal-800">
                  Full capability
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    onOpenPrototypeTab(item.demoTab);
                    document.getElementById('prototype-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-heading text-xs font-bold text-slate-700 transition-all hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800"
                >
                  <span>Demo</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
