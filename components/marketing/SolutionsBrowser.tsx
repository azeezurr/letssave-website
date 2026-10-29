'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { categories, features, type FeatureCategory } from '@/lib/catalog';
import { cn } from '@/lib/utils';
import { FeatureIcon } from './feature-icons';

export default function SolutionsBrowser() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<FeatureCategory | 'all'>('all');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return features.filter((feature) => {
      const inCategory = category === 'all' || feature.category === category;
      const inQuery = !q || [feature.title, feature.summary, feature.badge, ...feature.tags, ...feature.outcomes].join(' ').toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [query, category]);

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <label className="relative block">
          <span className="sr-only">Search capabilities</span>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search archiving, SLA, watermark, OCR…"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm outline-none focus:border-teal-700 focus:bg-white focus:ring-2 focus:ring-teal-100"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-500">
              <X size={16} />
            </button>
          )}
        </label>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Capability categories">
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={category === item.id}
              onClick={() => setCategory(item.id)}
              className={cn(
                'shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold',
                category === item.id ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-900'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        Showing <strong className="text-slate-800">{visible.length}</strong> of {features.length} capabilities
      </p>

      <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((feature) => (
          <article key={feature.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-teal-400 hover:shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{feature.categoryLabel}</p>
              <p className="rounded-full border border-teal-100 bg-teal-50 px-2 py-0.5 text-[10px] font-bold uppercase text-teal-800">{feature.badge}</p>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                <FeatureIcon name={feature.icon} />
              </span>
              <h2 className="font-heading text-lg font-bold leading-snug text-slate-900">{feature.title}</h2>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{feature.summary}</p>
            <div className="mt-5 flex gap-2">
              <Link href={`/solutions/${feature.slug}`} className="flex-1 rounded-xl bg-slate-900 py-2.5 text-center text-xs font-bold text-white hover:bg-teal-800">
                Read the capability
              </Link>
              <Link href={feature.workspaceHref} className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 hover:border-teal-300 hover:text-teal-800">
                Try
              </Link>
            </div>
          </article>
        ))}
      </div>
      {visible.length === 0 && (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-600">
          Nothing matches that search. Clear the filter or try “archive”, “case”, or “viewer”.
        </p>
      )}
    </div>
  );
}
