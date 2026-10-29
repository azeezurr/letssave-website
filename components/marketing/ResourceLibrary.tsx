'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { resources, type ResourceArticle } from '@/lib/catalog';
import { cn } from '@/lib/utils';

const filters: Array<ResourceArticle['category'] | 'All'> = ['All', 'Whitepaper', 'Regulatory Guide', 'Practitioner Guide', 'Developer Hub'];

export default function ResourceLibrary() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');
  const visible = useMemo(
    () => resources.filter((article) => filter === 'All' || article.category === filter),
    [filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Resource types">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={filter === item}
            onClick={() => setFilter(item)}
            className={cn(
              'rounded-full px-4 py-2 text-xs font-bold',
              filter === item ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-teal-50'
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {visible.map((article) => (
          <Link key={article.slug} href={`/resources/${article.slug}`} className="rounded-3xl border border-slate-200 p-6 hover:border-teal-400 hover:shadow-md">
            <p className="text-[11px] font-bold uppercase tracking-wider text-teal-800">{article.category}</p>
            <h2 className="mt-2 font-heading text-xl font-bold text-slate-900">{article.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{article.summary}</p>
            <p className="mt-4 text-xs font-semibold text-slate-500">{article.minutes}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
